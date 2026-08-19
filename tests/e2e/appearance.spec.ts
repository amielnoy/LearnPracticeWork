import { test, expect } from './fixtures';
import { HomePage } from './pages/HomePage';

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

test.describe('a tampered theme preference', () => {
  /**
   * The stored theme lands on `data-theme` on `<html>`, and storage is editable
   * from any console. Without a check, whatever is stored is what ends up on the
   * document — and because the toggle only ever flips between two values, there
   * is no way back out of a third one short of clearing site data.
   *
   * These navigate themselves rather than taking the `home` fixture, because the
   * value has to be in place before the page's first script runs.
   */
  test('is ignored, and the document falls back to a real theme', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('ata_theme', 'x" onload="alert(1)'));
    const home = await new HomePage(page).open();

    await expect(home.html).toHaveAttribute('data-theme', /^(light|dark)$/);
  });

  test('leaves the toggle working rather than stuck', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('ata_theme', 'neither'));
    const home = await new HomePage(page).open();

    const before = await home.html.getAttribute('data-theme');
    await home.nav.reveal();
    await home.nav.themeToggle.click();

    await expect(home.html).toHaveAttribute('data-theme', before === 'dark' ? 'light' : 'dark');
    expect(await home.storedTheme()).toMatch(/^(light|dark)$/);
  });
});
