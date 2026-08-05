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
