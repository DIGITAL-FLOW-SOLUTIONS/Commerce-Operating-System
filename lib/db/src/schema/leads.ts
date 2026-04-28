import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  inputValue: text("input_value").notNull(),
  source: text("source").notNull(),
  intentType: text("intent_type").notNull(),
  country: text("country"),
  sessionToken: text("session_token").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type LeadRow = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;
