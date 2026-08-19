# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Tests**: Playwright — unit, component, API, contract and e2e (`tests/`)
- **Lint**: ESLint 10 flat config (`eslint.config.mjs`) + Prettier for formatting
- **Reporting**: Allure 3 (`allure-report/`, one report across all five layers)
- **CI**: GitHub Actions — tests on every push/PR, nightly at 05:00 Israel time, and
  GitHub Pages publishing from `main`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run lint` — ESLint across the workspace (`lint:fix` to apply fixes)
- `pnpm run build` — typecheck + lint + build all packages
- `./run-all-tests.sh` — every layer plus the Allure report; does **not** fail fast
- `pnpm run test` — every layer in order (stops at the first failure)
- `pnpm run test:unit` / `test:component` / `test:api` / `test:contract` / `test:e2e` — one layer
- `docker compose run --rm tests` — the whole suite in a container, reports on the host
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Server environment

`artifacts/api-server` reads these. Everything except `PORT` is optional, and each one that is
absent disables a feature rather than breaking the server — which is what lets the suite run
three differently-configured instances side by side.

| Variable | Effect when set | Effect when absent |
| --- | --- | --- |
| `PORT` | The port to listen on | The server refuses to start |
| `DATABASE_URL` | Stripe sync and purchase records work | Both are skipped; `/api/entitlements/*` answers 503 |
| `GEMINI_API_KEY` | `/api/ai/generate` proxies with a server-held key | The route answers 503 and the client offers BYOK |
| `ADMIN_API_TOKEN` | `POST /api/stripe/seed` accepts `Authorization: Bearer <token>` | The route answers 404 — it fails closed, never open |
| `GOOGLE_CLIENT_ID` | Google ID tokens are verified server-side | Sign-in-backed routes answer 503 |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowlist | Only same-origin and Replit-domain requests |
| `TRUST_PROXY_HOPS` | Proxy hops to trust in production | Defaults to 1 |

`GOOGLE_CLIENT_ID` must be the same OAuth client the academy is built with as
`VITE_GOOGLE_CLIENT_ID`; the server compares it against the token's `aud` claim.

`ADMIN_API_TOKEN` is a secret you choose — any long random string. Rotate it by setting a new
value; there is nothing else to update.

### Purchases

`checkout.session.completed` webhooks write a row into `course_purchases` (see
`lib/db/src/schema/coursePurchases.ts`), which is what ties a Stripe payment to a person.
`GET /api/entitlements/course` reads it back for the caller's verified Google identity.

**TODO — the table has not been created anywhere yet.** It needs a live `DATABASE_URL` and one
run of the command below, which is also what to run after any later change to that schema:

```bash
pnpm --filter @workspace/db run push
```

Until that runs, the server degrades rather than failing: a completed checkout logs a warning
instead of writing a row, and `/api/entitlements/course` answers 503 rather than guessing.

Note that no UI calls `POST /api/stripe/checkout` yet — the route and the record it produces
are in place, but the purchase flow itself is still to be built.

## Testing

`tests/` is one workspace package holding all five layers. The Playwright runner is used
throughout — the unit project executes TypeScript in Node without launching a browser.

| Layer | Runs in | Covers |
| --- | --- | --- |
| `tests/unit` | Node | Pure logic in `artifacts/ai-testing-academy/src/lib` |
| `tests/component` | Chromium, desktop + mobile (Playwright CT) | Real React components, mounted and driven |
| `tests/api` | Node → live server | `artifacts/api-server` over HTTP |
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

- **api / contract** — three `api-server` instances via `tests/support/start-api-servers.ts`
  (ports 8788, 8789 and 8790). One has no Gemini key, one has a throwaway key that only ever
  receives invalid requests, and one has a deliberately tiny quota for the rate-limit spec, so
  no test can reach a model vendor. The keyed instance also carries a test `ADMIN_API_TOKEN`
  and `GOOGLE_CLIENT_ID` so the authenticated branches are reachable, while the keyless one
  carries neither and exercises the "not configured" branches. All start with `DATABASE_URL`
  and the Replit connector variables blanked, so the suite does not depend on the developer's
  shell.
- **e2e** — the academy's own Vite dev server on port 5273 with `BASE_PATH=/`. Its `/api`
  proxy has nothing behind it, so Connection Setup falls back to bring-your-own-key, which is
  the state these UI flows exercise.

The root config is `.mts` on purpose: the repo root has no `"type": "module"`, so a `.ts`
config there would load as CJS while the specs under `tests/` load as ESM, and a module shared
between the two fails to link.

### Reports

All five layers write Allure results into one `allure-results/` at the repo root, so a single
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

The image is pinned to `linux/amd64` deliberately. `pnpm-workspace.yaml`'s `overrides` strip
every platform-native optional dependency except the linux-x64-gnu ones, so an arm64 image
would be missing `@rollup/rollup-linux-arm64-gnu` and the academy's Vite server — and with it
the e2e layer — would not boot. Chromium also needs a roomy `/dev/shm`; compose sets
`shm_size: 1gb`, and a plain `docker run` needs `--shm-size=1g`.

### Known gap

`pnpm run typecheck` currently fails in `artifacts/api-server` and `scripts` — pre-existing
errors unrelated to the tests. CI typechecks everything else; see the comment in `ci.yml`.

## Deployment

Two targets from the same build:

- **Replit** — `.replit-artifact/artifact.toml` per artifact. The site and `api-server` share
  one origin, so relative `/api` calls work.
- **GitHub Pages** — `.github/workflows/ci.yml` publishes from `main`: the portfolio at the
  site root, `ai-testing-academy/` and `ai-testing-lecture-1/` beneath it, and
  `architecture.html` alongside. Static only, so the academy's AI panel falls back to
  bring-your-own-key. The Allure report is **not** part of this site — it is published to its
  own reports repository, with its own Pages URL.

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
