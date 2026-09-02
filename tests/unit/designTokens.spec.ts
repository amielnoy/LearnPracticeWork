import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '../support/test';

/**
 * Every `var(--token)` an app reaches for has to be defined in a stylesheet
 * that app actually loads.
 *
 * This is not hypothetical. `ProgressTracker.tsx` painted its meter track with
 * `var(--badge-outline)` — a real token, defined in `lib/design/scale.css`,
 * which reaches an app only through `theme.css`, the Tailwind bridge. The
 * academy is not a Tailwind consumer: it imports `foundation.css` and nothing
 * else. So the token resolved to nothing, the track was transparent, a bar at
 * 0% was invisible, and every badge border silently fell back to
 * `currentColor`. Nothing caught it — the reference lived in an inline style
 * in a `.tsx` file, where no stylesheet linter looks, and CSS has no error for
 * an undefined custom property. It renders, wrongly, and says nothing.
 *
 * Both halves matter. Collecting the definitions by following `@import` from
 * each app's entry stylesheet is what makes this more than a spell-check: a
 * token defined in the design system but in a layer the app does not take is
 * exactly as absent as one that was never written, and only the import graph
 * knows the difference.
 *
 * `var(--x, fallback)` is always fine. Supplying a fallback is a statement that
 * the token may be missing, which is the case `foundation.css` is written for.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');

/** Apps are checked through their entry stylesheet, because that is what pulls in the layers. */
const ENTRIES = ['artifacts/ai-testing-academy/src/app.css'];

const DEFINITION = /(--[a-zA-Z0-9-]+)\s*:/g;
/** The trailing group is the comma that starts a fallback, when there is one. */
const REFERENCE = /var\(\s*(--[a-zA-Z0-9-]+)\s*(,?)/g;
const IMPORT = /@import\s+['"]([^'"]+)['"]/g;

/** The stylesheets a browser would load, in the order it would load them. */
function importGraph(entry: string): string[] {
  const seen: string[] = [];
  const walk = (file: string) => {
    if (seen.includes(file)) return;
    seen.push(file);
    const source = readFileSync(file, 'utf8');
    for (const [, specifier] of source.matchAll(IMPORT)) {
      // Tailwind is resolved from node_modules and defines no --ds-* of its own.
      if (specifier!.startsWith('tailwindcss')) continue;
      const resolved = path.resolve(path.dirname(file), specifier!);
      try {
        if (statSync(resolved).isFile()) walk(resolved);
      } catch {
        throw new Error(`${path.relative(root, file)} imports ${specifier}, which does not exist`);
      }
    }
  };
  walk(path.join(root, entry));
  return seen;
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx|css)$/.test(item.name) ? [full] : [];
  });
}

for (const entry of ENTRIES) {
  const app = path.dirname(path.join(root, entry));

  test.describe(entry, () => {
    const sheets = importGraph(entry);
    const defined = new Set(
      sheets.flatMap(file => [...readFileSync(file, 'utf8').matchAll(DEFINITION)].map(m => m[1]!)),
    );

    test('loads at least its own stylesheet and the shared floor', () => {
      expect(sheets.length).toBeGreaterThan(1);
      expect(sheets.some(f => f.includes(`${path.sep}lib${path.sep}design${path.sep}`))).toBe(true);
    });

    test('every token it uses without a fallback is one it loads', () => {
      const unreachable: string[] = [];
      for (const file of sourceFiles(app)) {
        const source = readFileSync(file, 'utf8');
        for (const [, token, fallback] of source.matchAll(REFERENCE)) {
          if (fallback || defined.has(token!)) continue;
          unreachable.push(`${token} in ${path.relative(root, file)}`);
        }
      }
      expect(
        [...new Set(unreachable)].sort(),
        'these resolve to nothing at runtime — define them, import the layer that ' +
          'does, or give the var() a fallback',
      ).toEqual([]);
    });
  });
}
