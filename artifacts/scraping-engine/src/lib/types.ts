export type Platform = "facebook" | "instagram" | "tiktok" | "manual";

export interface DetectedInput {
  platform: Platform;
  handle: string;
  displayName: string;
  rawInput: string;
  url?: string;
}

export interface ExtractedProduct {
  id: string;
  name: string;
  priceKes: number;
  description: string;
  category: string;
  emoji: string;
  inStock: boolean;
  imageHint: string;
}

export interface ExtractedStore {
  handle: string;
  name: string;
  platform: Platform;
  city: string;
  country: string;
  category: string;
  bio: string;
  followers: number;
  coverEmoji: string;
  products: ExtractedProduct[];
  extractedAt: string;
  confidence: number;
}

export interface ProcessingStep {
  id: string;
  label: string;
  sublabel?: string;
  status: "pending" | "running" | "done" | "error";
  durationMs: number;
}

export interface CacheEntry {
  input: DetectedInput;
  store?: ExtractedStore;
  cachedAt: string;
}
