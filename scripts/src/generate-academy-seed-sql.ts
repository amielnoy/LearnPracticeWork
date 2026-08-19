/**
 * Turns academy-content.json into a SQL seed script for the Supabase content
 * tables. One-off tool for the content migration; not part of the app runtime.
 * Run with `pnpm --filter @workspace/scripts exec tsx src/generate-academy-seed-sql.ts`.
 */
import { readFileSync, writeFileSync } from 'node:fs';

type QuestionItem = { q: string; hint: string; answer: string[] };
type StageData = { icon: string; title: string; items: QuestionItem[] };
type Challenge = { title: string; prompt: string; hint: string; code: string; complexity: string };
type ChallengeLevel = { label: string; blurb: string; items: Challenge[] };
type LectureItem = { num: number; ready: boolean; title: string; desc: string; url?: string };
type Track = { title: string; lead: string; lectures: LectureItem[] };

const data = JSON.parse(
  readFileSync(new URL('./academy-content.json', import.meta.url), 'utf-8'),
) as {
  questionBank: { en: StageData[]; he: StageData[] };
  codingChallenges: { en: ChallengeLevel[]; he: ChallengeLevel[] };
  lectureSeries: { en: Track[]; he: Track[] };
};

function esc(s: string): string {
  return `'${s.replace(/'/g, "''")}'`;
}

function escArray(arr: string[]): string {
  return `ARRAY[${arr.map(esc).join(', ')}]::text[]`;
}

const lines: string[] = [];
lines.push('begin;');
lines.push(
  'truncate table question_bank_items, question_bank_stages, coding_challenges, coding_challenge_levels, lecture_items, lecture_tracks restart identity cascade;',
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
for (const lang of ['en', 'he'] as const) {
  data.lectureSeries[lang].forEach((track, tIdx) => {
    trackId += 1;
    lines.push(
      `insert into lecture_tracks (id, lang, position, title, lead) values (${trackId}, ${esc(lang)}, ${tIdx}, ${esc(track.title)}, ${esc(track.lead)});`,
    );
    track.lectures.forEach((lec, lIdx) => {
      lectureId += 1;
      const url = lec.url ? esc(lec.url) : 'null';
      lines.push(
        `insert into lecture_items (id, track_id, position, num, ready, title, description, url) values (${lectureId}, ${trackId}, ${lIdx}, ${lec.num}, ${lec.ready}, ${esc(lec.title)}, ${esc(lec.desc)}, ${url});`,
      );
    });
  });
}

lines.push(`select setval('question_bank_stages_id_seq', ${stageId});`);
lines.push(`select setval('question_bank_items_id_seq', ${itemId});`);
lines.push(`select setval('coding_challenge_levels_id_seq', ${levelId});`);
lines.push(`select setval('coding_challenges_id_seq', ${challengeId});`);
lines.push(`select setval('lecture_tracks_id_seq', ${trackId});`);
lines.push(`select setval('lecture_items_id_seq', ${lectureId});`);
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
