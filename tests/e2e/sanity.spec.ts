import { test, expect } from './fixtures';

/**
 * Broad sanity checks that the page is fundamentally healthy — the kind of thing
 * that breaks loudly when a build, route or provider chain goes wrong. Kept
 * lightweight, and run on both the desktop and mobile projects.
 */

test('serves the page with the expected title and language', async ({ home, page }) => {
  await expect(page).toHaveTitle(/AI Testing Academy/);
  await expect(home.html).toHaveAttribute('lang', 'en');
});

test('loads without any uncaught page errors', async ({ page }) => {
  // Attach before navigating so an error thrown during the first render still
  // registers. (This test opens the page itself instead of via the `home`
  // fixture, which would have navigated already.)
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  expect(errors).toEqual([]);
});

test('renders the footer with a safe external author link', async ({ home }) => {
  await expect(home.footer).toBeVisible();

  const author = home.footer.getByRole('link').first();
  await expect(author).toHaveAttribute('href', /^https?:\/\//);
  await expect(author).toHaveAttribute('target', '_blank');
  // Without noopener the opened tab could navigate this one via window.opener.
  await expect(author).toHaveAttribute('rel', /noopener/);
});

test('a coding challenge reveals its solution on the second click', async ({ challenges }) => {
  const button = challenges.button(0);

  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(challenges.solution(0)).toHaveCount(0);

  await button.click(); // first click → hint
  await expect(button).toHaveAttribute('aria-expanded', 'true');

  await button.click(); // second click → solution
  await expect(challenges.solution(0)).toBeVisible();
});

test('the back-to-top button appears after scrolling and returns to the top', async ({ home, page }) => {
  await expect(home.backToTop).not.toHaveClass(/show/);

  await page.evaluate(() => window.scrollTo(0, 2000));
  await expect(home.backToTop).toHaveClass(/show/);

  await home.backToTop.click();
  await expect(home.hero.heading).toBeInViewport();
  await expect(home.backToTop).not.toHaveClass(/show/);
});

test('community links open in a new tab without leaking the opener', async ({ nav }) => {
  await nav.reveal();

  const youtube = nav.link('▶ YouTube');
  await expect(youtube).toHaveAttribute('target', '_blank');
  await expect(youtube).toHaveAttribute('rel', /noopener/);
});
