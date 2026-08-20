import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * End-to-end suite: the real AI Testing Academy app, served by its own Vite dev
 * server and driven in real Chromium — once at a desktop viewport and once as an
 * emulated phone (mobile Chrome), so responsive behaviour like the slide-in nav
 * drawer is exercised the way a visitor on a cellular device would meet it.
 *
 * The app's `/api` proxy has nothing to talk to here, so the Connection Setup
 * panel simply falls back to bring-your-own-key — no API server is needed for
 * these UI flows.
 */
const here = path.dirname(fileURLToPath(import.meta.url));
const academyDir = path.resolve(here, '..', 'artifacts', 'ai-testing-academy');
// One deck stands in for all ten. `tests/unit/lectureDecks.spec.ts` is what
// proves the other nine carry the same stage logic, so running one in a browser
// is enough to prove that logic works — and lecture 1 is the smallest, which
// keeps the extra dev server cheap.
const deckDir = path.resolve(here, '..', 'artifacts', 'ai-testing-lecture-1');
const allureResultsDir = path.resolve(here, '..', 'allure-results');
// Local runs emit a blob so run-all-tests.sh can merge every suite into one
// Playwright HTML report; CI uses the html reporter directly.
const blobDir = path.resolve(here, '..', 'blob-report', 'e2e');

const PORT = Number(process.env.E2E_PORT ?? 5273);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const DECK_PORT = Number(process.env.E2E_DECK_PORT ?? 5274);
const DECK_URL = `http://127.0.0.1:${DECK_PORT}`;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: allureResultsDir }],
    ...(process.env.CI
      ? // Own folder: the component config resolves its default to the same
        // tests/playwright-report and would overwrite this one.
        [['html', { open: 'never', outputFolder: '../playwright-report/e2e' }] as const]
      : [['blob', { outputDir: blobDir }] as const]),
  ],
  // On a failure keep the evidence: the last screenshot, a video of the run and
  // a Playwright trace. The Allure reporter picks these attachments up
  // automatically, so they show up in both the Allure and the HTML report.
  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // Boot the academy's own Vite dev server. `PORT`/`BASE_PATH` are mandatory —
  // its vite.config throws without them — and `strictPort` means a busy port
  // fails loudly instead of silently drifting to another one.
  webServer: [
    {
      command: './node_modules/.bin/vite --config vite.config.ts',
      cwd: academyDir,
      env: { PORT: String(PORT), BASE_PATH: '/' },
      url: BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: './node_modules/.bin/vite --config vite.config.ts',
      cwd: deckDir,
      env: { PORT: String(DECK_PORT), BASE_PATH: '/' },
      url: DECK_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],

  projects: [
    {
      name: 'e2e-desktop',
      testDir: './e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e-mobile',
      testDir: './e2e',
      use: { ...devices['Pixel 5'] },
    },
    {
      // The deck sets its own viewport per test, so it runs once rather than
      // twice — a desktop and a phone project would both be overridden anyway.
      name: 'deck',
      testDir: './deck',
      use: { ...devices['Desktop Chrome'], baseURL: DECK_URL },
    },
  ],
});
