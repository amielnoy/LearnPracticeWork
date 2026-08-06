import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadHebrewFont, pdfFromRtlText, pdfFromText } from '@academy/lib/resumePdf';

/**
 * These tests build a real PDF with the real jsPDF and the real embedded font,
 * then read the text back out with pdf.js — the same library the site uses to
 * parse an uploaded résumé.
 *
 * Asserting on the extracted text layer, rather than on which jsPDF methods
 * were called, is deliberate. The promise this feature makes is that an
 * applicant tracking system can read the file; a mock can only tell us that we
 * called `text()` rather than `addImage()`, which was also true of the version
 * that printed every English word backwards.
 */

// Resolve from this file, not process.cwd(): `pnpm --filter @workspace/tests`
// runs with `tests/` as the working directory in CI, while direct Playwright
// invocations commonly run from the repository root.
const here = path.dirname(fileURLToPath(import.meta.url));
const ACADEMY_ROOT = path.resolve(here, '../../artifacts/ai-testing-academy');
const FONT_PATH = path.join(ACADEMY_ROOT, 'public/fonts/Heebo-Regular.ttf');
const PDFJS_PATH = path.join(ACADEMY_ROOT, 'node_modules/pdfjs-dist/legacy/build/pdf.mjs');
// Only needed to keep pdf.js quiet about the built-in Helvetica of the LTR path.
const STANDARD_FONTS = `${path.join(ACADEMY_ROOT, 'node_modules/pdfjs-dist/standard_fonts')}/`;

interface PdfOutput {
  output: (type: 'arraybuffer') => ArrayBuffer;
}

/**
 * The font is fetched over HTTP by the browser. In Node there is no server, so
 * the fetch is stubbed with the bytes off disk — the file under test still runs
 * its own loading, decoding and embedding path.
 */
function stubFontFetch(): { calls: string[]; restore: () => void } {
  const original = globalThis.fetch;
  const calls: string[] = [];
  const bytes = fs.readFileSync(FONT_PATH);
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    calls.push(String(input));
    return {
      ok: true,
      arrayBuffer: async () =>
        bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    };
  }) as unknown as typeof fetch;
  return { calls, restore: () => { globalThis.fetch = original; } };
}

/** The text layer, one entry per page, as a PDF parser would read it. */
async function extractPages(pdf: unknown): Promise<string[]> {
  const bytes = (pdf as PdfOutput).output('arraybuffer');
  const pdfjs = await import(PDFJS_PATH);
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(bytes),
    standardFontDataUrl: STANDARD_FONTS,
  }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const content = await (await doc.getPage(i)).getTextContent();
    pages.push(content.items.map((item: { str: string }) => item.str).join(''));
  }
  return pages;
}

async function extractText(pdf: unknown): Promise<string> {
  return (await extractPages(pdf)).join('\n');
}

test.describe('pdfFromText — the left-to-right résumé', () => {
  test('writes the résumé as a readable text layer', async () => {
    const pdf = await pdfFromText('Amiel Peled\nQA Automation Engineer');
    const text = await extractText(pdf);
    expect(text).toContain('Amiel Peled');
    expect(text).toContain('QA Automation Engineer');
  });

  test('renders a Markdown link by its label, not its raw syntax', async () => {
    const text = await extractText(await pdfFromText('[LinkedIn](https://example.com/in/x)'));
    expect(text).toContain('LinkedIn');
    expect(text).not.toContain('](');
  });
});

test.describe('pdfFromRtlText — the Hebrew résumé', () => {
  // Each test uses its own URL because the loader caches per URL for the
  // lifetime of the module.
  let font: ReturnType<typeof stubFontFetch> | undefined;

  test.beforeEach(() => { font = stubFontFetch(); });
  test.afterEach(() => { font?.restore(); });

  test('produces a text layer rather than a picture of one', async () => {
    const pdf = await pdfFromRtlText('מהנדס אוטומציה', 'http://stub/a.ttf');
    expect((await extractText(pdf)).trim()).not.toBe('');
  });

  test('keeps every embedded Latin token forwards', async () => {
    // The regression this whole module exists for. jsPDF's setR2L(true)
    // reverses the entire line, so these came out as "thgirwyalP", "DC/IC" and
    // "ia.zunagro@leima" — exactly the tokens an ATS matches on.
    const pdf = await pdfFromRtlText(
      'מהנדס אוטומציה עם Playwright ו-CI/CD, amiel@organuz.ai',
      'http://stub/b.ttf',
    );
    const text = await extractText(pdf);
    for (const token of ['Playwright', 'CI/CD', 'amiel@organuz.ai']) {
      expect(text).toContain(token);
    }
    expect(text).not.toContain('thgirwyalP');
  });

  test('carries the Hebrew through as Hebrew characters', async () => {
    const text = await extractText(await pdfFromRtlText('מהנדס', 'http://stub/c.ttf'));
    expect(text).toMatch(/[֐-׿]/);
  });

  test('breaks a long résumé across pages instead of running off the first', async () => {
    const long = Array.from({ length: 120 }, (_, i) => `שורה ${i}`).join('\n');
    const pages = await extractPages(await pdfFromRtlText(long, 'http://stub/d.ttf'));
    expect(pages.length).toBeGreaterThan(1);
    expect(pages[pages.length - 1]!.trim()).not.toBe('');
  });

  test('fetches the font once even across several exports', async () => {
    await pdfFromRtlText('מהנדס', 'http://stub/e.ttf');
    await pdfFromRtlText('אוטומציה', 'http://stub/e.ttf');
    expect(font?.calls.filter(url => url === 'http://stub/e.ttf')).toHaveLength(1);
  });
});

test.describe('loadHebrewFont', () => {
  test('reports a failed fetch instead of emitting a PDF with no Hebrew in it', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = (async () => ({ ok: false, status: 404 })) as unknown as typeof fetch;
    try {
      await expect(loadHebrewFont('http://stub/missing.ttf')).rejects.toThrow(/404/);
    } finally {
      globalThis.fetch = original;
    }
  });

  test('retries after a failure rather than caching it forever', async () => {
    const original = globalThis.fetch;
    let attempts = 0;
    const bytes = fs.readFileSync(FONT_PATH);
    globalThis.fetch = (async () => {
      attempts++;
      if (attempts === 1) return { ok: false, status: 503 };
      return {
        ok: true,
        arrayBuffer: async () =>
          bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      };
    }) as unknown as typeof fetch;
    try {
      await expect(loadHebrewFont('http://stub/flaky.ttf')).rejects.toThrow();
      expect(await loadHebrewFont('http://stub/flaky.ttf')).not.toBe('');
      expect(attempts).toBe(2);
    } finally {
      globalThis.fetch = original;
    }
  });
});
