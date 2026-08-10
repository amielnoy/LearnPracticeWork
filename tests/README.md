# @workspace/tests

Five test layers, one runner. Playwright is used as a general test runner here, not only as a
browser driver — the unit project never opens a browser.

```
tests/
├── unit/        Node          pure logic from the academy's lib modules
├── component/   Chromium      real React components, mounted (Playwright CT)
├── api/         Node → HTTP   the live api-server
├── contract/    Node → HTTP   openapi.yaml ↔ generated Zod ↔ the live server
├── e2e/         Chromium      the real academy app, driven through page objects
│   ├── pages/                 one class per route (BasePage, HomePage)
│   └── components/            reusable fragments (NavComponent, HeroComponent)
└── support/     fixtures, fakes, and the server launcher
```

## Running

```bash
./run-all-tests.sh        # everything + the Allure report, from the repo root
pnpm test                 # everything, in order, stopping at the first failure
pnpm test:unit            # ~1s, no server, no browser
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

Two reports come out of a full run, both covering all five layers.

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

`support/start-api-servers.ts` builds `artifacts/api-server` once and starts two instances:

| Port | Gemini key | Why |
| --- | --- | --- |
| 8788 | none | `baseURL` for the api and contract projects; exercises the "no server key" branches |
| 8789 | a throwaway string | Reaches the request-validation branches, which sit behind the key check |

Two are needed because `routes/ai.ts` answers `503` for a missing key *before* it validates the
body — on a keyless server the `400 messages is required` branch is unreachable.

The keyed instance is only ever sent invalid requests, so **no test can reach a model vendor**.
Both instances start with `DATABASE_URL`, `REPLIT_CONNECTORS_HOSTNAME` and friends blanked, so
a developer's shell or a deployment's secrets cannot change the result — and so the Stripe
routes fail predictably as JSON, which is what `api/stripe.spec.ts` asserts.

`/api/stripe/seed` is listed in the contract suite's inventory but deliberately never called: a
test suite should not be able to create products.

### e2e

The academy's own Vite dev server on port 5273 with `BASE_PATH=/` (its `vite.config.ts` throws
without `PORT` and `BASE_PATH`). No API server is started: the `/api` proxy has nothing behind
it, so Connection Setup falls back to bring-your-own-key, which is the state these flows
exercise.

## Docker

`Dockerfile` and `docker-compose.yml` at the repo root run everything in the official Playwright
image, pinned to the workspace's Playwright version so the browsers match the specs:

```bash
docker compose run --rm tests
```

Reports land on the host in `allure-report/`, `allure-results/` and `test-results/`.

The image is pinned to `linux/amd64` on purpose: `pnpm-workspace.yaml`'s `overrides` strip every
platform-native optional dependency except the linux-x64-gnu ones, so an arm64 image would be
missing `@rollup/rollup-linux-arm64-gnu` and the academy's Vite server — and with it the e2e
layer — would not boot. Chromium also needs a roomy `/dev/shm`: compose sets `shm_size: 1gb`,
and a plain `docker run` needs `--shm-size=1g`.

## Adding tests

- **Pure function** → `unit/`. Stub browser globals with `support/fakeBrowser.ts` and network
  calls with `support/fetchStub.ts` rather than adding jsdom.
- **Component** → `component/`. Import it through `@academy/…`; wrap in `LocaleProvider` (and
  `ProviderContextProvider` if it reads provider state). Intercept `/api/ai/config` with
  `page.route` instead of relying on a server.
- **New route** → `api/`, and add it to `UNDOCUMENTED_ROUTES` in `contract/openapi.spec.ts`
  until it is in `openapi.yaml`. Once documented, delete it from that list — the spec-driven
  tests will cover it automatically.
- **User flow** → `e2e/`. Put selectors in a page or component object, never in the spec, and
  reach the nav through `NavComponent.reveal()` so the same test works on both viewports. Guard
  layout-specific tests with the `isMobile` fixture rather than writing two specs.
