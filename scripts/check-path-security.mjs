// Run after `bun run build`: node scripts/check-path-security.mjs
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const reservation = createServer();
reservation.listen(0, '127.0.0.1');
await once(reservation, 'listening');
const port = reservation.address().port;
await new Promise(resolve => reservation.close(resolve));

const server = spawn(process.execPath, [
  'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port),
], {
  // Exercise the public HTTP contract without touching any real database.
  env: { ...process.env, NODE_ENV: 'production', DATABASE_URL: '' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let logs = '';
server.stdout.on('data', data => { logs += data; });
server.stderr.on('data', data => { logs += data; });
const base = `http://127.0.0.1:${port}`;
const request = (path, options = {}) => fetch(base + path, {
  ...options, signal: AbortSignal.timeout(5000),
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(logs);
    try {
      if ((await request('/api/test')).ok) { ready = true; break; }
    } catch {}
    await delay(100);
  }
  assert.ok(ready, `Production server did not start: ${logs}`);

  for (const body of ['{}', '{', JSON.stringify({
    paths: [{ points: [{ x: 999999, y: 999999 }] }],
    viewport: { width: 1920, height: 1080 },
  })]) {
    for (const [path, status] of [['/api/paths', 405], ['/api/paths/clear', 404]]) {
      const response = await request(path, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
      });
      assert.equal(response.status, status, `POST ${path} must reject writes`);
    }
  }

  for (const width of ['', '0', '-1', '1.5', '1920junk', 'Infinity', '16385']) {
    const response = await request(`/api/paths?width=${width}&height=1080`);
    assert.equal(response.status, 400, `Invalid width ${width} must be rejected`);
  }
  assert.equal((await request('/api/paths?width=1920&height=-1')).status, 400);
  const read = await request('/api/paths?width=1920&height=1080');
  assert.equal(read.status, 200);
  assert.deepEqual(await read.json(), { paths: [], cached: false });
  assert.equal((await request('/api/debug/cache-clear', { method: 'POST' })).status, 403);
  assert.equal((await request('/api/debug/cache-stats')).status, 403);
  console.log('Passed: mutation rejection, viewport validation, cache fallback, and production debug guards.');
} finally {
  if (server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    const force = setTimeout(() => server.kill('SIGKILL'), 5000);
    await exited;
    clearTimeout(force);
  }
}
