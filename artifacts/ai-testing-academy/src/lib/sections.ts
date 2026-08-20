/**
 * The order of the page, in one place.
 *
 * There used to be three answers to "what order are the sections in": the array
 * in `locale.nav.links`, the JSX in `HomePage`, and the static prerender in
 * `index.html`. None of them agreed. Reading down the nav jumped the reader
 * 16237 → 1144 → 13693 → 2749 → 3648 → 4597 pixels, the scroll-spy highlight
 * travelled 2 → 4 → 5 → 6 → 3 → 1 as you scrolled, and the numbered headings
 * counted 01 → 03 → 02 with three sections carrying no number at all.
 *
 * So this is the order, and `HomePage` and `Nav` both render from it. The
 * numbers are stored rather than derived from the array index on purpose: they
 * appear in the UI, so changing the order should be a visible decision about
 * renumbering, not a silent renumber.
 *
 * Labels live in the locale files keyed by `id` — the order is not translated,
 * only the words are.
 */

export interface SectionDef {
  /** The DOM id, the nav href target, and the locale label key. */
  id: string;
  /** The chip shown in the nav and beside the section heading. */
  num: string;
}

export const SECTIONS: readonly SectionDef[] = [
  { id: 'resume', num: '01' },
  { id: 'lecture-series', num: '02' },
  { id: 'interview-talk', num: '03' },
  { id: 'interview-questions', num: '04' },
  { id: 'coding-challenges', num: '05' },
  // Last because it is optional: the tool launcher's own copy says provider
  // setup can wait until the free daily allowance runs out. It still gets a
  // number, because a list where only some entries are numbered reads as a
  // sequence with holes in it.
  { id: 'setup', num: '06' },
];

/** The chip for one section, for components that render their own heading. */
export function sectionNum(id: string): string {
  return SECTIONS.find(section => section.id === id)?.num ?? '';
}
