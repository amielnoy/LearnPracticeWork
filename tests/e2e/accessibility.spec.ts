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
 * Wait out every transition the page is currently running.
 *
 * `app.css` puts `transition: all .22s ease` on cards, `pre`, badges and nav
 * links, so flipping `data-theme` does not repaint — it *animates*, and for a
 * fifth of a second every one of those elements is painted in a colour that is
 * neither theme. axe measures rendered colour, so a scan that lands inside that
 * window reports contrast failures that exist only mid-animation: eleven of
 * them on one run, twenty-six on the next, two hundred and twenty-seven on a
 * third. The count varying with nothing else changing is the tell.
 *
 * `getAnimations()` covers CSS transitions, so this waits for the real thing
 * rather than sleeping and hoping. Infinite animations are skipped because
 * their `finished` never resolves — `foundation.css` deliberately keeps
 * `[data-motion="essential"]` spinning even under reduced motion — and the
 * whole wait is capped, because waiting on all of them unconditionally hangs.
 */
async function settleTransitions(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const running = document
      .getAnimations()
      .filter(animation => animation.effect?.getTiming().iterations !== Infinity)
      .map(animation => animation.finished.catch(() => undefined));
    // Capped, because a transition can stay pending forever without being
    // stuck: `.reveal` elements below the fold hold one until the observer
    // brings them into view, which for elements further down the page is
    // never. The cap is several times the longest colour transition, so the
    // wait still ends on the real event in every case that has one.
    await Promise.race([Promise.all(running), new Promise(resolve => setTimeout(resolve, 1_000))]);
  });
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
    await settleTransitions(page);
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
