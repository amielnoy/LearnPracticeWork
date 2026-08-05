#!/usr/bin/env bash
#
# Run every test layer — unit, component (desktop+mobile), api, contract and
# e2e (desktop+mobile) — and build a single Allure report from the combined
# results. Each Playwright config boots whatever server it needs (the api
# servers, the academy Vite app), so nothing has to be started beforehand.
#
# Binaries are invoked directly out of node_modules so this works the same on
# the dev Mac (where corepack's pnpm is broken) and inside the Docker image.
# It does NOT fail fast: every layer runs so the Allure report covers them all,
# and the script exits non-zero if any layer failed.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

PW_ROOT="./node_modules/.bin/playwright"
PW_TESTS="./node_modules/.bin/playwright"
ALLURE="./node_modules/.bin/allure"

# Start each report run from clean results. Clearing the *contents* (rather than
# removing the directories) keeps this safe when compose bind-mounts them.
for d in allure-results allure-report blob-report playwright-report; do
  mkdir -p "$d"
  find "$d" -mindepth 1 -delete 2>/dev/null || true
done

status=0
layer() {
  local title="$1"; shift
  echo ""
  echo "▶ ${title}"
  if ! "$@"; then
    status=1
    echo "✗ ${title} failed"
  fi
}

layer "unit / api / contract" \
  "$PW_ROOT" test --config=playwright.config.mts
layer "component (desktop + mobile)" \
  bash -c "cd tests && $PW_TESTS test --config=playwright-ct.config.ts"
layer "e2e (desktop + mobile)" \
  bash -c "cd tests && $PW_TESTS test --config=playwright-e2e.config.ts"

echo ""
echo "▶ allure report"
if ! ( cd tests && "$ALLURE" awesome ../allure-results --single-file --output ../allure-report ); then
  status=1
fi

# Each config writes its blob into its own subdirectory, because the blob
# reporter wipes its output directory on start and would otherwise delete the
# previous layer's archive. `merge-reports` does not recurse, so flatten first.
echo ""
echo "▶ playwright html report"
if compgen -G "blob-report/*/*.zip" > /dev/null; then
  # Every config names its archive report.zip, so the subdirectory name has to
  # survive the move or the layers overwrite each other and the merged report
  # silently covers only the last one.
  for blob in blob-report/*/*.zip; do
    mv "$blob" "blob-report/$(basename "$(dirname "$blob")")-$(basename "$blob")"
  done
  find blob-report -mindepth 1 -type d -empty -delete
  # -c is required: the suites recorded different testDirs and Playwright will
  # not merge across roots without a config naming the real one.
  if ! PLAYWRIGHT_HTML_OPEN=never \
    "$PW_ROOT" merge-reports -c playwright-merge.config.mts blob-report; then
    status=1
  fi
else
  echo "  no blob reports found — skipping (CI writes HTML directly)"
fi

echo ""
if [ "$status" -eq 0 ]; then
  echo "✓ all suites passed"
else
  echo "✗ some suites failed (see above)"
fi
echo "  Allure report:     allure-report/index.html"
echo "  Playwright report: playwright-report/index.html"

# Open both reports when running interactively (never in CI / the container,
# where CI=true is set and show-report would block forever).
if [ -z "${CI:-}" ]; then
  opener=""
  if command -v open > /dev/null 2>&1; then
    opener="open"
  elif command -v xdg-open > /dev/null 2>&1; then
    opener="xdg-open"
  fi

  # The Allure report is a single self-contained file, so open it directly.
  if [ -f allure-report/index.html ] && [ -n "$opener" ]; then
    echo ""
    echo "▶ opening the Allure report"
    "$opener" allure-report/index.html || true
  fi

  # Playwright's HTML report must be served (its assets can't load over file://).
  # show-report opens a browser and blocks until Ctrl+C, so it goes last.
  if [ -d playwright-report ] && [ -n "$(ls -A playwright-report 2>/dev/null)" ]; then
    echo ""
    echo "▶ serving the Playwright HTML report (Ctrl+C to stop)"
    "$PW_ROOT" show-report playwright-report || true
  fi
fi

exit "$status"
