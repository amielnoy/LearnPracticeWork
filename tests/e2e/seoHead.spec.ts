import { test, expect } from './fixtures';

/**
 * The static markup declares that a Hebrew version exists; these tests check
 * that the page actually delivers one. A crawler that renders the page has to
 * find `lang`/`dir`, the title and the canonical all describing the same
 * language — an English `<html lang>` on a Hebrew page, or a canonical pointing
 * at the English URL, undoes the hreflang cluster entirely.
 */

const CANONICAL_HOST = 'https://free-tier-insights--amielpeled.replit.app';
const CANONICAL_BASE = `${CANONICAL_HOST}/ai-testing-academy/`;

const head = (page: import('@playwright/test').Page) =>
  page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  }));

test('serves an English document at ?lang=en', async ({ page }) => {
  await page.goto('/?lang=en');
  const meta = await head(page);

  expect(meta.lang).toBe('en');
  expect(meta.dir).toBe('ltr');
  expect(meta.canonical).toBe(`${CANONICAL_BASE}?lang=en`);
  expect(meta.title).toContain('AI Testing Academy');
});

test('serves a Hebrew document at ?lang=he', async ({ page }) => {
  await page.goto('/?lang=he');
  const meta = await head(page);

  expect(meta.lang).toBe('he');
  expect(meta.dir).toBe('rtl');
  expect(meta.canonical).toBe(`${CANONICAL_BASE}?lang=he`);
  // Hebrew searchers match Hebrew text; an English title on the Hebrew URL
  // means the page ranks for nothing they would type.
  expect(meta.title).toMatch(/[֐-׿]/);
  expect(meta.description).toMatch(/[֐-׿]/);
});

test('keeps the bare URL as the x-default', async ({ page }) => {
  await page.goto('/');
  const meta = await head(page);

  // No language in the query: the canonical stays on the bare URL, which is
  // what the hreflang cluster nominates as x-default.
  expect(meta.canonical).toBe(CANONICAL_BASE);
});

test('localises the head before the app renders', async ({ page }) => {
  // Asserted at `domcontentloaded`, i.e. before React has mounted: this is the
  // whole reason the logic sits in an inline script rather than in a component.
  await page.goto('/?lang=he', { waitUntil: 'domcontentloaded' });

  expect(await page.evaluate(() => document.documentElement.lang)).toBe('he');
  expect(await page.evaluate(() => document.documentElement.dir)).toBe('rtl');
});

test('agrees with the language the app itself resolves', async ({ page }) => {
  // The inline script duplicates the priority order in src/lib/i18n.ts. If the
  // two ever disagree, the document says one language and the UI shows another.
  await page.goto('/?lang=he');
  await expect(page.locator('#coding-challenges')).toBeVisible();

  const documentLang = await page.evaluate(() => document.documentElement.lang);
  const storedByApp = await page.evaluate(() => localStorage.getItem('ata_lang'));

  expect(documentLang).toBe(storedByApp);
});

test('advertises the same alternates on every variant', async ({ page }) => {
  const collect = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
        .map(el => `${el.getAttribute('hreflang')}=${el.getAttribute('href')}`)
        .sort(),
    );

  await page.goto('/?lang=en');
  const fromEnglish = await collect();
  await page.goto('/?lang=he');
  const fromHebrew = await collect();

  expect(fromHebrew).toEqual(fromEnglish);
  expect(fromEnglish).toHaveLength(3);
});
