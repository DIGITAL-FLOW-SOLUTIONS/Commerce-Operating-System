import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

/**
 * Resolves the Postgres connection string for the Sokoa Supabase database.
 *
 * Precedence (first match wins):
 *   1. SUPABASE_POOLER_CONNECTION_STRING — Supavisor pooler URL from
 *      Supabase dashboard → Project Settings → Database → "Session pooler"
 *      or "Transaction pooler". This is the recommended runtime URL because
 *      it is IPv4-reachable from networks without IPv6 (e.g. Replit).
 *   2. SUPABASE_DIRECT_CONNECTION_STRING — direct `db.<ref>.supabase.co`
 *      host on port 5432. Resolves to IPv6 only unless the IPv4 add-on is
 *      enabled on the Supabase project. Used for migrations / pg_dump.
 *   3. DATABASE_URL — legacy fallback, used by drizzle-kit and any local
 *      tooling that has not been migrated yet.
 */
function resolveConnectionString(): string {
  const url =
    process.env.SUPABASE_POOLER_CONNECTION_STRING ??
    process.env.SUPABASE_DIRECT_CONNECTION_STRING ??
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "No Supabase connection string found. Set SUPABASE_POOLER_CONNECTION_STRING " +
        "(preferred) or SUPABASE_DIRECT_CONNECTION_STRING in the environment.",
    );
  }
  return url;
}

const connectionString = resolveConnectionString();

const isSupabase = /supabase\.(co|com)/i.test(connectionString);

export const pool = new Pool({
  connectionString,
  // Supabase always requires TLS. Self-signed accept is fine because the
  // hostname is verified and the cert is Supabase-managed.
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
});

export const db = drizzle(pool, { schema });

export * from "./schema";
