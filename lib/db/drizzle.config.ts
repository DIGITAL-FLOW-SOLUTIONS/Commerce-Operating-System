import { defineConfig } from "drizzle-kit";
import path from "path";

/**
 * drizzle-kit (push / generate) needs a *session-mode* connection so it can
 * run DDL transactionally. The Supavisor session pooler (port 5432) works
 * for DDL and is IPv4-reachable, so prefer it here. Fall back to the direct
 * connection (IPv6) or DATABASE_URL.
 */
const url =
  process.env.SUPABASE_POOLER_CONNECTION_STRING ??
  process.env.SUPABASE_DIRECT_CONNECTION_STRING ??
  process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "Set SUPABASE_DIRECT_CONNECTION_STRING (preferred for migrations) or " +
      "SUPABASE_POOLER_CONNECTION_STRING in the environment.",
  );
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url,
    ssl: /supabase\.(co|com)/i.test(url) ? "require" : undefined,
  },
});
