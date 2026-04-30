// Visual review tool — screenshots key pages at desktop + mobile breakpoints.
// Usage: bun run scripts/visual/snapshot.mjs
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = path.join(process.cwd(), 'scripts', 'visual', 'out');

const PAGES = [
  { name: 'home-top',    path: '/', fullPage: false, scrollY: 0 },
  { name: 'home-stream', path: '/', fullPage: false, scrollY: 700 },
  { name: 'home-mid',    path: '/', fullPage: false, scrollY: 1400 },
  { name: 'home-full',   path: '/', fullPage: true },
  { name: 'ideas-top',   path: '/ideas', fullPage: false, scrollY: 0 },
  { name: 'about-top',   path: '/about', fullPage: false, scrollY: 0 },
  { name: 'about-mid',   path: '/about', fullPage: false, scrollY: 700 },
  { name: 'github-top',  path: '/github', fullPage: false, scrollY: 0 },
  { name: 'github-mid',  path: '/github', fullPage: false, scrollY: 700 },
];

const VIEWPORTS = [
  { tag: 'desktop', width: 1280, height: 900 },
  { tag: 'mobile',  width: 390, height: 844 },
];

async function run() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const consoleErrors = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const page of PAGES) {
      const p = await ctx.newPage();
      p.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(`[${vp.tag}/${page.name}] ${msg.text()}`);
        }
      });
      p.on('pageerror', (err) => {
        consoleErrors.push(`[${vp.tag}/${page.name}] PAGEERROR ${err.message}`);
      });

      const url = `${BASE}${page.path}`;
      try {
        await p.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) {
        consoleErrors.push(`[${vp.tag}/${page.name}] NAV FAIL ${e.message}`);
      }
      // Brief settle for animation/intersection observers
      await p.waitForTimeout(800);

      if (page.action) {
        try { await page.action(p); } catch (e) {
          consoleErrors.push(`[${vp.tag}/${page.name}] ACTION FAIL ${e.message}`);
        }
        await p.waitForTimeout(400);
      }

      if (typeof page.scrollY === 'number') {
        await p.evaluate((y) => window.scrollTo(0, y), page.scrollY);
        await p.waitForTimeout(400);
      }

      const file = path.join(OUT, `${page.name}-${vp.tag}.png`);
      await p.screenshot({ path: file, fullPage: page.fullPage === true });
      console.log('captured', file);
      await p.close();
    }
    await ctx.close();
  }

  await browser.close();

  await writeFile(path.join(OUT, 'console.log'), consoleErrors.join('\n') + '\n', 'utf8');
  console.log('console errors:', consoleErrors.length);
}

run().catch((e) => { console.error(e); process.exit(1); });
