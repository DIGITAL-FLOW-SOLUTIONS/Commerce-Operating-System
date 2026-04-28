import { Router, type IRouter } from "express";
import { randomUUID } from "node:crypto";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

const NEXT_STEP_BY_INTENT: Record<string, string> = {
  scrape_facebook: "/build",
  scrape_instagram: "/build",
  tiktok_live: "/signup",
  explore: "/build",
  signup: "/signup",
  contact: "/help",
};

const FIRST_NAMES = [
  "Aisha",
  "Brian",
  "Cynthia",
  "David",
  "Esther",
  "Faith",
  "George",
  "Halima",
  "Ian",
  "Joyce",
  "Kevin",
  "Lillian",
  "Mwangi",
  "Nadia",
  "Otieno",
  "Pamela",
  "Quincy",
  "Ruth",
  "Samira",
  "Tabitha",
  "Umar",
  "Violet",
  "Wanjiku",
  "Yusuf",
  "Zainab",
];

const CITIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Machakos",
  "Kampala",
  "Dar es Salaam",
  "Lagos",
  "Accra",
  "Kigali",
];

function anonymizeName(input: string, id: string): string {
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  const first = FIRST_NAMES[seed % FIRST_NAMES.length] ?? "Friend";
  const initial = input.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase() || "M";
  return `${first} ${initial}.`;
}

function pickCity(id: string): string {
  const seed = id.charCodeAt(0) + id.charCodeAt(2 % id.length);
  return CITIES[seed % CITIES.length] ?? "Nairobi";
}

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
