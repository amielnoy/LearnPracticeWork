---
name: AI Testing Academy site architecture
description: How the multi-language, multi-provider-AI-key AI Testing Academy artifact is structured — read before touching its content, locales, or AI provider wiring.
---

## Multi-language content
All page content lives in locale objects (`assets/js/locales/en.js`, `he.js`),
injected into a static HTML shell at runtime by `i18n.js`'s `applyLocale()`.
There is no per-page templating — adding content means editing the locale
objects (or, for repetitive data-driven sections like the lecture grid,
building a small dedicated module such as `lectures.js` that generates its
own section from a bilingual data array and inserts itself into the DOM).
Full write-up: `artifacts/ai-testing-academy/README.md`.

**Why:** the site was originally shipped as a JS stub with content missing
entirely; the locale-object + dynamic-module pattern was chosen to keep
English/Hebrew content symmetric and avoid duplicating markup per language.

## AI provider keys: never serve a plaintext .env to the browser
The site originally shipped with client-side code that did
`fetch('../.env')` to read a default AI API key — meaning any site visitor
could see the key via devtools/view source. This was replaced with a
backend proxy: `artifacts/api-server` holds `GEMINI_API_KEY` as a Replit
Secret and exposes `GET /api/ai/config` (availability only) and
`POST /api/ai/generate` (does the actual call). The client only proxies
through the backend when the visitor has not supplied their own key: BYOK
requests still go straight from the visitor's browser to the provider's API
using a key stored in their own `localStorage`, which is fine since it's
their own credential.

**Why:** a fetchable `.env` in a static/public directory is not a secret
boundary — anything the browser can request, any visitor can request.

**How to apply:** if asked to "store an AI key" or "add a default key" for
this site (or a similarly-shaped static site), route it through a real
backend endpoint plus `requestSecrets`, not a plaintext file served to the
client. Only Gemini has a default key today; Anthropic/OpenAI are BYOK-only.
