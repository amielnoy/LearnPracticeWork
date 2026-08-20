# AI Testing Academy

A single-page React site that teaches QA automation and runs three AI-backed tools — resume
review, mock interview, and question-bank enrichment — from the browser. The visitor brings an
API key, or the optional `api-server` in this monorepo proxies for them. The server also exposes
localized question-bank, coding-challenge, and lecture-series content from Supabase; the current
UI still renders its bundled content modules, so the content API is ready for the migration
rather than required for the static site to render.

When the Python API is running, its Scalar reference is available at `/api/docs` and its
runtime OpenAPI JSON at `/api/openapi.json`. Scalar is served by Fly through the same-origin
Replit relay; it holds no Replit secret and has agent, telemetry, proxying, remote fonts, and
credential persistence disabled.

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
│   ├── agents/               ConnectionSetup, ResumeAgent, InterviewAgent,
│   │                         AiDataConsent — everything that reaches
│   │                         ProviderContext. Each agent is wiring and form;
│   │                         its parts sit beneath it:
│   │   ├── resume/           ResumeTips, ResumeUploadZone, ResumeScorecard
│   │   └── interview/        ChatTranscript, VoiceControls
│   ├── practice/             QuestionBank, CodingChallenges, LectureSeries and
│   │                         their cards — static content, no model access
│   ├── account/              GoogleSignIn — the only AuthContext consumer
│   └── ui/                   tooltip.tsx, the one shadcn primitive still used
├── context/
│   ├── LocaleContext.tsx     resolves the language once, exposes locale + switcher
│   ├── ProviderContext.tsx   provider/model/key state and the AI call surface
│   ├── AuthContext.tsx       Google sign-in → verified HttpOnly server session
│   └── ProgressContext.tsx   per-tool progress, so the launcher can offer to resume
├── hooks/
│   ├── useDisclosure.ts      stage arithmetic for the stepped reveals
│   ├── useReveal.ts          the scroll-in animation
│   ├── useVoice.ts           speech recognition and synthesis
│   ├── useResumeDrafts.ts    the three résumé fields, kept across a reload
│   ├── useResumeUpload.ts    what the upload zone says while a file is read
│   ├── useResumeEvaluation.ts  scoring, rewriting and the PDF download
│   └── useInterviewSession.ts  whose turn it is, and what is persisted
├── scripts/
│   └── generate-prerender.ts rewrites the static block in index.html from the data below
└── lib/
    ├── locales/{en,he}.ts    UI strings and coding challenges, typed so the two stay in step
    ├── sections.ts           section order and numbering — the one list, see below
    ├── i18n.ts               language resolution, switching, <html lang/dir>
    ├── providers.ts          the provider registry and callAI
    ├── domUtils.ts           escaping, linkifying, markdown → plain text
    ├── documentText.ts       one extractor per file format, and the rules a
    │                         résumé file has to pass before it is accepted
    ├── resumePdf.ts          jsPDF text builders, including the Hebrew face
    ├── resumeExport.ts       picks a builder, names the file, rasterises as a
    │                         last resort
    ├── resumeSamples.ts      the worked example the "try it" link loads
    ├── interviewSession.ts   validates a transcript restored from storage
    ├── challenges.ts         the challenge content model (types only)
    ├── lectures.ts           the bundled lecture catalogue, EN + HE, both tracks
    └── questionBank.ts       bundled interview questions, EN + HE, with hints and answers
```

`lib/sections.ts` is the order of the page, and `HomePage.tsx` and `Nav.tsx` both render from
it. Adding a section means writing the component, adding an entry to `SECTIONS`, adding a
label per locale under `nav.labels`, and adding one line to `HomePage.tsx` — the nav, the
scroll-spy and the heading numbers all follow from the first of those, and the reveal
animation derives from the DOM.

There used to be three answers to “what order are the sections in” — the array in
`nav.links`, the JSX in `HomePage`, and the static prerender in `index.html` — and none of
them agreed, which is how the page ended up numbering its headings 01 → 03 → 02 with three
sections carrying no number at all. After changing the order or the catalogue, run
`pnpm run generate-prerender` so the crawler-facing shell follows.

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

UI copy and coding-challenge content live in `src/lib/locales/en.ts` and `he.ts`; lecture and
question-bank data live in their dedicated modules. `he.ts` is typed as `Locale` (the type
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

- **Default key (Groq)** — held only in the backend host's encrypted secret store
  (`GROQ_API_KEY`; Fly secrets in the documented deployment)
  and never sent to the browser. This is the site's default free chat provider for resume
  scoring and the mock interview. The client calls `GET /api/ai/config` for a boolean and a
  default model name, and `POST /api/ai/generate` to run a completion. See
  `server/app/ai_gateway.py` for the provider itself and `server/app/routes/ai.py` for the
  quota and metrics around it.
- **Gemini (search-only default)** — a separate backend-only secret (`GEMINI_API_KEY`) held on
  `server`. It is used exclusively for the live Google Search grounding feature
  in the Practice Library's question enrichment (`grounded: true` requests) and is not offered
  as a general chat provider anymore.
- **Own key (Claude or OpenAI)** — entered by the visitor, kept in `sessionStorage` by default,
  and sent straight from the browser to Anthropic or OpenAI. It never touches our server. A
  clearly labelled opt-in can persist it in `localStorage` on a private device. Keys saved by
  older versions are migrated out of persistent storage automatically. See
  `src/context/ProviderContext.tsx` and `src/lib/providers.ts`.

The proxy enforces a short burst limit and a small 10-request daily quota by default, strict prompt validation, bounded
output tokens, request-body limits, and an upstream timeout. Production cross-origin access is
deny-by-default: set `ALLOWED_ORIGINS` to a comma-separated list when an additional frontend
origin must call the API. `REPLIT_DOMAINS` is included automatically. The quota and timeout
defaults can be overridden with `AI_RATE_LIMIT_WINDOW_MS`, `AI_RATE_LIMIT_MAX`,
`AI_DAILY_QUOTA`, and `AI_UPSTREAM_TIMEOUT_MS`.

Signed-in visitors are quota-keyed by verified Google subject; anonymous visitors use their
network identity. Production counters are atomic Postgres rows keyed by an HMAC digest and
require `RATE_LIMIT_SALT`, so values are shared across workers without storing raw IPs.

Groq and Gemini each have a server-side default, scoped to different purposes (general chat vs.
search grounding, respectively). Anthropic and OpenAI are own-key or nothing, and when no
default exists the "use my own key" checkbox is dropped entirely rather than rendered ticked
and disabled.

To add a default for another vendor: add a provider class to `server/app/ai_gateway.py` and
list it in `PROVIDERS`, then let `callAI` route through the proxy for it in `providers.ts`.
`GET /api/ai/config` reports the new vendor's availability on its own — it is built from the
registry, so there is no second place to remember.

> **Never** serve a plaintext `.env` to the browser. Any key placed there is readable by every
> visitor through devtools. Server-side secrets belong in the backend only.

## Local development

```bash
pnpm --filter @workspace/ai-testing-academy run dev
```

`vite.config.ts` defaults to `PORT=5000` and `BASE_PATH=/` for a clean local build; deployments
override both explicitly so the router and emitted asset URLs agree with their mounted path.
Vite proxies `/api` to `localhost:$API_PORT` (default 8787); without `api-server` running, the
AI panel decides no server key exists and offers bring-your-own-key only.

### Sign in

Google's hosted button returns a short-lived credential to `AuthContext`, which immediately
posts it to `POST /api/auth/google`. The Python API verifies RS256, issuer, audience, time
claims and `email_verified`, then returns public profile fields and sets an HMAC-signed,
HttpOnly, `SameSite=Lax` cookie. The raw Google credential is never persisted in browser
storage. Reloads restore the profile through `GET /api/auth/session`; logout calls
`POST /api/auth/logout`. When a build has no `VITE_GOOGLE_CLIENT_ID`, the client reads the
public ID from `GET /api/auth/config`, so a static Replit build needs no authentication
configuration. Set `GOOGLE_CLIENT_ID` and a random server-only `SESSION_SECRET` of at least
32 characters on the Fly backend. Register the Replit and GitHub Pages origins in that Google
OAuth client's authorized JavaScript origins.

### Content API

The API server exposes the database-backed content contract under `/api/content`:

| Endpoint | Response | Stored data |
| --- | --- | --- |
| `GET /api/content/question-bank?lang=en|he` | `QuestionBank` | stages and questions |
| `GET /api/content/coding-challenges?lang=en|he` | `CodingChallenges` | levels and challenges |
| `GET /api/content/lecture-series?lang=en|he` | `LectureSeries` | tracks and lectures |

`lang` defaults to `en`; any value other than `en` or `he` also falls back to `en`. A missing
or unavailable Supabase content store returns `503` with the fixed body
`{"error":"Content temporarily unavailable"}`. The OpenAPI contract is
`lib/api-spec/openapi.yaml`; regenerate the React and Zod clients after changing it:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Tests

Covered by the workspace suite in `tests/`, not by a per-package runner. Three of the six
layers point at this package:

```bash
pnpm test:unit         # Python fixtures + TypeScript library unit tests
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
- **Cloudflare Pages** — the same artifact. `deploy/cloudflare/_redirects` and `_headers` are
  copied into the site root by the same job and GitHub Pages ignores both, so one build
  deploys to either host. Cloudflare is the one that rewrites deep links at 200 rather than
  serving them through a 404 shell.

The API this app calls is deployed separately, to Fly — see `deploy/README.md` for what runs
where, what it costs, and the first-deploy commands.
