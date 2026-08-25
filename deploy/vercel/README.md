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
| `/ai-testing-academy/(.*)` | The academy asks for the microphone — the mock interview has a voice mode |
| SPA rewrites | Each app serves its own shell; the catch-all hands the rest to the portfolio |

The revalidate rule is the broad default rather than an `*.html` match, because
a deep link like `/ai-testing-lecture-3/slide5` is served HTML from a path with
no extension in it at all. That is also the case the whole migration is about:
GitHub Pages has no rewrites, so those URLs were answered through `404.html` —
the right page under a 404 status, on URLs the academy's own hreflang tags
nominate for indexing.

## Ten decks, one rule

`/ai-testing-lecture-(\d+)/.*` → `/ai-testing-lecture-$1/index.html` replaces
the ten near-identical lines the Cloudflare file needs. An eleventh deck needs
no change here — only a build step and a directory in the assembled site.
