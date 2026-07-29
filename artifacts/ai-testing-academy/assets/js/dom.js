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
/* HTML-escaped text with real <a> tags around URLs/emails — safe to assign to innerHTML. */
export function linkifyHtml(text) {
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
