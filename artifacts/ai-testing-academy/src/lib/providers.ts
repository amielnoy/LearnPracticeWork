import { jsonrepair } from 'jsonrepair';
import type { Locale } from './locales';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ProviderDef {
  label: (S: Locale['s']) => string;
  placeholder: string;
  models: string[];
  validateKey?: (key: string, S: Locale['s']) => void;
  build: (
    key: string,
    model: string,
    system: string,
    messages: Message[],
    maxTokens: number
  ) => { url: string; headers: Record<string, string>; body: unknown };
  parse: (d: unknown) => string;
  keyHint?: (key: string, status: number, S: Locale['s']) => string;
}

export const PROVIDERS: Record<string, ProviderDef> = {
  gemini: {
    label: S => S.keyLabelGemini,
    placeholder: 'AIza...',
    models: ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'],
    build(key, model, system, messages, maxTokens) {
      const generationConfig: Record<string, unknown> = { maxOutputTokens: maxTokens };
      if (model.includes('flash')) generationConfig.thinkingConfig = { thinkingBudget: 0 };
      return {
        url: 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: {
          system_instruction: { parts: [{ text: system }] },
          contents: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig,
        },
      };
    },
    parse: (d: unknown) =>
      ((d as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates?.[0]?.content?.parts || [])
        .map(p => p.text || '').join('\n'),
    keyHint: (key, status, S) =>
      [400, 401, 403].includes(status) && !key.startsWith('AIza') ? S.errGeminiKeyHint : '',
  },
  anthropic: {
    label: S => S.keyLabelAnthropic,
    placeholder: 'sk-ant-...',
    models: ['claude-sonnet-5', 'claude-haiku-4-5-20251001'],
    validateKey(key, S) {
      if (!key.startsWith('sk-ant-')) throw new Error(S.errKeyNotAnthropic);
    },
    build(key, model, system, messages, maxTokens) {
      return {
        url: 'https://api.anthropic.com/v1/messages',
        headers: {
          'content-type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: { model, max_tokens: maxTokens, system, messages },
      };
    },
    parse: (d: unknown) =>
      ((d as { content?: Array<{ type: string; text?: string }> }).content || [])
        .filter(b => b.type === 'text').map(b => b.text || '').join('\n'),
  },
  openai: {
    label: S => S.keyLabelOpenai,
    placeholder: 'sk-...',
    models: ['gpt-5-mini', 'gpt-5.4-mini', 'gpt-5.4'],
    validateKey(key, S) {
      if (key.startsWith('sk-ant-')) throw new Error(S.errKeyNotOpenai);
    },
    build(key, model, system, messages, maxTokens) {
      return {
        url: 'https://api.openai.com/v1/chat/completions',
        headers: { 'content-type': 'application/json', Authorization: 'Bearer ' + key },
        body: {
          model,
          max_completion_tokens: maxTokens,
          messages: [{ role: 'system', content: system }, ...messages],
        },
      };
    },
    parse: (d: unknown) =>
      ((d as { choices?: Array<{ message?: { content?: string } }> }).choices?.[0]?.message?.content) || '',
  },
};

export interface ServerDefaults {
  [provider: string]: { available: boolean; defaultModel?: string };
}

export async function loadServerConfig(): Promise<ServerDefaults> {
  try {
    const res = await fetch('/api/ai/config', { cache: 'no-store' });
    if (!res.ok) return {};
    return (await res.json()) as ServerDefaults;
  } catch {
    return {};
  }
}

async function callServerProxy(
  model: string,
  system: string,
  messages: Message[],
  maxTokens: number,
  grounded = false
): Promise<string> {
  const res = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model, system, messages, maxTokens, grounded }),
  });
  const data = (await res.json()) as { text?: string; error?: string };
  if (!res.ok) throw new Error(`API error (${res.status}): ${(data.error || '').slice(0, 300)}`);
  return data.text || '';
}

export async function callAI(
  provider: string,
  model: string,
  apiKey: string,
  useOwnKey: boolean,
  serverDefaults: ServerDefaults,
  S: Locale['s'],
  system: string,
  messages: Message[],
  maxTokens = 2500
): Promise<string> {
  const own = useOwnKey;
  if (!own && provider === 'gemini' && serverDefaults.gemini?.available) {
    return callServerProxy(model, system, messages, maxTokens);
  }
  const key = apiKey.trim();
  if (!key) throw new Error(S.errNoKey);
  const prov = PROVIDERS[provider];
  prov.validateKey?.(key, S);
  const { url, headers, body } = prov.build(key, model, system, messages, maxTokens);
  let res: Response;
  try {
    res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  } catch {
    throw new Error(
      S.errBlockedPrefix +
        new URL(url).host +
        S.errBlockedMid +
        S.errBlockedCauses +
        S.errBlockedTry +
        S.errBlockedOpenUrl
    );
  }
  if (!res.ok) {
    const errBody = await res.text();
    const hint = prov.keyHint ? prov.keyHint(key, res.status, S) : '';
    throw new Error(S.errApiPrefix + res.status + '): ' + errBody.slice(0, 300) + hint);
  }
  return prov.parse(await res.json());
}

export async function callGeminiGrounded(
  ownGeminiKey: string,
  serverDefaults: ServerDefaults,
  S: Locale['s'],
  system: string,
  user: string,
  maxTokens = 3000
): Promise<string> {
  if (!ownGeminiKey) {
    if (!serverDefaults.gemini?.available) throw new Error(S.errNoKey);
    return callServerProxy('gemini-2.5-flash', system, [{ role: 'user', content: user }], maxTokens, true);
  }
  const model = 'gemini-2.5-flash';
  const body = {
    system_instruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: user }] }],
    tools: [{ google_search: {} }],
    generationConfig: { maxOutputTokens: maxTokens },
  };
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': ownGeminiKey },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(S.errApiPrefix + res.status + '): ' + (await res.text()).slice(0, 300));
  const d = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  return (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('\n');
}

/**
 * The first balanced JSON value — object or array — in `s`, or the empty string
 * if there is none. String-aware, so braces inside a string are ignored, and it
 * stops at the matching close rather than the last brace in the text, so trailing
 * prose or grounding citations after the JSON don't drag in garbage. A truncated
 * value (no matching close) is returned whole for the repair pass to attempt.
 */
function findJson(s: string): string {
  const objAt = s.indexOf('{');
  const arrAt = s.indexOf('[');
  const open =
    objAt === -1 ? arrAt : arrAt === -1 ? objAt : Math.min(objAt, arrAt);
  if (open === -1) return '';

  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = open; i < s.length; i++) {
    const c = s[i]!;
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') {
      depth--;
      if (depth === 0) return s.slice(open, i + 1);
    }
  }
  return s.slice(open); // unbalanced/truncated — let repair try
}

export function extractJSON(text: string, S: Locale['s']): unknown {
  // Prefer a fenced block, but fall back to the whole reply if the fence held no
  // JSON (grounded replies sometimes fence prose and leave the JSON outside it).
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidates = fenced ? [fenced[1]!, text] : [text];

  // The model is always asked for an object or an array; anything else (a bare
  // string, a number) means jsonrepair over-reached on a line of prose, so it is
  // rejected rather than returned.
  const isContainer = (v: unknown): boolean => typeof v === 'object' && v !== null;

  for (const raw of candidates) {
    // Try the tight, balanced slice first, then the whole candidate — the slice
    // can be thrown off if the model left an unescaped quote inside a string.
    for (const source of [findJson(raw), raw]) {
      if (!/[{[]/.test(source)) continue; // nothing JSON-shaped here
      // Models drop commas, leave trailing ones, forget to escape quotes and
      // occasionally truncate. jsonrepair fixes all of those; try a strict parse
      // first so a clean reply never goes through it.
      for (const attempt of [source, jsonrepairSafe(source)]) {
        if (attempt === null) continue;
        try {
          const parsed = JSON.parse(attempt);
          if (isContainer(parsed)) return parsed;
        } catch {
          // next attempt / source / candidate
        }
      }
    }
  }
  throw new Error(S.errNoJson);
}

/** jsonrepair, but returns null instead of throwing on input it cannot mend. */
function jsonrepairSafe(s: string): string | null {
  try {
    return jsonrepair(s);
  } catch {
    return null;
  }
}
