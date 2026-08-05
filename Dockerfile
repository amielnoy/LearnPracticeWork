# Pinned to the workspace's Playwright version so the browsers baked into the
# image are exactly the ones the specs were written against — no `playwright
# install` needed at build or run time.
#
# --platform=linux/amd64 is deliberate: pnpm-workspace.yaml's `overrides` strip
# every platform-native optional dep (rollup, esbuild, lightningcss, tailwind
# oxide) EXCEPT the linux-x64-gnu ones — the Replit/CI target. An arm64 image
# would therefore be missing @rollup/rollup-linux-arm64-gnu and the academy
# Vite server (e2e) would fail to boot. Forcing amd64 runs natively on CI/x64
# and under emulation on Apple-Silicon Macs.
FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /app

# pnpm drives the monorepo. corepack works fine in this image (unlike the dev
# Mac), but a pinned global pnpm is the most portable path.
RUN npm install -g pnpm@10

# node_modules is excluded via .dockerignore, so this resolves the Linux-native
# binaries (rollup, esbuild, lightningcss…) instead of inheriting the host's
# macOS ones. A frozen install keeps the image reproducible against the lockfile.
ENV CI=true
COPY . .
RUN pnpm install --frozen-lockfile

# Run the whole suite and build the Allure report by default. Chromium needs a
# roomy /dev/shm — compose sets shm_size; `docker run` callers should pass
# --shm-size=1g (or --ipc=host).
CMD ["bash", "run-all-tests.sh"]
