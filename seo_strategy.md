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
- AI Testing Academy: Native TypeScript/ES Modules app with an empty HTML shell; all content is JS-rendered.
- AI Testing Lecture 1: React SPA (Vite), single-page slides presentation.

## Dismissed categories
- (None yet)
