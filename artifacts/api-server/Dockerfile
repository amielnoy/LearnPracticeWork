# Production image for the API server.
#
# The root Dockerfile is not this — it builds the Playwright test image and its
# CMD runs the suite. This one ships the server.
#
# Two stages, and the second one is unusually small because `build.ts` bundles
# with esbuild: the whole server, its workspace packages, express, drizzle,
# supabase and the rest come out as a single self-contained `dist/index.mjs`
# plus pino's worker files. Nothing under `node_modules` is needed at runtime,
# so the runtime stage copies `dist/` and nothing else.
#
# --platform=linux/amd64 is deliberate, for the same reason the test image
# pins it: `pnpm-workspace.yaml` overrides strip every platform-native optional
# dependency except the linux-x64-gnu ones, so an arm64 build is missing
# binaries esbuild needs. Fly's machines are amd64, so this is also the target.

# ---------------------------------------------------------------- build stage
FROM --platform=linux/amd64 node:24-slim AS builder

# corepack is how pnpm is normally activated, but it has been known to fail
# signature verification on this project; a plain global install has no such
# failure mode and pins the same version CI uses.
RUN npm install --global pnpm@11.20.0

WORKDIR /app

# Manifests first, so a source-only change does not re-resolve the lockfile.
# Every workspace package the server pulls in needs its manifest here — pnpm
# resolves the graph from these before any source exists.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY lib/api-spec/package.json      lib/api-spec/
COPY lib/api-zod/package.json       lib/api-zod/
COPY lib/db/package.json            lib/db/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY artifacts/api-server/package.json artifacts/api-server/

# The root manifest carries `stripe` and `stripe-replit-sync`, which
# `src/index.ts` imports, so the root package is installed alongside the server
# and its workspace dependencies rather than filtered out.
RUN pnpm install --frozen-lockfile --filter "@workspace/api-server..." --filter "{.}"

COPY lib/ lib/
COPY artifacts/api-server/ artifacts/api-server/

RUN pnpm --filter @workspace/api-server run build

# -------------------------------------------------------------- runtime stage
FROM --platform=linux/amd64 node:24-slim AS runtime

ENV NODE_ENV=production

# node:24-slim ships a `node` user; running as it means a container escape does
# not land on root. Nothing here writes to disk, so the tree stays root-owned
# and read-only to the process.
WORKDIR /app
COPY --from=builder --chown=root:root /app/artifacts/api-server/dist ./dist

USER node

# Documentation only — the real port comes from the PORT env var, which
# `src/index.ts` requires and throws without. fly.toml sets it.
EXPOSE 8080

# --enable-source-maps matches the `start` script: the bundle ships linked
# sourcemaps, and without this a stack trace points into 4MB of bundled output.
CMD ["node", "--enable-source-maps", "dist/index.mjs"]
