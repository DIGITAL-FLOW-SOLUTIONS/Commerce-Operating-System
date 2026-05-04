import type { DetectedInput, ExtractedProduct, ExtractedStore, ProcessingStep } from "./types";

const AFRICAN_CITIES = ["Nairobi", "Lagos", "Accra", "Kampala", "Dar es Salaam", "Kigali", "Addis Ababa", "Johannesburg", "Dakar", "Abidjan"];

const CATEGORIES = {
  fashion: {
    label: "Fashion & Clothing",
    emoji: "👗",
    products: [
      { name: "Ankara Wrap Dress", base: 3200, emoji: "👗", desc: "Vibrant hand-printed Ankara fabric, A-line silhouette, sizes XS–3XL." },
      { name: "Men's Linen Kaftan", base: 2800, emoji: "👘", desc: "Breathable cotton-linen blend, perfect for events & everyday wear." },
      { name: "Kente Print Blouse", base: 1900, emoji: "👚", desc: "Authentic kente-inspired print, relaxed fit, machine washable." },
      { name: "Batik Maxi Skirt", base: 2400, emoji: "🩱", desc: "Hand-dyed batik cotton, elastic waist, flowy floor-length cut." },
      { name: "Dashiki Top (Unisex)", base: 1500, emoji: "👕", desc: "Classic dashiki embroidery, relaxed fit, multiple colourways available." },
      { name: "Kitenge Wrap Pants", base: 2100, emoji: "👖", desc: "Wide-leg wrap pants, kitenge print, one-size adjustable waist." },
      { name: "Embroidered Boubou", base: 4500, emoji: "🥻", desc: "Hand-embroidered grand boubou, premium fabric, special occasion piece." },
      { name: "African Print Sneakers", base: 3800, emoji: "👟", desc: "Canvas sneakers lined with Ankara print, sizes 36–46." },
    ],
  },
  beauty: {
    label: "Beauty & Skincare",
    emoji: "✨",
    products: [
      { name: "Shea Butter Body Cream", base: 850, emoji: "🧴", desc: "100% raw unrefined shea butter from Northern Ghana, deeply moisturising." },
      { name: "Black Soap Face Wash", base: 650, emoji: "🧼", desc: "Traditional African black soap, gentle daily cleanser for all skin types." },
      { name: "Marula Face Oil", base: 1200, emoji: "💧", desc: "Cold-pressed marula oil, brightening & anti-ageing, 30ml bottle." },
      { name: "Hibiscus Glow Serum", base: 1500, emoji: "🌺", desc: "Hibiscus extract + vitamin C serum, evens skin tone in 4 weeks." },
      { name: "Hair Growth Butter", base: 950, emoji: "💆", desc: "Castor oil + shea blend, promotes length retention and scalp health." },
      { name: "Natural Lip Balm Set", base: 480, emoji: "💄", desc: "Set of 3 tinted balms: cocoa, hibiscus, honey. 100% natural ingredients." },
      { name: "Bamboo Charcoal Mask", base: 700, emoji: "🪨", desc: "Deep pore cleansing clay mask, works in 10 minutes, suits all skin types." },
      { name: "Baobab Repair Cream", base: 1100, emoji: "🌿", desc: "Night repair cream with baobab oil, hyaluronic acid, and aloe vera." },
    ],
  },
  food: {
    label: "Food & Snacks",
    emoji: "🍽️",
    products: [
      { name: "Suya Spice Blend (500g)", base: 450, emoji: "🌶️", desc: "Authentic suya spice mix with groundnut, ginger & chili. Great on meats." },
      { name: "Zobo Drink (6-pack)", base: 720, emoji: "🥤", desc: "Chilled hibiscus flower drink, no preservatives, 6×500ml bottles." },
      { name: "Chin Chin (500g)", base: 350, emoji: "🍪", desc: "Crunchy fried pastry snack, lightly sweetened. Classic Nigerian favourite." },
      { name: "Groundnut Butter", base: 550, emoji: "🥜", desc: "Stone-ground roasted groundnuts, smooth or chunky, 400g jar." },
      { name: "Biltong Pack (250g)", base: 890, emoji: "🥩", desc: "Air-dried seasoned beef biltong, high protein, zero additives." },
      { name: "Honey (Raw, 500ml)", base: 980, emoji: "🍯", desc: "Raw wild honey from Mount Kenya hives, unfiltered, pure taste." },
      { name: "Plantain Chips (200g)", base: 280, emoji: "🍌", desc: "Thinly sliced fried plantain chips, lightly salted, crunchy snack." },
      { name: "Jollof Rice Spice Kit", base: 620, emoji: "🍛", desc: "Pre-measured spice kit for perfect jollof rice, serves 4-6 people." },
    ],
  },
  accessories: {
    label: "Accessories & Jewellery",
    emoji: "💍",
    products: [
      { name: "Beaded Statement Necklace", base: 1800, emoji: "📿", desc: "Hand-strung glass beads, Maasai-inspired patterns, 50cm chain." },
      { name: "Wooden Bangle Set (x3)", base: 950, emoji: "⌚", desc: "Set of 3 carved wooden bangles, natural finish, one-size fits most." },
      { name: "Leather Crossbody Bag", base: 4200, emoji: "👜", desc: "Genuine suede leather, hand-stitched, adjustable strap, multiple pockets." },
      { name: "Ankara Print Headwrap", base: 750, emoji: "🧣", desc: "2m Ankara fabric headwrap, vibrant print, multipurpose use." },
      { name: "Bronze Earrings (Drop)", base: 1100, emoji: "💎", desc: "Lost-wax cast bronze drop earrings, antique finish, handmade." },
      { name: "Woven Raffia Clutch", base: 2200, emoji: "👝", desc: "Handwoven raffia clutch bag, natural earth tones, interior pocket." },
      { name: "Cowrie Shell Anklet", base: 680, emoji: "🐚", desc: "Adjustable cowrie shell anklet on waxed cord, beach-to-street." },
      { name: "Tie-Dye Bucket Hat", base: 1350, emoji: "🎩", desc: "Handmade tie-dye bucket hat, breathable cotton, sizes S/M/L." },
    ],
  },
  home: {
    label: "Home & Living",
    emoji: "🏠",
    products: [
      { name: "Mud Cloth Throw Pillow", base: 1600, emoji: "🛋️", desc: "Genuine bogolan mud cloth cover, 45×45cm, zippered insert." },
      { name: "Sisal Woven Basket", base: 2400, emoji: "🧺", desc: "Handwoven sisal storage basket, natural dyes, diameter 35cm." },
      { name: "Beeswax Candle Set (x4)", base: 1200, emoji: "🕯️", desc: "Hand-poured beeswax candles, lemongrass & eucalyptus scents." },
      { name: "Kente Table Runner", base: 1800, emoji: "🎨", desc: "Hand-woven kente cotton table runner, 180×35cm, vibrant colours." },
      { name: "Brass Incense Holder", base: 950, emoji: "🪔", desc: "Cast brass incense stick holder, etched geometric pattern." },
      { name: "Recycled Glass Vase", base: 2100, emoji: "🏺", desc: "Mouth-blown recycled glass vase, teal-green tint, 25cm tall." },
      { name: "Wax Print Cushion Cover", base: 1100, emoji: "🛏️", desc: "Dutch wax print cotton cover, 50×50cm, easy-zip closure." },
      { name: "Hand-Painted Ceramic Mug", base: 780, emoji: "☕", desc: "Wheel-thrown ceramic mug, hand-painted tribal motifs, 350ml." },
    ],
  },
};

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 0xFFFFFFFF;
  };
}

function pickCategory(handle: string, rng: () => number) {
  const keys = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];
  const keywords: Record<keyof typeof CATEGORIES, string[]> = {
    fashion: ["cloth", "fashion", "wear", "style", "dress", "boutique", "lux", "mode", "chic", "wardrobe", "attire"],
    beauty: ["beauty", "skin", "glow", "care", "hair", "cosm", "glam", "pure", "natural", "herb"],
    food: ["food", "kitchen", "snack", "eat", "cook", "bite", "grub", "yum", "delicious", "spice"],
    accessories: ["jewel", "access", "bag", "ring", "bead", "craft", "bling", "gem", "adorn"],
    home: ["home", "house", "decor", "interior", "living", "deco", "nest", "craft", "art"],
  };
  const lower = handle.toLowerCase();
  for (const key of keys) {
    if (keywords[key].some((kw) => lower.includes(kw))) return key;
  }
  return keys[Math.floor(rng() * keys.length)];
}

function generateStoreName(handle: string, displayName: string, rng: () => number): string {
  const suffixes = ["Boutique", "Collection", "Store", "Shop", "Market", "Hub", "Co.", "Trade"];
  const clean = displayName.split(" ").slice(0, 2).join(" ");
  if (clean.toLowerCase().includes("boutique") || clean.toLowerCase().includes("shop") || clean.toLowerCase().includes("store")) {
    return clean;
  }
  return `${clean} ${suffixes[Math.floor(rng() * suffixes.length)]}`;
}

export function buildProcessingSteps(platform: string): ProcessingStep[] {
  const platformLabel = platform === "tiktok" ? "TikTok" : platform === "facebook" ? "Facebook" : platform === "instagram" ? "Instagram" : "your input";
  return [
    { id: "detect", label: `Connecting to ${platformLabel}`, sublabel: "Verifying page access", status: "pending", durationMs: 1200 },
    { id: "profile", label: "Reading business profile", sublabel: "Name, bio, location, followers", status: "pending", durationMs: 1800 },
    { id: "posts", label: "Scanning posts & captions", sublabel: "Looking for product mentions", status: "pending", durationMs: 2400 },
    { id: "infer", label: "Inferring products & prices", sublabel: "AI matching to your catalogue", status: "pending", durationMs: 2000 },
    { id: "build", label: "Assembling your store", sublabel: "Arranging layout & categories", status: "pending", durationMs: 1400 },
  ];
}

export async function runExtraction(
  input: DetectedInput,
  onStep: (stepId: string, status: "running" | "done") => void,
): Promise<ExtractedStore> {
  const rng = seededRandom(input.handle + input.platform);
  const steps = buildProcessingSteps(input.platform);

  for (const step of steps) {
    onStep(step.id, "running");
    await delay(step.durationMs + (rng() * 400 - 200));
    onStep(step.id, "done");
  }

  const catKey = pickCategory(input.handle, rng);
  const catData = CATEGORIES[catKey];
  const cityIdx = Math.floor(rng() * AFRICAN_CITIES.length);
  const city = AFRICAN_CITIES[cityIdx];
  const country = cityIdx <= 1 ? (cityIdx === 0 ? "Kenya" : "Nigeria") : cityIdx === 2 ? "Ghana" : cityIdx === 3 ? "Uganda" : "Tanzania";
  const followers = Math.floor(rng() * 48000 + 2000);
  const storeName = generateStoreName(input.handle, input.displayName, rng);

  const shuffled = [...catData.products].sort(() => rng() - 0.5);
  const productCount = Math.floor(rng() * 4) + 5;
  const products: ExtractedProduct[] = shuffled.slice(0, productCount).map((p, i) => {
    const priceVariance = Math.floor(rng() * 600 - 300);
    return {
      id: `p${i}`,
      name: p.name,
      priceKes: Math.max(200, p.base + priceVariance),
      description: p.desc,
      category: catData.label,
      emoji: p.emoji,
      inStock: rng() > 0.15,
      imageHint: `${catKey} product africa`,
    };
  });

  const bios = [
    `Premium ${catData.label.toLowerCase()} crafted with love in ${city}. Quality you can feel. 🌍`,
    `Your go-to destination for authentic African ${catData.label.toLowerCase()}. Ships across ${country} & beyond.`,
    `${storeName} — bringing the best of African ${catData.label.toLowerCase()} to your doorstep. Est. 2020.`,
    `Handpicked. Handcrafted. Heart-made. ${catData.label} from ${city}, delivered to you. 📦`,
  ];

  return {
    handle: input.handle,
    name: storeName,
    platform: input.platform,
    city,
    country,
    category: catData.label,
    bio: bios[Math.floor(rng() * bios.length)],
    followers,
    coverEmoji: catData.emoji,
    products,
    extractedAt: new Date().toISOString(),
    confidence: Math.floor(rng() * 12 + 86),
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
