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

# --regression widens the e2e layer from the two Chromium projects to every
# engine: WebKit desktop and phone — the engine Safari and iOS actually run —
# plus Firefox. Off by default because it roughly triples the e2e wall time, and
# a push should not have to wait for it. The scheduled workflow of the same name
# runs it nightly.
REGRESSION=0
for arg in "$@"; do
  case "$arg" in
    --regression) REGRESSION=1 ;;
    -h|--help)
      echo "usage: $0 [--regression]"
      echo "  --regression  run the e2e layer on every engine, not just Chromium"
      exit 0 ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [ "$REGRESSION" -eq 1 ]; then
  E2E_PROJECTS=""
  E2E_LABEL="e2e (every engine — chromium, webkit, firefox)"
else
  E2E_PROJECTS="--project=e2e-desktop --project=e2e-mobile --project=deck"
  E2E_LABEL="e2e (desktop + mobile)"
fi

# Prints "label  path" with the path as a terminal hyperlink when the terminal
# will render one, and as a plain file:// URL when it will not.
#
# OSC 8 is the escape sequence terminals use for hyperlinks; iTerm2, VS Code,
# Windows Terminal and GNOME Terminal honour it, and the ones that do not would
# print the raw escape bytes as garbage. So it is used only on a real TTY and
# never under CI, where the output is a log file. The fallback is still useful:
# most terminals linkify a bare file:// URL, and every one of them lets you
# copy it.
link() {
  local label="$1" rel="$2" url="file://$ROOT/$2"
  if [ -t 1 ] && [ -z "${CI:-}" ]; then
    printf '  %-18s \033]8;;%s\033\\%s\033]8;;\033\\\n' "$label" "$url" "$rel"
  else
    printf '  %-18s %s\n' "$label" "$url"
  fi
}

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

# Resolve Python dependencies before launching workers. `uv sync` takes a lock,
# so asking the backend API servers and pytest to perform it simultaneously only
# serialises them invisibly and can make a fresh checkout look hung.
echo "▶ prepare Python environment"
if ! (cd server && uv sync --frozen); then
  echo "✗ Python environment preparation failed"
  exit 1
fi

# Every independent layer runs at the same time. Output is captured per layer
# and printed as a group after it finishes, so parallel workers cannot interleave
# their progress into an unreadable terminal stream. Playwright already gives
# each config its own blob directory, while Allure uses UUID result filenames,
# making both report formats safe for concurrent writers.
RUN_LOG_DIR="$(mktemp -d "${TMPDIR:-/tmp}/academy-tests.XXXXXX")"
cleanup_logs() { rm -rf "$RUN_LOG_DIR"; }
trap cleanup_logs EXIT INT TERM

layer_titles=()
layer_logs=()
layer_pids=()

launch_layer() {
  local title="$1"; shift
  local index="${#layer_pids[@]}"
  local log="$RUN_LOG_DIR/layer-$index.log"
  layer_titles[$index]="$title"
  layer_logs[$index]="$log"
  echo "  ↗ ${title}"
  ( "$@" ) >"$log" 2>&1 &
  layer_pids[$index]=$!
}

echo ""
echo "▶ parallel test layers"
# Two workers inside each suite keeps the suites themselves parallel without
# multiplying three Playwright processes into an unbounded browser stampede.
# pytest-xdist reads its matching cap. Both remain overridable for larger CI or
# developer machines.
export PW_SUITE_WORKERS="${PW_SUITE_WORKERS:-2}"
export PYTEST_XDIST_AUTO_NUM_WORKERS="${PYTEST_XDIST_AUTO_NUM_WORKERS:-2}"
launch_layer "typecheck (tests)" \
  bash -c "cd tests && ./node_modules/.bin/tsc -p tsconfig.json --noEmit"
launch_layer "backend fixtures (Python)" \
  bash -c "cd server && uv run pytest"
launch_layer "unit / api / contract" \
  "$PW_ROOT" test --config=playwright.config.mts
launch_layer "component (desktop + mobile)" \
  bash -c "cd tests && $PW_TESTS test --config=playwright-ct.config.ts"
launch_layer "$E2E_LABEL" \
  bash -c "cd tests && $PW_TESTS test --config=playwright-e2e.config.ts $E2E_PROJECTS"

for index in "${!layer_pids[@]}"; do
  title="${layer_titles[$index]}"
  log="${layer_logs[$index]}"
  echo ""
  echo "── ${title} ──"
  if wait "${layer_pids[$index]}"; then
    cat "$log"
    echo "✓ ${title} passed"
  else
    cat "$log"
    echo "✗ ${title} failed"
    status=1
  fi
done

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
# Allure and the architecture page are both single self-contained documents, so
# file:// opens them and the link works. The Playwright report is not: its assets
# cannot load over file://, which is why it is printed as a path and served
# below rather than linked to somewhere that would open broken.
link "Allure report:" "allure-report/index.html"
echo "  Playwright report: playwright-report/index.html  (needs serving — see below)"
# The same page CI links from its run summary. Locally it is the copy in the
# working tree, not the one on Pages, so it describes the branch just tested
# rather than whatever main last published.
link "Architecture:" "architecture.html"
GRAFANA_BASE_URL="${GRAFANA_URL:-http://localhost:3000}"
echo "  Grafana dashboard: ${GRAFANA_BASE_URL%/}/d/academy-overview/academy-servers-and-test-history"

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
