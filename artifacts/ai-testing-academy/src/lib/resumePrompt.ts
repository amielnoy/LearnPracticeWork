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

  return parts.join('\n\n');
}
