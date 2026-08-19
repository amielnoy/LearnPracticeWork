import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const { Pool } = pg;

export type Database = NodePgDatabase<typeof schema>;

/**
 * The connection, opened on first use rather than on import.
 *
 * This module used to throw at module scope when `DATABASE_URL` was unset,
 * which made it unimportable from any keyless environment — including the test
 * fixture, which pins `DATABASE_URL: ''` on every server it starts. A package
 * that cannot be imported without a database is a package nothing can depend
 * on conditionally, and the missing variable is a *usage* error, not a *load*
 * error: it should surface when someone actually asks for a query.
 */
let connection: { pool: pg.Pool; db: Database } | undefined;

/** Whether a connection can be opened at all. Cheap, and never throws. */
export function isDatabaseConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

function connect(): { pool: pg.Pool; db: Database } {
  if (connection) return connection;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set. Did you forget to provision a database?');
  }

  const pool = new Pool({ connectionString });
  connection = { pool, db: drizzle(pool, { schema }) };
  return connection;
}

/** The Drizzle client. Throws if no database is configured. */
export function getDb(): Database {
  return connect().db;
}

/** The underlying pool, for the rare caller that needs raw SQL or a transaction. */
export function getPool(): pg.Pool {
  return connect().pool;
}

/** Closes the pool if one was ever opened. Safe to call when none was. */
export async function closeDb(): Promise<void> {
  if (!connection) return;
  const { pool } = connection;
  connection = undefined;
  await pool.end();
}

export * from './schema';
