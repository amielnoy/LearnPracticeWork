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

// Models the "AI Testing Academy" client is allowed to request through the
// server-held default Gemini key. Keep this list in sync with the models
// offered in artifacts/ai-testing-academy/assets/js/providers.js.
const ALLOWED_GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
] as const;

const configuredDefaultModel = process.env.GEMINI_MODEL;
const DEFAULT_MODEL =
  configuredDefaultModel &&
  ALLOWED_GEMINI_MODELS.includes(configuredDefaultModel as (typeof ALLOWED_GEMINI_MODELS)[number])
    ? configuredDefaultModel
    : 'gemini-2.5-flash';

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
    model: z.enum(ALLOWED_GEMINI_MODELS).optional(),
    system: z.string().max(12_000).default(''),
    messages: z.array(MessageSchema).min(1).max(20),
    maxTokens: z.number().int().min(1).max(4_000).default(2_500),
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
    gemini: {
      available: !!resolveGeminiKey(),
      defaultModel: DEFAULT_MODEL,
      anonymousDailyQuota: DAILY_QUOTA,
    },
  });
});

// Proxies Gemini calls server-side so the API key never reaches the browser.
// Used only when the visitor has not supplied their own key.
router.post(
  '/ai/generate',
  burstLimiter,
  dailyQuota,
  exposeDailyQuota,
  async (req, res): Promise<void> => {
    const key = resolveGeminiKey();
    if (!key) {
      res.status(503).json({ error: 'No server-side Gemini key is configured.' });
      return;
    }

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
    const resolvedModel = model ?? DEFAULT_MODEL;

    const generationConfig: Record<string, unknown> = { maxOutputTokens: maxTokens };
    if (!grounded && resolvedModel.includes('flash')) {
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
    if (grounded) {
      body.tools = [{ google_search: {} }];
    }

    try {
      const upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${resolvedModel}:generateContent`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        },
      );
      const data = (await upstream.json()) as {
        error?: { message?: string };
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      if (!upstream.ok) {
        res.status(upstream.status).json({ error: data.error?.message || 'Gemini request failed' });
        return;
      }
      const text = (data.candidates?.[0]?.content?.parts || [])
        .map((p: { text?: string }) => p.text || '')
        .join('\n');
      res.json({ text });
    } catch (err: unknown) {
      const timedOut = err instanceof Error && err.name === 'TimeoutError';
      logger.error(
        { err, requestId: req.id, model: resolvedModel, timedOut },
        timedOut ? 'Gemini request timed out' : 'Gemini request failed',
      );
      res.status(timedOut ? 504 : 502).json({
        error: timedOut ? 'Gemini request timed out' : 'Failed to reach Gemini',
      });
    }
  },
);

export default router;
