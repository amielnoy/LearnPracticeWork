import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '@playwright/test';

/**
 * Both public sites are bilingual on a single set of URLs — `?lang=` picks the
 * language — so the only thing telling Google that a Hebrew version exists is
 * the hreflang cluster. It regresses silently: the page looks perfect in both
 * languages while half of it is missing from the index.
 *
 * The rule being enforced: every language variant is declared, the declarations
 * are reciprocal (identical on each variant, each listing itself), and the
 * sitemap says the same thing as the markup.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const artifacts = path.resolve(here, '..', '..', 'artifacts');

interface Site {
  name: string;
  html: string;
  sitemap: string;
  robots: string;
  /** Absolute URL of the x-default page — the one `?lang=` is appended to. */
  base: string;
  /** Where robots.txt should advertise the sitemap (the site root). */
  root: string;
}

const SITES: Site[] = [
  {
    name: 'ai-testing-academy',
    html: path.join(artifacts, 'ai-testing-academy', 'index.html'),
    sitemap: path.join(artifacts, 'ai-testing-academy', 'public', 'sitemap.xml'),
    robots: path.join(artifacts, 'ai-testing-academy', 'public', 'robots.txt'),
    base: 'https://free-tier-insights--amielpeled.replit.app/ai-testing-academy/',
    root: 'https://free-tier-insights--amielpeled.replit.app/ai-testing-academy/',
  },
  {
    name: 'ai-testing-lecture-1',
    html: path.join(artifacts, 'ai-testing-lecture-1', 'index.html'),
    sitemap: path.join(artifacts, 'ai-testing-lecture-1', 'public', 'sitemap.xml'),
    robots: path.join(artifacts, 'ai-testing-lecture-1', 'public', 'robots.txt'),
    // Not the deck root: "/" renders the deck in an iframe, so it is an empty
    // shell to a crawler and its iframe drops `?lang`. Only /slide1 varies by
    // language, so only /slide1 may be declared as a language variant.
    base: 'https://free-tier-insights--amielpeled.replit.app/ai-testing-lecture-1/slide1',
    root: 'https://free-tier-insights--amielpeled.replit.app/ai-testing-lecture-1/',
  },
];

const read = (file: string) => readFileSync(file, 'utf8');

/** hreflang → href, from the `<link rel="alternate">` tags in the markup. */
function htmlAlternates(html: string): Record<string, string> {
  const out: Record<string, string> = {};
  const tags: string[] = html.match(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi) ?? [];
  for (const tag of tags) {
    const lang = tag.match(/hreflang=["']([^"']+)["']/i)?.[1];
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (lang && href) out[lang] = href;
  }
  return out;
}

for (const site of SITES) {
  test.describe(site.name, () => {
    const expected = (base: string) => ({
      en: `${base}?lang=en`,
      he: `${base}?lang=he`,
      'x-default': base,
    });

    test('declares every language variant in the markup', () => {
      expect(htmlAlternates(read(site.html))).toEqual(expected(site.base));
    });

    test('lists every variant in the sitemap', () => {
      const sitemap = read(site.sitemap);
      const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]!);

      expect(locs.sort()).toEqual(Object.values(expected(site.base)).sort());
    });

    test('repeats the full alternate set on every sitemap entry', () => {
      // A partial or one-way annotation is treated as unconfirmed and the whole
      // cluster is dropped, so each <url> has to carry all three.
      const sitemap = read(site.sitemap);
      const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]!);

      expect(entries.length).toBe(3);
      for (const entry of entries) {
        const langs = [...entry.matchAll(/hreflang="([^"]+)"/g)].map(m => m[1]!).sort();
        expect(langs).toEqual(['en', 'he', 'x-default']);
      }
    });

    test('agrees with itself: markup and sitemap point at the same URLs', () => {
      const fromHtml = Object.values(htmlAlternates(read(site.html))).sort();
      const fromSitemap = [
        ...new Set([...read(site.sitemap).matchAll(/hreflang="[^"]+" href="([^"]+)"/g)].map(m => m[1]!)),
      ].sort();

      expect(fromSitemap).toEqual(fromHtml);
    });

    test('advertises the sitemap to crawlers', () => {
      expect(read(site.robots)).toContain(`${site.root}sitemap.xml`);
    });

    test('tells social scrapers that a second locale exists', () => {
      // These never run JS, so the alternate locale has to be in the static
      // markup or a shared Hebrew link previews as English.
      expect(read(site.html)).toMatch(
        /<meta\s+property=["']og:locale:alternate["']\s+content=["']he_IL["']/i,
      );
    });
  });
}
