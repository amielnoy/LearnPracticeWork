import { test, expect } from './fixtures';

/**
 * The off-canvas navigation drawer only exists on the phone layout, so this
 * flow is skipped on the desktop project and runs only under mobile Chrome.
 * The `nav` fixture already has the page open.
 */
test('opens the drawer and closes it once a destination is chosen', async ({
  nav,
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'the navigation drawer is part of the mobile layout only');

  const { toggle } = nav;
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveClass(/nav-open/);

  // Tapping a link both navigates and closes the drawer behind you.
  await nav.link('📄 Resume & CV').click();
  await expect(page).toHaveURL(/#resume$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
