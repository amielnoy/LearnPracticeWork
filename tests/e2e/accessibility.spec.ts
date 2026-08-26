import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

async function expectNoWcagViolations(page: import('@playwright/test').Page) {
  // axe measures rendered colour, so it has to run against a page that has
  // finished styling itself. `page.goto` resolves on `load`, which under the
  // Vite dev server fires before React has mounted and injected the
  // stylesheet — and axe sampling that gap reports every text node on the page
  // as a contrast failure at once, which is what made this spec flake in CI.
  //
  // Two waits, because they prove different things. The main landmark being
  // visible proves the app rendered; `document.fonts.ready` proves the
  // webfonts that decide the final glyphs have settled, so a font swap cannot
  // move text onto a different background mid-scan.
  await expect(page.getByRole('main')).toBeVisible();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));

  const result = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(
    result.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map(node => node.target),
    })),
  ).toEqual([]);
}

test('English academy has no automated WCAG A/AA violations', async ({ page }) => {
  await page.goto('?lang=en');
  await expectNoWcagViolations(page);
});

test('Hebrew RTL academy has no automated WCAG A/AA violations', async ({ page }) => {
  await page.goto('?lang=he');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expectNoWcagViolations(page);
});

test('localized legal pages keep one main landmark and a logical heading outline', async ({
  page,
}) => {
  await page.goto('privacy?lang=he');

  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2 })).not.toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'he');
  await expectNoWcagViolations(page);
});
