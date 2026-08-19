---
name: Playwright CT named-import bundler collision
description: A named import from a component module can make the rolldown-vite dev-build used by Playwright component tests throw "Identifier '<X>' has already been declared" at bundle time, even though the code is valid; a namespace import works around it.
---

Seen in this project's `@workspace/tests` package (Playwright experimental-ct-react, Vite 8/rolldown-vite). A spec file doing
`import { LectureSeries, EN } from '@academy/components/LectureSeries'` failed to even list tests, throwing
`SyntaxError: Identifier 'LectureSeries' has already been declared` from the bundler's generated eval, regardless of what
the second import was aliased to. The same component imported alone (no second named import) built fine, and other
spec files importing two names from a sibling component module (e.g. `QuestionBank`, `CodingChallenges`) had no problem.

**Why:** looks like a scope-collision bug in the rolldown/esbuild chunking used by this Vite version when a component
test bundle re-exports a named binding from the module under test — not something fixable by renaming the import alias.

**How to apply:** if a Playwright CT spec fails to build with an "Identifier already declared" syntax error that
mentions one of your imports, try replacing the named import with a namespace import and reading the property off it,
e.g. `import * as LectureSeriesModule from '...'; const EN_BANK = LectureSeriesModule.EN;`. Confirm the target
component still renders correctly — `getByRole('heading', { name })` needs `exact: true` when a shorter title is a
substring of another heading on the same page (e.g. "AI Testing" vs "Introduction to AI Testing").
