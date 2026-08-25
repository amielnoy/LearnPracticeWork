# The design system

Four stylesheets that every app in `artifacts/` draws from, and no JavaScript.
What lives here is the part that was the same everywhere and was being kept in
step by hand: the bridge to Tailwind, the type scale, the elevation model, and
the slide-deck layer the ten lecture decks share.

What does **not** live here is colour. Each app owns its palette, because that
is where they genuinely differ — warm paper in the academy, slate and amber in
the portfolio, neutral grey in the sandbox, and one series palette across the
decks.

| File | What it is |
|---|---|
| `theme.css` | The `@theme inline` bridge: `--ds-*` in, Tailwind utilities out. Imports the other three. |
| `scale.css` | Type scale, radius steps, elevation alphas, and the borders derived from a fill |
| `elevate.css` | Hover / active / toggled states, painted as a translucent layer |
| `controls.css` | Two form-control defaults every app wanted |
| `deck.css` | The lecture-deck layer: full-viewport slides, gesture handling, the series palette |

## Using it

```css
@import 'tailwindcss';
@import '../../../lib/design/theme.css';

:root {
  --ds-background: hsl(210 40% 97%);
  --ds-foreground: hsl(222 47% 11%);
  /* … */
  --ds-radius: 0.75rem;
}

.dark {
  /* the same names, the other palette */
}
```

`@import 'tailwindcss'` stays in the app: Tailwind decides which files to scan
for class names from the stylesheet that pulls it in, and the `@plugin` lines
differ per app.

A relative path rather than a package specifier. These files never enter the
module graph — Vite inlines them at build time — so making them a workspace
package would mean a dependency in fourteen manifests and a lockfile entry to
buy nothing but a shorter string.

## The `--ds-*` contract

Values are complete colours: `#c0392b`, `hsl(43 96% 56%)`, or a `var()` naming
a colour the app already has. Not the bare HSL triplets the shadcn convention
uses — those only work when every consumer remembers to wrap them in `hsl()`,
and a token that is three numbers cannot be read by anything that does not know
the trick.

The prefix is not decoration. The academy's palette owns plain `--card`,
`--muted`, `--accent` and `--border`; the unprefixed contract this replaces
collided with all four, so `bg-card` there resolved to `hsl(#ffffff)` and was
dropped as invalid. A prefixed name cannot collide with an app's own.

| Group | Tokens |
|---|---|
| Surface | `background`, `foreground`, `card`, `card-foreground`, `card-border`, `popover`, `popover-foreground`, `popover-border` |
| Brand | `primary`, `primary-foreground`, `secondary`, `secondary-foreground` |
| Support | `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground` |
| Controls | `border`, `input` (the border *around* an input), `ring` |
| Sidebar | `sidebar`, `sidebar-foreground`, `sidebar-border`, `sidebar-primary`, `sidebar-primary-foreground`, `sidebar-accent`, `sidebar-accent-foreground`, `sidebar-ring` |
| Charts | `chart-1` … `chart-5` |
| Type | `font-sans`, `font-serif`, `font-mono` |
| Shape | `radius` — one value; `--radius-sm/md/lg/xl` are derived from it |

`--ds-primary-border` and its five siblings are **derived**, not supplied:
`scale.css` computes each from its fill with relative colour syntax, so a
palette change cannot leave a button outlined in a colour from the old one.

Themes are selected by `.dark` or `[data-theme='dark']` — the shared layers
answer to both, and an app picks whichever its own code sets.

## The academy is not a consumer

`artifacts/ai-testing-academy` is hand-written CSS. It loads `src/app.css` and
nothing else — no Tailwind, no bridge — and its palette is documented in place,
including the contrast measurements behind three of its colours.

It had a copy of the shadcn boilerplate in `src/index.css` whose every token was
the literal word `red` with a note to replace it, plus a `.dark` block keyed on a
class the app never sets. No entry point ever imported the file. It is deleted
rather than filled in: wiring it up would have pulled Tailwind's preflight into
a stylesheet that already resets what it wants reset, and repainted the site to
prove a point nobody asked for.

If the academy ever does adopt Tailwind, it imports `theme.css` and maps the
palette it already has:

```css
:root {
  --ds-background: var(--bg);
  --ds-foreground: var(--text);
  --ds-primary: var(--accent);
  /* … */
}
```

No dark block would be needed — `app.css` redefines those same variables under
`html[data-theme="dark"]`, so the mapping follows the theme on its own.
