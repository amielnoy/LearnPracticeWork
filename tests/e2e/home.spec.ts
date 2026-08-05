import { test, expect } from '@playwright/test';
import { HomePage, SECTION_IDS } from './pages/HomePage';

/**
 * Smoke coverage for the academy landing page, driven through the HomePage
 * object. Runs under both the desktop and mobile Chrome projects, so a layout
 * that only assembles on a wide window would fail the mobile run here.
 */
let home: HomePage;

test.beforeEach(async ({ page }) => {
  home = await new HomePage(page).open();
});

test('renders the hero with both headline lines', async () => {
  await expect(home.hero.heading).toBeVisible();
  await expect(home.hero.heading).toContainText('AI Testing Academy');
  await expect(home.hero.heading).toContainText('Your AI-Powered QA Career Launchpad');
});

test('shows the hero feature badges', async () => {
  await expect(home.hero.badge('🤖 AI Agents')).toBeVisible();
  await expect(home.hero.badge('🎙️ Mock Interviews')).toBeVisible();
});

test('renders all six main sections', async () => {
  for (const id of SECTION_IDS) {
    await expect(home.section(id)).toBeAttached();
  }
});

test('exposes a skip link that targets the main content', async () => {
  await expect(home.skipLink).toHaveAttribute('href', '#main-content');
  await expect(home.main).toBeAttached();
});
