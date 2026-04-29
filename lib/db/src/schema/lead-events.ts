import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Public-facing, anonymized stream of lead activity. Written by the API
 * whenever a new `leads` row is created. Designed to be read by the browser
 * over Supabase Realtime using the anon key — so it MUST NOT contain PII
 * (no input_value, no session_token, no IP, etc).
 *
 * The display_name and city are precomputed by the API at write time so the
 * client can render the realtime payload directly.
 */
export const leadEventsTable = pgTable("lead_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  intentType: text("intent_type").notNull(),
  country: text("country"),
  displayName: text("display_name").notNull(),
  city: text("city").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type LeadEventRow = typeof leadEventsTable.$inferSelect;
export type InsertLeadEvent = typeof leadEventsTable.$inferInsert;
