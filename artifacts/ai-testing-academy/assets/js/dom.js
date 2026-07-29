/* Tiny DOM helpers shared across the app. */
export const $ = (id) => document.getElementById(id);
const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/* HTML-escape untrusted text (e.g. LLM output) before it touches innerHTML. */
export const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC_MAP[c]);
/* True when the text contains Hebrew — used to flip generated resumes to RTL. */
export const isRtlText = (t) => /[֐-׿]/.test(t);
/* Matches http(s)/www URLs and email addresses inside plain text, so generated
   content (e.g. an AI-rewritten résumé) can be turned into real, clickable links
   instead of dead text. */
const URL_RE = /((?:https?:\/\/|www\.)[^\s<>"')]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const toHref = (raw, isEmail) => isEmail ? `mailto:${raw}` : (raw.startsWith('http') ? raw : `https://${raw}`);
/* Character-range matches for consumers that lay out text themselves (e.g. jsPDF). */
export function findLinks(text) {
    const s = String(text == null ? '' : text);
    const out = [];
    URL_RE.lastIndex = 0;
    let m;
    while ((m = URL_RE.exec(s))) {
        const raw = m[0].replace(/[.,;:!?]+$/, ''); // drop trailing punctuation caught by the greedy match
        out.push({ start: m.index, end: m.index + raw.length, text: raw, href: toHref(raw, !!m[2]) });
    }
    return out;
}
/* HTML-escaped text with real <a> tags around bare URLs/emails only (no Markdown). */
function linkifyPlainSegment(text) {
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
/* Matches Markdown `**bold**`, `**[label](url)**` and `[label](url)` tokens, so
   raw Markdown coming back from the LLM (e.g. "[LinkedIn](https://...)") renders
   as real formatting/links instead of literal asterisks and brackets. */
const MD_RE = /\*\*\[(?<blLabel>[^\]]+)\]\((?<blHref>(?:https?:\/\/|mailto:)[^\s)]+)\)\*\*|\*\*(?<bold>.+?)\*\*|\[(?<lnLabel>[^\]]+)\]\((?<lnHref>(?:https?:\/\/|mailto:)[^\s)]+)\)/g;
/* HTML-escaped text with Markdown bold/links rendered as real <strong>/<a> tags,
   plus any remaining bare URL/email also turned into a real link. Safe for innerHTML. */
export function linkifyHtml(text) {
    const s = String(text == null ? '' : text);
    let out = '', last = 0, m;
    MD_RE.lastIndex = 0;
    while ((m = MD_RE.exec(s))) {
        out += linkifyPlainSegment(s.slice(last, m.index));
        const g = m.groups;
        if (g.blLabel !== undefined) {
            out += `<strong><a href="${esc(g.blHref)}" target="_blank" rel="noopener">${esc(g.blLabel)}</a></strong>`;
        }
        else if (g.bold !== undefined) {
            out += `<strong>${linkifyPlainSegment(g.bold)}</strong>`;
        }
        else {
            out += `<a href="${esc(g.lnHref)}" target="_blank" rel="noopener">${esc(g.lnLabel)}</a>`;
        }
        last = m.index + m[0].length;
    }
    out += linkifyPlainSegment(s.slice(last));
    return out;
}
/* Plain-text (Markdown stripped) version of a single line/segment, plus the
   {label, href} pairs recovered from it — for consumers that lay out their own
   text and can't use innerHTML (e.g. jsPDF's native text API). */
export function markdownLineToPlain(rawLine) {
    const s = String(rawLine == null ? '' : rawLine);
    let plain = '', last = 0, m;
    const links = [];
    MD_RE.lastIndex = 0;
    while ((m = MD_RE.exec(s))) {
        plain += s.slice(last, m.index);
        const g = m.groups;
        const label = g.blLabel !== undefined ? g.blLabel : (g.bold !== undefined ? g.bold : g.lnLabel);
        const href = g.blLabel !== undefined ? g.blHref : g.lnHref;
        plain += label;
        if (href)
            links.push({ label, href });
        last = m.index + m[0].length;
    }
    plain += s.slice(last);
    for (const b of findLinks(plain)) {
        if (!links.some(l => l.label === b.text && l.href === b.href))
            links.push({ label: b.text, href: b.href });
    }
    return { plain, links };
}
