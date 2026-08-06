/**
 * PDF generation for the improved résumé.
 *
 * Two text builders, one per direction. Both produce a PDF containing *real
 * text*, which is the whole point: an applicant tracking system parses the text
 * layer, so a résumé rendered as an image is invisible to the first filter it
 * has to pass.
 *
 * The Hebrew path exists because jsPDF's built-in fonts are Latin-1 only — ask
 * them for Hebrew and you get nothing. It embeds a Hebrew face and reorders
 * each line into visual order before drawing it.
 *
 * `jsPDF` is bundled with the application; no executable code is loaded from
 * a third-party CDN at runtime.
 */

import { markdownLineToPlain } from './domUtils';
import { toVisualOrder } from './bidi';

export interface LinkInfo {
  label: string;
  href: string;
}

export interface JsPdfTextOptions {
  align?: 'left' | 'center' | 'right';
}

export interface JsPdfInstance {
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
  setFont: (family: string, style?: string) => void;
  setFontSize: (size: number) => void;
  splitTextToSize: (text: string, maxWidth: number) => string[];
  text: (text: string, x: number, y: number, options?: JsPdfTextOptions) => void;
  textWithLink: (text: string, x: number, y: number, opts: { url: string }) => void;
  getTextWidth: (text: string) => number;
  addPage: () => void;
  addImage: (data: string, format: string, x: number, y: number, w: number, h: number) => void;
  link: (x: number, y: number, w: number, h: number, opts: { url: string | null }) => void;
  setPage: (n: number) => void;
  save: (filename: string) => void;
  addFileToVFS: (filename: string, data: string) => void;
  addFont: (filename: string, family: string, style: string) => void;
}

const MARGIN_MM = 15;
const LINE_HEIGHT_MM = 5;
const FONT_SIZE_PT = 10.5;

const HEBREW_FONT_FILE = 'Heebo-Regular.ttf';
const HEBREW_FONT_FAMILY = 'Heebo';

/** Served from `public/`, so it follows the artifact's configured base path. */
export function hebrewFontUrl(): string {
  return `${import.meta.env.BASE_URL}fonts/${HEBREW_FONT_FILE}`;
}

async function newPdf(): Promise<JsPdfInstance> {
  const { jsPDF } = await import('jspdf');
  return new jsPDF('p', 'mm', 'a4') as unknown as JsPdfInstance;
}

/**
 * btoa() takes a binary string, and `String.fromCharCode(...bytes)` on a 43 KB
 * font blows the argument limit — hence the chunking.
 */
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

const hebrewFontCache = new Map<string, Promise<string>>();

/**
 * Fetches the Hebrew face once per session and caches it as base64. Only
 * requested when someone actually exports a Hebrew résumé, so English users
 * never pay for it.
 *
 * The URL is a parameter, defaulted lazily, so the builders can be exercised
 * outside a Vite build — `import.meta.env` does not exist in plain Node.
 */
export function loadHebrewFont(url: string = hebrewFontUrl()): Promise<string> {
  const cached = hebrewFontCache.get(url);
  if (cached) return cached;

  const pending = fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load the Hebrew font (${response.status})`);
      return response.arrayBuffer();
    })
    .then(toBase64)
    .catch(error => {
      // Let the next attempt retry rather than caching the failure.
      hebrewFontCache.delete(url);
      throw error;
    });

  hebrewFontCache.set(url, pending);
  return pending;
}

function drawLineWithLinks(
  pdf: JsPdfInstance,
  line: string,
  x0: number,
  y: number,
  remainingLinks: LinkInfo[],
) {
  let x = x0;
  let cursor = 0;
  for (;;) {
    let best: { l: LinkInfo; pos: number } | null = null;
    for (const l of remainingLinks) {
      const pos = line.indexOf(l.label, cursor);
      if (pos !== -1 && (!best || pos < best.pos)) best = { l, pos };
    }
    if (!best) break;
    if (best.pos > cursor) {
      const seg = line.slice(cursor, best.pos);
      pdf.text(seg, x, y);
      x += pdf.getTextWidth(seg);
    }
    pdf.textWithLink(best.l.label, x, y, { url: best.l.href });
    x += pdf.getTextWidth(best.l.label);
    cursor = best.pos + best.l.label.length;
    remainingLinks.splice(remainingLinks.indexOf(best.l), 1);
  }
  if (cursor < line.length) pdf.text(line.slice(cursor), x, y);
}

/** Left-to-right résumé — jsPDF's built-in Helvetica covers it. */
export async function pdfFromText(text: string): Promise<JsPdfInstance> {
  const pdf = await newPdf();
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(FONT_SIZE_PT);
  const maxWidth = pageW - MARGIN_MM * 2;
  let y = MARGIN_MM;

  for (const rawLine of text.split('\n')) {
    const { plain, links } = markdownLineToPlain(rawLine);
    const wrapped = plain === '' ? [''] : pdf.splitTextToSize(plain, maxWidth);
    const remainingLinks = links.slice();
    for (const line of wrapped) {
      if (y + LINE_HEIGHT_MM > pageH - MARGIN_MM) {
        pdf.addPage();
        y = MARGIN_MM;
      }
      if (remainingLinks.length) drawLineWithLinks(pdf, line, MARGIN_MM, y, remainingLinks);
      else pdf.text(line, MARGIN_MM, y);
      y += LINE_HEIGHT_MM;
    }
  }
  return pdf;
}

/**
 * Right-to-left résumé, as selectable text.
 *
 * The previous implementation rasterised the Hebrew résumé with html2canvas and
 * embedded the picture, which looked identical on screen and was unreadable to
 * every CV parser — the Hebrew user got a file that silently failed the first
 * automated sift while the English user got real text.
 *
 * Links are attached as clickable regions over the whole line rather than
 * around the exact words: glyph-level positioning under bidi reordering is not
 * something jsPDF exposes. The rasterised version had no text at all, so this
 * is still strictly more than before.
 *
 * Lines are reordered by `toVisualOrder` rather than by jsPDF's `setR2L`, which
 * reverses the whole string and so prints every embedded Latin word backwards —
 * see `bidi.ts`.
 */
export async function pdfFromRtlText(text: string, fontUrl?: string): Promise<JsPdfInstance> {
  const fontData = await loadHebrewFont(fontUrl);
  const pdf = await newPdf();

  pdf.addFileToVFS(HEBREW_FONT_FILE, fontData);
  pdf.addFont(HEBREW_FONT_FILE, HEBREW_FONT_FAMILY, 'normal');
  pdf.setFont(HEBREW_FONT_FAMILY, 'normal');
  pdf.setFontSize(FONT_SIZE_PT);

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const maxWidth = pageW - MARGIN_MM * 2;
  const rightEdge = pageW - MARGIN_MM;
  let y = MARGIN_MM;

  for (const rawLine of text.split('\n')) {
    const { plain, links } = markdownLineToPlain(rawLine);
    // Wrap in logical order, then reorder each display line — reordering first
    // would let the wrapper cut a line in the middle of a reversed run.
    const wrapped = plain === '' ? [''] : pdf.splitTextToSize(plain, maxWidth);
    for (const line of wrapped) {
      if (y + LINE_HEIGHT_MM > pageH - MARGIN_MM) {
        pdf.addPage();
        y = MARGIN_MM;
      }
      pdf.text(toVisualOrder(line), rightEdge, y, { align: 'right' });

      const link = links.find(l => line.includes(l.label));
      if (link) {
        const width = pdf.getTextWidth(line);
        pdf.link(rightEdge - width, y - LINE_HEIGHT_MM + 1, width, LINE_HEIGHT_MM, {
          url: link.href,
        });
      }
      y += LINE_HEIGHT_MM;
    }
  }
  return pdf;
}
