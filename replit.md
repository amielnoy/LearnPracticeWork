# Workspace

## Overview

pnpm workspace monorepo with TypeScript clients and tooling plus a Python API. JavaScript
packages use pnpm; `server` uses uv and keeps a pnpm package only as a workspace command adapter.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Python**: 3.12+ with uv and a committed `server/uv.lock`
- **API framework**: FastAPI + Uvicorn, with a Scalar interactive API reference
- **Database**: PostgreSQL through psycopg; Supabase REST for localized content
- **Validation**: Pydantic on the API, Zod (`zod/v4`) in generated TypeScript clients
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: Vite clients; Python bytecode/Docker validation for the API
- **Tests**: pytest fixtures for the backend; Playwright unit, component, API, contract and e2e
- **Lint**: ESLint + Prettier for TypeScript; Ruff for Python
- **Reporting**: Allure 3 (`allure-report/`, one report across all six layers)
- **CI**: GitHub Actions — tests on every push/PR, nightly at 05:00 Israel time, and
  GitHub Pages publishing from `main`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run lint` — ESLint across the workspace (`lint:fix` to apply fixes)
- `pnpm run build` — typecheck + lint + build all packages
- `./run-all-tests.sh` — every layer plus the Allure report; does **not** fail fast
- `pnpm run test` — Python fixtures, then every Playwright layer (stops at the first failure)
- `pnpm run test:unit` / `test:component` / `test:api` / `test:contract` / `test:e2e` — one layer
- `docker compose run --rm tests` — the whole suite in a container, reports on the host
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

With the API running, Scalar is available at <http://localhost:8787/api/docs> and the runtime
OpenAPI JSON at <http://localhost:8787/api/openapi.json>. Scalar does not enable its agent,
telemetry, proxy, remote fonts, or credential persistence. On Replit, both paths use the same
secretless relay as the rest of `/api` and are actually served by Fly.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Server environment

`server` reads these. The API starts without optional integrations; a route whose dependency
is absent fails closed with a controlled 4xx/5xx response. The package scripts default `PORT`.

| Variable | Effect when set | Effect when absent |
| --- | --- | --- |
| `PORT` | The port to listen on | `dev` uses 8787; `start` uses 8080 |
| `DATABASE_URL` | Stripe sync and purchase records work | Both are skipped; `/api/entitlements/*` answers 503 |
| `SUPABASE_DB_PASSWORD` | Builds this project's pooled Postgres URL when `DATABASE_URL` is absent | No database unless `DATABASE_URL` is set |
| `SUPABASE_URL` + `SUPABASE_ANON_KEY` | Localized content routes can read Supabase REST | Content routes answer 503 |
| `GROQ_API_KEY` | General AI proxy uses Groq | General generation answers 503 and the client offers BYOK |
| `GEMINI_API_KEY` | `/api/ai/generate` proxies with a server-held key | The route answers 503 and the client offers BYOK |
| `ADMIN_API_TOKEN` | `POST /api/stripe/seed` accepts `Authorization: Bearer <token>` | The route answers 404 — it fails closed, never open |
| `GOOGLE_CLIENT_ID` + `SESSION_SECRET` | Google tokens are verified and exchanged for signed HttpOnly sessions | Sign-in answers 503; protected routes stay closed |
| `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` | Stripe API and signed webhooks | Stripe routes fail closed; there is no connector fallback |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist | Only same-origin and Replit-domain requests |
| `UPSTREAM_API_BASE_URL` | Secretless Replit API artifact relays `/api/*` to Fly | FastAPI handles routes locally |
| `METRICS_TOKEN` | Protects production `/metrics` scrapes | Metrics are available only outside production |
| `METRICS_ID_SALT` | HMAC-pseudonymizes user labels in metrics | Authenticated users are labeled `redacted` |
| `TRUSTED_PROXY_HOPS` | How many rightmost `X-Forwarded-For` entries the platform appends, so the caller can be read past them | Defaults to 1. Too high trusts an entry the caller forged; too low keys everyone behind one proxy to the same quota |
| `RATE_LIMIT_SALT` | Production quotas are counted in Postgres | **In production every rate-limited route refuses every caller with 429** — sign-in, the AI proxy and the admin seed route. `METRICS_ID_SALT` is accepted instead. `/api/readyz` names it in a `rateLimiting` field |

### API structure

`server/app/main.py` is a composition root and nothing else: it builds the app, installs CORS,
the two middleware layers and the error handlers, and mounts the routers. Behaviour lives in
the module that owns it.

| Module | Holds |
| --- | --- |
| `routes/{ops,auth,content,ai,commerce,entitlements}.py` | One `APIRouter` each; HTTP shape only |
| `routes/__init__.py` | `ROUTERS` — the mount list, so `create_app` never changes |
| `dependencies.py` | Every `Depends` provider, plus the four shared rate limiters |
| `ai_gateway.py` | One strategy object per AI provider, and the proxy that dispatches to it |
| `content_store.py` | Supabase reads, and the `NestedCollection` specs the content routes are built from |
| `commerce.py` | Checkout, catalogue seeding, prices and the Stripe webhook |
| `catalog.py` | The one course this deployment may sell, or `None` |
| `entitlements.py` | Whether a verified identity has bought it |
| `origins.py` | Which origins a redirect may point at |
| `errors.py` | `ServiceError`, rendered by a single handler |
| `schemas.py` · `settings.py` | Request bodies; deployment-wide limits |

Two consequences worth knowing before editing:

- **Adding an AI provider** is a class in `ai_gateway.py` plus an entry in `PROVIDERS`.
  Dispatch, `/api/ai/config` and the routes all follow from the registry.
- **An ordinary request falls through to the next provider** when the first answers 429 or
  5xx — a provider saying "not me, not now". A 4xx below that is the request being wrong, so
  it is not retried elsewhere. A grounded request has no fallback: search grounding is why it
  chose that provider. The outcome names whoever answered, so metrics stay truthful.
- **Tests substitute collaborators through `app.dependency_overrides`**, not by patching module
  globals. `server/tests/conftest.py` exposes `override_dependency` for this.

`GOOGLE_CLIENT_ID` is returned publicly by `/api/auth/config` and compared against the Google
token's `aud` claim. A build-time `VITE_GOOGLE_CLIENT_ID` still works but is optional.

`ADMIN_API_TOKEN` is a secret you choose — any long random string. Rotate it by setting a new
value; there is nothing else to update.

### Purchases

`checkout.session.completed` webhooks write a row into `course_purchases`, which is what ties a
Stripe payment to a person. FastAPI creates the table and indexes idempotently at startup when a
database is configured; `lib/db/src/schema/coursePurchases.ts` remains the TypeScript schema used
by repository tooling.
`GET /api/entitlements/course` reads it back for the caller's verified Google identity.

Without a database the server degrades rather than guessing: webhooks cannot persist purchases
and `/api/entitlements/course` answers 503.

Note that no UI calls `POST /api/stripe/checkout` yet — the route and the record it produces
are in place, but the purchase flow itself is still to be built.

## Testing

The backend has its own pytest fixture layer. `tests/` holds the Playwright layers; its unit
project executes TypeScript in Node without launching a browser.

| Layer | Runs in | Covers |
| --- | --- | --- |
| `server/tests` | Python + pytest | Google signature rules, sessions, Scalar/OpenAPI, monitoring, deployment fixtures, and each service module on its own — AI providers, the content store, the course catalogue, commerce rules and redirect origins |
| `tests/unit` | Node | Pure logic in `artifacts/ai-testing-academy/src/lib` |
| `tests/component` | Chromium, desktop + mobile (Playwright CT) | Real React components, mounted and driven |
| `tests/api` | Node → live server | `server` over HTTP |
| `tests/contract` | Node → live server | `openapi.yaml` ↔ generated Zod ↔ the running server |
| `tests/e2e` | Chromium, desktop + mobile | The academy app on its own Vite server, via page objects |

Three configs, because component and e2e testing each need their own runner setup:

| Config | Projects |
| --- | --- |
| `playwright.config.mts` (repo root) | `unit`, `api`, `contract` |
| `tests/playwright-ct.config.ts` | `component-desktop`, `component-mobile` |
| `tests/playwright-e2e.config.ts` | `e2e-desktop`, `e2e-mobile` |

Browsers are downloaded once:

```bash
pnpm --filter @workspace/tests run test:browsers
```

Every config starts whatever server it needs, so nothing has to be running first:

- **api / contract** — three FastAPI/Uvicorn instances via `tests/support/start-api-servers.ts`
  (ports 8788, 8789 and 8790). One has no Gemini key, one has a throwaway key that only ever
  receives invalid requests, and one has a deliberately tiny quota for the rate-limit spec, so
  no test can reach a model vendor. The keyed instance also carries a test `ADMIN_API_TOKEN`
  and `GOOGLE_CLIENT_ID` so the authenticated branches are reachable, while the keyless one
  carries neither and exercises the "not configured" branches. All start with database,
  Supabase, Stripe and session variables blanked, so the suite does not depend on the
  developer's shell.
- **e2e** — the academy's own Vite dev server on port 5273 with `BASE_PATH=/`. Its `/api`
  proxy has nothing behind it, so Connection Setup falls back to bring-your-own-key, which is
  the state these UI flows exercise.

The root config is `.mts` on purpose: the repo root has no `"type": "module"`, so a `.ts`
config there would load as CJS while the specs under `tests/` load as ESM, and a module shared
between the two fails to link.

### Reports

All six layers write Allure results into one `allure-results/` at the repo root, so a single
report covers the whole run:

```bash
pnpm run report:allure         # generate allure-report/index.html (single file)
pnpm run report:allure:serve   # generate and open it
```

Allure 3 is a plain Node CLI — no JVM. The e2e config keeps a screenshot, a video and a trace
on failure, and Allure picks those up as attachments. CI generates the report, uploads it
alongside the raw results and the Playwright HTML report, and the `publish-allure` job
force-pushes it to a **separate reports repository's** `gh-pages` branch (via the
`ALLURE_PAGES_TOKEN` secret and the `ALLURE_PAGES_REPO` variable), so the report gets its own
Pages URL and never lands on the portfolio site. That repository keeps its own Pages workflow
on `main`, so publishing to `gh-pages` cannot delete the workflow that deploys it — which is
why the job then dispatches a `report-published` event to trigger the deployment.

### Docker

`Dockerfile` + `docker-compose.yml` run the whole suite in the official Playwright image,
pinned to the workspace's Playwright version so the browsers match the specs:

```bash
docker compose run --rm tests
```

The image is pinned to `linux/amd64` to match the official Playwright browser image. Chromium
also needs a roomy `/dev/shm`; compose sets `shm_size: 1gb`, and a plain `docker run` needs
`--shm-size=1g`.

### Known gap

`pnpm run typecheck` covers the whole workspace and passes. It used to fail in `server` and
`scripts`, and CI carried exclusions for both; they compile clean now, so the exclusions are
gone and the CI step is the plain script again. `pnpm run lint` and `pnpm run format:check`
are also CI gates now — they were defined here but invoked nowhere, which is precisely where
the repository drifted: typecheck stayed clean because it was enforced, while lint reached 32
errors and 590 files fell off the Prettier config.

## Deployment

Static and API are deployed separately, because only one of them costs anything to run.
`deploy/README.md` is the runbook; the summary:

- **Replit** — `.replit-artifact/artifact.toml` per artifact. No production secret belongs in
  Replit. The API artifact relays same-origin `/api/*` requests to Fly over HTTPS, preserving
  first-party login cookies and Stripe request bodies without storing provider credentials.
- **GitHub Pages** — `.github/workflows/ci.yml` publishes from `main`: the portfolio at the
  site root, `ai-testing-academy/` and **all ten** `ai-testing-lecture-N/` beneath it, and
  `architecture.html` alongside. Static only, so the academy's AI panel falls back to
  bring-your-own-key. The Allure report is **not** part of this site — it is published to its
  own reports repository, with its own Pages URL.
- **Cloudflare Pages** — the same artifact, unchanged. `deploy/cloudflare/_redirects` and
  `_headers` are copied into the site root by the same job and Pages ignores both. The reason
  to prefer it is rewrites: every app here is a single-page app, and GitHub Pages has no
  rewrite rules, so a deep link like `/ai-testing-lecture-3/slide5` is served through the
  nearest `404.html` — the right page carrying a 404 status, on URLs the academy's own
  hreflang tags nominate for indexing.
- **Fly.io** — `server/{Dockerfile,fly.toml}` for the Python API. It keeps one machine running
  rather than scaling to zero so the Stripe webhook endpoint stays warm. This used to be about
  the quota as well, and no longer is: in production `SharedRateLimiter` counts in atomic
  Postgres rows, so an allowance survives a restart and is shared across workers. Without
  `DATABASE_URL` and a salt it fails closed rather than falling back to memory — the in-memory
  limiter is the local and test path only.
- **Grafana** — `monitoring/compose.yaml` provisions Grafana, Prometheus, Pushgateway and the
  Python uptime probe. The local test runner prints its dashboard URL; Actions links the public
  dashboard when `GRAFANA_URL` is configured and publishes history when its Pushgateway secrets
  are configured. Login and server-proxied AI panels use only approximate country, derived
  client type, and HMAC-pseudonymous users; they do not export identity, IP, prompt, response,
  token, or key data. Keep both `METRICS_TOKEN` and `METRICS_ID_SALT` on Fly, never Replit.

  Publishing runs **even when the test job fails** — that is when the Allure report is most
  worth reading. The site job overrides the skip-on-failed-dependency default with
  `!cancelled()`, and the deploy job gates only on the site having built. The run itself still
  goes red, so a failure is never hidden; note that this also means a red build publishes the
  site, not just the report.

The workflow enables Pages itself: `actions/configure-pages` runs with `enablement: true` and
the `pages: write` permission, so the first run on `main` turns it on. Without that step the
whole pipeline goes green and only the final deploy fails, with a bare `404` from the Pages
API. The base path also comes from that step rather than being assumed, so a custom domain or
a user/org site — both served from the root — does not break every asset URL.

If automatic enablement is refused (some org policies disallow it), set it once by hand under
repository **Settings → Pages → Source: GitHub Actions**.
