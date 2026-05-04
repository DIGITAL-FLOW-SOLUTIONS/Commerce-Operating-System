import type { CacheEntry, DetectedInput, ExtractedStore } from "./types";

const KEY = "sokoa_build_session";

export function saveInput(input: DetectedInput): void {
  const entry: Partial<CacheEntry> = { input, cachedAt: new Date().toISOString() };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(entry));
  } catch {}
}

export function saveStore(store: ExtractedStore): void {
  try {
    const raw = sessionStorage.getItem(KEY);
    const entry: Partial<CacheEntry> = raw ? JSON.parse(raw) : {};
    entry.store = store;
    entry.cachedAt = new Date().toISOString();
    sessionStorage.setItem(KEY, JSON.stringify(entry));
  } catch {}
}

export function loadInput(): DetectedInput | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const entry: Partial<CacheEntry> = JSON.parse(raw);
    return entry.input ?? null;
  } catch {
    return null;
  }
}

export function loadStore(): ExtractedStore | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const entry: Partial<CacheEntry> = JSON.parse(raw);
    return entry.store ?? null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
