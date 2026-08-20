# Deploying

The repository is two deployables with very different shapes, and they are
hosted separately because they cost very different amounts.

| | What it is | Where it goes | Cost |
|---|---|---|---|
| Static | 12 Vite SPAs — portfolio, academy, 10 lecture decks | GitHub Pages (wired) or Cloudflare Pages | $0 |
| API | One Express server: AI proxy, Stripe, entitlements | Fly.io | ~$2–5/month |
| Database | Postgres | Supabase | $0 on the free tier |

## Static

CI already does this. The `build-pages` job in `.github/workflows/ci.yml` builds
all twelve apps, assembles them into `_site`, and `deploy-pages` publishes to
GitHub Pages on every push to `main`.

Each app gets a `BASE_PATH` matching where it is mounted, because Vite bakes it
into every asset URL. The job derives the prefix from what the Pages API
reports rather than hardcoding `/<repo>`, so a custom domain does not break
every asset link.

To reproduce it locally:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/portfolio run build
PORT=5174 BASE_PATH=/ai-testing-academy/ pnpm --filter @workspace/ai-testing-academy run build
for n in $(seq 1 10); do
  PORT=$((5174 + n)) BASE_PATH="/ai-testing-lecture-${n}/" \
    pnpm --filter "@workspace/ai-testing-lecture-${n}" run build
done
```

### Moving to Cloudflare Pages

The artifact is already portable — `_redirects` and `_headers` ship inside it
and GitHub Pages ignores both. Point a Pages project at this repo with:

- Build command: the three commands above
- Output directory: `_site`

The reason to bother is rewrites. GitHub Pages has no rewrite rules, so a deep
link like `/ai-testing-lecture-3/slide5` is served through the nearest
`404.html` — it works, but the response is a 404 status carrying the right
page, which is not what you want on URLs the academy's own hreflang tags
nominate for indexing. Cloudflare rewrites them properly at 200.

## API server

Fly, because the server has two pieces of per-process state that a
scale-to-zero host loses:

- `src/routes/ai.ts` builds its burst and daily limiters on
  `express-rate-limit`'s default in-memory store. The daily window is 24 hours,
  so a machine that stops and restarts hands every caller a fresh anonymous
  allowance — the free-tier quota stops being a quota.
- Stripe webhooks need a URL that answers immediately; a cold start inside a
  delivery timeout becomes a retry at best.

`fly.toml` therefore sets `min_machines_running = 1` and leaves
`auto_stop_machines` off. Give the rate limiter a shared store (Redis, or the
Postgres already in use) before changing that.

### First deploy

```bash
fly launch --no-deploy --config server/fly.toml \
  --dockerfile server/Dockerfile

fly secrets set \
  GEMINI_API_KEY=... \
  SUPABASE_DB_PASSWORD=... \
  SUPABASE_URL=... \
  SUPABASE_SERVICE_ROLE_KEY=... \
  STRIPE_SECRET_KEY=...

fly deploy --config server/fly.toml \
  --dockerfile server/Dockerfile .
```

The trailing `.` matters: the build context is the repository root, because the
image needs `pnpm-workspace.yaml` and `lib/` to resolve the workspace packages.

Verify: `curl https://<app>.fly.dev/api/healthz` returns `{"status":"ok"}`.

### Environment

Set in `fly.toml` (not secret):

| Variable | Why |
|---|---|
| `PORT` | `src/index.ts` throws without it |
| `PUBLIC_BASE_URL` | The origin Stripe webhooks are registered against |
| `ALLOWED_ORIGINS` | CORS allowlist — every origin serving the static site |

Set via `fly secrets` (never committed): `GEMINI_API_KEY`,
`SUPABASE_DB_PASSWORD`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`STRIPE_SECRET_KEY`.

`PUBLIC_BASE_URL` replaced a hardcoded read of `REPLIT_DOMAINS`. Off Replit that
variable is unset, and the old code interpolated it anyway — registering
`https://undefined/api/stripe/webhook` with Stripe. That fails silently: the
server starts, and every payment event is simply never delivered.
`REPLIT_DOMAINS` still works as a fallback, so the Replit deployment is
unaffected.

### The image

`server/Dockerfile`, not the one at the repository root — that one
builds the Playwright test image and its `CMD` runs the suite.

`build.ts` bundles the server with esbuild into a self-contained
`dist/index.mjs`, so the runtime stage copies `dist/` and nothing else: no
`node_modules`, no pnpm, no source. It runs as the non-root `node` user.

## Not done

The lecture URLs in `artifacts/ai-testing-academy/src/lib/lectures.ts` are
absolute and point at `free-tier-insights--amielpeled.replit.app`. Every deck
now also builds and deploys to Pages, but until those URLs change, the "Open
lecture" links keep resolving to Replit. Changing them changes public URLs that
are already indexed, so it is a decision rather than a cleanup — the canonical
and hreflang tags in each deck's `index.html` have to move with them.
