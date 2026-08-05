import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

let home: HomePage;

test.beforeEach(async ({ page }) => {
  home = await new HomePage(page).open();
});

test('toggles the colour theme and remembers the choice', async () => {
  const before = await home.html.getAttribute('data-theme');
  const after = before === 'dark' ? 'light' : 'dark';

  await home.nav.reveal();
  await home.nav.themeToggle.click();

  await expect(home.html).toHaveAttribute('data-theme', after);
  expect(await home.storedTheme()).toBe(after);
});

test('switches the interface language to Hebrew and flips to RTL', async ({ page }) => {
  await home.nav.reveal();
  await home.nav.langToggle.click();

  // switchLang navigates with ?lang=he, so the whole document reloads in Hebrew.
  await expect(page).toHaveURL(/lang=he/);
  await expect(home.html).toHaveAttribute('lang', 'he');
  await expect(home.html).toHaveAttribute('dir', 'rtl');
});
