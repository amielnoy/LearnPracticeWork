# Vercel build output

`config.json` is a [Build Output API v3](https://vercel.com/docs/build-output-api/v3)
configuration. The deploy workflow copies it to `.vercel/output/config.json`,
copies the assembled site to `.vercel/output/static/`, and runs
`vercel deploy --prebuilt`. Nothing is built on Vercel: CI builds the twelve
apps, and Vercel receives a directory.

It replaces two Cloudflare-shaped files — `../cloudflare/_redirects` and
`../cloudflare/_headers` — which Vercel does not read. Those stay in the tree so
the same assembled site still deploys to Cloudflare Pages unchanged.

## Why the routes are in this order

Every header rule carries `"continue": true`, so matching does not stop at the
first hit and a later rule overrides an earlier one for the same header name.
Site-wide defaults come first, then the narrower rules that are meant to win.

`{ "handle": "filesystem" }` marks the point where real files are served.
Everything after it is reached only when no file matched, which is what makes
the SPA rewrites safe: a request for a hashed asset is answered by the asset,
never by an HTML shell.

| Rule | What it is for |
|---|---|
| `/(.*)` | Security headers, and `must-revalidate` as the default cache policy |
| `…/assets/(.*)` | Vite fingerprints these, so they are immutable for a year |
| `robots.txt`, `sitemap.xml` | An hour, so a crawler is not served a stale copy for long |
| `/portfolio`, `/ai-testing-lecture-N` | Take the microphone back. The site-wide rule grants it because the root app is the academy, whose mock interview has a voice mode; nothing mounted underneath needs one |
| SPA rewrites | The portfolio and the decks serve their own shells; the catch-all hands everything else to the academy, which is the site |

The revalidate rule is the broad default rather than an `*.html` match, because
a deep link like `/ai-testing-lecture-3/slide5` is served HTML from a path with
no extension in it at all. That is also the case the whole migration is about:
GitHub Pages has no rewrites, so those URLs were answered through `404.html` —
the right page under a 404 status, on URLs the academy's own hreflang tags
nominate for indexing.

## `/api/*`, decided at deploy time

The static site and the API deploy separately, and the API's home has already
moved twice — so its origin is not in `config.json`. `build-config.mjs` reads the
`API_ORIGIN` repository variable and writes the final table:

| `API_ORIGIN` | `/api/*` |
|---|---|
| set | proxied there, so the browser sees one origin — the login cookie stays first-party and CORS never enters the picture |
| unset | `503`, with a JSON content type |

The 503 is the interesting half. Without an `/api` route the catch-all hands
`/api/ai/config` the academy's HTML shell at HTTP 200, and the client checks
`res.ok` before parsing: the status passes, the parse throws, the failure is
swallowed, and the site concludes no server key exists. Every server-backed
feature — the AI proxy, sign-in, the content API, checkout — quietly disappears
while the page looks perfectly healthy. A 503 says the same thing out loud.

The deploy workflow smoke-checks that `/api/ai/config` is not `text/html`, and
`tests/unit/vercelRoutes.spec.ts` checks both variants of the table.

## Ten decks, one rule

`/ai-testing-lecture-(\d+)/.*` → `/ai-testing-lecture-$1/index.html` replaces
the ten near-identical lines the Cloudflare file needs. An eleventh deck needs
no change here — only a build step and a directory in the assembled site.
