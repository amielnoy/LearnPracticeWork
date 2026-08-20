import { test, expect } from '../support/test';
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

/** Every slide component in a deck, as `[name, source]`. */
function slideSources(deck: string): Array<[string, string]> {
  const dir = path.join(artifactsDir, deck, 'src', 'pages', 'slides');
  return readdirSync(dir)
    .filter(name => name.endsWith('.tsx'))
    .map(name => [name, readFileSync(path.join(dir, name), 'utf8')]);
}

/**
 * A style object that sets a monospace family — a code panel, chip or line.
 *
 * No trailing comma is required: Prettier omits it on a single-line object, and
 * requiring one is exactly how ten of these were missed the first time.
 */
const MONOSPACE = /fontFamily:\s*(?:"[^"]*monospace[^"]*"|'[^']*monospace[^']*')/g;

/**
 * The object literal that directly contains `index`, brace-balanced both ways,
 * so a nested object cannot be mistaken for the declaration's own scope.
 */
function enclosingObject(source: string, index: number): string {
  let depth = 0;
  let start = -1;
  for (let i = index - 1; i >= 0; i--) {
    const c = source[i];
    if (c === '}') depth++;
    else if (c === '{') {
      if (depth === 0) {
        start = i;
        break;
      }
      depth--;
    }
  }
  if (start === -1) return '';
  depth = 0;
  for (let i = start; i < source.length; i++) {
    const c = source[i];
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  return '';
}

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

test.describe('code panels inside a right-to-left slide', () => {
  /**
   * A slide's root carries `dir={dir}`, which is `rtl` in Hebrew, and a code
   * panel inside it used to inherit that. The bidi algorithm then resolved the
   * trailing neutrals of a line — `():`, `()`, `)` — against an RTL paragraph
   * and moved them to the front, so `def f():` rendered as `:()def f`. It is
   * unreadable and it is wrong in every deck at once, because the panels are
   * copy-shared. Code is left-to-right whatever the prose around it is, so the
   * panel has to say so rather than inherit an answer.
   */
  test('there are code panels to check', () => {
    // Same reason as the deck count above: a regex that stops matching would
    // turn the two assertions below green by iterating over nothing.
    const total = deckNames.reduce(
      (sum, deck) =>
        sum + slideSources(deck).reduce((n, [, src]) => n + [...src.matchAll(MONOSPACE)].length, 0),
      0,
    );
    expect(total).toBeGreaterThanOrEqual(100);
  });

  test('every one of them sets its own direction', () => {
    const offenders: string[] = [];
    for (const deck of deckNames) {
      for (const [name, source] of slideSources(deck)) {
        for (const match of source.matchAll(MONOSPACE)) {
          const block = enclosingObject(source, match.index!);
          if (!/\bdirection:\s*'ltr'/.test(block)) offenders.push(`${deck}/${name}`);
        }
      }
    }
    expect(offenders, 'these code panels would inherit rtl from the slide').toEqual([]);
  });

  test('every one of them aligns left, whatever the slide around it does', () => {
    // `direction` alone leaves `text-align: start`, which an ancestor's explicit
    // `textAlign: 'right'` still overrides — several slides set exactly that on
    // the column holding the panel.
    const offenders: string[] = [];
    for (const deck of deckNames) {
      for (const [name, source] of slideSources(deck)) {
        for (const match of source.matchAll(MONOSPACE)) {
          const block = enclosingObject(source, match.index!);
          if (!/\btextAlign:\s*'left'/.test(block)) offenders.push(`${deck}/${name}`);
        }
      }
    }
    expect(offenders, 'these code panels could be right-aligned').toEqual([]);
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
