import { test, expect } from '@playwright/test';
import {
  PROVIDERS,
  loadServerConfig,
  callAI,
  callGeminiGrounded,
  extractJSON,
  type ServerDefaults,
} from '@academy/lib/providers';
import { en } from '@academy/lib/locales';
import { stubFetch, jsonResponse, type FetchStub } from '../support/fetchStub';

/**
 * Reads one field out of a request body a provider built.
 *
 * `build` types its body as `unknown` on purpose — the shape is whatever the
 * provider's API wants, and pinning it here would only duplicate their docs.
 * Narrowing once, by name, is what an `any` at each assertion was standing in
 * for.
 */
function field<T = unknown>(body: unknown, name: string): T {
  return (body as Record<string, unknown>)[name] as T;
}

/**
 * The provider layer is where a visitor's own API key meets three different
 * vendor APIs. Every request it builds is asserted here rather than in a
 * browser, and no test is allowed to reach a real vendor: `fetch` is stubbed
 * for the whole suite.
 */

const S = en.s;

let fetchStub: FetchStub;

test.afterEach(() => {
  fetchStub?.restore();
});

test.describe('provider registry', () => {
  test('offers the three providers the UI lists', () => {
    // Gemini is intentionally absent: it is kept server-side only for the
    // live Google Search grounding feature and is no longer a selectable
    // chat provider (see callGeminiGrounded, tested separately below).
    expect(Object.keys(PROVIDERS).sort()).toEqual(['anthropic', 'groq', 'openai']);
  });

  test('every provider offers at least one model and a label', () => {
    for (const [name, provider] of Object.entries(PROVIDERS)) {
      expect(provider.models.length, `${name} has models`).toBeGreaterThan(0);
      expect(provider.label(S), `${name} has a label`).toBeTruthy();
    }
  });

  test('the Groq models match the ones the server proxy allows', () => {
    // Mirrors GROQ_MODELS in server/app/main.py —
    // a model offered here but rejected there silently downgrades the request.
    expect(PROVIDERS.groq!.models).toEqual([
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'groq/compound',
    ]);
  });
});

test.describe('groq request building', () => {
  test('targets the OpenAI-compatible chat endpoint and sends the key as a bearer token', () => {
    const { url, headers } = PROVIDERS.groq!.build(
      'gsk_KEY',
      'openai/gpt-oss-120b',
      'sys',
      [{ role: 'user', content: 'hi' }],
      100,
    );

    expect(url).toBe('https://api.groq.com/openai/v1/chat/completions');
    expect(headers['Authorization']).toBe('Bearer gsk_KEY');
    expect(headers['content-type']).toBe('application/json');
  });

  test('puts the system prompt first and keeps user/assistant turns as-is', () => {
    const { body } = PROVIDERS.groq!.build(
      'gsk_KEY',
      'openai/gpt-oss-120b',
      'sys',
      [
        { role: 'user', content: 'hi' },
        { role: 'assistant', content: 'hello' },
      ],
      100,
    );

    expect(field(body, 'messages')).toEqual([
      { role: 'system', content: 'sys' },
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ]);
  });

  test('caps hidden reasoning effort so short replies are not starved of visible tokens', () => {
    // gpt-oss models spend part of max_tokens on a hidden reasoning field
    // before the visible answer; without this a small maxTokens (e.g. the
    // settings "test connection" ping) can come back with empty content.
    const { body } = PROVIDERS.groq!.build('gsk_KEY', 'openai/gpt-oss-120b', '', [], 100);
    expect(field(body, 'reasoning_effort')).toBe('low');
  });

  test('passes the token ceiling through', () => {
    const { body } = PROVIDERS.groq!.build('gsk_KEY', 'openai/gpt-oss-120b', '', [], 1234);
    expect(field(body, 'max_tokens')).toBe(1234);
  });
});

test.describe('groq response parsing', () => {
  test('reads the first choice', () => {
    expect(PROVIDERS.groq!.parse({ choices: [{ message: { content: 'hi' } }] })).toBe('hi');
  });

  test('returns the empty string when there are no choices', () => {
    expect(PROVIDERS.groq!.parse({})).toBe('');
  });
});

test.describe('groq key hints and validation', () => {
  test('rejects a key that does not look like a Groq key', () => {
    expect(() => PROVIDERS.groq!.validateKey!('sk-ant-abc', S)).toThrow(S.errKeyNotGroq);
  });

  test('accepts a well-formed key', () => {
    expect(() => PROVIDERS.groq!.validateKey!('gsk_abc', S)).not.toThrow();
  });

  test('explains the key format on an auth failure with a non-Groq key', () => {
    expect(PROVIDERS.groq!.keyHint!('sk-whatever', 401, S)).toBe(S.errGroqKeyHint);
  });

  test('stays quiet when the key already looks like a Groq key', () => {
    expect(PROVIDERS.groq!.keyHint!('gsk_something', 401, S)).toBe('');
  });

  test('stays quiet for failures that are not about the key', () => {
    expect(PROVIDERS.groq!.keyHint!('sk-whatever', 500, S)).toBe('');
  });
});

test.describe('anthropic', () => {
  test('rejects a key that belongs to another vendor', () => {
    expect(() => PROVIDERS.anthropic!.validateKey!('sk-proj-abc', S)).toThrow(S.errKeyNotAnthropic);
  });

  test('accepts a well-formed key', () => {
    expect(() => PROVIDERS.anthropic!.validateKey!('sk-ant-abc', S)).not.toThrow();
  });

  test('sends the key and API version as headers, and the system prompt as a field', () => {
    const { url, headers, body } = PROVIDERS.anthropic!.build(
      'sk-ant-abc',
      'claude-sonnet-5',
      'be brief',
      [{ role: 'user', content: 'hi' }],
      64,
    );

    expect(url).toBe('https://api.anthropic.com/v1/messages');
    expect(headers['x-api-key']).toBe('sk-ant-abc');
    expect(headers['anthropic-version']).toBe('2023-06-01');
    expect(body).toMatchObject({
      model: 'claude-sonnet-5',
      max_tokens: 64,
      system: 'be brief',
      messages: [{ role: 'user', content: 'hi' }],
    });
  });

  test('keeps only text blocks when parsing the reply', () => {
    const text = PROVIDERS.anthropic!.parse({
      content: [
        { type: 'text', text: 'visible' },
        { type: 'thinking', text: 'hidden' },
      ],
    });
    expect(text).toBe('visible');
  });
});

test.describe('openai', () => {
  test('rejects an Anthropic key', () => {
    expect(() => PROVIDERS.openai!.validateKey!('sk-ant-abc', S)).toThrow(S.errKeyNotOpenai);
  });

  test('accepts any other sk- key', () => {
    expect(() => PROVIDERS.openai!.validateKey!('sk-proj-abc', S)).not.toThrow();
  });

  test('sends the key as a bearer token and the system prompt as the first message', () => {
    const { url, headers, body } = PROVIDERS.openai!.build(
      'sk-proj-abc',
      'gpt-5-mini',
      'be brief',
      [{ role: 'user', content: 'hi' }],
      64,
    );

    expect(url).toBe('https://api.openai.com/v1/chat/completions');
    expect(headers['Authorization']).toBe('Bearer sk-proj-abc');
    expect(field(body, 'max_completion_tokens')).toBe(64);
    expect(field(body, 'messages')).toEqual([
      { role: 'system', content: 'be brief' },
      { role: 'user', content: 'hi' },
    ]);
  });

  test('reads the first choice when parsing the reply', () => {
    expect(PROVIDERS.openai!.parse({ choices: [{ message: { content: 'hi' } }] })).toBe('hi');
    expect(PROVIDERS.openai!.parse({})).toBe('');
  });
});

test.describe('extractJSON', () => {
  test('reads a fenced json block', () => {
    expect(extractJSON('here you go:\n```json\n{"score": 7}\n```', S)).toEqual({ score: 7 });
  });

  test('reads a fenced block with no language tag', () => {
    expect(extractJSON('```\n{"score": 7}\n```', S)).toEqual({ score: 7 });
  });

  test('reads an object embedded in prose', () => {
    expect(extractJSON('Sure! {"score": 7} — hope that helps', S)).toEqual({ score: 7 });
  });

  test('throws a readable error when there is no object at all', () => {
    expect(() => extractJSON('no json here', S)).toThrow(S.errNoJson);
  });

  test('recovers a missing comma between array elements', () => {
    // The exact defect the enrichment call hit: "Expected ',' or ']' after
    // array element" — a comma dropped between two strings.
    expect(extractJSON('{"tags": ["a" "b" "c"]}', S)).toEqual({ tags: ['a', 'b', 'c'] });
  });

  test('recovers a missing comma between objects in an array', () => {
    const reply = '```json\n{"questions": [{"q": "one"} {"q": "two"}]}\n```';
    expect(extractJSON(reply, S)).toEqual({ questions: [{ q: 'one' }, { q: 'two' }] });
  });

  test('recovers a missing comma between object members', () => {
    expect(extractJSON('{"a": 1 "b": 2}', S)).toEqual({ a: 1, b: 2 });
  });

  test('drops trailing commas before a closing bracket or brace', () => {
    expect(extractJSON('{"tags": ["a", "b",], "n": 2,}', S)).toEqual({ tags: ['a', 'b'], n: 2 });
  });

  test('never rewrites commas that live inside a string value', () => {
    // A repaired string must not gain punctuation: the space-separated words
    // here look like a missing comma but are ordinary prose.
    expect(extractJSON('{"note": "flaky in CI" "ok": true}', S)).toEqual({
      note: 'flaky in CI',
      ok: true,
    });
  });

  test('reads a top-level array, not only an object', () => {
    expect(extractJSON('```json\n[{"q": "one"}, {"q": "two"}]\n```', S)).toEqual([
      { q: 'one' },
      { q: 'two' },
    ]);
  });

  test('stops at the matching brace, ignoring trailing prose and citations', () => {
    // A grounded reply often appends sources after the JSON, sometimes with
    // their own braces — `lastIndexOf('}')` used to drag those in.
    const reply = '{"score": 7} \n\nSources: {see [1]} and more text';
    expect(extractJSON(reply, S)).toEqual({ score: 7 });
  });

  test('falls back to the whole reply when the fence holds no JSON', () => {
    const reply = 'Reasoning:\n```\nno json in here\n```\nResult: {"score": 7}';
    expect(extractJSON(reply, S)).toEqual({ score: 7 });
  });

  test('does not treat a brace inside a string as structure', () => {
    expect(extractJSON('{"tpl": "a {placeholder} b"}', S)).toEqual({
      tpl: 'a {placeholder} b',
    });
  });

  test('recovers unescaped quotes inside a string value', () => {
    // The likely real culprit: a model writes "POM" inside an answer without
    // escaping the quotes, which breaks a strict parse mid-array.
    expect(extractJSON('{"a": "use the "POM" pattern"}', S)).toEqual({
      a: 'use the "POM" pattern',
    });
  });

  test('closes a reply that was truncated before the JSON finished', () => {
    const cut = '{"questions": [{"q": "one"}, {"q": "two"}';
    expect(extractJSON(cut, S)).toEqual({ questions: [{ q: 'one' }, { q: 'two' }] });
  });
});

test.describe('loadServerConfig', () => {
  test('reads the server defaults without letting the answer be cached', async () => {
    fetchStub = stubFetch(() => jsonResponse({ gemini: { available: true } }));

    const defaults = await loadServerConfig();

    expect(defaults).toEqual({ gemini: { available: true } });
    expect(fetchStub.only().url).toBe('/api/ai/config');
  });

  test('treats an error response as "no server key"', async () => {
    fetchStub = stubFetch(() => jsonResponse({ error: 'boom' }, 500));
    expect(await loadServerConfig()).toEqual({});
  });

  test('treats an unreachable server as "no server key"', async () => {
    fetchStub = stubFetch(() => {
      throw new Error('offline');
    });
    expect(await loadServerConfig()).toEqual({});
  });
});

test.describe('callAI', () => {
  const serverHasGroq: ServerDefaults = { groq: { available: true } };

  test('routes through the server proxy when the visitor has no key of their own', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'proxied' }));

    const reply = await callAI(
      'groq',
      'openai/gpt-oss-120b',
      '',
      false,
      serverHasGroq,
      S,
      'sys',
      [{ role: 'user', content: 'hi' }],
      200,
    );

    expect(reply).toBe('proxied');

    const call = fetchStub.only();
    expect(call.url).toBe('/api/ai/generate');
    expect(call.method).toBe('POST');
    expect(call.body).toEqual({
      model: 'openai/gpt-oss-120b',
      system: 'sys',
      messages: [{ role: 'user', content: 'hi' }],
      maxTokens: 200,
      grounded: false,
    });
  });

  test('never sends the visitor key to the proxy path', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'ok' }));

    await callAI('groq', 'openai/gpt-oss-120b', 'gsk_SECRET', false, serverHasGroq, S, '', [
      { role: 'user', content: 'hi' },
    ]);

    expect(JSON.stringify(fetchStub.only())).not.toContain('gsk_SECRET');
  });

  test('surfaces a proxy failure with its status code', async () => {
    fetchStub = stubFetch(() => jsonResponse({ error: 'upstream exploded' }, 502));

    await expect(
      callAI('groq', 'openai/gpt-oss-120b', '', false, serverHasGroq, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(/API error \(502\).*upstream exploded/s);
  });

  test('calls the vendor directly once the visitor supplies a key', async () => {
    fetchStub = stubFetch(() => jsonResponse({ choices: [{ message: { content: 'direct' } }] }));

    const reply = await callAI(
      'groq',
      'openai/gpt-oss-120b',
      'gsk_KEY',
      true,
      serverHasGroq,
      S,
      '',
      [{ role: 'user', content: 'hi' }],
    );

    expect(reply).toBe('direct');
    expect(fetchStub.only().url).toBe('https://api.groq.com/openai/v1/chat/completions');
    expect(fetchStub.only().headers['authorization']).toBe('Bearer gsk_KEY');
  });

  test('asks for a key when there is neither a server default nor a visitor key', async () => {
    fetchStub = stubFetch(() => jsonResponse({}));

    await expect(
      callAI('groq', 'openai/gpt-oss-120b', '   ', false, {}, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(S.errNoKey);

    expect(fetchStub.calls, 'no request should be attempted without a key').toHaveLength(0);
  });

  test('rejects a mismatched key before spending a request on it', async () => {
    fetchStub = stubFetch(() => jsonResponse({}));

    await expect(
      callAI('anthropic', 'claude-sonnet-5', 'sk-proj-abc', true, {}, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(S.errKeyNotAnthropic);

    expect(fetchStub.calls).toHaveLength(0);
  });

  test('explains which host was unreachable when the browser blocks the call', async () => {
    fetchStub = stubFetch(() => {
      throw new TypeError('Failed to fetch');
    });

    await expect(
      callAI('anthropic', 'claude-sonnet-5', 'sk-ant-abc', true, {}, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(/api\.anthropic\.com/);
  });

  // Unlike Gemini (which had no validateKey), Groq's keyHint condition can
  // never actually fire through callAI: validateKey already rejects any key
  // without a gsk_ prefix before a request is attempted, so a 401 is only
  // ever reached with a key that already satisfies the hint's own check. The
  // hint format itself is covered directly in "groq key hints and validation"
  // above.
});

test.describe('a reply that ran out of room', () => {
  /**
   * The failure this covers is a silent one. When the model stops because it hit
   * the token ceiling, the text ends mid-sentence — and `extractJSON` repairs the
   * half-written object into something that renders as a finished answer. The
   * reader gets a truncated sentence presented as complete, with nothing to
   * suggest anything went wrong. So the transports have to refuse it, and these
   * are the two places a reply can arrive from.
   */
  test('the proxy refuses a truncated answer rather than returning it', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'half a sentence', truncated: true }));

    await expect(
      callGeminiGrounded('', { gemini: { available: true } }, S, 'sys', 'q'),
    ).rejects.toThrow(S.errTruncated);
  });

  test('a direct Gemini call refuses one too, on its own finishReason', async () => {
    fetchStub = stubFetch(() =>
      jsonResponse({
        candidates: [
          { content: { parts: [{ text: 'half a sentence' }] }, finishReason: 'MAX_TOKENS' },
        ],
      }),
    );

    await expect(callGeminiGrounded('AIzaKEY', {}, S, 'sys', 'q')).rejects.toThrow(S.errTruncated);
  });

  test('a complete answer is still returned, finishReason and all', async () => {
    fetchStub = stubFetch(() =>
      jsonResponse({
        candidates: [{ content: { parts: [{ text: 'a whole answer' }] }, finishReason: 'STOP' }],
      }),
    );

    expect(await callGeminiGrounded('AIzaKEY', {}, S, 'sys', 'q')).toBe('a whole answer');
  });
});

test.describe('callGeminiGrounded', () => {
  test('asks the proxy for a grounded answer when the visitor has no key', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'grounded' }));

    const reply = await callGeminiGrounded('', { gemini: { available: true } }, S, 'sys', 'q');

    expect(reply).toBe('grounded');
    const call = fetchStub.only();
    expect(call.url).toBe('/api/ai/generate');
    expect(field(call.body, 'grounded')).toBe(true);
    expect(field(call.body, 'messages')).toEqual([{ role: 'user', content: 'q' }]);
  });

  test('turns on Google Search grounding when calling Gemini directly', async () => {
    fetchStub = stubFetch(() =>
      jsonResponse({ candidates: [{ content: { parts: [{ text: 'sourced' }] } }] }),
    );

    const reply = await callGeminiGrounded('AIzaKEY', {}, S, 'sys', 'q');

    expect(reply).toBe('sourced');
    expect(field(fetchStub.only().body, 'tools')).toEqual([{ google_search: {} }]);
  });

  test('asks for a key when neither the visitor nor the server has one', async () => {
    fetchStub = stubFetch(() => jsonResponse({}));

    await expect(callGeminiGrounded('', {}, S, 'sys', 'q')).rejects.toThrow(S.errNoKey);
    expect(fetchStub.calls).toHaveLength(0);
  });
});
