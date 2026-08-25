import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * The routing table the deployed site is served through.
 *
 * `deploy/vercel/config.json` is the whole reason the site moved off GitHub
 * Pages: Pages has no rewrites, so `/ai-testing-lecture-3/slide5` — a URL the
 * academy's own hreflang tags nominate for indexing — was answered through the
 * nearest 404 document. A config that gets this wrong fails in exactly the way
 * the old host did, and it fails on the URLs nobody clicks during a smoke test
 * of the home page.
 *
 * So the table is exercised here rather than only in production. The deploy
 * workflow's smoke check covers the real deployment; this covers every case the
 * smoke check would take too long to enumerate, and it runs on a branch, before
 * anything ships.
 *
 * The file list is a fixture rather than a build output, so the test is
 * hermetic — it describes the shape the assemble step produces, and does not
 * need twelve Vite builds to have run first.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(here, '..', '..', 'deploy', 'vercel', 'config.json');

interface HeaderRule {
  src?: string;
  dest?: string;
  handle?: string;
  headers?: Record<string, string>;
  continue?: boolean;
}

const config = JSON.parse(readFileSync(configPath, 'utf8')) as {
  version: number;
  routes: HeaderRule[];
};

/** What the `Assemble the site` step produces, in the only detail routing cares about. */
const FILES = new Set([
  '/index.html',
  '/architecture.html',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/main-BF6RpGR1.js',
  '/ai-testing-academy/index.html',
  '/ai-testing-academy/assets/index-Bu6FJ_WA.js',
  ...Array.from({ length: 10 }, (_, i) => `/ai-testing-lecture-${i + 1}/index.html`),
]);

function fileExists(requestPath: string): boolean {
  if (FILES.has(requestPath)) return true;
  const asDirectory = requestPath.endsWith('/') ? requestPath : requestPath + '/';
  return FILES.has(asDirectory + 'index.html');
}

interface Served {
  /** The file that answers the request. */
  dest: string;
  headers: Record<string, string>;
  /** `file` when the filesystem answered, `rewrite` when a route did. */
  how: 'file' | 'rewrite' | 'missing';
}

/**
 * Vercel's route layer, in the part this config uses: header rules accumulate
 * while `continue` is set — so a later rule overrides an earlier one for the
 * same header — and `handle: filesystem` is the point where a real file wins
 * over every rewrite below it.
 */
function serve(requestPath: string): Served {
  const headers: Record<string, string> = {};
  const dest = requestPath;

  for (const rule of config.routes) {
    if (rule.handle === 'filesystem') {
      if (fileExists(dest)) return { dest, headers, how: 'file' };
      continue;
    }
    const match = new RegExp(`^${rule.src}$`).exec(dest);
    if (!match) continue;
    if (rule.headers) Object.assign(headers, rule.headers);
    if (rule.dest) {
      const target = rule.dest.replace(/\$(\d+)/g, (_, n: string) => match[Number(n)]);
      return { dest: target, headers, how: fileExists(target) ? 'rewrite' : 'missing' };
    }
    if (!rule.continue) break;
  }
  return { dest, headers, how: fileExists(dest) ? 'file' : 'missing' };
}

test('is a Build Output API v3 configuration', () => {
  expect(config.version).toBe(3);
});

test.describe('client-side routes', () => {
  test('rewrites a deck deep link to that deck, not to a 404 and not to the portfolio', () => {
    const served = serve('/ai-testing-lecture-3/slide5');

    expect(served.how).toBe('rewrite');
    expect(served.dest).toBe('/ai-testing-lecture-3/index.html');
  });

  test('covers all ten decks with one rule', () => {
    for (let n = 1; n <= 10; n++) {
      const served = serve(`/ai-testing-lecture-${n}/allslides`);
      expect(served.dest, `deck ${n}`).toBe(`/ai-testing-lecture-${n}/index.html`);
      expect(served.how, `deck ${n}`).toBe('rewrite');
    }
  });

  test('rewrites an academy route to the academy shell', () => {
    expect(serve('/ai-testing-academy/tools/resume').dest).toBe('/ai-testing-academy/index.html');
  });

  test('hands anything else to the portfolio', () => {
    expect(serve('/anything/at/all').dest).toBe('/index.html');
  });

  test('serves a real file rather than a shell', () => {
    // The catch-all sits after `handle: filesystem`, which is what stops it
    // from swallowing every asset request on the site.
    expect(serve('/assets/main-BF6RpGR1.js').how).toBe('file');
    expect(serve('/architecture.html').how).toBe('file');
    expect(serve('/ai-testing-academy/').how).toBe('file');
  });
});

test.describe('caching', () => {
  test('freezes hashed assets, in every app', () => {
    for (const asset of [
      '/assets/main-BF6RpGR1.js',
      '/ai-testing-academy/assets/index-Bu6FJ_WA.js',
    ])
      expect(serve(asset).headers['Cache-Control'], asset).toContain('immutable');
  });

  test('revalidates the shells, whose names are stable and contents are not', () => {
    for (const shell of ['/', '/ai-testing-academy/', '/architecture.html'])
      expect(serve(shell).headers['Cache-Control'], shell).toContain('must-revalidate');
  });

  test('revalidates a rewritten deep link too', () => {
    // The response is HTML from a path with no extension in it, which is why
    // the revalidate rule is the broad default rather than an *.html match.
    expect(serve('/ai-testing-lecture-3/slide5').headers['Cache-Control']).toContain(
      'must-revalidate',
    );
  });

  test('gives crawler files an hour', () => {
    expect(serve('/robots.txt').headers['Cache-Control']).toContain('max-age=3600');
    expect(serve('/sitemap.xml').headers['Cache-Control']).toContain('max-age=3600');
  });
});

test.describe('security headers', () => {
  const EVERYWHERE = [
    '/',
    '/architecture.html',
    '/assets/main-BF6RpGR1.js',
    '/ai-testing-academy/',
    '/ai-testing-lecture-7/slide2',
    '/anything/at/all',
  ];

  test('reach every response, rewritten ones included', () => {
    for (const requestPath of EVERYWHERE) {
      const { headers } = serve(requestPath);
      expect(headers['Content-Security-Policy'], requestPath).toContain("default-src 'self'");
      expect(headers['X-Content-Type-Options'], requestPath).toBe('nosniff');
      expect(headers['X-Frame-Options'], requestPath).toBe('SAMEORIGIN');
      expect(headers['Strict-Transport-Security'], requestPath).toContain('max-age=31536000');
    }
  });

  test('deny the microphone everywhere except the academy, which has a voice mode', () => {
    expect(serve('/').headers['Permissions-Policy']).toContain('microphone=()');
    expect(serve('/ai-testing-lecture-1/').headers['Permissions-Policy']).toContain(
      'microphone=()',
    );
    // Both spellings of the academy's own root, because only one of them is a
    // directory the filesystem handler can answer.
    expect(serve('/ai-testing-academy').headers['Permissions-Policy']).toContain(
      'microphone=(self)',
    );
    expect(serve('/ai-testing-academy/tools').headers['Permissions-Policy']).toContain(
      'microphone=(self)',
    );
  });

  test('never allow the camera', () => {
    for (const requestPath of EVERYWHERE)
      expect(serve(requestPath).headers['Permissions-Policy'], requestPath).toContain('camera=()');
  });
});
