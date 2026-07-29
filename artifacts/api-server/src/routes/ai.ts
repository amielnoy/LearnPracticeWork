import { Router, type IRouter } from 'express';

const router: IRouter = Router();

// Prefer the Replit Secret (GEMINI_API_KEY) when present; otherwise fall back
// to the base64-encoded copy committed in artifacts/api-server/.env
// (GEMINI_API_KEY_B64), decoded here at runtime.
function resolveGeminiKey(): string | undefined {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const encoded = process.env.GEMINI_API_KEY_B64;
  if (!encoded) return undefined;
  try {
    return Buffer.from(encoded, 'base64').toString('utf8');
  } catch {
    return undefined;
  }
}

// Models the "AI Testing Academy" client is allowed to request through the
// server-held default Gemini key. Keep this list in sync with the models
// offered in artifacts/ai-testing-academy/assets/js/providers.js.
const ALLOWED_GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'];

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Tells the client whether a server-side default key exists, without ever
// exposing the key itself. The client only needs this to decide whether to
// show "use my own key" as required or optional.
router.get('/ai/config', (_req, res) => {
  res.json({
    gemini: { available: !!resolveGeminiKey(), defaultModel: DEFAULT_MODEL },
  });
});

// Proxies Gemini calls server-side so the API key never reaches the browser.
// Used only when the visitor has not supplied their own key.
router.post('/ai/generate', async (req, res) => {
  const key = resolveGeminiKey();
  if (!key) {
    return res.status(503).json({ error: 'No server-side Gemini key is configured.' });
  }

  const { model, system, messages, maxTokens, grounded } = req.body as {
    model?: string;
    system?: string;
    messages?: { role: string; content: string }[];
    maxTokens?: number;
    grounded?: boolean;
  };

  const resolvedModel = model && ALLOWED_GEMINI_MODELS.includes(model) ? model : DEFAULT_MODEL;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages is required' });
  }

  const generationConfig: Record<string, unknown> = { maxOutputTokens: maxTokens ?? 2500 };
  if (!grounded && resolvedModel.includes('flash')) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  const body: Record<string, unknown> = {
    system_instruction: { parts: [{ text: system || '' }] },
    contents: messages.map((m) => ({
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
      },
    );
    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error?.message || 'Gemini request failed' });
    }
    const text = (data.candidates?.[0]?.content?.parts || [])
      .map((p: { text?: string }) => p.text || '')
      .join('\n');
    res.json({ text });
  } catch (err: any) {
    res.status(502).json({ error: err.message || 'Failed to reach Gemini' });
  }
});

export default router;
