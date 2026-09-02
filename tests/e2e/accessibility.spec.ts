import AxeBuilder from '@axe-core/playwright';
import { test, expect } from './fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

async function waitUntilStyled(page: import('@playwright/test').Page) {
  // axe measures rendered colour, so it has to run against a page that has
  // finished styling itself. `page.goto` resolves on `load`, which fires before
  // `main.tsx` has run — and axe sampling that gap reports every text node on
  // the page as a contrast failure at once, which is what made this spec flake
  // in CI.
  //
  // Waiting for a landmark is not enough, and this is the trap: `index.html`
  // ships a static prerender inside `#root` that already contains
  // `<main id="main-content">`, so `getByRole('main')` resolves against markup
  // that is present before any script runs.
  //
  // The page carries no inline `<style>`, so `body` keeps the UA's transparent
  // background until `app.css` — imported by `main.tsx` — is applied, at which
  // point it becomes `var(--bg)`. A painted background is therefore proof that
  // the stylesheet axe is about to measure is live, in dev (injected by Vite)
  // and in a production build (a real stylesheet link) alike. The prerender
  // marker disappearing is the second half: `createRoot().render()` replaces
  // `#root` wholesale rather than hydrating it, so its absence means the React
  // tree — not the crawler shell — is what is on screen.
  await page.waitForFunction(() => {
    const painted = !['', 'transparent', 'rgba(0, 0, 0, 0)'].includes(
      getComputedStyle(document.body).backgroundColor,
    );
    const mounted = !document.getElementById('root')?.innerHTML.includes('PRERENDER:START');
    return painted && mounted;
  });

  // Webfonts decide the final glyphs, so a swap mid-scan could move text onto a
  // different background.
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

/**
 * Scan the page, optionally in a chosen theme.
 *
 * The theme is applied *after* the mount wait, not before, and that ordering is
 * the whole point: `page.goto` resolves on `load`, the app sets `data-theme`
 * itself as it boots, and an attribute written before that runs is an attribute
 * the app overwrites. Setting it first made this spec fail once and pass on the
 * next run, which is the worst way to learn the difference.
 */
async function expectNoWcagViolations(
  page: import('@playwright/test').Page,
  theme?: 'dark' | 'light',
) {
  await waitUntilStyled(page);
  if (theme) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  }

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

/**
 * The dark palette is half the site's colour and, until now, none of the
 * measured half: the two scans above both run in the default light theme, so
 * every contrast ratio under `[data-theme="dark"]` was only ever checked by
 * hand. It is the theme the design is built around, which makes it the worse
 * one to leave unmeasured.
 *
 * The attribute is set the way the app sets it, before the scan, so axe is
 * measuring the same cascade a reader with the toggle flipped would see.
 */
for (const lang of ['en', 'he'] as const) {
  test(`${lang} academy has no WCAG A/AA violations in the dark theme`, async ({ page }) => {
    await page.goto(`?lang=${lang}`);
    await expectNoWcagViolations(page, 'dark');
  });
}

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
