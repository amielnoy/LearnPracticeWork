# The routing table

`config.json` is a [Build Output API v3](https://vercel.com/docs/build-output-api/v3)
route table. The deploy workflow copies it over the one `vercel build` generates,
so this file — not Vercel's inference — is what serves the deployment.

It replaces two Cloudflare-shaped files — `../cloudflare/_redirects` and
`../cloudflare/_headers` — which Vercel does not read. Those stay in the tree so
the same assembled `_site` still deploys to Cloudflare Pages unchanged, minus
the API.

## Why the routes are in this order

Every header rule carries `"continue": true`, so matching does not stop at the
first hit and a later rule overrides an earlier one for the same header name.
Site-wide defaults come first, then the narrower rules that are meant to win.

`{ "handle": "filesystem" }` marks the point where real files — and functions —
are served. Everything after it is reached only when no file matched, which is
what makes the SPA rewrites safe: a request for a hashed asset is answered by
the asset, never by an HTML shell.

| Rule | What it is for |
|---|---|
| `/(.*)` | Security headers, and `must-revalidate` as the default cache policy |
| `/api/(.*)` (headers) | `no-store`. The site-wide default above grants `max-age=0, must-revalidate`, which is still a caching instruction; a signed-in answer to `/api/auth/session` must not carry one at all |
| `…/assets/(.*)` | Vite fingerprints these, so they are immutable for a year |
| `robots.txt`, `sitemap.xml` | An hour, so a crawler is not served a stale copy for long |
| `/portfolio`, `/ai-testing-lecture-N` | Take the microphone back. The site-wide rule grants it because the root app is the academy, whose mock interview has a voice mode; nothing mounted underneath needs one |
| `/api/(.*)` → `/api/index` | The API function |
| SPA rewrites | The portfolio and the decks serve their own shells; the catch-all hands everything else to the academy, which is the site |

The revalidate rule is the broad default rather than an `*.html` match, because
a deep link like `/ai-testing-lecture-3/slide5` is served HTML from a path with
no extension in it at all. That is also the case the move off GitHub Pages was
about: Pages has no rewrites, so those URLs were answered through `404.html` —
the right page under a 404 status, on URLs the academy's own hreflang tags
nominate for indexing.

## `/api/*`

One route, sending the whole prefix to one function:

```json
{ "src": "/api/(.*)", "dest": "/api/index", "check": true }
```

`api/index.py` is a FastAPI application that already owns its own routing, so
the table hands it the prefix rather than naming endpoints it would then have to
keep in step with `server/app/routes/`.

It sits **after** `handle: filesystem`, which is where Vercel's own builder puts
a function route, and `check: true` sends the rewritten path back through that
phase to land on the function. Nothing in the assembled site lives under `/api/`,
so letting static files be consulted first costs nothing.

What it must never do is fall through to the SPA catch-all. Without an `/api`
route, `/api/ai/config` is answered with the academy's HTML shell at HTTP 200 —
and the client checks `res.ok` before parsing, so the status passes, the parse
throws, the failure is swallowed, and the site concludes no server key exists.
Every server-backed feature disappears while the page looks perfectly healthy.
`tests/unit/vercelRoutes.spec.ts` asserts the route resolves to the function and
never to `/index.html`; the deploy workflow's smoke check asks the deployed
`/api/healthz` whether the function actually booted.

This route used to be written at deploy time from an `API_ORIGIN` variable,
because the API lived on another host and had moved twice. It lives here now
because there is nowhere else for it to point.

## Ten decks, one rule

`/ai-testing-lecture-(\d+)/.*` → `/ai-testing-lecture-$1/index.html` replaces
the ten near-identical lines the Cloudflare file needs. An eleventh deck needs
no change here — only a build step and a directory in the assembled site.
