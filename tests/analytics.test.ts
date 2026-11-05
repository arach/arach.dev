import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { runInNewContext } from 'node:vm';
import { createAnalyticsScript, PULSE_PROPERTY_ID } from '../lib/analytics';

const production = {
  nodeEnv: 'production',
  vercelEnv: 'production',
  measurementId: 'G-GSHDZPFRZG',
  pulsePropertyId: PULSE_PROPERTY_ID,
};

function execute(url: string, privacy: Record<string, unknown> = {}) {
  const scripts: Array<Record<string, unknown>> = [];
  const window: Record<string, any> = { location: new URL(url) };
  const context = {
    window,
    navigator: privacy,
    URLSearchParams,
    document: {
      createElement(tag: string) {
        assert.equal(tag, 'script');
        const element: Record<string, unknown> = {};
        element.setAttribute = (name: string, value: string) => { element[name] = value; };
        return element;
      },
      head: { appendChild(element: Record<string, unknown>) { scripts.push(element); } },
    },
  };
  const script = createAnalyticsScript(production)!;
  const run = () => runInNewContext(script, context);
  run();
  return { scripts, window, run };
}

describe('production analytics', () => {
  it('does not render analytics in development or Vercel previews', () => {
    for (const nodeEnv of [undefined, 'development', 'test']) {
      assert.equal(createAnalyticsScript({ ...production, nodeEnv }), null);
    }
    for (const vercelEnv of ['preview', 'development']) {
      assert.equal(createAnalyticsScript({ ...production, vercelEnv }), null);
    }
    assert.equal(createAnalyticsScript({ nodeEnv: 'production' }), null);
  });

  it('keeps production builds quiet on local, LAN, preview, and lookalike origins', () => {
    const origins = [
      'http://localhost:3000', 'http://127.0.0.1:3000', 'http://[::1]:3000',
      'http://192.168.18.28:3000', 'http://archie',
      'https://arach-preview.vercel.app', 'https://arachdev-git-main-arach.vercel.app',
      'https://preview.arach.dev', 'https://arach.dev.example.com',
      'http://arach.dev', 'https://arach.dev:3000',
    ];
    for (const origin of origins) {
      const result = execute(`${origin}/missing?from=local`);
      assert.equal(result.scripts.length, 0, origin);
      assert.equal(result.window.dataLayer, undefined, origin);
      assert.equal(result.window.__arachAnalyticsInitialized, undefined, origin);
    }
  });

  it('loads both collectors only once on the exact production origins', () => {
    for (const origin of ['https://arach.dev', 'https://www.arach.dev']) {
      const result = execute(`${origin}/missing?from=ordinary-query`);
      result.run();
      assert.equal(result.scripts.length, 2);
      assert.equal(result.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-GSHDZPFRZG');
      assert.equal(result.scripts[0].async, true);
      assert.equal(result.scripts[1].src, 'https://pulse.arach.dev/track.js');
      assert.equal(result.scripts[1]['data-property'], '525091599');
      assert.equal(result.scripts[1].defer, true);
      assert.ok(result.scripts.every(script => script.referrerPolicy === 'no-referrer'));
      const config = result.window.dataLayer[1];
      assert.equal(config[0], 'config');
      assert.equal(config[1], production.measurementId);
      assert.equal(config[2].page_path, '/missing');
    }
  });

  it('honors QA opt-out and browser privacy signals before loading either collector', () => {
    const fixtures: Array<[string, Record<string, unknown>]> = [
      ['https://www.arach.dev/missing?analytics=off&from=qa', {}],
      ['https://arach.dev/', { globalPrivacyControl: true }],
      ['https://arach.dev/', { doNotTrack: '1' }],
      ['https://arach.dev/', { doNotTrack: 'yes' }],
      ['https://arach.dev/', { msDoNotTrack: '1' }],
    ];
    for (const [url, privacy] of fixtures) {
      const result = execute(url, privacy);
      assert.equal(result.scripts.length, 0);
      assert.equal(result.window.dataLayer, undefined);
    }
  });

  it('serializes inline configuration without allowing an HTML script breakout', () => {
    const script = createAnalyticsScript({ ...production, measurementId: '</script><script>bad()</script>' });
    assert.ok(script);
    assert.equal(script.includes('</script>'), false);
  });
});
