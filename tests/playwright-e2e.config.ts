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
const allureResultsDir = path.resolve(here, '..', 'allure-results');
// Local runs emit a blob so run-all-tests.sh can merge every suite into one
// Playwright HTML report; CI uses the html reporter directly.
const blobDir = path.resolve(here, '..', 'blob-report', 'e2e');

const PORT = Number(process.env.E2E_PORT ?? 5273);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: allureResultsDir }],
    ...(process.env.CI
      ? [['html', { open: 'never' }] as const]
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
  webServer: {
    command: './node_modules/.bin/vite --config vite.config.ts',
    cwd: academyDir,
    env: { PORT: String(PORT), BASE_PATH: '/' },
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'e2e-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e-mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
