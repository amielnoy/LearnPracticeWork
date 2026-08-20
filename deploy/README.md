# Deploying

The repository is two deployables with very different shapes, and they are
hosted separately because they cost very different amounts.

| | What it is | Where it goes | Cost |
|---|---|---|---|
| Static | 12 Vite SPAs — portfolio, academy, 10 lecture decks | GitHub Pages (wired) or Cloudflare Pages | $0 |
| API | One FastAPI server: auth, AI proxy, content, Stripe, entitlements | Fly.io | ~$2–5/month |
| Database | Postgres | Supabase | $0 on the free tier |
| Monitoring | Python metrics/probes, Prometheus, Pushgateway, Grafana | Private host or managed equivalents | Depends on host |

## Static

CI already does this. The `build-pages` job in `.github/workflows/ci.yml` builds
all twelve apps, assembles them into `_site`, and `deploy-pages` publishes to
GitHub Pages on every push to `main`.

Each app gets a `BASE_PATH` matching where it is mounted, because Vite bakes it
into every asset URL. The job derives the prefix from what the Pages API
reports rather than hardcoding `/<repo>`, so a custom domain does not break
every asset link.

To reproduce it locally:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/portfolio run build
PORT=5174 BASE_PATH=/ai-testing-academy/ pnpm --filter @workspace/ai-testing-academy run build
for n in $(seq 1 10); do
  PORT=$((5174 + n)) BASE_PATH="/ai-testing-lecture-${n}/" \
    pnpm --filter "@workspace/ai-testing-lecture-${n}" run build
done
```

### Moving to Cloudflare Pages

The artifact is already portable — `_redirects` and `_headers` ship inside it
and GitHub Pages ignores both. Point a Pages project at this repo with:

- Build command: the three commands above
- Output directory: `_site`

The reason to bother is rewrites. GitHub Pages has no rewrite rules, so a deep
link like `/ai-testing-lecture-3/slide5` is served through the nearest
`404.html` — it works, but the response is a 404 status carrying the right
page, which is not what you want on URLs the academy's own hreflang tags
nominate for indexing. Cloudflare rewrites them properly at 200.

## API server

Fly runs the Python API. Production burst, daily, login and admin quotas are stored atomically
in Postgres using HMAC-pseudonymized identifiers, so workers and restarts share one allowance.
The production API fails closed if the database or rate-limit salt is unavailable. Stripe
webhooks still benefit from a warm endpoint because a cold start inside a delivery timeout
becomes a retry at best.

The same API also serves the academy's localized content at
`/api/content/question-bank`, `/api/content/coding-challenges`, and
`/api/content/lecture-series`. Each accepts the optional `lang=en|he` query parameter,
reads ordered rows from Supabase with the read-only `SUPABASE_ANON_KEY`, and returns `503`
with a fixed error body when the content store is unavailable. The academy currently renders
bundled content, so these routes can be deployed independently while the client migration is
completed.

Interactive API documentation is served by Scalar at `/api/docs`; its runtime FastAPI document
is available at `/api/openapi.json`. Scalar's agent, telemetry, remote proxy, credential
persistence, and remote fonts are disabled. The browser bundle is version-pinned, and requests
from the interactive console go directly to this API origin.

`fly.toml` therefore sets `min_machines_running = 1` and leaves
`auto_stop_machines` off — a warm endpoint for Stripe webhooks.

The quota no longer depends on that. In production `app/rate_limit.py` counts in atomic
Postgres rows keyed by an HMAC digest, so allowances are shared across workers and survive a
restart; it needs `DATABASE_URL` (or `SUPABASE_DB_PASSWORD`) plus `RATE_LIMIT_SALT` — or
`METRICS_ID_SALT` — and **fails closed** without them rather than falling back to memory. The
in-memory limiter runs only when `NODE_ENV` is not `production`.

### First deploy

```bash
fly launch --no-deploy --config server/fly.toml \
  --dockerfile server/Dockerfile

fly secrets set \
  GROQ_API_KEY=... \
  GEMINI_API_KEY=... \
  GOOGLE_CLIENT_ID=... \
  SESSION_SECRET=... \
  RATE_LIMIT_SALT=... \
  SUPABASE_DB_PASSWORD=... \
  SUPABASE_URL=... \
  SUPABASE_ANON_KEY=... \
  STRIPE_SECRET_KEY=... \
  STRIPE_WEBHOOK_SECRET=...

fly deploy --config server/fly.toml \
  --dockerfile server/Dockerfile .
```

The trailing `.` matters because it is the Docker build context. The image installs uv, syncs
the locked Python dependencies, copies `server/app`, and runs Uvicorn as a non-root user.

`RATE_LIMIT_SALT` is not optional, and it is the one whose absence is easiest to miss. In
production every quota is counted in Postgres keyed by an HMAC of the caller's identity, and
without a salt there is no key — so `SharedRateLimiter` fails closed and **every rate-limited
route refuses every caller**: Google sign-in, the AI proxy, and the admin seed route. The
refusal is a `429`, which reads to a visitor exactly like a quota they have exhausted. Any long
random string works, and `METRICS_ID_SALT` is accepted in its place.

Verify that `curl https://<app>.fly.dev/api/healthz` returns `{"status":"ok"}` and
`/api/readyz` reports the database available **and carries no `rateLimiting` field** — that
field appears only when quotas cannot count, and names what is missing. Then open
`https://<app>.fly.dev/api/docs` and confirm Scalar loads the runtime OpenAPI document.

The current `server/fly.toml` names the app `ata-api`. Create or rename that Fly application
before pointing the Replit relay at it; the public hostname must resolve and its health check
must pass.

### Environment

Set in `fly.toml` (not secret):

| Variable | Why |
|---|---|
| `PORT` | Uvicorn's listening port; the package start command defaults to 8080 |
| `ALLOWED_ORIGINS` | CORS allowlist — every origin serving the static site |

Set via `fly secrets` (never committed): `GROQ_API_KEY`, `GEMINI_API_KEY`,
`GOOGLE_CLIENT_ID`, a random `SESSION_SECRET` of at least 32 characters,
`SUPABASE_DB_PASSWORD`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY`, and
`STRIPE_WEBHOOK_SECRET`.

Also set long, independent random `METRICS_TOKEN` and `METRICS_ID_SALT` values with
`fly secrets set`. Prometheus supplies the token as a bearer token when scraping `/metrics`;
production returns 404 without it. The salt HMAC-pseudonymizes verified user IDs for Grafana
and must remain only on Fly.

Before enabling paid sales, configure and
verify all of the following, then change `SALES_ENABLED` to `true`:

- `STRIPE_COURSE_PRICE_ID`, `STRIPE_COURSE_PRODUCT_ID`, `STRIPE_COURSE_AMOUNT`, and
  `STRIPE_COURSE_CURRENCY` for one approved Stripe catalog entry;
- `STRIPE_TAX_ENABLED=true`, with Stripe Tax and the relevant Indian/Israeli registrations
  configured in the Stripe account;
- `BUSINESS_LEGAL_NAME`, `BUSINESS_POSTAL_ADDRESS`, and `BUSINESS_SUPPORT_EMAIL`; and
- `PUBLIC_APP_ORIGIN`, which must exactly match an entry in `ALLOWED_ORIGINS`.

`PURCHASE_RETENTION_DAYS` defaults to 2,922 days. Set it to the accounting/consumer-law period
confirmed for the selling entity; expired purchase rows are removed during database startup.

Checkout ignores client price IDs, requires affirmative terms acceptance, uses automatic local
payment methods and tax calculation, and records entitlement only when the signed webhook's
price, product, amount, currency, course SKU, and terms version all match. Keep sales disabled
until local counsel/tax advice confirms the displayed identity, cancellation, invoice, GST and
VAT treatment for the selling entity.

`SUPABASE_URL` and `SUPABASE_ANON_KEY` are required for the content endpoints. Generate the
content seed SQL with:

```bash
pnpm --filter @workspace/scripts exec tsx src/extract-academy-content.ts
pnpm --filter @workspace/scripts exec tsx src/generate-academy-seed-sql.ts
```

Apply the generated SQL to the Supabase database before switching a client to the API; an
empty or unavailable store is reported as a controlled `503`, not as fabricated content.

Configure Stripe to send events to `https://<app>.fly.dev/api/stripe/webhook`. The webhook
secret is verified against the raw request body. Stripe credentials are read only from the
backend host's `STRIPE_*` secret environment; there is no Replit connector fallback.

## Replit domains without Replit secrets

The static applications and their existing `*.replit.app` paths remain deployable through the
committed `.replit-artifact/artifact.toml` files. The Replit API artifact is a secretless,
same-origin relay: `UPSTREAM_API_BASE_URL=https://ata-api.fly.dev` forwards `/api/*` to Fly,
while `/api/healthz` stays local so Replit can check the relay process itself.

This preserves first-party `SameSite=Lax` login cookies on the Replit domain. It also forwards
Stripe signature headers and raw webhook bodies unchanged. Google/session, Stripe, Supabase,
AI, admin, database, and metrics secrets exist only on Fly. Before publishing Replit, verify:

1. the Fly hostname resolves and `/api/healthz` returns 200;
2. Fly's `ALLOWED_ORIGINS` contains the exact Replit origin;
3. the Google OAuth client authorizes the exact Replit origin; and
4. Stripe sends webhooks to the Fly URL, not to the relay.

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

The multi-stage image uses uv's locked install, copies only the Python application and virtual
environment into the runtime stage, and runs Uvicorn as a non-root `app` user. Node and pnpm are
not part of the API runtime image.

## Moving the decks to a new origin

The lecture links used to be twenty absolute URLs pinned to
`free-tier-insights--amielpeled.replit.app`, one per lecture per language. They
are derived now: `lib/lectures.ts` stores a deck number, and `lectureHref()`
builds the URL from a configurable origin.

Set `VITE_SITE_ORIGIN` to move all twenty at once:

```bash
VITE_SITE_ORIGIN=https://amielnoy.github.io/LearnPracticeWork \
  pnpm --filter @workspace/ai-testing-academy run build
```

Set it for the prerender generator too — it reads the same name from
`process.env`, because it runs under Node where `import.meta.env` does not
exist. Set one and not the other and the crawler-facing shell will disagree
with the rendered page about where a lecture lives.

Unset, it falls back to `DEFAULT_SITE_ORIGIN`, which is the origin the links
were already pinned to — so a build that does not set it is byte-identical to
one from before the change. The cybersecurity track keeps explicit `url`
values, because those lectures are hosted on gamma.site and are not ours to
move.

### Still pinned

Each deck's own `index.html` carries absolute `canonical`, `og:url` and
`hreflang` tags naming the Replit origin, and those are static HTML rather than
anything `VITE_SITE_ORIGIN` reaches. Moving the canonical home means editing
them — ten files — and it changes URLs that are already indexed, so it is a
decision rather than a cleanup. Do it together with the env var, not before:
links that point one way and canonicals that point another are worse than
either alone.
