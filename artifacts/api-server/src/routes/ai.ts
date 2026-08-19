import { Router, type IRouter, type NextFunction, type Request, type Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { logger } from '../lib/logger';

const router: IRouter = Router();

// Provider credentials must come from the server environment. Never bundle or
// commit an encoded fallback: base64 is not secret storage.
function resolveGeminiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || undefined;
}

function resolveGroqKey(): string | undefined {
  return process.env.GROQ_API_KEY?.trim() || undefined;
}

// Gemini is kept server-side ONLY to power the live Google Search grounding
// feature (question bank enrichment) — it is no longer offered as a general
// default chat provider. Keep in sync with `providers.ts` on the client.
const ALLOWED_GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
] as const;

const configuredDefaultGeminiModel = process.env.GEMINI_MODEL;
const DEFAULT_GEMINI_MODEL =
  configuredDefaultGeminiModel &&
  ALLOWED_GEMINI_MODELS.includes(
    configuredDefaultGeminiModel as (typeof ALLOWED_GEMINI_MODELS)[number],
  )
    ? configuredDefaultGeminiModel
    : 'gemini-2.5-flash';

// Groq is the site's default free chat provider (resume scoring + interview
// chat). Keep this list in sync with the models offered in
// artifacts/ai-testing-academy/src/lib/providers.ts.
const ALLOWED_GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound'] as const;

const configuredDefaultGroqModel = process.env.GROQ_MODEL;
const DEFAULT_GROQ_MODEL =
  configuredDefaultGroqModel &&
  ALLOWED_GROQ_MODELS.includes(configuredDefaultGroqModel as (typeof ALLOWED_GROQ_MODELS)[number])
    ? configuredDefaultGroqModel
    : 'openai/gpt-oss-120b';

function positiveIntFromEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

const BURST_WINDOW_MS = positiveIntFromEnv('AI_RATE_LIMIT_WINDOW_MS', 60_000);
const BURST_MAX = positiveIntFromEnv('AI_RATE_LIMIT_MAX', 15);
const DAILY_QUOTA = positiveIntFromEnv('AI_DAILY_QUOTA', 10);
const UPSTREAM_TIMEOUT_MS = positiveIntFromEnv('AI_UPSTREAM_TIMEOUT_MS', 30_000);

function rateLimitHandler(window: 'burst' | 'daily') {
  return (req: Request, res: Response): void => {
    logger.warn(
      { requestId: req.id, ip: req.ip, route: req.path, quotaWindow: window },
      'AI proxy quota exceeded',
    );
    if (window === 'daily') {
      res.setHeader('X-AI-Quota-Limit', String(DAILY_QUOTA));
      res.setHeader('X-AI-Quota-Remaining', '0');
    }
    res.status(429).json({
      error:
        window === 'daily'
          ? 'Daily AI request quota exceeded. Please try again tomorrow.'
          : 'Too many AI requests. Please wait before trying again.',
    });
  };
}

// Two independent per-IP controls: a short burst limiter protects capacity,
// while the daily quota caps sustained anonymous use of the server-held key.
const burstLimiter = rateLimit({
  windowMs: BURST_WINDOW_MS,
  limit: BURST_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler('burst'),
});

const dailyQuota = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: DAILY_QUOTA,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler('daily'),
});

function exposeDailyQuota(req: Request, res: Response, next: NextFunction): void {
  const info = (req as Request & { rateLimit?: { limit: number; remaining: number } }).rateLimit;
  if (info) {
    res.setHeader('X-AI-Quota-Limit', String(info.limit));
    res.setHeader('X-AI-Quota-Remaining', String(Math.max(0, info.remaining)));
  }
  next();
}

const MessageSchema = z
  .object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(50_000),
  })
  .strict();

const GenerateRequestSchema = z
  .object({
    // Grounded (live Google Search) requests always use Gemini; ungrounded
    // requests always use Groq, the site's default free provider. `model`
    // is validated against the matching allowlist once `grounded` is known.
    model: z.string().max(100).optional(),
    system: z.string().max(12_000).default(''),
    messages: z.array(MessageSchema).min(1).max(20),
    // 8192, not 4000: a grounded request keeps the model's thinking tokens
    // inside this same budget, and Hebrew runs 2-3x the tokens of English
    // for the same prose — the enrich call was hitting the old ceiling and
    // coming back cut off mid-sentence.
    maxTokens: z.number().int().min(1).max(8_192).default(2_500),
    grounded: z.boolean().default(false),
  })
  .strict()
  .superRefine((value, ctx) => {
    const inputChars =
      value.system.length +
      value.messages.reduce((total, message) => total + message.content.length, 0);
    if (inputChars > 60_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['messages'],
        message: 'Combined prompt content must not exceed 60000 characters',
      });
    }
  });

// Tells the client whether a server-side default key exists, without ever
// exposing the key itself. The client only needs this to decide whether to
// show "use my own key" as required or optional.
router.get('/ai/config', (_req, res) => {
  res.json({
    groq: {
      available: !!resolveGroqKey(),
      defaultModel: DEFAULT_GROQ_MODEL,
      anonymousDailyQuota: DAILY_QUOTA,
    },
    // Gemini is exposed here only so the client knows live Google Search
    // enrichment works without the visitor supplying their own key — it is
    // not offered as a general chat provider anymore.
    gemini: {
      available: !!resolveGeminiKey(),
      defaultModel: DEFAULT_GEMINI_MODEL,
      anonymousDailyQuota: DAILY_QUOTA,
    },
  });
});

async function callGemini(
  model: string,
  system: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  maxTokens: number,
  grounded: boolean,
): Promise<{ status: number; text?: string; error?: string; truncated?: boolean }> {
  const key = resolveGeminiKey();
  if (!key) return { status: 503, error: 'No server-side Gemini key is configured.' };

  const generationConfig: Record<string, unknown> = { maxOutputTokens: maxTokens };
  if (!grounded && model.includes('flash')) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }
  const body: Record<string, unknown> = {
    system_instruction: { parts: [{ text: system || '' }] },
    contents: messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    generationConfig,
  };
  if (grounded) body.tools = [{ google_search: {} }];

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    },
  );
  const data = (await upstream.json()) as {
    error?: { message?: string };
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }>;
  };
  if (!upstream.ok) {
    return { status: upstream.status, error: data.error?.message || 'Gemini request failed' };
  }
  const candidate = data.candidates?.[0];
  const text = (candidate?.content?.parts || [])
    .map((p: { text?: string }) => p.text || '')
    .join('\n');
  // A run that stopped because it ran out of budget produces text that ends
  // mid-sentence. Saying so is the difference between the caller showing an
  // error and the caller repairing the half-written JSON into something that
  // looks complete.
  return { status: 200, text, truncated: candidate?.finishReason === 'MAX_TOKENS' };
}

async function callGroq(
  model: string,
  system: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  maxTokens: number,
): Promise<{ status: number; text?: string; error?: string; truncated?: boolean }> {
  const key = resolveGroqKey();
  if (!key) return { status: 503, error: 'No server-side Groq key is configured.' };

  const body = {
    model,
    max_tokens: maxTokens,
    // gpt-oss models spend part of the token budget on hidden chain-of-thought
    // reasoning before the visible answer; capping that effort keeps short
    // responses (like the settings "test connection" ping) from being
    // truncated to nothing. Groq ignores this field for non-reasoning models.
    reasoning_effort: 'low',
    messages: [...(system ? [{ role: 'system' as const, content: system }] : []), ...messages],
  };

  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  const data = (await upstream.json()) as {
    error?: { message?: string };
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  };
  if (!upstream.ok) {
    return { status: upstream.status, error: data.error?.message || 'Groq request failed' };
  }
  const choice = data.choices?.[0];
  // OpenAI-compatible APIs call this 'length'; it means the same thing Gemini's
  // MAX_TOKENS does — the answer stops mid-sentence.
  return {
    status: 200,
    text: choice?.message?.content || '',
    truncated: choice?.finish_reason === 'length',
  };
}

// Proxies chat calls server-side so no API key ever reaches the browser.
// Used only when the visitor has not supplied their own key. Grounded (live
// Google Search) requests are always served by Gemini; everything else is
// served by Groq, the site's default free provider.
router.post(
  '/ai/generate',
  burstLimiter,
  dailyQuota,
  exposeDailyQuota,
  async (req, res): Promise<void> => {
    const parsed = GenerateRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn(
        {
          requestId: req.id,
          ip: req.ip,
          issues: parsed.error.issues.map(issue => ({ code: issue.code, path: issue.path })),
        },
        'Rejected invalid AI proxy request',
      );
      res.status(400).json({
        error: 'Invalid request body',
        issues: parsed.error.issues.map(issue => ({ path: issue.path, message: issue.message })),
      });
      return;
    }

    const { model, system, messages, maxTokens, grounded } = parsed.data;
    const provider = grounded ? 'gemini' : 'groq';
    const allowedModels: readonly string[] = grounded ? ALLOWED_GEMINI_MODELS : ALLOWED_GROQ_MODELS;
    const requestedModel = model && allowedModels.includes(model) ? model : undefined;
    const resolvedModel = requestedModel ?? (grounded ? DEFAULT_GEMINI_MODEL : DEFAULT_GROQ_MODEL);

    try {
      const result = grounded
        ? await callGemini(resolvedModel, system, messages, maxTokens, true)
        : await callGroq(resolvedModel, system, messages, maxTokens);

      if (result.status !== 200) {
        res.status(result.status).json({ error: result.error || `${provider} request failed` });
        return;
      }
      res.json({ text: result.text || '', truncated: result.truncated === true });
    } catch (err: unknown) {
      const timedOut = err instanceof Error && err.name === 'TimeoutError';
      logger.error(
        { err, requestId: req.id, provider, model: resolvedModel, timedOut },
        timedOut ? `${provider} request timed out` : `${provider} request failed`,
      );
      res.status(timedOut ? 504 : 502).json({
        error: timedOut ? `${provider} request timed out` : `Failed to reach ${provider}`,
      });
    }
  },
);

export default router;
