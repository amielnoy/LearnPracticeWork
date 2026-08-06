# SEO Strategy

## In scope

- Portfolio site (`artifacts/portfolio/`) — public personal/professional marketing site for Amiel Peled
- AI Testing Academy (`artifacts/ai-testing-academy/`) — public educational/course landing page
- AI Testing Lecture 1 (`artifacts/ai-testing-lecture-1/`) — public presentation/slides

## Out of scope

- API Server (`artifacts/api-server/`) — backend API, not a public-facing web page

## Target audience

- Hiring managers, engineering leaders, and teams looking for AI Test Automation & DevOps consultants (Portfolio)
- QA engineers, developers, and students learning AI-powered testing (AI Testing Academy)

## Primary keywords

- Portfolio: "AI Test Automation", "DevOps Tech Lead", "Playwright", "Quality Engineering", "Israel"
- AI Testing Academy: "AI Testing", "Test Automation", "DevOps", "Playwright course"

## Rendering strategy

- Portfolio: React SPA (Wouter routing), served via Vite. All routes share one HTML shell — content is client-rendered.
- AI Testing Academy: React + TypeScript SPA (Vite) with an empty HTML shell; all content is JS-rendered.
- AI Testing Lecture 1: React SPA (Vite), single-page slides presentation.

## Bilingual indexing (EN / HE)

Both public content sites are bilingual on a single set of URLs — `?lang=` is the first thing
each site's `i18n` reads. Before this, nothing told Google a Hebrew version existed: the shell
was hardcoded to `lang="en" dir="ltr"`, the sitemap listed one URL, and there was no `hreflang`
anywhere. The Hebrew half of the product was effectively unindexed, for an audience that
searches in Hebrew.

### What is in place

- **Reciprocal `hreflang` clusters** (`en`, `he`, `x-default`) in the markup and repeated on
  every `<url>` in the sitemap. Reciprocity matters: a one-way or partial annotation is treated
  as unconfirmed and the whole cluster is dropped.
- **Self-referential canonicals.** Each variant canonicalises to itself, otherwise the canonical
  contradicts the hreflang and the alternates are ignored. Only the query is rewritten — the
  origin stays whatever the document declares, because the sites are served from two hosts and
  only the Replit one is the canonical home.
- **A head script that runs before React**, setting `lang`, `dir`, the title, the description
  and the canonical. It exists so a crawler that renders the page sees one consistent document,
  and so a Hebrew load has no flash of English/LTR. In the academy it mirrors the priority order
  in `src/lib/i18n.ts` (query → stored → browser); an e2e test asserts the two agree.
- **Hebrew `<title>` and `description`.** An English title on the Hebrew URL ranks for nothing
  a Hebrew speaker would type.
- **`og:locale:alternate`** and a sitemap for the deck, which had neither a sitemap nor a
  robots.txt.

Guarded by `tests/unit/hreflang.spec.ts` (declarations and sitemap agree, reciprocity holds)
and `tests/e2e/seoHead.spec.ts` (each URL really serves that language, before hydration).

### Deliberate limits

- **Social previews of a Hebrew link show English.** Facebook, WhatsApp and LinkedIn scrapers
  do not run JS, so they only ever see the static `og:*` tags. Fixing this needs path-based
  variants (`/he/`) rendered at build time — the same change that would let `lang`/`dir` be
  correct in the raw HTML rather than applied by script.
- **The lecture deck is declared on `/slide1`, not on its root.** At `/` the app renders the
  deck inside an `<iframe src="/slide1">`, so the root is a ~300-byte shell to a crawler, and
  the iframe drops `?lang` — which means **`/ai-testing-lecture-1/?lang=he` shows English**.
  That is a real bilingual defect, not just an SEO one, but the fix is in `App.tsx`, which is
  marked a platform contract file ("do not restructure"). Declaring the root as a language
  variant would have pointed Google at three URLs that do not differ.

## Core Web Vitals

### Web fonts — resolved

Both public sites loaded Google Fonts in a way that blocked the first paint, which puts LCP at
risk on mobile connections. Fixed in `index.html` for each site:

- **Non-blocking load.** `rel="preload" as="style"` fetches the CSS early, and the stylesheet
  is applied through the print-media swap (`media="print" onload="this.media='all'"`), with a
  `<noscript>` fallback. `display=swap` paints text in the fallback face immediately.
- **Portfolio: removed a font it never rendered.** `index.html` requested Inter while the page
  renders in Plus Jakarta Sans and Space Mono — a render-blocking round trip for nothing.
- **Portfolio: removed a remote CSS `@import`.** The real fonts were pulled in by
  `@import url(https://fonts.googleapis.com/…)` at the top of `src/index.css`, which is worse
  than a blocking `<link>`: the browser only discovers it after the app stylesheet has
  downloaded and parsed, serialising HTML → app CSS → Google CSS → font files. Hoisted into
  `index.html`.
- **Trimmed the axes to what is rendered**, verified in the browser across every route:
  - Heebo `400;500;700;800` → `400;700;800` (500 was never rendered).
  - Plus Jakarta Sans `ital,wght@0,300..800;1,300..800` → `wght@400..700` (no italic anywhere
    in the source; a whole second variable file was being fetched).
  - Space Mono `ital,wght@0,400;0,700;1,400;1,700` → `wght@400;700` (two unused italic files).

Net effect on the portfolio: two CSS requests down to one, and six font files down to three,
with rendering byte-identical.

Guarded by `tests/unit/fontLoading.spec.ts`, which reads the shipped HTML and fails if a
blocking font stylesheet, a remote CSS `@import`, or a missing `<noscript>` fallback returns.

### Known, not yet addressed

- **Heebo 600 renders as 700.** The academy's CSS asks for `font-weight:600` on ~27 elements
  but 600 is not among the requested weights, so the browser matches the nearest available cut.
  Adding `600` to the URL costs one more font file; changing those rules to `700` costs
  nothing. Deliberately left alone — it is a typography decision, not a performance one.

## Dismissed categories

- (None yet)
