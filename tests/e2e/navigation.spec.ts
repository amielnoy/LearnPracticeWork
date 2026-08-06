import { test, expect } from './fixtures';

/**
 * The hero call-to-action links live in the page flow (visible on every
 * viewport), so they are the cleanest way to prove in-page anchor navigation
 * without wrestling the mobile drawer first.
 */
test('the hero sample-interview CTA jumps to the mock interview', async ({ home, hero, page }) => {
  await hero.cta('Try a sample interview →').click();
  await expect(page).toHaveURL(/#interview-talk$/);
  await expect(home.section('interview-talk')).toBeInViewport();
});

test('the hero "Watch Lectures" CTA jumps to the lecture series', async ({ home, hero, page }) => {
  await hero.cta('Watch Lectures').click();
  await expect(page).toHaveURL(/#lecture-series$/);
  await expect(home.section('lecture-series')).toBeInViewport();
});

test('a primary nav link jumps to its section', async ({ home, nav, page }) => {
  await nav.reveal();
  await nav.link('🐍 Python Coding Challenges').click();
  await expect(page).toHaveURL(/#coding-challenges$/);
  await expect(home.section('coding-challenges')).toBeInViewport();
});
