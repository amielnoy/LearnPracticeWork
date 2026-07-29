# AI Testing Academy — Multi-Language Site Guide

This site is a plain HTML + ES-modules app (no framework, no build-time templating)
served by Vite. All page content is stored as **locale objects** in JavaScript and
injected into the DOM at runtime, which is what makes the whole site bilingual
(English / Hebrew) with a live language switch and no page-specific duplication.

## How the multi-language system works

```
index.html                  → static shell only (skip link, #nav, #hero,
                               #main-content, #site-footer, #scrollProgress, #toTop)
assets/js/main.js           → entry point, imports every module and calls them
                               in order (see below)
assets/js/i18n.js           → resolves the active language, loads the locale,
                               exposes `applyLocale()` which injects nav/hero/
                               main/footer HTML into the shell
assets/js/locales/en.js     → English locale object
assets/js/locales/he.js     → Hebrew locale object
assets/js/lectures.js       → dynamically builds & inserts the Lecture Series
                               section (see "Adding a dynamic section" below)
assets/js/questions.js      → dynamically builds & inserts the Interview
                               Questions section (same pattern as lectures.js)
assets/js/ux.js             → scroll-spy, theme toggle, language toggle,
                               mobile nav, scroll progress, copy buttons
```

### Language resolution (`i18n.js`)

On load, the active language is resolved in this priority order:

1. `?lang=he` (or `?lang=en`) query parameter
2. `localStorage.getItem('ata_lang')` (remembered from a previous visit/toggle)
3. Browser locale (`navigator.language`) — Hebrew browsers default to `he`
4. Falls back to `en` if the resolved language has no matching locale

Once resolved, `applyLocale()` sets `<html lang>` / `<html dir>` (for RTL support)
and injects each locale's `nav`, `hero`, `main`, and `footer` HTML strings into
the corresponding containers in `index.html`.

### The language toggle

A "🌐 עברית / English" button lives in the sidebar (see `nav` HTML in each
locale file), wired up in `ux.js`. Clicking it flips `ata_lang` in
`localStorage`, sets `?lang=` on the URL, and reloads the page — this is a full
reload (not a SPA re-render) because nearly all content, including
dynamically-inserted sections like Lecture Series, is generated once at load
time from the active locale.

## Adding a new language

1. Create `assets/js/locales/<code>.js` (e.g. `fr.js`) modeled on `en.js` /
   `he.js`. It must export an object with the same shape: `dir`, `ui`, `nav`,
   `hero`, `main`, `footer`, `s` (UI strings used by JS, e.g. theme labels),
   and `prompts` (AI system prompts for the resume/interview agents).
2. Register it in `assets/js/i18n.js`:
   ```js
   import { fr } from './locales/fr.js';
   const CATALOG = { en, he, fr };
   ```
3. Add the equivalent bilingual content to any dynamically-built sections
   (`lectures.js`, `questions.js`) — each keeps its own small per-language
   text bank (see below).
4. Add a `?lang=fr` option or extend the toggle button logic in `ux.js` if
   you want it reachable from the UI (today the toggle is a simple two-way
   en/he flip).

## Adding a new static section (inside a locale's `main` HTML)

Static sections (Connection Setup, Resume & CV, Mock Interview) live directly
inside each locale's `main` HTML string in `en.js` / `he.js`. To add one:

1. Write the section markup (with a unique `id`) inside **both** `en.js` and
   `he.js`'s `main` field, in the same relative position.
2. Add the nav link inside **both** locales' `nav` HTML string, pointing to
   the section's `id` via an anchor (`href="#your-section"`).
3. If the section needs JS behavior, add a module under `assets/js/` and wire
   it up from `main.js`.

## Adding a new dynamic section (like Lecture Series)

Some sections — Lecture Series (`lectures.js`) and Interview Questions
(`questions.js`) — are built and inserted into the DOM at runtime instead of
living in the locale `main` HTML. This pattern is used when a section has
repetitive, data-driven content (e.g. a grid of 10 lectures) that's easier to
generate from an array than to hand-write as HTML twice (once per language).

To follow this pattern for a new section:

1. Create `assets/js/<your-section>.js`.
2. Define an `EN` and `HE` object at the top with the section's copy and any
   data arrays (see `lectures.js`'s `tracks` array as an example of
   structured, repeated content).
3. Export an `init<YourSection>()` function that:
   - Picks the bank via `import { activeLang } from './i18n.js'`.
   - Builds a `<section id="your-section">` element and sets its
     `innerHTML` from the bank.
   - Inserts it at the right place in the DOM (see how `lectures.js` inserts
     itself `.before(#interview-talk)`).
   - Creates and inserts a nav `<a class="link" href="#your-section">` at the
     right place in `#nav`.
4. Import and call `init<YourSection>()` from `main.js`, **after**
   `applyLocale()` has run (since it depends on the nav/main containers
   already existing) and in the position — relative to the other `init*()`
   calls — where you want the section to end up. Section insertion order is
   determined purely by the order these `init*()` calls run and which DOM
   node each one inserts itself before/after, so check neighboring modules'
   insertion logic before adding a new one.
5. Update the numbered badge (`<span class="num">NN</span>`) on your new
   section's heading, and on any section that shifts position because of the
   insertion, so the numbering stays sequential.

## Required DOM ids in locale `main` HTML

If you edit a locale's `main` HTML, keep all of the following ids intact —
`resume.js`, `interview.js`, and `providers.js` query them directly:

`providerSel`, `modelSel`, `apiKey`, `apiKeyLabel`, `useOwnKey`, `ownKeyRow`,
`connStatus`, `uploadZone`, `uploadLabel`, `resumeFile`, `resumeText`,
`targetRole`, `resumeBtn`, `resumeErr`, `resumeResult`, `resumeScore`,
`resumeSummary`, `resumeBars`, `resumeStrengths`, `resumeGaps`, `resumeRecs`,
`improvedWrap`, `jobDesc`, `improveBtn`, `improvedText`, `improvedErr`,
`pdfBtn`, `chatBox`, `chatInput`, `chatErr`, `sendBtn`, `verdictBtn`,
`startBtn`.

The nav HTML must also keep `themeToggle`, `themeIcon`, `themeLabel`,
`langToggle`, `langIcon`, `langLabel`.

## AI provider keys: server-side default + bring-your-own-key

The Connection Setup section lets a visitor either use a **default key** (no
setup needed) or **their own key** (BYOK, stored only in their browser).

- **Default key (Gemini only):** held server-side as a Replit Secret
  (`GEMINI_API_KEY`) on `artifacts/api-server`, never sent to the browser.
  The client calls `GET /api/ai/config` to check availability (and the
  configured default model, `GEMINI_MODEL` — set via a non-secret env var)
  and `POST /api/ai/generate` to run a completion; the server holds the key
  and proxies the request to Gemini. See `artifacts/api-server/src/routes/ai.ts`.
- **Own key (any provider):** entered by the visitor, stored only in their
  `localStorage`, and sent directly from their browser to the provider's API
  (Gemini, Anthropic, or OpenAI) — never touches our server. See
  `assets/js/providers.js`.

Only Gemini has a server-side default today. Anthropic and OpenAI always
require the visitor's own key (the "Use my own API key" checkbox is
force-enabled and can't be unchecked for those providers).

To add a default key for another provider, add its secret name and a
`generate`-style handler to `artifacts/api-server/src/routes/ai.ts`, extend
`GET /api/ai/config` to report its availability, and update
`hasServerDefault()` / `callClaude()` in `providers.js` to route through the
proxy for that provider when no own key is set.

**Do not** reintroduce the old pattern of serving a plaintext `.env` file to
the browser (`fetch('../.env')`) — any key placed there is visible to every
visitor via devtools/view-source. Server-side secrets belong in the backend
only.

## Local development

```bash
pnpm --filter @workspace/ai-testing-academy run dev
```

Test both languages during development via `?lang=en` / `?lang=he` in the
preview URL — this overrides the saved/browser-detected language without
having to clear `localStorage`.
