/**
 * Logical-to-visual reordering for right-to-left text.
 *
 * PDF has no bidi engine: it paints glyphs in the order it is handed them, so a
 * right-to-left line has to be reordered before it is drawn. jsPDF's own
 * `setR2L(true)` reverses the entire string, which is only correct when the
 * line is pure Hebrew. Hand it a Hebrew sentence containing "Playwright" and
 * the page reads "thgirwyalP"; an email address comes out backwards too. A
 * technical resume is mixed by definition — tool names, an email address, a
 * LinkedIn URL, dates — so whole-string reversal garbles exactly the words a
 * human reader, and an ATS keyword match, are looking for.
 *
 * What is implemented here is the reordering core of the Unicode Bidirectional
 * Algorithm for a paragraph whose base direction is RTL: classify each
 * character, resolve the neutrals between runs, then emit the runs
 * right-to-left with only the RTL ones reversed. It is deliberately not the
 * full UBA — no explicit embedding or override codes (RLE/LRE/PDF/RLI...), no
 * per-paragraph direction detection, no numeric-separator subtleties. Resume
 * prose does not contain those, and what is implemented is the part that
 * decides whether the document is readable.
 *
 * The character ranges below are written as escapes on purpose: as literals
 * they are unreadable, and a reviewer cannot tell a correct range from a typo.
 */

/** Hebrew, Arabic, Syriac and Thaana, plus the Arabic presentation forms. */
const RTL_RE = /[\u0590-\u05ff\u0600-\u06ff\u0700-\u074f\u0780-\u07bf\ufb1d-\ufdff\ufe70-\ufeff]/;

/**
 * Latin letters and digits. Digits count as left-to-right so that "2019-2024"
 * and "100%" keep their reading order inside a Hebrew line.
 */
const LTR_RE = /[A-Za-z0-9\u00c0-\u024f]/;

/**
 * Combining marks — the generic Latin block, Hebrew niqqud and cantillation,
 * and Arabic harakat. They render on top of the character *before* them, so
 * reversing a run has to carry them along with their base rather than strand
 * them on the neighbouring glyph.
 */
const COMBINING_RE =
  /[\u0300-\u036f\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670]/;

/**
 * Paired characters that point the other way once a run is reversed. Without
 * this, a parenthesised year inside a Hebrew line comes out as ")2019(".
 */
const MIRRORED: Record<string, string> = {
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  '«': '»',
  '»': '«',
  '‹': '›',
  '›': '‹',
};

/**
 * European terminators — the signs that decorate a number without being part of
 * it. UBA rule W5 attaches a run of them to an adjacent number, which is what
 * keeps "40%" from rendering as "%40" inside a Hebrew line.
 */
const TERMINATOR_RE = /[%$+#°€£₪¢]/;
const DIGIT_RE = /[0-9]/;

/**
 * The pairs the bracket rule applies to, opening half mapped to closing half.
 *
 * Deliberately narrower than `MIRRORED`: Unicode gives only these three a
 * paired-bracket type. Angle brackets and guillemets mirror but do not pair, so
 * pairing them here would let a "less than" sign in one clause capture a
 * "greater than" in another and drag unrelated text into its direction.
 */
const BRACKET_PAIRS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
};

type Direction = 'R' | 'L';
type CharClass = Direction | 'N';

function classify(ch: string): CharClass {
  if (RTL_RE.test(ch)) return 'R';
  if (LTR_RE.test(ch)) return 'L';
  return 'N';
}

/**
 * UBA rule W5: a run of terminators adjacent to a number joins the number, so
 * the sign stays on the side of the digits it belongs to.
 */
function resolveTerminators(chars: string[], classes: CharClass[]): void {
  let i = 0;
  while (i < chars.length) {
    if (classes[i] !== 'N' || !TERMINATOR_RE.test(chars[i]!)) {
      i++;
      continue;
    }
    let end = i;
    while (end < chars.length && classes[end] === 'N' && TERMINATOR_RE.test(chars[end]!)) end++;
    const touchesNumber =
      (i > 0 && DIGIT_RE.test(chars[i - 1]!)) || (end < chars.length && DIGIT_RE.test(chars[end]!));
    if (touchesNumber) for (let j = i; j < end; j++) classes[j] = 'L';
    i = end;
  }
}

/**
 * UBA rule N0, simplified: both halves of a bracket pair take the direction of
 * whatever they enclose, so the pair cannot be split across runs.
 *
 * Without it the two halves are resolved independently as ordinary neutrals,
 * and a parenthesised year at the end of a Hebrew line loses its closing
 * bracket to the RTL run — the line renders with two opening brackets and no
 * closing one. Unmatched brackets are left alone and fall through to N1/N2.
 */
function resolveBracketPairs(chars: string[], classes: CharClass[]): void {
  const open: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]!;
    if (BRACKET_PAIRS[ch]) {
      open.push(i);
      continue;
    }
    const start = open.length ? open[open.length - 1]! : -1;
    if (start === -1 || BRACKET_PAIRS[chars[start]!] !== ch) continue;
    open.pop();

    let enclosed: Direction | null = null;
    for (let j = start + 1; j < i; j++) {
      if (classes[j] === 'R') {
        enclosed = 'R';
        break;
      }
      if (classes[j] === 'L') enclosed = 'L';
    }
    if (enclosed) classes[start] = classes[i] = enclosed;
  }
}

/**
 * UBA rules N1/N2, with the paragraph direction standing in as the boundary at
 * both ends of the line: a neutral run flanked by the same direction takes it,
 * and every other neutral run takes the paragraph direction. Concretely, the
 * space in "CI/CD, Playwright" stays left-to-right, while the space between two
 * Hebrew words does not.
 */
function resolveNeutrals(classes: CharClass[], base: Direction): Direction[] {
  const resolved: Direction[] = classes.map(c => (c === 'N' ? base : c));
  let i = 0;
  while (i < classes.length) {
    if (classes[i] !== 'N') {
      i++;
      continue;
    }
    let end = i;
    while (end < classes.length && classes[end] === 'N') end++;
    const before = i > 0 ? (classes[i - 1] as Direction) : base;
    const after = end < classes.length ? (classes[end] as Direction) : base;
    const direction = before === after ? before : base;
    for (let j = i; j < end; j++) resolved[j] = direction;
    i = end;
  }
  return resolved;
}

/** Groups characters into maximal same-direction runs. */
function toRuns(
  chars: string[],
  directions: Direction[],
): Array<{ direction: Direction; chars: string[] }> {
  const runs: Array<{ direction: Direction; chars: string[] }> = [];
  for (let i = 0; i < chars.length; i++) {
    const last = runs[runs.length - 1];
    if (last && last.direction === directions[i]) last.chars.push(chars[i]!);
    else runs.push({ direction: directions[i]!, chars: [chars[i]!] });
  }
  return runs;
}

/**
 * Reverses a run by cluster rather than by code point, so a combining mark
 * stays behind the character it decorates.
 */
function reverseClusters(chars: string[]): string[] {
  const clusters: string[][] = [];
  for (const ch of chars) {
    if (clusters.length && COMBINING_RE.test(ch)) clusters[clusters.length - 1]!.push(ch);
    else clusters.push([ch]);
  }
  return clusters.reverse().flatMap(cluster => cluster.map(ch => MIRRORED[ch] ?? ch));
}

/**
 * Reorders one line of right-to-left text into the visual order a PDF has to be
 * handed: left-most glyph first.
 *
 * Call it per line and *after* wrapping. Reordering is defined on a display
 * line, so reordering first and wrapping the result would cut runs at the wrong
 * places.
 */
export function toVisualOrder(line: string): string {
  // Iterate by code point so characters outside the BMP survive the round trip.
  const chars = [...line];
  if (chars.length === 0) return line;

  const classes = chars.map(classify);
  resolveTerminators(chars, classes);
  resolveBracketPairs(chars, classes);
  const directions = resolveNeutrals(classes, 'R');
  const runs = toRuns(chars, directions);

  // The paragraph is right-to-left, so the last logical run is drawn left-most.
  return runs
    .reverse()
    .flatMap(run => (run.direction === 'R' ? reverseClusters(run.chars) : run.chars))
    .join('');
}
