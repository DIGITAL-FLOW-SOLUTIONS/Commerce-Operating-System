import type { DetectedInput, Platform } from "./types";

const FB_PATTERNS = [
  /facebook\.com\/([a-zA-Z0-9._-]+)/i,
  /fb\.com\/([a-zA-Z0-9._-]+)/i,
  /fb\.me\/([a-zA-Z0-9._-]+)/i,
];

const IG_PATTERNS = [
  /instagram\.com\/([a-zA-Z0-9._]+)/i,
  /instagr\.am\/([a-zA-Z0-9._]+)/i,
];

const TIKTOK_PATTERNS = [
  /tiktok\.com\/@([a-zA-Z0-9._-]+)/i,
  /tiktok\.com\/([a-zA-Z0-9._-]+)/i,
  /^@([a-zA-Z0-9._-]+)$/,
];

function extractHandle(input: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.[1]) return match[1].replace(/\/$/, "");
  }
  return null;
}

function toDisplayName(handle: string): string {
  return handle
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function detectInput(raw: string): DetectedInput {
  const trimmed = raw.trim();

  const fbHandle = extractHandle(trimmed, FB_PATTERNS);
  if (fbHandle) {
    return {
      platform: "facebook",
      handle: fbHandle,
      displayName: toDisplayName(fbHandle),
      rawInput: trimmed,
      url: `https://www.facebook.com/${fbHandle}`,
    };
  }

  const igHandle = extractHandle(trimmed, IG_PATTERNS);
  if (igHandle) {
    return {
      platform: "instagram",
      handle: igHandle,
      displayName: toDisplayName(igHandle),
      rawInput: trimmed,
      url: `https://www.instagram.com/${igHandle}`,
    };
  }

  const ttHandle = extractHandle(trimmed, TIKTOK_PATTERNS);
  if (ttHandle) {
    return {
      platform: "tiktok",
      handle: ttHandle,
      displayName: toDisplayName(ttHandle),
      rawInput: trimmed,
      url: `https://www.tiktok.com/@${ttHandle}`,
    };
  }

  return {
    platform: "manual",
    handle: trimmed.toLowerCase().replace(/\s+/g, "-"),
    displayName: trimmed,
    rawInput: trimmed,
  };
}

export function getPlatformHint(raw: string): Platform | null {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;
  if (trimmed.includes("facebook.com") || trimmed.includes("fb.com") || trimmed.includes("fb.me")) return "facebook";
  if (trimmed.includes("instagram.com") || trimmed.includes("instagr.am")) return "instagram";
  if (trimmed.includes("tiktok.com") || trimmed.startsWith("@")) return "tiktok";
  return null;
}
