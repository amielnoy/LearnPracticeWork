/**
 * Where a partly-finished interview lives, and what is allowed back out of it.
 *
 * `sessionStorage`, not `localStorage`, and that is the point. A transcript is
 * every answer someone gave about their own career on a machine that may not be
 * theirs; the résumé tool next door already treats its input that way, and
 * there was never a reason for these two to disagree. Resuming after a reload
 * is what the feature needs, and a session is exactly that long.
 */
import type { Message } from './providers';
import { readValidated, removeRaw, writeValidated } from './storage';

export const INTERVIEW_STORAGE_KEY = 'ata_interview_session_v1';

/** Bounds on what will be reinstated, so a tampered entry cannot be unbounded. */
export const MAX_SAVED_MESSAGES = 200;
export const MAX_SAVED_TEXT = 20_000;

/** A transcript line that belongs to the conversation, as opposed to a status note. */
export type TranscriptRole = 'ai' | 'user';

export interface TranscriptLine {
  cls: TranscriptRole;
  text: string;
}

export interface SavedInterview {
  lang: string;
  messages: TranscriptLine[];
  chat: Message[];
  interviewOn: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Rebuilds a transcript from storage, or gives up.
 *
 * Checking that the two arrays *are* arrays is not enough: what goes into them
 * is rendered, and `cls` becomes a class name while `text` becomes a child. A
 * stored entry whose `text` is an object is a render crash on mount, and one
 * whose `cls` is arbitrary is a stored string in the markup. So every element
 * is checked, not just the shape around them.
 */
export function validateInterview(parsed: unknown, lang: string): SavedInterview | null {
  if (!isRecord(parsed) || parsed.lang !== lang) return null;
  if (!Array.isArray(parsed.messages) || !Array.isArray(parsed.chat)) return null;

  const messages = parsed.messages
    .filter(
      (entry): entry is TranscriptLine =>
        isRecord(entry) &&
        (entry.cls === 'ai' || entry.cls === 'user') &&
        typeof entry.text === 'string',
    )
    .slice(0, MAX_SAVED_MESSAGES)
    .map(entry => ({ cls: entry.cls, text: entry.text.slice(0, MAX_SAVED_TEXT) }));

  const chat = parsed.chat
    .filter(
      (entry): entry is Message =>
        isRecord(entry) &&
        (entry.role === 'user' || entry.role === 'assistant') &&
        typeof entry.content === 'string',
    )
    .slice(0, MAX_SAVED_MESSAGES)
    .map(entry => ({ role: entry.role, content: entry.content.slice(0, MAX_SAVED_TEXT) }));

  return { lang, messages, chat, interviewOn: parsed.interviewOn === true };
}

export function loadInterview(lang: string): SavedInterview | null {
  // Earlier versions wrote this same key into `localStorage`, where it stayed
  // forever. Those are cleared rather than migrated: moving a transcript into
  // the session would carry the problem forward one visit, deleting it ends it.
  removeRaw(localStorage, INTERVIEW_STORAGE_KEY);
  return readValidated(sessionStorage, INTERVIEW_STORAGE_KEY, parsed =>
    validateInterview(parsed, lang),
  );
}

export function saveInterview(session: SavedInterview): void {
  writeValidated(sessionStorage, INTERVIEW_STORAGE_KEY, session);
}

export function clearInterview(): void {
  removeRaw(sessionStorage, INTERVIEW_STORAGE_KEY);
}
