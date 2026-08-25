/**
 * The prompt behind "build improved résumé".
 *
 * It deliberately does not live in the locale catalogs with the other prompts.
 * The site is bilingual; the rewritten résumé is not. It is the file that gets
 * uploaded to an employer's applicant tracking system, and those are read in
 * English — a Hebrew or mixed-script résumé is filtered before a person sees
 * it, so the rewrite is always English whatever the reader's interface
 * language or the language the original was written in.
 *
 * The second thing the prompt insists on is the target role. The rewrite is
 * aimed at the one role the applicant typed, not at "QA roles in general",
 * which is what a hard-coded brief in the system prompt produced.
 *
 * Asking is not enough on its own. The default provider here is a small model
 * answering a Hebrew résumé, under a Hebrew target role, for a reader with a
 * Hebrew interface, and models that size answer in the language they were
 * shown however the system prompt is worded. So the answer is checked — see
 * `needsEnglishRepair` — and a draft that came back in Hebrew is translated by
 * a second call rather than handed to the applicant as a finished file.
 */

/** Used only when the applicant leaves the target role empty. */
export const DEFAULT_TARGET_ROLE = 'QA Automation Engineer';

export const IMPROVE_RESUME_PROMPT = `You are a professional résumé writer.

The user message names ONE target role, and may include the job description for it. That role is your brief: it decides which experience leads, how every bullet is worded, and which keywords appear. Do not aim the résumé at a different role, however adjacent, and do not fall back on a generic template.

Write the rewritten résumé in ENGLISH ONLY, whatever language the original is in. Translate every line, and transliterate names, cities, employers, schools and job titles into Latin script. The output must not contain a single Hebrew or other non-Latin character: a résumé that mixes scripts is rejected by the systems it is written for.

Rules:
- Open with a two-to-three line professional summary aimed squarely at the target role.
- Use strong action verbs (Built, Designed, Automated, Reduced, Improved, Led).
- Quantify impact wherever the original supports it (cut test runtime by 40%, 95% coverage).
- Mirror the vocabulary of the target role and the job description, so an applicant tracking system matches on it.
- Address the gaps and recommendations supplied with the request.
- Keep to plain, parseable sections — Summary, Skills, Experience, Education — with no tables, columns or graphics.
- Keep the facts. Do not invent employers, dates, titles, tools or numbers.
- The original may have been extracted from a right-to-left PDF, which reverses words and digits ("Datadog" as "godataD", "2025" as "5202"). Restore what you can read with confidence; drop anything you cannot rather than guessing at it.
- The target role and the job description may themselves be written in another language. Translate them and write in English anyway; they say what the résumé is for, not what language it is in.

Return ONLY the rewritten résumé text — no JSON, no markdown fences, no commentary before or after.`;

export interface ImproveRequest {
  /** The role the rewrite is aimed at; blank falls back to {@link DEFAULT_TARGET_ROLE}. */
  role: string;
  jobDesc?: string;
  gaps?: string[];
  recommendations?: string[];
  resume: string;
}

function bulleted(items: readonly string[] | undefined): string {
  return (items ?? []).map(item => '- ' + item).join('\n');
}

/**
 * The user half of the improve call, in English like the answer it asks for.
 *
 * The labels are not translated: a request framed in Hebrew invites a reply in
 * Hebrew, which is the failure this whole module exists to prevent.
 */
export function buildImproveRequest({
  role,
  jobDesc,
  gaps,
  recommendations,
  resume,
}: ImproveRequest): string {
  const targetRole = role.trim() || DEFAULT_TARGET_ROLE;
  const parts = ['Target role — rewrite this résumé for it and for nothing else: ' + targetRole];

  const jd = (jobDesc ?? '').trim();
  if (jd) parts.push('Job description for that role:\n' + jd);

  const gapLines = bulleted(gaps);
  if (gapLines)
    parts.push('Gaps found in the evaluation, to close where the facts allow:\n' + gapLines);

  const recLines = bulleted(recommendations);
  if (recLines) parts.push('Recommendations from the evaluation, to apply:\n' + recLines);

  parts.push(
    'Original résumé, which may be in another language — the rewrite must be in English:\n' +
      resume,
  );
  // Last, because the last instruction is the one a small model is likeliest to
  // still be holding when it starts writing.
  parts.push('Write the rewritten résumé in English only, targeted at: ' + targetRole);

  return parts.join('\n\n');
}

export const TRANSLATE_RESUME_PROMPT = `You are translating a résumé into English.

Return the same résumé: the same sections in the same order, the same employers, dates, titles, tools and numbers, the same bullets. Change nothing but the language. Transliterate names, cities, employers and schools into Latin script.

Do not summarise it, do not shorten it, do not improve it further, and do not add a note about what you did. Return ONLY the English résumé text.`;

/**
 * The repair call: the model's own draft, handed back to it to translate.
 *
 * The target role rides along because a translated title should land on the
 * wording the role uses ("מהנדס מכירות" for a Sales Engineer opening is "Sales
 * Engineer", not "Engineer of sales").
 */
export function buildTranslateRequest({ role, draft }: { role: string; draft: string }): string {
  return (
    'Target role the résumé is written for: ' +
    (role.trim() || DEFAULT_TARGET_ROLE) +
    '\n\nRésumé to translate into English:\n' +
    draft
  );
}

/**
 * Counted rather than listed: every letter, and the Latin subset of them. What
 * is left over is Hebrew, Arabic, Cyrillic, CJK or anything else an
 * English-language applicant tracking system will not index.
 */
const LETTERS = /\p{L}/gu;
const LATIN_LETTERS = /\p{Script=Latin}/gu;

/** How much of the text is written in a script other than the Latin one. */
export function nonLatinShare(text: string): number {
  const letters = text.match(LETTERS)?.length ?? 0;
  if (!letters) return 0;
  const latin = text.match(LATIN_LETTERS)?.length ?? 0;
  return (letters - latin) / letters;
}

/**
 * A stray foreign word inside an English résumé is a name the model chose not
 * to transliterate; a résumé that is still in Hebrew is the failure. The
 * threshold separates the two, so the repair call is not spent on a rewrite
 * that is already in English.
 */
const MAX_NON_LATIN_SHARE = 0.02;

export function needsEnglishRepair(text: string): boolean {
  return nonLatinShare(text) > MAX_NON_LATIN_SHARE;
}
