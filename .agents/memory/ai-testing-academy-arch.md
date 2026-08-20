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
backend proxy: `server` holds the keys as Replit Secrets and exposes
`GET /api/ai/config` (availability only) and `POST /api/ai/generate` (does the
actual call). The client only proxies through the backend when the visitor has
not supplied their own key: BYOK requests still go straight from the visitor's
browser to the provider's API using their own key, which is fine since it's
their own credential.

That key is kept in `sessionStorage` by default, so it does not outlive the
tab; a clearly labelled opt-in moves it to `localStorage` for a private device,
and keys written to `localStorage` by older versions are migrated back out on
first read.

**Why:** a fetchable `.env` in a static/public directory is not a secret
boundary — anything the browser can request, any visitor can request.

**How to apply:** if asked to "store an AI key" or "add a default key" for
this site (or a similarly-shaped static site), route it through a real
backend endpoint plus `requestSecrets`, not a plaintext file served to the
client.

Two server-side defaults exist today, scoped to different jobs: **Groq**
(`GROQ_API_KEY`) is the default chat provider behind resume scoring and the
mock interview, and **Gemini** (`GEMINI_API_KEY`) is search-only — it backs the
Google Search grounding in question-bank enrichment and is not offered as a
general chat provider any more. Anthropic and OpenAI are BYOK-only. An earlier
version of this note said Gemini was the only default and implied it served
chat; it does not.
