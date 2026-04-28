import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { count } from "drizzle-orm";

const router: IRouter = Router();

const SHOWCASE_STORES = [
  {
    id: "store-1",
    name: "Amani Boutique",
    handle: "amani-boutique",
    category: "Women's Fashion",
    city: "Nairobi",
    tagline: "Hand-finished kitenge for the modern African woman.",
    coverEmoji: "👗",
    productCount: 142,
    monthlyRevenueKes: 489000,
  },
  {
    id: "store-2",
    name: "Kicks by Kev",
    handle: "kicks-by-kev",
    category: "Sneakers",
    city: "Westlands",
    tagline: "Limited drops. Direct from Tokyo and Lagos.",
    coverEmoji: "👟",
    productCount: 64,
    monthlyRevenueKes: 1240000,
  },
  {
    id: "store-3",
    name: "Glow Lab Cosmetics",
    handle: "glow-lab",
    category: "Beauty",
    city: "Mombasa",
    tagline: "Clean beauty made for melanin. Live every Friday.",
    coverEmoji: "💄",
    productCount: 38,
    monthlyRevenueKes: 312000,
  },
  {
    id: "store-4",
    name: "Mama Halima Foods",
    handle: "mama-halima",
    category: "Food & Spices",
    city: "Eastleigh",
    tagline: "Pilau masala, ghee, and chai blends shipped countrywide.",
    coverEmoji: "🍛",
    productCount: 27,
    monthlyRevenueKes: 178000,
  },
  {
    id: "store-5",
    name: "Karibu Home",
    handle: "karibu-home",
    category: "Home & Decor",
    city: "Karen",
    tagline: "Hand-woven baskets and ceramics from East African artisans.",
    coverEmoji: "🪴",
    productCount: 89,
    monthlyRevenueKes: 562000,
  },
  {
    id: "store-6",
    name: "Tafiti Tech",
    handle: "tafiti-tech",
    category: "Electronics",
    city: "Nairobi CBD",
    tagline: "Refurbished phones, certified, with M-Pesa instant payouts.",
    coverEmoji: "📱",
    productCount: 51,
    monthlyRevenueKes: 2100000,
  },
];

const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Wanjiru Kamau",
    role: "Boutique owner, Nairobi",
    quote:
      "I imported my Facebook page on a Sunday afternoon. By Monday morning I had three orders paid straight to my Till. Sokoa is the first thing that actually worked.",
    platform: "facebook" as const,
    rating: 5,
  },
  {
    id: "t-2",
    name: "Brian Otieno",
    role: "TikTok seller, Kisumu",
    quote:
      "I drop my Sokoa link mid-stream and customers pay before the live ends. My checkout used to lose me half the room. Not anymore.",
    platform: "tiktok" as const,
    rating: 5,
  },
  {
    id: "t-3",
    name: "Aisha Mohamed",
    role: "Cosmetics reseller, Mombasa",
    quote:
      "M-Pesa payouts are instant. No waiting. No middlemen. I run my whole business from my phone now.",
    platform: "instagram" as const,
    rating: 5,
  },
  {
    id: "t-4",
    name: "Kevin Mwangi",
    role: "Sneaker drop store, Westlands",
    quote:
      "Built my store in under 4 minutes. The mobile checkout is faster than anything I've seen — even Shopify.",
    platform: "whatsapp" as const,
    rating: 5,
  },
];

const PRICING_PLANS = [
  {
    id: "plan-starter",
    name: "Starter",
    priceKes: 0,
    cadence: "free" as const,
    tagline: "For sellers just testing the waters.",
    features: [
      "Free Sokoa subdomain (yourstore.sokoa.shop)",
      "Up to 25 products",
      "M-Pesa Till & Paybill payouts",
      "Mobile-first checkout",
      "Basic analytics",
    ],
    popular: false,
    ctaLabel: "Start free",
  },
  {
    id: "plan-boutique",
    name: "Boutique",
    priceKes: 1490,
    cadence: "month" as const,
    tagline: "For serious merchants ready to scale.",
    features: [
      "Custom domain (yourbrand.co.ke)",
      "Unlimited products",
      "M-Pesa, card, and bank payouts",
      "Multi-channel inventory (FB / IG / TikTok)",
      "Advanced analytics & customer CRM",
      "Priority support",
    ],
    popular: true,
    ctaLabel: "Go boutique",
  },
  {
    id: "plan-tiktok-hour",
    name: "TikTok Live",
    priceKes: 99,
    cadence: "hour" as const,
    tagline: "Pay only when you go live. Perfect for live sellers.",
    features: [
      "Pop-up store activated for the live session",
      "Drop-link mid-stream",
      "Instant M-Pesa checkout",
      "Real-time order dashboard",
      "No monthly commitment",
    ],
    popular: false,
    ctaLabel: "Start a live store",
  },
];

router.get("/stats/platform", async (_req, res, next) => {
  try {
    const [{ leadCount }] = await db
      .select({ leadCount: count() })
      .from(leadsTable);

    const baseMerchants = 12480;
    const baseToday = 84;
    const basePayouts = 1342;

    res.json({
      activeMerchants: baseMerchants + Number(leadCount ?? 0),
      storesCreatedToday: baseToday + Number(leadCount ?? 0),
      countriesServed: 7,
      gmvProcessedKes: 184_320_000,
      averageStoreSetupSeconds: 118,
      payoutsToday: basePayouts,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/stats/showcase", (_req, res) => {
  res.json(SHOWCASE_STORES);
});

router.get("/stats/testimonials", (_req, res) => {
  res.json(TESTIMONIALS);
});

router.get("/stats/pricing", (_req, res) => {
  res.json(PRICING_PLANS);
});

export default router;
