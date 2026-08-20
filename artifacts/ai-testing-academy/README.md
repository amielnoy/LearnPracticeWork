# AI Testing Academy

A single-page React site that teaches QA automation and runs three AI-backed tools — resume
review, mock interview, and question-bank enrichment — from the browser. There is no backend of
its own: the visitor brings an API key, or the optional `api-server` in this monorepo proxies
for them.

For the full architecture walkthrough, open `architecture.html` at the repo root.

## Layout

```
src/
├── main.tsx                  entry — mounts <App />
├── App.tsx                   providers + wouter router (base from BASE_PATH)
├── pages/HomePage.tsx        the whole page: theme, nav drawer, section order
├── components/
│   ├── chrome/               Nav, Footer, Hero, ScrollProgress, BackToTop,
│   │                         ErrorBoundary, ToolLauncher — page furniture
│   ├── agents/               ConnectionSetup, ResumeAgent, InterviewAgent —
│   │                         everything that reaches ProviderContext
│   ├── practice/             QuestionBank, CodingChallenges, LectureSeries and
│   │                         their cards — static content, no model access
│   ├── account/              GoogleSignIn — the only AuthContext consumer
│   └── ui/                   tooltip.tsx, the one shadcn primitive still used
├── context/
│   ├── LocaleContext.tsx     resolves the language once, exposes locale + switcher
│   └── ProviderContext.tsx   provider/model/key state and the AI call surface
├── hooks/                    useDisclosure, useReveal, useVoice
└── lib/
    ├── locales/{en,he}.ts    every user-visible string, typed so the two stay in step
    ├── i18n.ts               language resolution, switching, <html lang/dir>
    ├── providers.ts          the provider registry and callAI
    ├── domUtils.ts           escaping, linkifying, markdown → plain text
    ├── challenges.ts         the challenge content model (types only)
    └── questionBank.ts       interview questions, EN + HE, with hints and answers
```

Sections render in the order `HomePage.tsx` lists them. Adding one means writing a component,
adding a line there, and adding a `nav.links` entry to both locales — scroll-spy and the reveal
animation both derive from the DOM, so neither needs editing.

## Progressive reveal

Two sections hide their payload behind a stepped disclosure, and both run on the same
`useDisclosure(3)` hook — which is stage arithmetic only and has no opinion about what a stage
contains:

| Section | Click 1 | Click 2 | Click 3 |
| --- | --- | --- | --- |
| Coding challenges (`ChallengeCard`) | hint | solution + complexity | collapse |
| Interview questions (`QuestionCard`) | hint | full answer | collapse |

In the question bank the question *is* the button, and a cue inside it (`Show hint` → `Show
full answer` → `Hide`) says what the next click does, so the control is not a mystery box.
`aria-expanded` tracks the state for assistive tech.

To add a question, add an entry to `lib/questionBank.ts` in **both** `EN_BANK` and `HE_BANK`.
Each needs `q`, a one-line `hint`, and an `answer` array (one string per paragraph); a test
fails if any question ships without both.

## Multi-language

All copy lives in `src/lib/locales/en.ts` and `he.ts`. `he.ts` is typed as `Locale` (the type
inferred from `en.ts`), so the compiler enumerates anything missing — `pnpm run typecheck` is
the gate that keeps the two catalogs aligned.

`resolveLang()` picks the active language in this order:

1. `?lang=he` / `?lang=en` on the URL
2. `localStorage.ata_lang` from a previous visit
3. `navigator.language` — Hebrew browsers get `he`
4. `en`

The choice is persisted, and `<html lang>` / `<html dir>` are set from it, which is what drives
RTL. The language toggle flips the stored value, sets `?lang=` and reloads — a full reload
rather than a re-render, because the whole tree reads the locale at mount.

Test both languages with `?lang=en` / `?lang=he`; it overrides the saved value without clearing
`localStorage`.

**To add a language:** create `src/lib/locales/<code>.ts` typed as `Locale`, register it in the
`CATALOG` map in `i18n.ts`, and extend the toggle in `Nav.tsx` (today it is a two-way en/he
flip).

## AI provider keys: server default + bring-your-own-key

Connection Setup lets a visitor use a **server-side default key** or **their own**.

- **Default key (Groq)** — held as a Replit Secret (`GROQ_API_KEY`) on `server`
  and never sent to the browser. This is the site's default free chat provider for resume
  scoring and the mock interview. The client calls `GET /api/ai/config` for a boolean and a
  default model name, and `POST /api/ai/generate` to run a completion. See
  `server/src/routes/ai.ts`.
- **Gemini (search-only default)** — a separate Replit Secret (`GEMINI_API_KEY`) also held on
  `server`. It is used exclusively for the live Google Search grounding feature
  in the Practice Library's question enrichment (`grounded: true` requests) and is not offered
  as a general chat provider anymore.
- **Own key (Claude or OpenAI)** — entered by the visitor, kept in `sessionStorage` by default,
  and sent straight from the browser to Anthropic or OpenAI. It never touches our server. A
  clearly labelled opt-in can persist it in `localStorage` on a private device. Keys saved by
  older versions are migrated out of persistent storage automatically. See
  `src/context/ProviderContext.tsx` and `src/lib/providers.ts`.

The proxy enforces a short burst limit and a small 10-request daily per-IP quota by default, strict prompt validation, bounded
output tokens, request-body limits, and an upstream timeout. Production cross-origin access is
deny-by-default: set `ALLOWED_ORIGINS` to a comma-separated list when an additional frontend
origin must call the API. `REPLIT_DOMAINS` is included automatically. The quota and timeout
defaults can be overridden with `AI_RATE_LIMIT_WINDOW_MS`, `AI_RATE_LIMIT_MAX`,
`AI_DAILY_QUOTA`, and `AI_UPSTREAM_TIMEOUT_MS`.

Groq and Gemini each have a server-side default, scoped to different purposes (general chat vs.
search grounding, respectively). Anthropic and OpenAI are own-key or nothing, and when no
default exists the "use my own key" checkbox is dropped entirely rather than rendered ticked
and disabled.

To add a default for another vendor: add a handler to `routes/ai.ts`, report its availability
from `GET /api/ai/config`, and let `callAI` route through the proxy for it in `providers.ts`.

> **Never** serve a plaintext `.env` to the browser. Any key placed there is readable by every
> visitor through devtools. Server-side secrets belong in the backend only.

## Local development

```bash
pnpm --filter @workspace/ai-testing-academy run dev
```

`vite.config.ts` throws unless `PORT` and `BASE_PATH` are set — under a sub-path deploy a
silently wrong base gives a blank page and 404s on every asset, so it fails at startup instead.
Vite proxies `/api` to `localhost:$API_PORT` (default 8787); without `api-server` running, the
AI panel decides no server key exists and offers bring-your-own-key only.

## Tests

Covered by the workspace suite in `tests/`, not by a per-package runner. Three of the five
layers point at this package:

```bash
pnpm test:unit         # lib/domUtils, lib/i18n, lib/providers
pnpm test:component    # ChallengeCard, CodingChallenges, QuestionCard, QuestionBank,
                       # ConnectionSetup, Footer, BackToTop
pnpm test:e2e          # this app end to end, desktop + mobile
./run-all-tests.sh     # everything, plus the Allure and Playwright reports
```

Component tests mount the real components with Playwright CT, so `@academy/*` resolves to
`src/` in both `tests/tsconfig.json` and the CT Vite config.

E2E boots this package's own Vite dev server on port 5273 with `BASE_PATH=/`, drives it in
desktop and mobile Chromium, and reaches the UI through page objects in `tests/e2e/pages` and
`tests/e2e/components` — so a markup change breaks one class, not a dozen specs. Nothing there
talks to an API server, which is why those flows see the bring-your-own-key state.

Two ids that tests depend on: `#nav` / `#navToggle` / `#themeToggle` / `#langToggle` on the
nav, and `#setup`, `#resume`, `#lecture-series`, `#interview-talk`, `#interview-questions`,
`#coding-challenges` on the sections. Renaming one means updating `NavComponent` or
`SECTION_IDS`. See `tests/README.md`.

## Deployment

- **Replit** — `.replit-artifact/artifact.toml`, `BASE_PATH=/ai-testing-academy/`, same origin
  as the API server.
- **GitHub Pages** — `.github/workflows/ci.yml`, mounted at `/<repo>/ai-testing-academy/`.
  Static only, so the AI panel is bring-your-own-key there.
