import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';
import { buildConfig } from '../../deploy/vercel/build-config.mjs';

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
  '/assets/index-Bu6FJ_WA.js',
  '/portfolio/index.html',
  '/portfolio/assets/main-BF6RpGR1.js',
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

  test('rewrites a portfolio route to the portfolio shell', () => {
    expect(serve('/portfolio/ai-test-transformation').dest).toBe('/portfolio/index.html');
  });

  test('hands anything else to the academy, which is the site', () => {
    expect(serve('/anything/at/all').dest).toBe('/index.html');
    expect(serve('/tools/resume').dest).toBe('/index.html');
  });

  test('serves a real file rather than a shell', () => {
    // The catch-all sits after `handle: filesystem`, which is what stops it
    // from swallowing every asset request on the site.
    expect(serve('/assets/index-Bu6FJ_WA.js').how).toBe('file');
    expect(serve('/architecture.html').how).toBe('file');
    expect(serve('/portfolio/').how).toBe('file');
  });
});

test.describe('caching', () => {
  test('freezes hashed assets, in every app', () => {
    for (const asset of ['/assets/index-Bu6FJ_WA.js', '/portfolio/assets/main-BF6RpGR1.js'])
      expect(serve(asset).headers['Cache-Control'], asset).toContain('immutable');
  });

  test('revalidates the shells, whose names are stable and contents are not', () => {
    for (const shell of ['/', '/portfolio/', '/architecture.html'])
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
    '/assets/index-Bu6FJ_WA.js',
    '/portfolio/',
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

  test('grant the microphone to the academy, which has a voice mode, and nowhere else', () => {
    // The academy is the root app, so it is the default — and the two apps that
    // never ask for a microphone have it taken away by name.
    expect(serve('/').headers['Permissions-Policy']).toContain('microphone=(self)');
    expect(serve('/tools/interview').headers['Permissions-Policy']).toContain('microphone=(self)');

    for (const quiet of [
      '/portfolio',
      '/portfolio/',
      '/ai-testing-lecture-1/',
      '/ai-testing-lecture-10/slide3',
    ])
      expect(serve(quiet).headers['Permissions-Policy'], quiet).toContain('microphone=()');
  });

  test('never allow the camera', () => {
    for (const requestPath of EVERYWHERE)
      expect(serve(requestPath).headers['Permissions-Policy'], requestPath).toContain('camera=()');
  });
});

/**
 * `/api/*` is the one route that cannot be committed: the static site and the
 * API deploy separately, and the API's home has already moved twice. It is
 * added at deploy time from `API_ORIGIN`, and both outcomes have to be right.
 *
 * The failure being guarded is silent. Without an `/api` route the catch-all
 * hands `/api/ai/config` the academy's HTML shell at HTTP 200; the client
 * checks `res.ok`, the status passes, the JSON parse throws, the failure is
 * swallowed, and the site decides no server key exists. Every server-backed
 * feature vanishes and nothing looks broken.
 */
test.describe('the API route, decided at deploy time', () => {
  const withProxy = buildConfig(config, 'https://api.example.com');
  const without = buildConfig(config, undefined);

  function serveWith(built: { routes: HeaderRule[] }, requestPath: string): Served {
    const previous = config.routes;
    (config as { routes: HeaderRule[] }).routes = built.routes;
    try {
      return serve(requestPath);
    } finally {
      (config as { routes: HeaderRule[] }).routes = previous;
    }
  }

  test('proxies to the configured origin, keeping the path', () => {
    expect(serveWith(withProxy, '/api/ai/config').dest).toBe(
      'https://api.example.com/api/ai/config',
    );
    expect(serveWith(withProxy, '/api/content/question-bank').dest).toBe(
      'https://api.example.com/api/content/question-bank',
    );
  });

  test('never hands an API path to the SPA shell', () => {
    for (const built of [withProxy, without])
      for (const apiPath of ['/api/ai/config', '/api/auth/session', '/api/stripe/webhook'])
        expect(serveWith(built, apiPath).dest, apiPath).not.toBe('/index.html');
  });

  test('fails loudly rather than silently when no origin is configured', () => {
    const route = without.routes.find(r => r.src === '/api/(.*)') as HeaderRule & {
      status?: number;
    };
    expect(route.status).toBe(503);
    expect(route.headers?.['content-type']).toContain('application/json');
  });

  test('is settled before the filesystem, so nothing else can claim it', () => {
    for (const built of [withProxy, without]) {
      const api = built.routes.findIndex(r => r.src === '/api/(.*)');
      const filesystem = built.routes.findIndex(r => r.handle === 'filesystem');
      expect(api).toBeGreaterThan(-1);
      expect(api).toBeLessThan(filesystem);
    }
  });

  test('refuses an origin that is not an https origin', () => {
    for (const bad of ['http://api.example.com', 'https://api.example.com/api', 'api.example.com'])
      expect(() => buildConfig(config, bad), bad).toThrow(/https origin/);
  });

  test('leaves the static routes exactly as committed', () => {
    // The deploy-time step adds one route; it must not reorder or rewrite the
    // table the rest of this suite checks.
    expect(withProxy.routes.filter(r => r.src !== '/api/(.*)')).toEqual(config.routes);
  });
});
