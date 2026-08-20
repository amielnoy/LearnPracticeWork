/**
 * Playwright `webServer` entrypoint for the api and contract suites.
 *
 * Syncs the Python environment once, then runs three FastAPI instances:
 *
 *   1. keyed   — has a (throwaway) Gemini key, an admin token and an OAuth
 *                client ID, so the body-validation and authenticated branches run
 *   2. keyless — has none of them, so the "not configured" branches run
 *
 * They are started in that order and the keyless one is what Playwright polls,
 * so by the time the health check passes both are listening. Building here
 * rather than in each webServer command keeps dependency setup deterministic.
 *
 * Every environment variable that changes server behaviour is pinned to an
 * explicit value so a developer's shell (or a Replit deployment) cannot leak
 * in and make the suite non-deterministic.
 *
 * This orchestration stays TypeScript with the Playwright suite; all server
 * implementation code it launches is Python.
 */
import { spawn, type ChildProcess, type SpawnOptions } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const apiServerDir = path.resolve(here, '..', '..', 'server');

const KEYLESS_PORT = process.env.TEST_API_PORT ?? '8788';
const KEYED_PORT = process.env.TEST_API_PORT_KEYED ?? '8789';
const LIMITED_PORT = process.env.TEST_API_PORT_LIMITED ?? '8790';
const DUMMY_GEMINI_KEY = 'AIzaSyTEST-not-a-real-key-000000000000000';
const ADMIN_TOKEN = 'test-admin-token-not-a-real-secret';
const GOOGLE_CLIENT_ID = '000000000000-test.apps.googleusercontent.com';
const DUMMY_GROQ_KEY = 'gsk_TEST-not-a-real-key-000000000000000';

/** Env that must look the same on every machine for the assertions to hold. */
const PINNED: Readonly<Record<string, string>> = {
  NODE_ENV: 'test',
  // No database or Stripe secrets: those routes are expected to fail as JSON,
  // which is exactly what the api suite asserts.
  DATABASE_URL: '',
  REPLIT_DOMAINS: '',
  UPSTREAM_API_BASE_URL: '',
  METRICS_TOKEN: '',
  STRIPE_SECRET_KEY: '',
  STRIPE_WEBHOOK_SECRET: '',
  GEMINI_MODEL: 'gemini-2.5-flash',
  // Quieter output; the servers' logs are only interesting when a test fails.
  LOG_LEVEL: 'warn',
  ALLOWED_ORIGINS: 'https://academy.example',
  // Unset by default, so the keyless server exercises the branches an
  // unconfigured deployment takes. The keyed server below sets both.
  ADMIN_API_TOKEN: '',
  GOOGLE_CLIENT_ID: '',
  SESSION_SECRET: '',
  // Same reason as DATABASE_URL above: the Supabase-backed content route and
  // the Stripe connection string are expected to be unavailable, and a
  // developer who happens to have these exported must not get a different
  // result from CI.
  SUPABASE_DB_PASSWORD: '',
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',
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
  const child = run(
    'uv',
    ['run', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: apiServerDir,
      env: { ...process.env, ...PINNED, PORT: String(port), ...extraEnv },
    },
  );
  child.on('exit', code => {
    if (code !== 0 && code !== null) {
      console.error(`api-server on port ${port} exited with code ${code}`);
      shutdown(code);
    }
  });
  return child;
}

await new Promise<void>((resolve, reject) => {
  const build = run('uv', ['sync', '--frozen'], { cwd: apiServerDir });
  build.on('exit', code =>
    code === 0 ? resolve() : reject(new Error(`api-server setup failed with code ${code}`)),
  );
});

startServer(KEYED_PORT, {
  GEMINI_API_KEY: DUMMY_GEMINI_KEY,
  GEMINI_API_KEY_B64: '',
  ADMIN_API_TOKEN: ADMIN_TOKEN,
  GOOGLE_CLIENT_ID,
  SESSION_SECRET: 'test-session-secret-that-is-at-least-thirty-two-characters',
  GROQ_API_KEY: DUMMY_GROQ_KEY,
});
await waitForHealth(KEYED_PORT);

startServer(LIMITED_PORT, {
  GEMINI_API_KEY: DUMMY_GEMINI_KEY,
  GEMINI_API_KEY_B64: '',
  GROQ_API_KEY: DUMMY_GROQ_KEY,
  AI_RATE_LIMIT_MAX: '1000',
  AI_DAILY_QUOTA: '2',
});
await waitForHealth(LIMITED_PORT);

startServer(KEYLESS_PORT, { GEMINI_API_KEY: '', GEMINI_API_KEY_B64: '', GROQ_API_KEY: '' });
await waitForHealth(KEYLESS_PORT);
