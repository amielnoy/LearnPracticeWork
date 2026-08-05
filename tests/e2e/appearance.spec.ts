import { test, expect } from './fixtures';

/**
 * Theme and language live in the nav. Both run under the desktop and mobile
 * projects; `nav.reveal()` opens the drawer first on the phone layout so the
 * toggles are reachable either way.
 */
test('toggles the colour theme and remembers the choice', async ({ home, nav }) => {
  const before = await home.html.getAttribute('data-theme');
  const after = before === 'dark' ? 'light' : 'dark';

  await nav.reveal();
  await nav.themeToggle.click();

  await expect(home.html).toHaveAttribute('data-theme', after);
  expect(await home.storedTheme()).toBe(after);
});

test('switches the interface language to Hebrew and flips to RTL', async ({ home, nav, page }) => {
  await nav.reveal();
  await nav.langToggle.click();

  // switchLang navigates with ?lang=he, so the whole document reloads in Hebrew.
  await expect(page).toHaveURL(/lang=he/);
  await expect(home.html).toHaveAttribute('lang', 'he');
  await expect(home.html).toHaveAttribute('dir', 'rtl');
});
