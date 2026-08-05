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
import { stubFetch, jsonResponse, textResponse, type FetchStub } from '../support/fetchStub';

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
    expect(Object.keys(PROVIDERS).sort()).toEqual(['anthropic', 'gemini', 'openai']);
  });

  test('every provider offers at least one model and a label', () => {
    for (const [name, provider] of Object.entries(PROVIDERS)) {
      expect(provider.models.length, `${name} has models`).toBeGreaterThan(0);
      expect(provider.label(S), `${name} has a label`).toBeTruthy();
    }
  });

  test('the Gemini models match the ones the server proxy allows', () => {
    // Mirrors ALLOWED_GEMINI_MODELS in artifacts/api-server/src/routes/ai.ts —
    // a model offered here but rejected there silently downgrades the request.
    expect(PROVIDERS.gemini!.models).toEqual([
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-2.5-pro',
    ]);
  });
});

test.describe('gemini request building', () => {
  test('targets the model the caller asked for and sends the key as a header', () => {
    const { url, headers } = PROVIDERS.gemini!.build(
      'AIzaKEY',
      'gemini-2.5-pro',
      'sys',
      [{ role: 'user', content: 'hi' }],
      100,
    );

    expect(url).toBe(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
    );
    expect(headers['x-goog-api-key']).toBe('AIzaKEY');
    expect(headers['content-type']).toBe('application/json');
  });

  test('maps assistant turns to the role Gemini expects', () => {
    const { body } = PROVIDERS.gemini!.build(
      'AIzaKEY',
      'gemini-2.5-flash',
      'sys',
      [
        { role: 'user', content: 'hi' },
        { role: 'assistant', content: 'hello' },
      ],
      100,
    );

    const contents = (body as any).contents as Array<{ role: string; parts: [{ text: string }] }>;
    expect(contents.map(c => c.role)).toEqual(['user', 'model']);
    expect(contents[1]!.parts[0]!.text).toBe('hello');
  });

  test('disables thinking on flash models to keep replies fast', () => {
    const { body } = PROVIDERS.gemini!.build('k', 'gemini-2.5-flash', '', [], 100);
    expect((body as any).generationConfig.thinkingConfig).toEqual({ thinkingBudget: 0 });
  });

  test('leaves thinking enabled on pro models', () => {
    const { body } = PROVIDERS.gemini!.build('k', 'gemini-2.5-pro', '', [], 100);
    expect((body as any).generationConfig.thinkingConfig).toBeUndefined();
  });

  test('passes the token ceiling through', () => {
    const { body } = PROVIDERS.gemini!.build('k', 'gemini-2.5-pro', '', [], 1234);
    expect((body as any).generationConfig.maxOutputTokens).toBe(1234);
  });
});

test.describe('gemini response parsing', () => {
  test('joins every text part of the first candidate', () => {
    const text = PROVIDERS.gemini!.parse({
      candidates: [{ content: { parts: [{ text: 'one' }, { text: 'two' }] } }],
    });
    expect(text).toBe('one\ntwo');
  });

  test('returns the empty string when the model returned no candidates', () => {
    expect(PROVIDERS.gemini!.parse({})).toBe('');
  });
});

test.describe('gemini key hints', () => {
  test('explains the key format on an auth failure with a non-Gemini key', () => {
    expect(PROVIDERS.gemini!.keyHint!('sk-whatever', 401, S)).toBe(S.errGeminiKeyHint);
  });

  test('stays quiet when the key already looks like a Gemini key', () => {
    expect(PROVIDERS.gemini!.keyHint!('AIzaSomething', 401, S)).toBe('');
  });

  test('stays quiet for failures that are not about the key', () => {
    expect(PROVIDERS.gemini!.keyHint!('sk-whatever', 500, S)).toBe('');
  });
});

test.describe('anthropic', () => {
  test('rejects a key that belongs to another vendor', () => {
    expect(() => PROVIDERS.anthropic!.validateKey!('sk-proj-abc', S)).toThrow(
      S.errKeyNotAnthropic,
    );
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
    expect((body as any).max_completion_tokens).toBe(64);
    expect((body as any).messages).toEqual([
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
  const serverHasGemini: ServerDefaults = { gemini: { available: true } };

  test('routes through the server proxy when the visitor has no key of their own', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'proxied' }));

    const reply = await callAI(
      'gemini',
      'gemini-2.5-flash',
      '',
      false,
      serverHasGemini,
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
      model: 'gemini-2.5-flash',
      system: 'sys',
      messages: [{ role: 'user', content: 'hi' }],
      maxTokens: 200,
      grounded: false,
    });
  });

  test('never sends the visitor key to the proxy path', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'ok' }));

    await callAI('gemini', 'gemini-2.5-flash', 'AIzaSECRET', false, serverHasGemini, S, '', [
      { role: 'user', content: 'hi' },
    ]);

    expect(JSON.stringify(fetchStub.only())).not.toContain('AIzaSECRET');
  });

  test('surfaces a proxy failure with its status code', async () => {
    fetchStub = stubFetch(() => jsonResponse({ error: 'upstream exploded' }, 502));

    await expect(
      callAI('gemini', 'gemini-2.5-flash', '', false, serverHasGemini, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(/API error \(502\).*upstream exploded/s);
  });

  test('calls the vendor directly once the visitor supplies a key', async () => {
    fetchStub = stubFetch(() =>
      jsonResponse({ candidates: [{ content: { parts: [{ text: 'direct' }] } }] }),
    );

    const reply = await callAI(
      'gemini',
      'gemini-2.5-flash',
      'AIzaKEY',
      true,
      serverHasGemini,
      S,
      '',
      [{ role: 'user', content: 'hi' }],
    );

    expect(reply).toBe('direct');
    expect(fetchStub.only().url).toContain('generativelanguage.googleapis.com');
    expect(fetchStub.only().headers['x-goog-api-key']).toBe('AIzaKEY');
  });

  test('asks for a key when there is neither a server default nor a visitor key', async () => {
    fetchStub = stubFetch(() => jsonResponse({}));

    await expect(
      callAI('gemini', 'gemini-2.5-flash', '   ', false, {}, S, '', [
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

  test('appends the key-format hint to a Gemini auth failure', async () => {
    fetchStub = stubFetch(() => textResponse('invalid key', 401));

    await expect(
      callAI('gemini', 'gemini-2.5-flash', 'sk-wrong-vendor', true, {}, S, '', [
        { role: 'user', content: 'hi' },
      ]),
    ).rejects.toThrow(S.errGeminiKeyHint);
  });
});

test.describe('callGeminiGrounded', () => {
  test('asks the proxy for a grounded answer when the visitor has no key', async () => {
    fetchStub = stubFetch(() => jsonResponse({ text: 'grounded' }));

    const reply = await callGeminiGrounded('', { gemini: { available: true } }, S, 'sys', 'q');

    expect(reply).toBe('grounded');
    const call = fetchStub.only();
    expect(call.url).toBe('/api/ai/generate');
    expect((call.body as any).grounded).toBe(true);
    expect((call.body as any).messages).toEqual([{ role: 'user', content: 'q' }]);
  });

  test('turns on Google Search grounding when calling Gemini directly', async () => {
    fetchStub = stubFetch(() =>
      jsonResponse({ candidates: [{ content: { parts: [{ text: 'sourced' }] } }] }),
    );

    const reply = await callGeminiGrounded('AIzaKEY', {}, S, 'sys', 'q');

    expect(reply).toBe('sourced');
    expect((fetchStub.only().body as any).tools).toEqual([{ google_search: {} }]);
  });

  test('asks for a key when neither the visitor nor the server has one', async () => {
    fetchStub = stubFetch(() => jsonResponse({}));

    await expect(callGeminiGrounded('', {}, S, 'sys', 'q')).rejects.toThrow(S.errNoKey);
    expect(fetchStub.calls).toHaveLength(0);
  });
});
