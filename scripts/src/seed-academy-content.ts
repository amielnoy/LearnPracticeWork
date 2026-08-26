/**
 * Applies the academy content schema and seed to Supabase.
 *
 *     pnpm --filter @workspace/scripts run seed:academy
 *
 * Everything except the password is already in this repository, so that is the
 * only thing to supply. Put it in `.env.local`, which is git-ignored:
 *
 *     SUPABASE_DB_PASSWORD=…
 *
 * The host and user are the ones `server/app/config.py` composes, so the seed
 * lands in the database the API reads. `DATABASE_URL` overrides all of it.
 *
 * Flags: --schema-only, --seed-only, --check (count rows and stop).
 */
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');

/** The pooler and role from `server/app/config.py`. Session mode, port 5432: the seed is one long transaction and the transaction pooler mishandles that shape. */
const DEFAULT_HOST = 'aws-0-ap-northeast-1.pooler.supabase.com';
const DEFAULT_USER = 'postgres.ikhqtmgfkqhynpazqrac';
const DEFAULT_PORT = '5432';
const DEFAULT_DATABASE = 'postgres';

/** `KEY=value` lines, quotes stripped, `#` comments and blanks skipped. */
function parseEnvFile(file: string): Record<string, string> {
  const values: Record<string, string> = {};
  if (!existsSync(file)) return values;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = /^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match || line.trimStart().startsWith('#')) continue;
    values[match[1]!] = match[2]!.trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return values;
}

function isTracked(file: string): boolean {
  const relative = path.relative(root, file);
  const result = spawnSync('git', ['ls-files', '--error-unmatch', relative], {
    cwd: root,
    stdio: 'ignore',
  });
  return result.status === 0;
}

/**
 * A real environment variable wins, then `.env.local`, then `.env`.
 *
 * A password found in a *tracked* file is refused rather than used: this
 * repository commits `.env` files on purpose — they hold public build-time
 * config — so a secret that landed in one is a secret on its way to GitHub, and
 * silently accepting it here is how it would stay there.
 */
function resolveEnv(name: string): string | undefined {
  if (process.env[name]?.trim()) return process.env[name]!.trim();
  for (const file of ['.env.local', '.env'].map(f => path.join(root, f))) {
    const value = parseEnvFile(file)[name];
    if (!value) continue;
    if (isTracked(file)) {
      throw new Error(
        `${name} was found in ${path.basename(file)}, which is tracked by git. ` +
          'Move it to .env.local — that one is ignored — and rotate it if it has been pushed.',
      );
    }
    return value;
  }
  return undefined;
}

interface Target {
  args: string[];
  password?: string;
  describe: string;
}

function target(): Target {
  const url = resolveEnv('DATABASE_URL');
  if (url) return { args: [url], describe: 'DATABASE_URL' };

  const password = resolveEnv('SUPABASE_DB_PASSWORD');
  if (!password) {
    throw new Error(
      'No database password. Add SUPABASE_DB_PASSWORD to .env.local (git-ignored), or set ' +
        'DATABASE_URL. The password is in the Supabase dashboard under Settings → Database.',
    );
  }
  const host = resolveEnv('SUPABASE_DB_HOST') ?? DEFAULT_HOST;
  const user = resolveEnv('SUPABASE_DB_USER') ?? DEFAULT_USER;
  return {
    args: ['-h', host, '-p', DEFAULT_PORT, '-U', user, '-d', DEFAULT_DATABASE],
    password,
    describe: `${user}@${host}`,
  };
}

/**
 * psql if it is installed, else the same client out of a container — Docker is
 * already required by the test suite, and this is the only Postgres client many
 * machines have. The password goes through the environment, never argv, which
 * anyone with `ps` can read.
 */
function runner(): { command: string; prefix: (password?: string) => string[] } {
  if (spawnSync('psql', ['--version'], { stdio: 'ignore' }).status === 0) {
    return { command: 'psql', prefix: () => [] };
  }
  if (spawnSync('docker', ['info'], { stdio: 'ignore' }).status === 0) {
    return {
      command: 'docker',
      prefix: password => [
        'run',
        '--rm',
        '-i',
        ...(password ? ['-e', 'PGPASSWORD'] : []),
        'postgres:16-alpine',
        'psql',
      ],
    };
  }
  throw new Error('Neither psql nor Docker is available. `brew install libpq` gives you psql.');
}

function psql(where: Target, args: string[], input?: string): string {
  const { command, prefix } = runner();
  const result = spawnSync(command, [...prefix(where.password), ...where.args, ...args], {
    input,
    encoding: 'utf8',
    env: { ...process.env, ...(where.password ? { PGPASSWORD: where.password } : {}) },
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || 'psql failed').trim());
  }
  return result.stdout;
}

const COUNTS = `
select 'question bank' as collection, s.lang, count(*) as items
  from question_bank_items i join question_bank_stages s on s.id = i.stage_id group by s.lang
union all select 'coding challenges', l.lang, count(*)
  from coding_challenges c join coding_challenge_levels l on l.id = c.level_id group by l.lang
union all select 'lecture series', t.lang, count(*)
  from lecture_items i join lecture_tracks t on t.id = i.track_id group by t.lang
order by 1, 2;`;

/** Ready lectures with no href render as live cards that open nothing. */
const DEAD_CARDS = `select count(*) from lecture_items where ready and coalesce(url, '') = '';`;

function apply(where: Target, file: string): void {
  const sql = readFileSync(path.join(root, 'scripts', 'src', file), 'utf8');
  psql(where, ['-v', 'ON_ERROR_STOP=1', '-q'], sql);
  console.log(`  applied ${file}`);
}

function main(): void {
  const flags = new Set(process.argv.slice(2));
  const where = target();
  console.log(`Seeding academy content into ${where.describe}`);

  if (!flags.has('--check')) {
    if (!flags.has('--seed-only')) apply(where, 'academy-schema.sql');
    if (!flags.has('--schema-only')) apply(where, 'academy-seed.sql');
  }

  console.log(psql(where, ['-A', '-F', ' | ', '-c', COUNTS]).trimEnd());
  const dead = Number(psql(where, ['-At', '-c', DEAD_CARDS]).trim());
  if (dead > 0) {
    throw new Error(`${dead} lecture(s) are marked ready with no URL — those cards open nothing.`);
  }
  console.log('\nEvery ready lecture has a URL.');
}

try {
  main();
} catch (error) {
  console.error(`\n${(error as Error).message}`);
  process.exit(1);
}
