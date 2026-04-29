import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

const url = __SUPABASE_URL__;
const anonKey = __SUPABASE_ANON_KEY__;

let client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase browser client, or null if the build was
 * created without Supabase env vars (e.g. local sandbox without secrets).
 * Callers should treat a null return as "realtime not available" and fall
 * back to polling-based REST endpoints.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { params: { eventsPerSecond: 5 } },
    });
  }
  return client;
}

export type LeadEventRow = {
  id: string;
  source: string;
  intent_type: string;
  country: string | null;
  display_name: string;
  city: string;
  created_at: string;
};
