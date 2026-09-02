import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * The palette, checked the way the stylesheet claims it was checked.
 *
 * `app.css` documents contrast ratios in its comments — "6.71 on --accent",
 * "5.02 against --card" — and a comment is a promise nothing enforces. The
 * numbers were true when they were measured and stay in the file long after a
 * colour is nudged, which is how a palette ends up with a paragraph explaining
 * an accessibility decision that no longer holds.
 *
 * So the ratios are computed here from the tokens themselves. Every pair below
 * is one the site actually renders: ink on its surface, ink on the accent fill
 * it sits on, an indicator against the surface it has to be visible against.
 *
 * The other two checks are for the mistakes that are invisible until someone
 * switches themes or loses a webfont: a token added to one theme and forgotten
 * in the other, and a `font-family` the CSS asks for that the page never loads
 * — which is exactly what JetBrains Mono was, silently falling back to
 * Consolas everywhere the design called for mono.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const app = path.join(root, 'artifacts/ai-testing-academy');
const css = readFileSync(path.join(app, 'src/app.css'), 'utf8');
const html = readFileSync(path.join(app, 'index.html'), 'utf8');

/** The declarations inside one block, as token → value. */
function tokensIn(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  expect(start, `${selector} is not in app.css`).toBeGreaterThan(-1);
  const open = css.indexOf('{', start);
  const body = css.slice(open + 1, css.indexOf('\n}', open));
  const found: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    found[name!] = value!.trim();
  }
  return found;
}

const light = tokensIn(':root{');
const dark = tokensIn('html[data-theme="dark"]{');

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const clean = hex.trim().replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map(ch => ch + ch)
          .join('')
      : clean;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * channel(r!) + 0.7152 * channel(g!) + 0.0722 * channel(b!);
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x!, y!) + 0.05) / (Math.min(x!, y!) + 0.05);
}

/** Foreground, background, and the ratio the pair has to clear. */
const PAIRS: Array<[fg: string, bg: string, min: number, why: string]> = [
  ['--text', '--bg', 4.5, 'body copy on the page'],
  ['--text', '--card', 4.5, 'body copy on a card'],
  ['--muted', '--bg', 4.5, 'secondary copy on the page'],
  ['--muted', '--card', 4.5, 'secondary copy on a card'],
  ['--accent', '--bg', 4.5, 'links and sub-headings'],
  ['--accent', '--card', 4.5, 'links inside a card'],
  ['--accent2', '--bg', 4.5, 'the far end of every accent gradient carries text too'],
  ['--on-accent', '--accent', 4.5, 'ink on the primary button'],
  ['--on-accent', '--accent2', 4.5, 'the same ink at the gradient’s far end'],
  ['--green', '--card', 4.5, 'the completed state'],
  ['--yellow', '--card', 4.5, 'the warning state'],
  ['--red', '--card', 4.5, 'the error state'],
  ['--code-text', '--code-bg', 4.5, 'code blocks, which keep one surface in both themes'],
  // WCAG 1.4.11: a control boundary and a focus ring are non-text indicators.
  ['--border-field', '--field-bg', 3, 'the visible boundary of an input'],
  ['--ds-ring', '--card', 3, 'the keyboard focus ring against what it lands on'],
];

for (const [themeName, palette] of [
  ['light', light],
  ['dark', dark],
] as const) {
  test.describe(`${themeName} palette`, () => {
    for (const [fg, bg, min, why] of PAIRS) {
      test(`${fg} on ${bg} clears ${min}:1 — ${why}`, () => {
        // A theme that does not restate a token inherits the light one, which
        // is deliberate for the few that are theme-independent.
        const front = palette[fg] ?? light[fg];
        const behind = palette[bg] ?? light[bg];
        expect(front, `${fg} is defined in neither ${themeName} nor :root`).toBeDefined();
        expect(behind, `${bg} is defined in neither ${themeName} nor :root`).toBeDefined();
        expect(front!.startsWith('#'), `${fg} is ${front}, not a hex literal`).toBe(true);
        expect(behind!.startsWith('#'), `${bg} is ${behind}, not a hex literal`).toBe(true);

        const ratio = contrast(front!, behind!);
        expect(
          Number(ratio.toFixed(2)),
          `${front} on ${behind} measures ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(min);
      });
    }
  });
}

test('every colour the light theme names, the dark theme answers for', () => {
  // Non-colour tokens are shared on purpose: shape and type do not change with
  // the lights, and neither does the code surface, which is dark in both.
  const shared = new Set([
    '--font-display',
    '--font-mono',
    '--code-text',
    '--code-tag',
    '--ds-accent',
    '--shadow',
    '--on-accent',
    '--border-field',
    '--ds-ring',
    '--ds-shadow-tint',
    '--code-bg',
    '--field-bg',
  ]);
  const missing = Object.keys(light).filter(
    token => !shared.has(token) && !(token in dark) && light[token]!.startsWith('#'),
  );
  expect(missing, 'these repaint the light theme and were never given a dark value').toEqual([]);
});

test('every font the stylesheet asks for is a font the page loads', () => {
  const requested = new Set<string>();
  // Both spellings: a direct `font-family:` and a `--font-*` token holding a
  // stack. Missing the second is not hypothetical — the mono stack lives in
  // `--font-mono`, so a check that only read `font-family:` declarations found
  // nothing to complain about when the font was removed from the page.
  for (const [, list] of css.matchAll(/(?:font-family|--font-[a-z-]+)\s*:\s*([^;}]+)/g)) {
    for (const [, quoted] of list!.matchAll(/"([^"]+)"/g)) requested.add(quoted!);
  }
  expect(requested.size, 'no font families were found to check').toBeGreaterThan(1);
  // System stacks are always available; only webfonts have to be fetched.
  const system = new Set(['Segoe UI', 'Consolas']);
  const unloaded = [...requested].filter(
    family => !system.has(family) && !html.includes(family.replace(/ /g, '+')),
  );
  expect(
    unloaded.sort(),
    'named in app.css but never requested in index.html, so it silently falls back',
  ).toEqual([]);
});
