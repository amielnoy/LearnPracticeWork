import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * The ten lecture decks, checked as a set rather than one at a time.
 *
 * They are deliberately independent artifacts — each is its own app, published
 * on its own — which means the code they share is shared by copy. That is a
 * reasonable trade for deployability and a bad one for drift: a fix applied to
 * one deck and not the other nine is invisible until someone opens the ninth on
 * a phone. Nothing here reads a browser; these are assertions about the source
 * itself, which is what lets one cheap test cover all ten.
 *
 * The stage logic is the case in point. Every deck renders a 1920x1080 canvas
 * scaled into the viewport, and on a portrait phone the original formula left it
 * at a fifth of design size with two thirds of the screen black.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const artifactsDir = path.resolve(here, '..', '..', 'artifacts');

const deckNames = readdirSync(artifactsDir)
  .filter(name => /^ai-testing-lecture-\d+$/.test(name))
  .sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')));

const appSource = (deck: string): string =>
  readFileSync(path.join(artifactsDir, deck, 'src', 'App.tsx'), 'utf8');

/** The stage block, sliced out so the decks can be compared on it alone. */
function stageBlock(source: string): string | null {
  const start = source.indexOf('function stageDims');
  if (start === -1) return null;
  const end = source.indexOf('\n}', start);
  return end === -1 ? null : source.slice(start, end + 2);
}

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Lecture decks');
});

test('there are decks to check, so a rename cannot empty this file', () => {
  // Every assertion below loops over `deckNames`. Without this, deleting or
  // renaming the artifacts would turn the whole suite green by iterating zero
  // times — the failure mode that makes a data-driven test worthless.
  expect(deckNames.length).toBeGreaterThanOrEqual(10);
});

test.describe('the stage logic', () => {
  test('is present in every deck', () => {
    for (const deck of deckNames) {
      expect(stageBlock(appSource(deck)), `${deck} has no stageDims`).not.toBeNull();
    }
  });

  test('is identical across all of them', () => {
    // Copy-shared code that has silently diverged is the thing this catches.
    const blocks = deckNames.map(deck => [deck, stageBlock(appSource(deck))] as const);
    const reference = blocks[0]![1];
    for (const [deck, block] of blocks) {
      expect(block, `${deck} has drifted from ${blocks[0]![0]}`).toBe(reference);
    }
  });

  test('no deck has slipped back to the letterbox formula', () => {
    // The exact expression that produced a 390x219 stage on an iPhone 13.
    const old = 'Math.min(window.innerWidth, window.innerHeight * (16 / 9))';
    for (const deck of deckNames) {
      expect(appSource(deck), `${deck} is back on the old formula`).not.toContain(old);
    }
  });
});

test.describe('the details that are easy to drop in a copy', () => {
  test('every deck rotates the stage on a narrow portrait viewport', () => {
    for (const deck of deckNames) {
      expect(appSource(deck), `${deck} never rotates`).toContain('rotate(90deg)');
    }
  });

  test('every deck opts the rotated stage out of flex shrinking', () => {
    // Without this the rotated stage — wider than its container — is squeezed
    // straight back and the rotation buys nothing. It is invisible in review and
    // obvious on a phone.
    for (const deck of deckNames) {
      expect(appSource(deck), `${deck} would be shrunk back`).toContain("flex: 'none'");
    }
  });

  test('every deck recomputes on orientationchange, not only on resize', () => {
    // iOS fires orientationchange before innerWidth/innerHeight settle.
    for (const deck of deckNames) {
      expect(appSource(deck), `${deck} misses the iOS event`).toContain('orientationchange');
    }
  });
});
