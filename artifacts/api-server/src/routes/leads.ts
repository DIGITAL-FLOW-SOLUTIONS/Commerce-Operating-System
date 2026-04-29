import { Router, type IRouter } from "express";
import { randomUUID } from "node:crypto";
import { db, leadsTable, leadEventsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";
import { anonymizeName, pickCity } from "../lib/lead-display";

const router: IRouter = Router();

const NEXT_STEP_BY_INTENT: Record<string, string> = {
  scrape_facebook: "/build",
  scrape_instagram: "/build",
  tiktok_live: "/signup",
  explore: "/build",
  signup: "/signup",
  contact: "/help",
};

router.post("/leads", async (req, res, next) => {
  try {
    const body = CreateLeadBody.parse(req.body);
    const sessionToken = randomUUID();
    const [row] = await db
      .insert(leadsTable)
      .values({
        inputValue: body.inputValue,
        source: body.source,
        intentType: body.intentType,
        country: body.country ?? null,
        sessionToken,
      })
      .returning();

    if (!row) {
      throw new Error("Failed to insert lead");
    }

    // Mirror a sanitized row into lead_events so the public realtime feed
    // can broadcast this join without exposing the underlying input value
    // or session token. Failure here MUST NOT block the user-facing response.
    try {
      await db.insert(leadEventsTable).values({
        source: row.source,
        intentType: row.intentType,
        country: row.country,
        displayName: anonymizeName(row.inputValue, row.id),
        city: pickCity(row.id),
        createdAt: row.createdAt,
      });
    } catch (eventErr) {
      req.log.warn(
        { err: eventErr, leadId: row.id },
        "lead_events mirror insert failed",
      );
    }

    const nextStep = NEXT_STEP_BY_INTENT[body.intentType] ?? "/build";

    res.status(201).json({
      id: row.id,
      inputValue: row.inputValue,
      source: row.source,
      intentType: row.intentType,
      country: row.country,
      sessionToken: row.sessionToken,
      nextStep,
      createdAt: row.createdAt.toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/leads/recent", async (_req, res, next) => {
  try {
    const rows = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt))
      .limit(8);

    const payload = rows.map((row) => ({
      id: row.id,
      displayName: anonymizeName(row.inputValue, row.id),
      city: pickCity(row.id),
      intentType: row.intentType,
      createdAt: row.createdAt.toISOString(),
    }));

    res.json(payload);
  } catch (err) {
    next(err);
  }
});

export default router;
