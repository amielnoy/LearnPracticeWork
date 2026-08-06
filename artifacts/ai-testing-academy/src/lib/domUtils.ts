/* Ported from assets/js/dom.js — utility functions for text processing */

const ESC_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** HTML-escape untrusted text */
export const esc = (s: unknown): string =>
  String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC_MAP[c]);

/** True when text contains Hebrew characters */
export const isRtlText = (t: string): boolean => /[֐-׿]/.test(t);

const URL_RE = /((?:https?:\/\/|www\.)[^\s<>"')]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const toHref = (raw: string, isEmail: boolean): string =>
  isEmail ? `mailto:${raw}` : (raw.startsWith('http') ? raw : `https://${raw}`);

export interface LinkMatch {
  start: number;
  end: number;
  text: string;
  href: string;
}

/** One text run as pdf.js reports it. */
export interface PdfTextItem {
  str: string;
  hasEOL?: boolean;
}

/**
 * Joins the text runs of one PDF page.
 *
 * Concatenated, never joined with a space. pdf.js has already decided where the
 * words are from the glyph positions and put those spaces inside `str`; a
 * separate item marks a change of font or the end of a line, not a word
 * boundary. Joining with a space broke every word whose styling changed part
 * way through — a "DevOps" with a bold "Ops" arrived as "Dev Ops", and a URL
 * styled the same way arrived unusable.
 */
export function pdfItemsToText(items: readonly PdfTextItem[]): string {
  return items.map(item => item.str + (item.hasEOL ? '\n' : '')).join('');
}

/** Find bare URL/email matches in plain text */
export function findLinks(text: string): LinkMatch[] {
  const s = String(text == null ? '' : text);
  const out: LinkMatch[] = [];
  URL_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = URL_RE.exec(s))) {
    const raw = m[0].replace(/[.,;:!?]+$/, '');
    out.push({ start: m.index, end: m.index + raw.length, text: raw, href: toHref(raw, !!m[2]) });
  }
  return out;
}

function linkifyPlainSegment(text: string): string {
  const s = String(text == null ? '' : text);
  const links = findLinks(s);
  let out = '', last = 0;
  for (const l of links) {
    out += esc(s.slice(last, l.start));
    out += `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.text)}</a>`;
    last = l.end;
  }
  out += esc(s.slice(last));
  return out;
}

/**
 * The href pattern accepts whitespace, which a URL may never legitimately
 * contain, because uploaded résumés routinely arrive with it.
 *
 * pdf.js decides where the words are by measuring the gaps between glyphs, so a
 * PDF that was kerned or justified — which is to say, one made by a word
 * processor — yields `.../in/ami e l - pele d/` for a link that is perfectly
 * intact on the page. Refusing to match that leaves the reader with raw
 * `[label](url)` syntax and no link at all, so it is matched here and repaired
 * in `normalizeHref` instead.
 */
const MD_RE = /\*\*\[(?<blLabel>[^\]]+)\]\((?<blHref>(?:https?:\/\/|mailto:)[^)]+)\)\*\*|\*\*(?<bold>.+?)\*\*|\[(?<lnLabel>[^\]]+)\]\((?<lnHref>(?:https?:\/\/|mailto:)[^)]+)\)/g;

/**
 * Strips the whitespace a text extractor injected. Safe unconditionally: a
 * space inside a URL is always damage, since a real one arrives percent-encoded.
 */
const normalizeHref = (href: string): string => href.replace(/\s+/g, '');

/** HTML with Markdown bold/links rendered as real <strong>/<a> tags */
export function linkifyHtml(text: string): string {
  const s = String(text == null ? '' : text);
  let out = '', last = 0, m: RegExpExecArray | null;
  MD_RE.lastIndex = 0;
  while ((m = MD_RE.exec(s))) {
    out += linkifyPlainSegment(s.slice(last, m.index));
    const g = m.groups as Record<string, string | undefined>;
    if (g.blLabel !== undefined) {
      out += `<strong><a href="${esc(normalizeHref(g.blHref!))}" target="_blank" rel="noopener">${esc(g.blLabel)}</a></strong>`;
    } else if (g.bold !== undefined) {
      out += `<strong>${linkifyPlainSegment(g.bold)}</strong>`;
    } else {
      out += `<a href="${esc(normalizeHref(g.lnHref!))}" target="_blank" rel="noopener">${esc(g.lnLabel!)}</a>`;
    }
    last = m.index + m[0].length;
  }
  out += linkifyPlainSegment(s.slice(last));
  return out;
}

export interface PlainLine {
  plain: string;
  links: Array<{ label: string; href: string }>;
}

/** Plain-text version of a line with link metadata (for jsPDF) */
export function markdownLineToPlain(rawLine: string): PlainLine {
  const s = String(rawLine == null ? '' : rawLine);
  let plain = '', last = 0, m: RegExpExecArray | null;
  const links: Array<{ label: string; href: string }> = [];
  MD_RE.lastIndex = 0;
  while ((m = MD_RE.exec(s))) {
    plain += s.slice(last, m.index);
    const g = m.groups as Record<string, string | undefined>;
    const label = g.blLabel !== undefined ? g.blLabel : (g.bold !== undefined ? g.bold : g.lnLabel!);
    const href = g.blLabel !== undefined ? g.blHref : g.lnHref;
    plain += label;
    if (href) links.push({ label, href: normalizeHref(href) });
    last = m.index + m[0].length;
  }
  plain += s.slice(last);
  for (const b of findLinks(plain)) {
    if (!links.some(l => l.label === b.text && l.href === b.href))
      links.push({ label: b.text, href: b.href });
  }
  return { plain, links };
}
