import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KEYLESS_URL } from './tests/support/servers';

// Absolute so every suite writes to the same repo-root `allure-results`
// regardless of the cwd the runner was launched from (the tests-package
// scripts run from `tests/`, `npx playwright test` runs from the root).
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const allureResultsDir = path.join(rootDir, 'allure-results');
// Local runs emit a blob per config so run-all-tests.sh can merge the three
// suites into one Playwright HTML report; CI uses the html reporter directly.
const blobDir = path.join(rootDir, 'blob-report', 'node');

/**
 * Unit, API and contract suites. Component tests use the separate
 * `tests/playwright-ct.config.ts`, because Playwright's component testing needs
 * its own bundler-backed runner.
 *
 * The Playwright runner is used for all three: the `unit` project never opens a
 * browser, it just executes TypeScript in Node.
 *
 * This config lives at the repo root so `npx playwright test` works from the
 * top of the workspace; the specs and their `@academy/*` path aliases still
 * live under `tests/`, so `tsconfig` points there.
 */

/** `--project` values on the command line, so the servers only boot when needed. */
function selectedProjects(): string[] {
  const out: string[] = [];
  const argv = process.argv;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === '--project' && argv[i + 1]) out.push(argv[i + 1]!);
    else if (arg.startsWith('--project=')) out.push(arg.slice('--project='.length));
  }
  return out;
}

const selected = selectedProjects();
const needsApiServers =
  selected.length === 0 || selected.some(p => p === 'api' || p === 'contract');

export default defineConfig({
  testDir: './tests',
  tsconfig: './tests/tsconfig.json',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    // `detail: false` drops Playwright's own auto-generated steps — one per
    // `expect` and one per API call, which bury the steps the tests actually
    // name. What is left is the test's own structure plus the request and
    // response attachments, which is the report someone can read.
    ['allure-playwright', { resultsDir: allureResultsDir, detail: false }],
    ...(process.env.CI
      ? // Own folder, matching the component and e2e configs, so CI uploads one
        // artifact holding all three rather than whichever suite finished last.
        [['html', { open: 'never', outputFolder: 'playwright-report/node' }] as const]
      : [['blob', { outputDir: blobDir }] as const]),
  ],

  // Booting a server for a pure-Node unit run is pure waiting, so skip it.
  webServer: needsApiServers
    ? {
        command: 'node ./tests/support/start-api-servers.ts',
        url: `${KEYLESS_URL}/api/healthz`,
        reuseExistingServer: !process.env.CI,
        timeout: 90_000,
        stdout: 'pipe',
        stderr: 'pipe',
      }
    : undefined,

  projects: [
    {
      name: 'unit',
      testDir: './tests/unit',
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: KEYLESS_URL },
    },
    {
      name: 'contract',
      testDir: './tests/contract',
      use: { baseURL: KEYLESS_URL },
    },
  ],
});
