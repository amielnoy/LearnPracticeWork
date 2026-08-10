/**
 * Playwright `webServer` entrypoint for the api and contract suites.
 *
 * Builds `artifacts/api-server` once, then runs two instances of it:
 *
 *   1. keyed   — has a (throwaway) Gemini key, so body-validation branches run
 *   2. keyless — has none, so the "no server-side key" branches run
 *
 * They are started in that order and the keyless one is what Playwright polls,
 * so by the time the health check passes both are listening. Building here
 * rather than in each webServer command keeps two esbuild runs from racing on
 * the same `dist/`.
 *
 * Every environment variable that changes server behaviour is pinned to an
 * explicit value so a developer's shell (or a Replit deployment) cannot leak
 * in and make the suite non-deterministic.
 *
 * Run straight from source as TypeScript: Node strips the types itself, so the
 * one file standing between the suites and a running server needs no build step
 * and no loader of its own.
 */
import { spawn, type ChildProcess, type SpawnOptions } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const apiServerDir = path.resolve(here, '..', '..', 'artifacts', 'api-server');

const KEYLESS_PORT = process.env.TEST_API_PORT ?? '8788';
const KEYED_PORT = process.env.TEST_API_PORT_KEYED ?? '8789';
const LIMITED_PORT = process.env.TEST_API_PORT_LIMITED ?? '8790';
const DUMMY_GEMINI_KEY = 'AIzaSyTEST-not-a-real-key-000000000000000';

/** Env that must look the same on every machine for the assertions to hold. */
const PINNED: Readonly<Record<string, string>> = {
  NODE_ENV: 'test',
  // No database and no Replit connector: the Stripe routes are expected to
  // fail as JSON, which is exactly what the api suite asserts.
  DATABASE_URL: '',
  REPLIT_CONNECTORS_HOSTNAME: '',
  REPL_IDENTITY: '',
  WEB_REPL_RENEWAL: '',
  REPLIT_DOMAINS: '',
  GEMINI_MODEL: 'gemini-2.5-flash',
  // Quieter output; the servers' logs are only interesting when a test fails.
  LOG_LEVEL: 'warn',
  ALLOWED_ORIGINS: 'https://academy.example',
  AI_RATE_LIMIT_MAX: '1000',
  AI_DAILY_QUOTA: '1000',
};

const children: ChildProcess[] = [];

function run(command: string, args: readonly string[], options: SpawnOptions): ChildProcess {
  const child = spawn(command, [...args], { stdio: 'inherit', ...options });
  children.push(child);
  return child;
}

function shutdown(code: number): never {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }
  process.exit(code);
}

process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));

async function waitForHealth(port: string, timeoutMs = 20_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/healthz`);
      if (res.ok) return;
    } catch {
      // not listening yet
    }
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error(`api-server on port ${port} did not become healthy in ${timeoutMs}ms`);
}

function startServer(port: string, extraEnv: Readonly<Record<string, string>>): ChildProcess {
  const child = run(process.execPath, ['--enable-source-maps', './dist/index.mjs'], {
    cwd: apiServerDir,
    env: { ...process.env, ...PINNED, PORT: String(port), ...extraEnv },
  });
  child.on('exit', code => {
    if (code !== 0 && code !== null) {
      console.error(`api-server on port ${port} exited with code ${code}`);
      shutdown(code);
    }
  });
  return child;
}

await new Promise<void>((resolve, reject) => {
  const build = run(process.execPath, ['./build.ts'], { cwd: apiServerDir });
  build.on('exit', code =>
    code === 0 ? resolve() : reject(new Error(`api-server build failed with code ${code}`)),
  );
});

startServer(KEYED_PORT, { GEMINI_API_KEY: DUMMY_GEMINI_KEY, GEMINI_API_KEY_B64: '' });
await waitForHealth(KEYED_PORT);

startServer(LIMITED_PORT, {
  GEMINI_API_KEY: DUMMY_GEMINI_KEY,
  GEMINI_API_KEY_B64: '',
  AI_RATE_LIMIT_MAX: '1000',
  AI_DAILY_QUOTA: '2',
});
await waitForHealth(LIMITED_PORT);

startServer(KEYLESS_PORT, { GEMINI_API_KEY: '', GEMINI_API_KEY_B64: '' });
await waitForHealth(KEYLESS_PORT);
