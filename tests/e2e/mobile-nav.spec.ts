import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

/**
 * The off-canvas navigation drawer only exists on the phone layout, so this
 * flow is skipped on the desktop project and runs only under mobile Chrome.
 */
let home: HomePage;

test.beforeEach(async ({ page }) => {
  home = await new HomePage(page).open();
});

test('opens the drawer and closes it once a destination is chosen', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'the navigation drawer is part of the mobile layout only');

  const { toggle } = home.nav;
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveClass(/nav-open/);

  // Tapping a link both navigates and closes the drawer behind you.
  await home.nav.link('📄 Resume & CV').click();
  await expect(page).toHaveURL(/#resume$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
