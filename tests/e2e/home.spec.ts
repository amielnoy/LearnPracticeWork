import { test, expect } from './fixtures';
import { SECTION_IDS } from './pages/HomePage';

/**
 * Smoke coverage for the academy landing page. The `home`/`hero` fixtures open
 * the page and expose the objects, so each test just declares what it needs.
 * Runs under both the desktop and mobile Chrome projects, so a layout that only
 * assembles on a wide window would fail the mobile run here.
 */
test('renders the hero with both headline lines', async ({ hero }) => {
  await expect(hero.heading).toBeVisible();
  await expect(hero.heading).toContainText('AI Testing Academy');
  await expect(hero.heading).toContainText('Your AI-Powered QA Career Launchpad');
});

test('shows the hero feature badges', async ({ hero }) => {
  await expect(hero.badge('🤖 AI Agents')).toBeVisible();
  await expect(hero.badge('🎙️ Mock Interviews')).toBeVisible();
});

test('renders all six main sections', async ({ home }) => {
  for (const id of SECTION_IDS) {
    await expect(home.section(id)).toBeAttached();
  }
});

test('exposes a skip link that targets the main content', async ({ home }) => {
  await expect(home.skipLink).toHaveAttribute('href', '#main-content');
  await expect(home.main).toBeAttached();
});
