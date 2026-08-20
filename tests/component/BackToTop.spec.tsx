import { test, expect } from '@playwright/experimental-ct-react';
import { LocaleProvider } from '@academy/context/LocaleContext';
import { BackToTop } from '@academy/components/chrome/BackToTop';
import { en } from '@academy/lib/locales';

/**
 * A real scroll in a real browser: the button listens to `scroll` and only
 * appears past 500px, which is exactly the sort of thing a jsdom test would
 * have to fake.
 */

/** Makes the mount page tall enough to scroll, then scrolls it. */
async function scrollTo(page: import('@playwright/test').Page, y: number) {
  await page.evaluate(offset => {
    document.body.style.height = '3000px';
    window.scrollTo(0, offset);
  }, y);
}

test('is labelled for screen readers from the locale', async ({ mount }) => {
  const component = await mount(
    <LocaleProvider>
      <BackToTop />
    </LocaleProvider>,
  );

  await expect(component).toHaveAttribute('aria-label', en.ui.toTop);
});

test('stays out of the way near the top of the page', async ({ mount, page }) => {
  const component = await mount(
    <LocaleProvider>
      <BackToTop />
    </LocaleProvider>,
  );

  await scrollTo(page, 100);

  await expect(component).not.toHaveClass(/show/);
});

test('appears once the reader has scrolled past the threshold', async ({ mount, page }) => {
  const component = await mount(
    <LocaleProvider>
      <BackToTop />
    </LocaleProvider>,
  );

  await scrollTo(page, 600);

  await expect(component).toHaveClass(/show/);
});

test('asks the browser to scroll smoothly back to the top when clicked', async ({
  mount,
  page,
}) => {
  const component = await mount(
    <LocaleProvider>
      <BackToTop />
    </LocaleProvider>,
  );

  await scrollTo(page, 900);
  await expect(component).toHaveClass(/show/);

  // Recorded rather than observed: Playwright scrolls a button into view before
  // clicking it, which would move the page on its own and make a scrollY
  // assertion pass whether or not the handler did anything.
  await page.evaluate(() => {
    const w = window as unknown as {
      scrollCalls: unknown[];
      scrollTo: (...args: unknown[]) => void;
    };
    w.scrollCalls = [];
    w.scrollTo = (...args: unknown[]) => void w.scrollCalls.push(args);
  });

  await component.click();

  const calls = await page.evaluate(
    () => (window as unknown as { scrollCalls: unknown[] }).scrollCalls,
  );
  expect(calls).toEqual([[{ top: 0, behavior: 'smooth' }]]);
});
