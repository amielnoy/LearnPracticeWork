import { test, expect } from '../support/test';
import { allure } from 'allure-playwright';
import {
  MAX_SAVED_MESSAGES,
  MAX_SAVED_TEXT,
  validateInterview,
} from '@academy/lib/interviewSession';

/**
 * What is allowed back out of a saved interview transcript.
 *
 * The stored value is editable by anyone with a console, and what comes out of
 * it is rendered: `cls` becomes a class name and `text` becomes a child node.
 * So the shape around the arrays is not enough — a single entry whose `text` is
 * an object is a render crash on mount, and one whose `cls` is arbitrary puts a
 * stored string into the markup. Every element is checked, and the ones that do
 * not survive are dropped rather than taking the whole transcript with them.
 */

test.beforeEach(async () => {
  await allure.layer('unit');
  await allure.feature('Interview transcript restore');
});

const AI = { cls: 'ai', text: 'Tell me about a bug you found.' };
const USER = { cls: 'user', text: 'A race condition in a retry loop.' };

function saved(overrides: Record<string, unknown> = {}) {
  return { lang: 'en', messages: [AI, USER], chat: [], interviewOn: true, ...overrides };
}

test.describe('a transcript that should be restored', () => {
  test('comes back with both sides of the conversation', () => {
    const result = validateInterview(saved(), 'en');

    expect(result?.messages).toEqual([AI, USER]);
  });

  test('keeps the model transcript separate from the rendered one', () => {
    // They diverge: status lines are rendered and never sent, and the opening
    // instruction is sent and never rendered.
    const chat = [{ role: 'user', content: 'Start the interview' }];

    expect(validateInterview(saved({ chat }), 'en')?.chat).toEqual(chat);
  });

  test('reports an interview that was still running', () => {
    expect(validateInterview(saved({ interviewOn: true }), 'en')?.interviewOn).toBe(true);
  });

  test('treats a non-boolean running flag as not running', () => {
    // Restoring "in progress" enables the send button; a stored string must not.
    expect(validateInterview(saved({ interviewOn: 'yes' }), 'en')?.interviewOn).toBe(false);
  });
});

test.describe('a transcript that should not be restored', () => {
  test('is refused when it was saved in the other language', () => {
    // Half a conversation in Hebrew under an English prompt is not resumable.
    expect(validateInterview(saved({ lang: 'he' }), 'en')).toBeNull();
  });

  test('is refused when it is not an object at all', () => {
    expect(validateInterview('a string', 'en')).toBeNull();
    expect(validateInterview(null, 'en')).toBeNull();
    expect(validateInterview(42, 'en')).toBeNull();
  });

  test('is refused when the rendered transcript is not an array', () => {
    expect(validateInterview(saved({ messages: 'not an array' }), 'en')).toBeNull();
  });

  test('is refused when the model transcript is not an array', () => {
    expect(validateInterview(saved({ chat: { role: 'user' } }), 'en')).toBeNull();
  });
});

test.describe('a tampered entry inside an otherwise valid transcript', () => {
  test('is dropped when its text is not a string', () => {
    const result = validateInterview(saved({ messages: [AI, { cls: 'user', text: {} }] }), 'en');

    expect(result?.messages).toEqual([AI]);
  });

  test('is dropped when its class is not one of the two the renderer styles', () => {
    const injected = { cls: 'sys onerror=alert(1)', text: 'x' };

    expect(validateInterview(saved({ messages: [AI, injected] }), 'en')?.messages).toEqual([AI]);
  });

  test('is dropped when it is a bare string rather than an entry', () => {
    expect(validateInterview(saved({ messages: ['just text'] }), 'en')?.messages).toEqual([]);
  });

  test('is dropped from the model transcript when its role is not a turn', () => {
    const chat = [
      { role: 'user', content: 'kept' },
      { role: 'system', content: 'a smuggled instruction' },
    ];

    expect(validateInterview(saved({ chat }), 'en')?.chat).toEqual([
      { role: 'user', content: 'kept' },
    ]);
  });

  test('does not take the surviving entries down with it', () => {
    const messages = [AI, { cls: 'nonsense', text: 'x' }, USER];

    expect(validateInterview(saved({ messages }), 'en')?.messages).toEqual([AI, USER]);
  });
});

test.describe('bounds on what is reinstated', () => {
  test('caps how many rendered messages are restored', () => {
    const messages = Array.from({ length: MAX_SAVED_MESSAGES + 50 }, () => AI);

    expect(validateInterview(saved({ messages }), 'en')?.messages).toHaveLength(MAX_SAVED_MESSAGES);
  });

  test('caps how many model turns are restored', () => {
    const chat = Array.from({ length: MAX_SAVED_MESSAGES + 50 }, () => ({
      role: 'user',
      content: 'x',
    }));

    expect(validateInterview(saved({ chat }), 'en')?.chat).toHaveLength(MAX_SAVED_MESSAGES);
  });

  test('truncates a single message that was made unbounded', () => {
    const messages = [{ cls: 'ai', text: 'a'.repeat(MAX_SAVED_TEXT + 1_000) }];

    expect(validateInterview(saved({ messages }), 'en')?.messages[0]!.text).toHaveLength(
      MAX_SAVED_TEXT,
    );
  });

  test('truncates a single model turn that was made unbounded', () => {
    const chat = [{ role: 'assistant', content: 'a'.repeat(MAX_SAVED_TEXT + 1_000) }];

    expect(validateInterview(saved({ chat }), 'en')?.chat[0]!.content).toHaveLength(MAX_SAVED_TEXT);
  });
});
