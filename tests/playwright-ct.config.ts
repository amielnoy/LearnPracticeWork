import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const academySrc = path.resolve(here, '..', 'artifacts', 'ai-testing-academy', 'src');

// Shared with the root config so one `allure generate` covers every suite.
const allureResultsDir = path.resolve(here, '..', 'allure-results');
// Local runs emit a blob so run-all-tests.sh can merge every suite into one
// Playwright HTML report; CI uses the html reporter directly.
const blobDir = path.resolve(here, '..', 'blob-report', 'component');

/**
 * Component tests. Playwright bundles the academy's real components with Vite
 * and mounts them in Chromium — no jsdom, no re-implementation of the app.
 *
 * The alias mirrors `@academy/*` in `tsconfig.json`; the bundler and the type
 * checker have to be told separately.
 */
export default defineConfig({
  testDir: './component',
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
  // Keep the last screenshot, a video and a trace whenever a component test
  // fails; the Allure reporter attaches them alongside the HTML report's copies.
  use: {
    ctPort: 3101,
    ctViteConfig: {
      resolve: {
        alias: { '@academy': academySrc, '@': academySrc },
        dedupe: ['react', 'react-dom'],
      },
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  // Every component spec runs twice: once at a desktop viewport and once under
  // an emulated phone (mobile Chrome, touch, cellular-era small screen), so a
  // layout that only holds together on a wide window is caught here.
  projects: [
    {
      name: 'component-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'component-mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
