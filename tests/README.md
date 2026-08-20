# @workspace/tests

Six Playwright layers plus a Python fixture layer. Playwright is used as a general test runner,
not only as a browser driver — the TypeScript unit project never opens a browser.

```
tests/
├── unit/        Node          pure logic from the academy's lib modules
├── component/   Chromium      real React components, mounted (Playwright CT)
├── api/         Node → HTTP   the live api-server
├── contract/    Node → HTTP   openapi.yaml ↔ generated Zod ↔ the live server
├── e2e/         Chromium      the real academy app, driven through page objects
│   ├── pages/                 one class per route (BasePage, HomePage)
│   └── components/            reusable fragments (NavComponent, HeroComponent)
├── deck/        Chromium      one lecture deck, really running
└── support/     fixtures, fakes, and the server launcher
server/tests/    pytest fixtures for Google verification, sessions, and integrations
```

## Running

```bash
./run-all-tests.sh        # everything + the Allure report, from the repo root
pnpm test                 # Python fixtures + Playwright, stopping at the first failure
pnpm test:unit            # Python fixtures + TS unit tests, no live server/browser
pnpm test:component       # needs a browser, see below
pnpm test:api
pnpm test:contract
pnpm test:e2e
```

`run-all-tests.sh` is the one to reach for when you want a report: unlike `pnpm test` it does
**not** fail fast, so every layer contributes to the Allure output even after one fails, and it
still exits non-zero if anything did. It typechecks first, because Playwright transpiles specs
without type-checking them — a type error in a spec runs fine locally and then fails CI. It calls the Playwright binaries directly out of
`node_modules`, so it behaves the same on a dev Mac (where corepack's pnpm is broken) and
inside the Docker image.

Browsers are downloaded once:

```bash
pnpm --filter @workspace/tests run test:browsers
```

Every config boots the servers it needs; nothing has to be running first.

## Configuration

| File | Covers |
| --- | --- |
| `../playwright.config.mts` | `unit`, `api`, `contract` |
| `playwright-ct.config.ts` | `component-desktop`, `component-mobile` |
| `playwright-e2e.config.ts` | `e2e-desktop`, `e2e-mobile` |
| `../playwright-merge.config.mts` | Merging the three into one HTML report |
| `playwright/index.{html,ts}` | The mount template component tests render into |
| `tsconfig.json` | The `@academy/*` and `@lib/*` path aliases |

Three configs, because component testing needs a bundler-backed runner and e2e needs the app's
own dev server. The root config is `.mts` deliberately — the repo root has no
`"type": "module"`, so a `.ts` config there loads as CJS while these specs load as ESM, and
`support/servers.ts` (imported by both) fails to link across that boundary.

The `@academy/*` alias is declared twice, in `tsconfig.json` for the type checker and in
`ctViteConfig` for the bundler. They have to agree.

## Reports

Two reports come out of a full run, both covering all six layers.

**Allure.** Every config appends its results to a single `allure-results/` at the repo root, so
one report covers the whole run however it was invoked:

```bash
pnpm run report:allure         # generate allure-report/index.html (single file)
pnpm run report:allure:serve   # generate and open it
```

Allure 3 is a plain Node CLI — no JVM needed.

**Playwright HTML.** Locally each config writes a *blob* instead of HTML, and
`run-all-tests.sh` merges the three into `playwright-report/`. Two details make that work, and
both are easy to break:

- Each config writes to its own `blob-report/<layer>/` subdirectory, because the blob reporter
  wipes its output directory on start and would otherwise delete the previous layer's archive.
  `merge-reports` does not recurse, so the script flattens them first — renaming as it goes,
  since all three archives are called `report.zip` and would otherwise overwrite each other.
  (That failure is silent: the merge succeeds and quietly reports one layer.)
- The merge needs `-c ../playwright-merge.config.mts`. The suites record different `testDir`
  values and Playwright refuses to merge across roots without a config naming the real one.

Under `CI=true` the configs write HTML directly and the merge step is skipped.

Both suites keep a screenshot, a video and a trace on failure; Allure attaches them to the
failing test. CI uploads the Allure report, the raw results and the Playwright HTML report as
artifacts, and the `publish-allure` job force-pushes the Allure report to a **separate reports
repository's** `gh-pages` branch, then dispatches a `report-published` event so that
repository's own Pages workflow — which lives on its `main` — packages and deploys it. This
happens **including when the tests fail**, which is when someone actually needs to read it, and
the report gets its own Pages URL and never touches the portfolio site. Every step in the test job
carries `if: !cancelled()` so a failure in one layer still leaves the others in the report.

## How the servers are set up

### api / contract

`support/start-api-servers.ts` syncs `server/uv.lock` once and starts three Uvicorn instances:

| Port | Configured with | Why |
| --- | --- | --- |
| 8788 | nothing — no Gemini key, no admin token, no OAuth client | `baseURL` for the api and contract projects. Every "not configured" branch runs here: `503` from the AI proxy, `404` from the seed route, `503` from entitlements |
| 8789 | a throwaway Gemini key, `ADMIN_API_TOKEN`, `GOOGLE_CLIENT_ID`, `SESSION_SECRET` | The branches behind configuration checks — request validation, bad admin auth, and bad Google credentials |
| 8790 | the same, with `AI_DAILY_QUOTA=2` | The rate-limit spec, which needs a quota small enough to exhaust |

More than one is needed because most of these routes answer "not configured" *before* they
validate anything: on a keyless server the AI proxy's `400` branch is unreachable, and on a
server with no `ADMIN_API_TOKEN` the seed route's `401` branch is too. Splitting the
configuration across instances is what makes both sides reachable without a mock.

The keyed instance is only ever sent invalid requests, so **no test can reach a model vendor**.
All three start with database, direct Stripe, Replit connector, Supabase and session variables
blanked, so a developer's shell or deployment secrets cannot change the result. The keyed
instance overrides only the inert values its cases need, and Stripe routes fail predictably as
JSON, which is what `api/stripe.spec.ts` asserts.

The admin token is a deliberately inert test secret; the OAuth client ID is public. The token guards a route that then
fails on absent Stripe credentials, so no test can create a product; the client ID is only ever
compared against an `aud` claim on tokens that are rejected before a signature is checked.

The API and contract projects also cover the three localized content routes:
`GET /api/content/question-bank`, `GET /api/content/coding-challenges`, and
`GET /api/content/lecture-series`. They run with the content store unavailable in the test
environment, so the suite verifies the documented `503` response and fixed error body. The
successful response shapes are checked by the OpenAPI contract and generated Zod schemas;
the academy's browser flows do not call these routes yet because they still use bundled data.

`/api/stripe/seed` is still listed in the contract suite's inventory and still never called
there — it is a write endpoint. What keeps it safe is no longer that list, though: it is behind
an admin token, and `api/adminAuth.spec.ts` is what asserts so.

### deck

A second Vite dev server, on port 5274, running `ai-testing-lecture-1`. One deck
stands in for all ten: `unit/lectureDecks.spec.ts` reads all ten and asserts they
have not drifted apart, so running one in a browser is enough to prove the logic
they share actually works. Lecture 1 is the smallest, which keeps the extra
server cheap.

The split is deliberate. Source-reading covers breadth — ten copies of the same
stage logic, and the details that are easy to lose in a copy — and a browser
covers the thing source-reading cannot: that the stage is really drawn, really
turned on a portrait phone, and really left alone once the phone is turned.

### e2e

The academy's own Vite dev server on port 5273 with `BASE_PATH=/`. No API server is started:
the `/api` proxy has nothing behind it, so Connection Setup falls back to bring-your-own-key,
which is the state these flows exercise.

## The wide pass

`pnpm run test:regression` (or `./run-all-tests.sh --regression`) runs the e2e
layer on every engine instead of the two Chromium projects a push gets:

| project | engine | what it honestly is |
| --- | --- | --- |
| `e2e-desktop` | Chromium | desktop Chrome |
| `e2e-mobile` | Chromium, Pixel 5 viewport | Android's engine at Android's size — not a device |
| `e2e-desktop-webkit` | WebKit | Safari |
| `e2e-mobile-webkit` | WebKit, iPhone 13 viewport | the engine iOS runs, at an iPhone's size — not iOS |
| `e2e-desktop-firefox` | Gecko | shares no engine with either |
| `deck` | Chromium | one lecture deck |

The naming is deliberate. A project called `e2e-ios` that never touches iOS is
the most expensive kind of green: real iOS and real Android need a Mac runner or
a device cloud, and neither is here. What the WebKit pair does buy is real —
Safari and every browser on iOS run WebKit, so a WebKit failure is a Safari
failure, while Chromium at a phone size says nothing about Safari at all.

Browsers for it install once:

```bash
pnpm --filter @workspace/tests run test:browsers:all
```

`.github/workflows/regression.yml` runs the same matrix nightly and on demand,
one engine per job. Locally they share one machine and one Vite server, so
`test:e2e:all` caps workers — at full parallelism the contention alone is enough
to make a slower engine miss an assertion that passes every time on its own.

## Docker

`Dockerfile` and `docker-compose.yml` at the repo root run everything in the official Playwright
image, pinned to the workspace's Playwright version so the browsers match the specs:

```bash
docker compose run --rm tests
```

Reports land on the host in `allure-report/`, `allure-results/` and `test-results/`.

The image is pinned to `linux/amd64` to match the official Playwright browser image. Chromium
also needs a roomy `/dev/shm`: compose sets `shm_size: 1gb`, and a plain `docker run` needs
`--shm-size=1g`.

## Adding tests

- **Pure TypeScript function** → `unit/`. Stub browser globals with `support/fakeBrowser.ts` and
  network calls with `support/fetchStub.ts` rather than adding jsdom.
- **Python backend rule** → `server/tests/`. Prefer fixtures in `conftest.py`; use
  `httpx.MockTransport` for upstreams and `ASGITransport` for routes so tests never need a real
  Google, Stripe, model-vendor, or database connection.
- **Anything that decides whether to accept something** → assert the *acceptance* first. A
  verifier that refuses everything passes every rejection test ever written;
  `server/tests/test_google_auth.py` signs a real token with a fixture keypair so
  that "a valid token is accepted" is a case that can fail.
- **Component** → `component/`. Import it through `@academy/…`; wrap in `LocaleProvider` (and
  `ProviderContextProvider` if it reads provider state). Intercept `/api/ai/config` with
  `page.route` instead of relying on a server.
- **New route** → `api/`, add its request and response shape to `lib/api-spec/openapi.yaml`,
  regenerate with `pnpm --filter @workspace/api-spec run codegen`, and add focused API coverage.
  The contract suite will then reject undocumented routes automatically.
- **User flow** → `e2e/`. Put selectors in a page or component object, never in the spec, and
  reach the nav through `NavComponent.reveal()` so the same test works on both viewports. Guard
  layout-specific tests with the `isMobile` fixture rather than writing two specs.
