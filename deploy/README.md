# Deploying

Everything is one Vercel deployment, on the free tier.

| | What it is | Where it goes | Cost |
|---|---|---|---|
| Static | 12 Vite SPAs — academy, portfolio, 10 lecture decks | Vercel | $0 |
| API | One FastAPI app: auth, AI proxy, content, Stripe, entitlements | Vercel, same project and origin | $0 |
| Database | Postgres | Supabase | $0 on the free tier |
| Monitoring | Python probes, Prometheus, Pushgateway, Grafana | Private host or managed equivalents | Depends on host |

The static apps and the API used to be hosted separately, on three platforms
between them, because they cost different amounts. They do not any more: the
API is a Python function in the same deployment as the site it serves.

That is worth more than the saved few dollars. `/api/*` is now **same-origin**,
so the login cookie stays first-party (`SameSite=Lax`) without a proxy hop, and
CORS never enters the picture. The origin can no longer drift out of step with
an allowlist on another platform, because there is only one origin.

> **Before enabling sales, read this.** Vercel's Hobby plan does not permit
> commercial use. `SALES_ENABLED` is `false`, so today this is a free
> educational site and the free tier fits it. Turning Stripe checkout on makes
> it a commercial deployment and needs a paid Vercel plan — that is a billing
> decision to make deliberately, not something to discover afterwards.

## What serves what

The academy is the site: it is what the root URL serves, with the portfolio at
`/portfolio/` and the ten decks at `/ai-testing-lecture-N/`. Each app is built
with a `BASE_PATH` matching where it is mounted, because Vite bakes it into
every asset URL and each router reads it back.

`deploy/vercel/config.json` is the routing table for all of it — security
headers, cache policy, the SPA rewrites, and the `/api/*` route onto the
function. `tests/unit/vercelRoutes.spec.ts` exercises the whole table on every
branch, before anything ships.

## How a deploy happens

`.github/workflows/deploy-vercel.yml` runs on every push to `main`, and gives a
pull request from this repository its own preview URL. A pull request from a
fork gets none, because a fork cannot read the secrets.

The workflow builds the twelve apps itself, assembles them into `_site`, and
then hands the repository to `vercel build`, which does exactly two things:
copies `_site` into the deployment and compiles `api/index.py` into a Python
function. The route table is copied over Vercel's generated one, and
`vercel deploy --prebuilt` ships the result.

So the frontends are still built from this lockfile in CI rather than by a
hosted build resolving whatever is current today. The function is the one thing
Vercel builds, and it has to be: its dependencies are vendored as
**linux/x86\_64** wheels, which is what the runner is and a developer's laptop
generally is not. Running `vercel build` on an Apple Silicon machine produces a
bundle that cannot run on Vercel — fine for inspecting the output, never for
deploying.

To reproduce the frontend build locally:

```bash
PORT=5173 BASE_PATH=/portfolio/ pnpm --filter @workspace/portfolio run build
PORT=5174 BASE_PATH=/ pnpm --filter @workspace/ai-testing-academy run build
for n in $(seq 1 10); do
  PORT=$((5174 + n)) BASE_PATH="/ai-testing-lecture-${n}/" \
    pnpm --filter "@workspace/ai-testing-lecture-${n}" run build
done
```

### If a Vercel project starts building this repo on its own

For a while, every push here produced a red deployment alongside the green one
that actually shipped, failing with *No Output Directory named "public" found*.
The cause was not this repository: a Vercel project named
`home-economy-stabilation` — which belongs to an entirely different codebase —
had its Git integration pointed at **this** repo, so it dutifully built twelve
Vite apps and then looked for a single `public/` that only exists after the
workflow's assembly step. Disconnecting it in that project's Vercel settings
fixed it at the source.

Reach for that fix first. The repo-level lever, `git.deploymentEnabled: false`
in `vercel.json`, looks tempting and is almost always wrong here: Vercel reads
it per *repository*, not per project, so it silences every project linked to
this repo at once.

### Why it moved off GitHub Pages

Rewrites. Pages has none, so a deep link like `/ai-testing-lecture-3/slide5` was
served through the nearest `404.html` — the right page under a 404 status, on
URLs the academy's own hreflang tags nominate for indexing.
`deploy/vercel/config.json` rewrites them at 200. The workflow's smoke check
asserts that on the real deployment.

### Cloudflare Pages

`deploy/cloudflare/_redirects` and `_headers` remain in the tree and say what
the Vercel routes say about the *static* site, which is still portable: point a
Pages project at this repo with the build commands above and `_site` as the
output directory.

The API is not portable that way any more. It is a Vercel Python function, and
a Pages deployment of `_site` alone would serve the frontends with no `/api/*`
behind them.

## The API

`api/index.py` is the whole of it: it puts `server/` on the import path and
re-exports `app.main:app`. The same FastAPI application runs under Uvicorn
locally and in `server/Dockerfile`, so there is no Vercel-shaped variant of the
API to keep in step with the real one.

Three things about it are specific to running serverless, and each is a comment
in the code as well as a line here:

| | Why |
|---|---|
| The schema is not applied at boot | `lifespan` runs on every cold start, not once per deploy. Applying DDL there would put a schema round-trip in front of a visitor's request and let instances race each other. Apply it deliberately instead — see below |
| `/metrics` answers 404 | `prometheus_client` counts in process memory, and a process here is one invocation. A scrape would report what one instance happened to see, which is not a sample of anything |
| `functions.excludeFiles` in `vercel.json` | The Python builder starts from the whole repository and removes what it is told to. Unbounded, the bundle is 329MB against a 225MB limit — and it contains `.env.local`. The glob is capped at 256 characters, which is why it names big directories rather than listing files |

Quotas were already serverless-safe and did not need changing: `app/rate_limit.py`
counts in atomic Postgres rows keyed by an HMAC digest, so allowances are shared
across instances rather than living in one process's memory. Sessions are signed
cookies, so they need no server-side store either.

### Environment

Set these on the Vercel project — `vercel env add NAME production`, or
**Settings → Environment Variables**. Nothing here belongs in the repository.

| Variable | Why it matters |
|---|---|
| `DATABASE_URL` | Point it at Supabase's **transaction pooler on 6543**, not the session pooler. A serverless function opens far more short-lived connections than a long-running server, which is the case the transaction pooler exists for |
| `RATE_LIMIT_SALT` | Not optional, and the easiest absence to miss. Every quota is counted keyed by an HMAC of the caller's identity; with no salt there is no key, so the limiter **fails closed and every rate-limited route refuses every caller** — Google sign-in, the AI proxy, the admin seed route. The refusal is a `429`, which reads to a visitor exactly like an exhausted quota. Any long random string works, and `METRICS_ID_SALT` is accepted in its place |
| `SESSION_SECRET` | At least 32 characters. Sign-in returns nothing without it |
| `ALLOWED_ORIGINS` | `https://learn-practice-work.vercel.app`. Same-origin requests do not need CORS, but `PUBLIC_APP_ORIGIN` is validated against this list |
| `PUBLIC_APP_ORIGIN` | The same origin. Must match an entry in `ALLOWED_ORIGINS`, or Stripe checkout fails closed |
| `NODE_ENV` | `production`. It is what switches off the localhost CORS regex and the in-memory rate limiter |
| `GROQ_API_KEY`, `GEMINI_API_KEY` | The server-side AI proxy. Without them the academy offers BYOK only |
| `GOOGLE_CLIENT_ID` | Must match the `VITE_GOOGLE_CLIENT_ID` the frontend was built with |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Required by the content endpoints |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Checkout and webhook verification |

`METRICS_TOKEN` and `METRICS_ID_SALT` are still read, but `/metrics` does not
answer on Vercel at all — set them only where the API runs as a real process.

Already set, because they are not secret and are the same for every deploy:
`NODE_ENV`, `ALLOWED_ORIGINS`, `PUBLIC_APP_ORIGIN`, `SALES_ENABLED`. The rest
carry credentials and have to be supplied by whoever holds them — they exist
today only on the host being retired:

```bash
for name in DATABASE_URL RATE_LIMIT_SALT SESSION_SECRET \
            GROQ_API_KEY GEMINI_API_KEY GOOGLE_CLIENT_ID \
            SUPABASE_URL SUPABASE_ANON_KEY \
            STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET; do
  printf '%s: ' "$name"
  read -rs value && echo
  printf '%s' "$value" | vercel env add "$name" production
done
```

`read -rs` keeps the values off the terminal and out of shell history, and
`printf` pipes them in rather than passing them as arguments, where they would
be visible to anything that can list processes.

After adding or changing any of these, **redeploy**. A Vercel function reads its
environment at deploy time; a variable added afterwards reaches the next
deployment, not the running one.

Verify with `curl https://learn-practice-work.vercel.app/api/healthz` for
`{"status":"ok"}` — that only proves the function booted — and then
`/api/readyz`, which reports the database and carries a `rateLimiting` field
**only when quotas cannot count**, naming what is missing. The deploy workflow
checks both and warns on the second.

### Applying the schema

Nothing applies the DDL on boot any more, so it is applied from a terminal:

```bash
pnpm --filter @workspace/scripts run seed:academy --schema-only
```

Without it the tables do not exist, the database-backed routes answer `503`, and
the academy falls back to its bundled content — which means a missing schema is
invisible to a visitor and equally invisible to whoever deployed it.

### Seeding the academy content

The three collections — question bank, coding challenges, lecture series — live in the client's
TypeScript sources and are extracted from there. Regenerate, then apply:

Put the database password in `.env.local` — that file is git-ignored, unlike `.env`, which
this repository commits on purpose for public build-time config:

```
SUPABASE_DB_PASSWORD=…
```

It is the only value you have to supply. The host and role come from `server/app/config.py`,
so the seed lands in the database the API reads.

```bash
# 1. Extract from the TS sources and generate the SQL. Re-run both after any
#    content edit; the generated files are committed, and drift is silent.
pnpm --filter @workspace/scripts exec tsx src/extract-academy-content.ts
pnpm --filter @workspace/scripts exec tsx src/generate-academy-seed-sql.ts

# 2. Apply the schema, apply the seed, then count what landed.
pnpm --filter @workspace/scripts run seed:academy
```

`seed:academy` uses `psql` when it is installed and the same client out of a container when it
is not, so Docker is enough. The password goes through the environment, never the command
line, and a password found in a git-tracked file is refused rather than used. `--schema-only`,
`--seed-only` and `--check` (count and stop) narrow what it does.

`DATABASE_URL` overrides the composed connection. Use the **session pooler on 5432**, not the
transaction pooler on 6543: the seed is one long transaction ending in `setval` calls.

Without a terminal at all, paste `academy-schema.sql` into the Supabase SQL editor, then the 38
`seed-chunk-*.sql` files in order — they exist because the editor rejects a single statement
list this long.

What each step is for, and what breaks without it:

| | Why it matters |
|---|---|
| `academy-schema.sql` | Nothing else creates these tables. It also grants `select` to `anon` and adds a read policy — the API reads with the anon key, so without both the tables are full and every response is empty |
| identity columns | The seed's last six lines call `setval('<table>_id_seq', …)` so a hand-added row cannot collide with a seeded id. Plain `bigint` columns have no sequence, and those calls abort the whole transaction |
| `academy-seed.sql` | 150 question items, 80 coding challenges and 40 lecture items, in both languages |

`tests/unit/contentSchema.spec.ts` holds the schema, the seed and `content_store.py` to the
same column names — a rename in one of the three is otherwise reported as a `503` that reads
like an outage.

An empty or unavailable store is reported as a controlled `503`, not as fabricated content, and
the academy falls back to its bundled copy of the same content — so a missing seed is invisible
to a visitor and equally invisible to whoever deployed it.

Configure Stripe to send events to `https://<app>.fly.dev/api/stripe/webhook`. The webhook
secret is verified against the raw request body. Stripe credentials are read only from the
backend host's `STRIPE_*` secret environment; there is no Replit connector fallback.

Configure Stripe to send events to
`https://learn-practice-work.vercel.app/api/stripe/webhook`. The webhook secret
is verified against the raw request body.

Cold starts are worth a thought here and not much more: Stripe retries a
delivery that times out, and the webhook is idempotent. Fluid Compute keeps
instances warm between requests, so a webhook arriving during any normal traffic
does not pay a cold start at all.

Checkout ignores client price IDs, requires affirmative terms acceptance, uses
automatic local payment methods and tax calculation, and records entitlement
only when the signed webhook's price, product, amount, currency, course SKU and
terms version all match. Before enabling paid sales, configure and verify all of
the following, then change `SALES_ENABLED` to `true` — and move off the Hobby
plan:

- `STRIPE_COURSE_PRICE_ID`, `STRIPE_COURSE_PRODUCT_ID`, `STRIPE_COURSE_AMOUNT`
  and `STRIPE_COURSE_CURRENCY` for one approved Stripe catalog entry;
- `STRIPE_TAX_ENABLED=true`, with Stripe Tax and the relevant registrations
  configured in the Stripe account;
- `BUSINESS_LEGAL_NAME`, `BUSINESS_POSTAL_ADDRESS`, `BUSINESS_SUPPORT_EMAIL`;
- `PUBLIC_APP_ORIGIN`, matching an entry in `ALLOWED_ORIGINS`.

`PURCHASE_RETENTION_DAYS` defaults to 2,922 days. Set it to the accounting and
consumer-law period confirmed for the selling entity; expired purchase rows are
removed during database startup.

## The origin moved

The canonical home is `https://learn-practice-work.vercel.app`. It used to be a
`*.replit.app` origin, and moving it meant editing URLs that were already
indexed — a decision rather than a cleanup, taken deliberately.

Three mount points differ between the old host and this one, so it was not a
find-and-replace:

| App | Was | Is |
|---|---|---|
| Academy | `/ai-testing-academy/` | `/` — it is the site |
| Portfolio | `/` | `/portfolio/` |
| Decks | `/ai-testing-lecture-N/` | unchanged |

That covers `canonical`, `og:url`, `twitter:image`, the JSON-LD `@id`s, the
`hreflang` clusters, `sitemap.xml` and `robots.txt` in each app, plus
`DEFAULT_SITE_ORIGIN` in `artifacts/ai-testing-academy/src/lib/lectures.ts` —
the fallback for the twenty lecture links, so a build that forgets
`VITE_SITE_ORIGIN` still points at the live site. `tests/unit/hreflang.spec.ts`
holds the markup and the sitemaps to the same URLs.

Two things live outside this repository and do not follow a deployment:

1. **The Google OAuth client** must authorize
   `https://learn-practice-work.vercel.app`, or sign-in fails on an origin
   Google has never heard of.
2. **Stripe's webhook endpoint** must be the Vercel URL.

### Retiring the old hosts

Neither shuts down by deleting a file, and neither is load-bearing any more:

- **Fly** — `ata-api.fly.dev` no longer resolves; the app is already gone.
  `server/fly.toml` has been removed, because a config for an application that
  does not exist is worse than no config at all.
- **Replit** — still serving at the old origin. Stop the deployment in the
  Replit dashboard when you are satisfied with this one. The `.replit` and
  `.replit-artifact/` files are left in the tree on purpose: they describe the
  development environment as well as the deployment, and removing them is a
  separate decision from changing where the site is hosted.

Keep the Replit deployment up long enough to redirect from it — the old URLs are
indexed, and a 301 is what moves that ranking rather than discarding it.

### Repository variables

Three are read by the deploy workflow:

| Variable | Effect |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Inlined into the academy bundle at build time; sign-in renders nothing without it. An OAuth client **ID** is public by construction — a client *secret* must never appear here |
| `VERCEL_SITE_ORIGIN` | Sets `VITE_SITE_ORIGIN` for the twenty lecture links. Unset, they fall back to `DEFAULT_SITE_ORIGIN`, which now names this deployment |
| `GRAFANA_URL` | Links the dashboard from CI runs |

`API_ORIGIN` is gone. It named the host `/api/*` was proxied to; there is no
proxy now.

## Grafana and test history

`monitoring/compose.yaml` provisions Grafana, Prometheus, Pushgateway, a secretless local API,
and the Python server-probe service. See `monitoring/README.md` for local startup and production
settings. GitHub Actions publishes Allure history through Python when `PUSHGATEWAY_URL` is set,
and links the dashboard when the public `GRAFANA_URL` repository variable is set. The dashboard
also groups login and server-proxied AI usage by approximate country, pseudonymous user, and
desktop/iOS/Android client. Metrics never contain names, emails, IPs, prompts, responses, or
credentials; browser BYOK traffic is intentionally outside server monitoring.

### The image

`server/Dockerfile`, not the one at the repository root — that one
builds the Playwright test image and its `CMD` runs the suite.

Nothing deploys from this image any more; the API ships as a Vercel function.
It is still what `monitoring/compose.yaml` builds the local API and the probe
service from, and it is the one reproducible way to run the API in a container.

The multi-stage image uses uv's locked install, copies only the Python application and virtual
environment into the runtime stage, and runs Uvicorn as a non-root `app` user. Node and pnpm are
not part of the API runtime image.

## Moving the decks to a new origin

The lecture links are derived, not stored: `lectures.ts` holds a deck number and
`lectureHref()` builds the URL from a configurable origin. Set
`VITE_SITE_ORIGIN` to move all twenty at once:

```bash
VITE_SITE_ORIGIN=https://example.com \
  pnpm --filter @workspace/ai-testing-academy run build
```

Set it for the prerender generator too — it reads the same name from
`process.env`, because it runs under Node where `import.meta.env` does not
exist. Set one and not the other and the crawler-facing shell will disagree with
the rendered page about where a lecture lives.

The cybersecurity track keeps explicit `url` values, because those lectures are
hosted on gamma.site and are not ours to move.

Moving the canonical home is more than this variable: it means the `canonical`,
`og:url` and `hreflang` tags in each app's `index.html`, its `sitemap.xml` and
`robots.txt`, and `DEFAULT_SITE_ORIGIN`. See "The origin moved" above for the
full list and for the mount points that differ between hosts.
