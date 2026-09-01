/**
 * Writes `.vercel/output/config.json` — the static route table plus the one
 * decision that cannot live in a committed file: where `/api/*` goes.
 *
 * The static site and the API are deployed separately, and the API's home has
 * already moved twice. So the origin is a repository variable read at deploy
 * time, and this turns it into a route:
 *
 *     API_ORIGIN=https://api.example.com node deploy/vercel/build-config.mjs out.json
 *
 * With an origin, `/api/*` is proxied there. The browser sees one origin, which
 * is what keeps the login cookie first-party (`SameSite=Lax`) and removes CORS
 * from the picture entirely.
 *
 * Without one, `/api/*` answers 503 — deliberately, and this is the part worth
 * reading. The catch-all rewrite that makes client-side routing work would
 * otherwise hand `/api/ai/config` the academy's HTML shell at HTTP 200, and the
 * client checks `res.ok` before parsing: the status passes, the parse throws,
 * the failure is swallowed, and the site quietly decides no server key exists.
 * Every server-backed feature disappears and nothing looks broken. A 503 says
 * the same thing honestly and immediately.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** The committed route table: everything that does not depend on the environment. */
export function baseConfig() {
  return JSON.parse(readFileSync(path.join(here, 'config.json'), 'utf8'));
}

export function apiRoute(apiOrigin) {
  if (!apiOrigin) {
    return {
      src: '/api/(.*)',
      status: 503,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    };
  }
  const origin = apiOrigin.trim().replace(/\/+$/, '');
  if (!/^https:\/\/[^/]+$/.test(origin)) {
    throw new Error(`API_ORIGIN must be an https origin with no path, got: ${apiOrigin}`);
  }
  return { src: '/api/(.*)', dest: `${origin}/api/$1` };
}

/**
 * The API route goes in front of `handle: filesystem`, so it is settled before
 * either the static files or the SPA catch-all get a look at the path.
 */
export function buildConfig(base, apiOrigin) {
  const routes = [...base.routes];
  const filesystem = routes.findIndex(route => route.handle === 'filesystem');
  if (filesystem < 0) throw new Error('the base config has no `handle: filesystem` route');
  routes.splice(filesystem, 0, apiRoute(apiOrigin));
  return { ...base, routes };
}

const [, thisFile, out] = process.argv;
if (thisFile && path.resolve(thisFile) === fileURLToPath(import.meta.url)) {
  if (!out) throw new Error('usage: build-config.mjs <output path>');
  const origin = process.env.API_ORIGIN?.trim();
  const config = buildConfig(baseConfig(), origin);
  writeFileSync(out, JSON.stringify(config, null, 2) + '\n');
  console.log(
    origin ? `/api/* → ${origin}/api/*` : '/api/* → 503 (no API_ORIGIN set for this deployment)',
  );
}
