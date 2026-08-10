import { test, expect } from '@playwright/test';
import { toVisualOrder } from '@academy/lib/bidi';

/**
 * `toVisualOrder` decides what a Hebrew résumé PDF actually says. PDF stores
 * glyphs in the order they are painted, so getting this wrong does not produce
 * a subtly-off layout — it produces a document that reads backwards.
 *
 * The reference point throughout is jsPDF's own `setR2L(true)`, which reverses
 * the entire string. Several assertions below exist specifically to pin down
 * that we no longer do that.
 */

const HEB = 'שלום';
const HEB_REVERSED = [...HEB].reverse().join('');

test.describe('pure runs', () => {
  test('reverses a Hebrew-only line', () => {
    expect(toVisualOrder(HEB)).toBe(HEB_REVERSED);
  });

  test('leaves a Latin-only line untouched', () => {
    expect(toVisualOrder('Playwright and CI/CD')).toBe('Playwright and CI/CD');
  });

  test('returns the empty string unchanged', () => {
    expect(toVisualOrder('')).toBe('');
  });

  test('is its own inverse for a pure Hebrew line', () => {
    expect(toVisualOrder(toVisualOrder(HEB))).toBe(HEB);
  });
});

test.describe('embedded Latin runs', () => {
  test('keeps an embedded Latin word readable', () => {
    // The whole point: setR2L would render this "thgirwyalP".
    expect(toVisualOrder(`${HEB} Playwright`)).toContain('Playwright');
  });

  test('places the Latin run to the left of the Hebrew that precedes it', () => {
    const visual = toVisualOrder(`${HEB} Playwright`);
    expect(visual.indexOf('Playwright')).toBeLessThan(visual.indexOf(HEB_REVERSED));
  });

  test('keeps an email address intact', () => {
    expect(toVisualOrder(`${HEB} amiel@organuz.ai`)).toContain('amiel@organuz.ai');
  });

  test('keeps a URL intact', () => {
    expect(toVisualOrder(`${HEB} https://example.com/a-b`)).toContain('https://example.com/a-b');
  });

  test('keeps a slashed acronym intact', () => {
    // "CI/CD" reversed is "DC/IC" — a different, plausible-looking token.
    expect(toVisualOrder(`${HEB} CI/CD`)).toContain('CI/CD');
  });

  test('preserves the order of several Latin runs relative to each other', () => {
    const visual = toVisualOrder(`Playwright ${HEB} Docker`);
    expect(visual.indexOf('Docker')).toBeLessThan(visual.indexOf('Playwright'));
  });

  test('loses no characters', () => {
    const line = `${HEB} Playwright ${HEB} 2019-2024`;
    expect([...toVisualOrder(line)].sort().join('')).toBe([...line].sort().join(''));
  });
});

test.describe('digits', () => {
  test('keeps a year readable', () => {
    expect(toVisualOrder(`${HEB} 2024`)).toContain('2024');
  });

  test('keeps a date range readable', () => {
    expect(toVisualOrder(`${HEB} 2019-2024`)).toContain('2019-2024');
  });

  test('keeps a percentage readable', () => {
    expect(toVisualOrder(`${HEB} 40%`)).toContain('40%');
  });
});

test.describe('neutrals between runs', () => {
  test('keeps the separator inside a Latin phrase', () => {
    expect(toVisualOrder(`${HEB} CI/CD, Playwright`)).toContain('CI/CD, Playwright');
  });

  test('attaches a Hebrew prefix to the Latin word it qualifies', () => {
    // Reading right-to-left the line is "<heb> ו-CI/CD", so the hyphen must sit
    // immediately left of the vav and immediately right of the Latin run.
    expect(toVisualOrder(`${HEB} ו-CI/CD`)).toBe(`CI/CD-ו ${HEB_REVERSED}`);
  });
});

test.describe('mirrored pairs', () => {
  test('keeps a parenthesised year balanced and in order', () => {
    expect(toVisualOrder(`${HEB} (2019-2024)`)).toContain('(2019-2024)');
  });

  test('mirrors brackets that enclose Hebrew', () => {
    const visual = toVisualOrder(`(${HEB})`);
    expect(visual).toBe(`(${HEB_REVERSED})`);
  });

  test('emits as many closing brackets as opening ones', () => {
    const visual = toVisualOrder(`${HEB} (${HEB} Playwright) ${HEB}`);
    expect([...visual].filter(c => c === '(').length).toBe(
      [...visual].filter(c => c === ')').length,
    );
  });

  test('does not pair angle brackets across unrelated clauses', () => {
    // "<" and ">" mirror but are not paired brackets in Unicode. Pairing them
    // would let these two comparisons capture the Hebrew between them.
    const visual = toVisualOrder(`a < 5 ${HEB} b > 3`);
    expect(visual).toContain('a < 5');
    expect(visual).toContain('b > 3');
  });

  test('mirrors an unmatched bracket instead of pairing it with something else', () => {
    // A smiley, not a bracket pair. It falls through to the neutral rules,
    // lands in the RTL run, and mirrors — which is what any RTL renderer does
    // with a lone bracket. The point of the assertion is that it stays a single
    // character and does not drag an unrelated bracket along with it.
    const visual = toVisualOrder(`${HEB} :)`);
    expect(visual).toBe(`(: ${HEB_REVERSED}`);
  });
});

test.describe('combining marks', () => {
  test('keeps niqqud attached to the letter it decorates', () => {
    // Bet + dagesh. Reversing per code point would strand the dagesh on the
    // preceding glyph; reversing per cluster keeps the pair together.
    const withNiqqud = 'בּג';
    const visual = toVisualOrder(withNiqqud);
    expect(visual).toBe('גבּ');
    expect(visual.indexOf('ּ')).toBe(visual.indexOf('ב') + 1);
  });
});

test.describe('the résumé line that motivated this', () => {
  const LOGICAL = 'מהנדס אוטומציה עם Playwright ו-CI/CD, amiel@organuz.ai (2019-2024)';

  test('renders every Latin token forwards', () => {
    const visual = toVisualOrder(LOGICAL);
    for (const token of ['Playwright', 'CI/CD', 'amiel@organuz.ai', '(2019-2024)']) {
      expect(visual).toContain(token);
    }
  });

  test('is not a whole-string reversal', () => {
    expect(toVisualOrder(LOGICAL)).not.toBe([...LOGICAL].reverse().join(''));
  });
});
