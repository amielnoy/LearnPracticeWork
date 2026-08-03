/**
 * Shape of the coding-challenge content.
 *
 * The components below depend on these types rather than on the locale
 * modules, so a challenge can come from anywhere that satisfies the shape —
 * a locale object today, an API or a CMS later — without touching the UI.
 */

export interface Challenge {
  title: string;
  prompt: string;
  hint: string;
  code: string;
  complexity: string;
}

export interface ChallengeLevel {
  /** Human-readable level name, e.g. "Level 2 — Interview standard". */
  label: string;
  /** One line on what this level asks of the reader. */
  blurb: string;
  items: readonly Challenge[];
}

/**
 * Only the strings a single challenge card needs. Passing this instead of the
 * whole locale section keeps the card usable anywhere the five labels exist.
 */
export interface ChallengeLabels {
  hint: string;
  complexity: string;
  showHint: string;
  showSolution: string;
  hide: string;
}
