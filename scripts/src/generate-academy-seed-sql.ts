/**
 * Turns `academy-content.json` and `lecture-examples.json` into the SQL seed for
 * the Supabase content tables. Not part of the app runtime — run it whenever
 * either input changes, and commit the result:
 *
 *     pnpm --filter @workspace/scripts exec tsx src/generate-academy-seed-sql.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';

type QuestionItem = { q: string; hint: string; answer: string[] };
type StageData = { icon: string; title: string; items: QuestionItem[] };
type Challenge = { title: string; prompt: string; hint: string; code: string; complexity: string };
type ChallengeLevel = { label: string; blurb: string; items: Challenge[] };
type LectureItem = { num: number; ready: boolean; title: string; desc: string; url?: string };
type Track = { title: string; lead: string; lectures: LectureItem[] };

type Panel = {
  label?: string;
  rows: { label: string; value: string }[];
  verdict?: { status: string; note: string };
};
type ExampleText = { eyebrow: string; title: string; bullets: string[]; panels: Panel[] };
/** One worked-example slide: which deck it belongs to, where in it, and both languages. */
type LectureExample = { deck: number; slide: string; position: number } & Record<
  'en' | 'he',
  ExampleText
>;

const data = JSON.parse(
  readFileSync(new URL('./academy-content.json', import.meta.url), 'utf-8'),
) as {
  questionBank: { en: StageData[]; he: StageData[] };
  codingChallenges: { en: ChallengeLevel[]; he: ChallengeLevel[] };
  lectureSeries: { en: Track[]; he: Track[] };
};

const examples = (
  JSON.parse(readFileSync(new URL('./lecture-examples.json', import.meta.url), 'utf-8')) as {
    examples: LectureExample[];
  }
).examples;

function esc(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function escArray(arr: string[]): string {
  return `ARRAY[${arr.map(esc).join(', ')}]::text[]`;
}

function escJson(value: unknown): string {
  return `${esc(JSON.stringify(value))}::jsonb`;
}

const lines: string[] = [];
lines.push('begin;');
lines.push(
  'truncate table question_bank_items, question_bank_stages, coding_challenges, coding_challenge_levels, lecture_examples, lecture_items, lecture_tracks restart identity cascade;',
);

// Question bank
let stageId = 0;
let itemId = 0;
for (const lang of ['en', 'he'] as const) {
  data.questionBank[lang].forEach((stage, sIdx) => {
    stageId += 1;
    lines.push(
      `insert into question_bank_stages (id, lang, position, icon, title) values (${stageId}, ${esc(lang)}, ${sIdx}, ${esc(stage.icon)}, ${esc(stage.title)});`,
    );
    stage.items.forEach((item, iIdx) => {
      itemId += 1;
      lines.push(
        `insert into question_bank_items (id, stage_id, position, question, hint, answer) values (${itemId}, ${stageId}, ${iIdx}, ${esc(item.q)}, ${esc(item.hint)}, ${escArray(item.answer)});`,
      );
    });
  });
}

// Coding challenges
let levelId = 0;
let challengeId = 0;
for (const lang of ['en', 'he'] as const) {
  data.codingChallenges[lang].forEach((level, lIdx) => {
    levelId += 1;
    lines.push(
      `insert into coding_challenge_levels (id, lang, position, label, blurb) values (${levelId}, ${esc(lang)}, ${lIdx}, ${esc(level.label)}, ${esc(level.blurb)});`,
    );
    level.items.forEach((c, cIdx) => {
      challengeId += 1;
      lines.push(
        `insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (${challengeId}, ${levelId}, ${cIdx}, ${esc(c.title)}, ${esc(c.prompt)}, ${esc(c.hint)}, ${esc(c.code)}, ${esc(c.complexity)});`,
      );
    });
  });
}

// Lecture series
let trackId = 0;
let lectureId = 0;
/**
 * Which `lecture_items` row each deck belongs to, per language.
 *
 * The decks pin this as a literal — `LECTURE_ITEM_ID` in every
 * `examplesClient.ts` — so the worked-example rows have to land on exactly the
 * ids the seed just handed out. Recording them here rather than recomputing
 * `deck + 20` keeps the two in step when a track is added or reordered; the
 * decks are the first track in each language, keyed by lecture number.
 */
const deckLectureIds: Record<'en' | 'he', Map<number, number>> = { en: new Map(), he: new Map() };
for (const lang of ['en', 'he'] as const) {
  data.lectureSeries[lang].forEach((track, tIdx) => {
    trackId += 1;
    lines.push(
      `insert into lecture_tracks (id, lang, position, title, lead) values (${trackId}, ${esc(lang)}, ${tIdx}, ${esc(track.title)}, ${esc(track.lead)});`,
    );
    track.lectures.forEach((lec, lIdx) => {
      lectureId += 1;
      if (tIdx === 0) deckLectureIds[lang].set(lec.num, lectureId);
      const url = lec.url ? esc(lec.url) : 'null';
      lines.push(
        `insert into lecture_items (id, track_id, position, num, ready, title, description, url) values (${lectureId}, ${trackId}, ${lIdx}, ${lec.num}, ${lec.ready}, ${esc(lec.title)}, ${esc(lec.desc)}, ${url});`,
      );
    });
  });
}

// Worked-example slide content. Read by the decks straight from PostgREST, one
// row per slide per language, keyed by the lecture and the slide's position.
let exampleId = 0;
for (const lang of ['en', 'he'] as const) {
  for (const example of examples) {
    const itemId = deckLectureIds[lang].get(example.deck);
    if (itemId === undefined) {
      throw new Error(
        `${example.slide} is content for lecture ${example.deck}, which the ${lang} lecture ` +
          'series does not contain. Either the deck number is wrong or the track was reordered.',
      );
    }
    const text = example[lang];
    exampleId += 1;
    lines.push(
      `insert into lecture_examples (id, lecture_item_id, lang, position, eyebrow, title, bullets, panels) values (${exampleId}, ${itemId}, ${esc(lang)}, ${example.position}, ${esc(text.eyebrow)}, ${esc(text.title)}, ${escArray(text.bullets)}, ${escJson(text.panels)});`,
    );
  }
}

lines.push(`select setval('question_bank_stages_id_seq', ${stageId});`);
lines.push(`select setval('question_bank_items_id_seq', ${itemId});`);
lines.push(`select setval('coding_challenge_levels_id_seq', ${levelId});`);
lines.push(`select setval('coding_challenges_id_seq', ${challengeId});`);
lines.push(`select setval('lecture_tracks_id_seq', ${trackId});`);
lines.push(`select setval('lecture_items_id_seq', ${lectureId});`);
lines.push(`select setval('lecture_examples_id_seq', ${exampleId});`);
lines.push('commit;');

writeFileSync(new URL('./academy-seed.sql', import.meta.url), lines.join('\n'));
console.log(`Wrote academy-seed.sql (${lines.length} statements)`);

// Also write batched chunks (splitting the *statement array*, not raw text
// lines, since several statements contain embedded newlines from Python code
// snippets — a text-line split would cut a statement in half).
const CHUNK_SIZE = 8;
const contentLines = lines.filter(l => l !== 'begin;' && l !== 'commit;');
for (let i = 0; i < contentLines.length; i += CHUNK_SIZE) {
  const chunk = contentLines.slice(i, i + CHUNK_SIZE);
  writeFileSync(
    new URL(`./seed-chunk-${String(i / CHUNK_SIZE).padStart(2, '0')}.sql`, import.meta.url),
    chunk.join('\n'),
  );
}
console.log(`Wrote ${Math.ceil(contentLines.length / CHUNK_SIZE)} chunk files`);
