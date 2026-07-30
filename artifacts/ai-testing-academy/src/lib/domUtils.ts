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

const MD_RE = /\*\*\[(?<blLabel>[^\]]+)\]\((?<blHref>(?:https?:\/\/|mailto:)[^\s)]+)\)\*\*|\*\*(?<bold>.+?)\*\*|\[(?<lnLabel>[^\]]+)\]\((?<lnHref>(?:https?:\/\/|mailto:)[^\s)]+)\)/g;

/** HTML with Markdown bold/links rendered as real <strong>/<a> tags */
export function linkifyHtml(text: string): string {
  const s = String(text == null ? '' : text);
  let out = '', last = 0, m: RegExpExecArray | null;
  MD_RE.lastIndex = 0;
  while ((m = MD_RE.exec(s))) {
    out += linkifyPlainSegment(s.slice(last, m.index));
    const g = m.groups as Record<string, string | undefined>;
    if (g.blLabel !== undefined) {
      out += `<strong><a href="${esc(g.blHref!)}" target="_blank" rel="noopener">${esc(g.blLabel)}</a></strong>`;
    } else if (g.bold !== undefined) {
      out += `<strong>${linkifyPlainSegment(g.bold)}</strong>`;
    } else {
      out += `<a href="${esc(g.lnHref!)}" target="_blank" rel="noopener">${esc(g.lnLabel!)}</a>`;
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
    if (href) links.push({ label, href });
    last = m.index + m[0].length;
  }
  plain += s.slice(last);
  for (const b of findLinks(plain)) {
    if (!links.some(l => l.label === b.text && l.href === b.href))
      links.push({ label: b.text, href: b.href });
  }
  return { plain, links };
}
