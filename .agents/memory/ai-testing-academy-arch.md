---
name: AI Testing Academy site architecture
description: How the multi-language, multi-provider-AI-key AI Testing Academy artifact is structured — read before touching its content, locales, or AI provider wiring.
---

## Multi-language content (React version, migrated 2026-07-30)
The site was migrated from a hand-written vanilla-JS SPA to React + TypeScript
on the standard react-vite scaffold. Content still lives in locale data objects
(`src/lib/locales/en.ts`, `he.ts`), consumed via a `LocaleContext`/`useLocale()`
hook — same content-symmetry idea as before, just rendered through JSX instead
of injected HTML strings. Adding content means editing the locale objects.

**Language switching triggers a full page reload**, not in-place SPA state:
`switchLang()` sets `localStorage['ata_lang']` and navigates via
`window.location.href` with a `?lang=` query param; `dir`/`lang` on
`<html>` are (re)applied on load. This is a deliberate simplicity tradeoff
carried over from the original site — if you test or automate the language
toggle, wait for the navigation/reload to finish before reading
`document.documentElement.dir`, or you'll read the pre-reload document and
see a false "RTL didn't apply" result.

Old vanilla-JS files (`assets/js/*.js`, inline `<style>` in `index.html`) were
deleted as part of the migration; CSS was ported near-verbatim into
`src/app.css` rather than rewritten in Tailwind utilities, since the design
is fully custom. PDF export (jsPDF/html2canvas) and doc parsing (PDF.js,
Mammoth) still use the old CDN dynamic-loader pattern post-migration — that
is a known follow-up, not yet converted to npm imports.

**Why:** the locale-object pattern was chosen to keep English/Hebrew content
symmetric and avoid duplicating markup per language; it survived the React
migration unchanged.

## AI provider keys: never serve a plaintext .env to the browser
The site originally shipped with client-side code that did
`fetch('../.env')` to read a default AI API key — meaning any site visitor
could see the key via devtools/view source. This was replaced with a
backend proxy: `server` holds `GEMINI_API_KEY` as a Replit
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
