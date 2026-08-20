import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * Web-font loading is a Core Web Vitals contract, and it regresses silently:
 * a render-blocking `<link rel="stylesheet">` still looks and works perfectly
 * in development, it just costs LCP on a cold mobile connection. Nothing else
 * in the suite would notice, so these assertions read the shipped HTML.
 *
 * The rule being enforced: Google Fonts CSS must never be on the render path.
 * It is fetched early via `rel="preload" as="style"` and applied through the
 * print-media swap, with a `<noscript>` fallback for scripting-off clients.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const artifacts = path.resolve(here, '..', '..', 'artifacts');

interface Site {
  name: string;
  html: string;
  css: string;
}

const SITES: Site[] = [
  {
    name: 'ai-testing-academy',
    html: path.join(artifacts, 'ai-testing-academy', 'index.html'),
    css: path.join(artifacts, 'ai-testing-academy', 'src', 'index.css'),
  },
  {
    name: 'portfolio',
    html: path.join(artifacts, 'portfolio', 'index.html'),
    css: path.join(artifacts, 'portfolio', 'src', 'index.css'),
  },
];

const read = (file: string) => readFileSync(file, 'utf8');

/** `<noscript>` legitimately holds a blocking link — it only runs without JS. */
const withoutNoscript = (html: string) => html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');

/**
 * Every `<link …>` tag in the markup, as raw strings.
 *
 * The return type is annotated: without it `match() ?? []` infers
 * `RegExpMatchArray | never[]`, and calling `.filter` on that union types the
 * callback parameter as `never`.
 */
const linkTags = (html: string): string[] => html.match(/<link\b[^>]*>/gi) ?? [];

const isFontStylesheet = (tag: string) =>
  /rel\s*=\s*["']?stylesheet/i.test(tag) && tag.includes('fonts.googleapis.com');

for (const site of SITES) {
  test.describe(site.name, () => {
    test('never puts the Google Fonts stylesheet on the render path', () => {
      const blocking = linkTags(withoutNoscript(read(site.html)))
        .filter(isFontStylesheet)
        .filter(tag => !/media\s*=\s*["']print["']/i.test(tag));

      expect(blocking, 'a font stylesheet without media="print" blocks the first paint').toEqual(
        [],
      );
    });

    test('fetches the font CSS early with a preload', () => {
      const preloads = linkTags(read(site.html)).filter(
        tag =>
          /rel\s*=\s*["']?preload/i.test(tag) &&
          /as\s*=\s*["']?style/i.test(tag) &&
          tag.includes('fonts.googleapis.com'),
      );

      expect(preloads.length, 'no rel=preload as=style for the font CSS').toBeGreaterThan(0);
    });

    test('swaps the print stylesheet in once it has loaded', () => {
      const swapped = linkTags(withoutNoscript(read(site.html)))
        .filter(isFontStylesheet)
        .filter(tag => /onload\s*=\s*["']this\.media\s*=\s*'all'["']/i.test(tag));

      expect(swapped.length, 'the print-media link never becomes "all"').toBeGreaterThan(0);
    });

    test('still applies the fonts when scripting is off', () => {
      const html = read(site.html);
      const noscript = html.match(/<noscript[\s\S]*?<\/noscript>/i)?.[0] ?? '';

      expect(noscript, 'no <noscript> fallback for the font CSS').toContain('fonts.googleapis.com');
    });

    test('warms up both font hosts with preconnect', () => {
      const preconnects = linkTags(read(site.html)).filter(tag =>
        /rel\s*=\s*["']?preconnect/i.test(tag),
      );

      expect(preconnects.some(t => t.includes('fonts.googleapis.com'))).toBe(true);
      // gstatic serves the font files themselves and is a separate origin; it
      // needs `crossorigin` or the connection is opened twice.
      const gstatic = preconnects.find(t => t.includes('fonts.gstatic.com'));
      expect(gstatic, 'no preconnect to fonts.gstatic.com').toBeDefined();
      expect(gstatic!).toMatch(/crossorigin/i);
    });

    test('does not pull fonts in through a remote CSS @import', () => {
      // An `@import url(https://…)` in the app stylesheet is worse than a
      // blocking <link>: the browser only discovers it after this file has been
      // downloaded and parsed, serialising the requests.
      expect(read(site.css)).not.toMatch(/@import\s+url\(\s*['"]?https?:/i);
    });
  });
}

test('the portfolio does not request a font it never renders', () => {
  // Inter was requested here for a long time while the page rendered in Plus
  // Jakarta Sans and Space Mono — a whole round trip for nothing.
  const html = read(SITES[1]!.html);
  expect(html).not.toMatch(/family=Inter\b/);
});
