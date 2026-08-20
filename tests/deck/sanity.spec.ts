import { test, expect } from '../support/test';
import { allure } from 'allure-playwright';

/**
 * A lecture deck, in a real browser.
 *
 * Ten decks ship and none had a test until now. `tests/unit/lectureDecks.spec.ts`
 * covers all ten by reading their source and asserting they have not drifted
 * apart; this file covers one of them by actually running it, which is the half
 * that source-reading cannot do — that the stage really is drawn, really is
 * turned on a portrait phone, and really is left alone once the phone is turned.
 *
 * One deck is enough precisely because the unit test guarantees the other nine
 * carry the same logic. If that ever stops being true, it fails there first.
 */

/** The design canvas every deck is authored against. */
const DESIGN_WIDTH = 1920;

/**
 * Below this the slide is smaller than a fifth of design size, which is what a
 * 40px heading rendered at 8px looked like before the stage was turned.
 */
const MIN_READABLE_SCALE = 0.3;

test.beforeEach(async () => {
  await allure.layer('e2e');
  await allure.feature('Lecture decks');
});

async function stage(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const frame = document.querySelector('iframe');
    if (!frame) return null;
    const transform = getComputedStyle(frame).transform;
    return {
      width: frame.clientWidth,
      height: frame.clientHeight,
      rotated: transform !== 'none' && transform !== '',
    };
  });
}

test('serves the deck and renders the first slide', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expect(page.locator('iframe')).toBeVisible();

  expect(errors, 'the deck threw while rendering').toEqual([]);
});

test.describe('the stage', () => {
  test('fills a portrait phone by turning, instead of letterboxing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 664 });
    await page.goto('/');
    const box = (await stage(page))!;

    expect(box.rotated, 'a portrait phone should turn the stage').toBe(true);
    // Turned, it spans the long edge: the stage is wider than the viewport.
    expect(box.width).toBeGreaterThan(390);
    expect(box.width / DESIGN_WIDTH).toBeGreaterThan(MIN_READABLE_SCALE);
  });

  test('is left alone once the phone is actually turned', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto('/');
    const box = (await stage(page))!;

    expect(box.rotated, 'landscape needs no help').toBe(false);
    expect(box.width / DESIGN_WIDTH).toBeGreaterThan(MIN_READABLE_SCALE);
  });

  test('is left alone on a tablet held upright', async ({ page }) => {
    // Portrait, but wide enough to read already — the width test is what keeps
    // tablets and desktops out of the rotation.
    await page.setViewportSize({ width: 810, height: 1080 });
    await page.goto('/');

    expect((await stage(page))!.rotated).toBe(false);
  });

  test('keeps the 16:9 shape at every size', async ({ page }) => {
    for (const size of [
      { width: 390, height: 664 },
      { width: 844, height: 390 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(size);
      await page.goto('/');
      const box = (await stage(page))!;
      // A stage that has stopped being 16:9 is one that crops or stretches the
      // slide, which no amount of scaling makes readable.
      expect(box.width / box.height, `at ${size.width}x${size.height}`).toBeCloseTo(16 / 9, 1);
    }
  });
});
