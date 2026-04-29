import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabaseClient, type LeadEventRow } from "@/lib/supabase";

type Activity = {
  id: string;
  displayName: string;
  city: string;
  intentType: string;
  createdAt: string;
};

const VERB_BY_INTENT: Record<string, string> = {
  scrape_facebook: "imported a Facebook Page",
  scrape_instagram: "imported an Instagram shop",
  tiktok_live: "started a TikTok Live store",
  explore: "joined Sokoa",
  signup: "created a Sokoa account",
  contact: "reached out to Sokoa",
};

function describe(intent: string): string {
  return VERB_BY_INTENT[intent] ?? "joined Sokoa";
}

export function LiveActivityTicker() {
  const [current, setCurrent] = useState<Activity | null>(null);
  const [connected, setConnected] = useState(false);
  const [queue, setQueue] = useState<Activity[]>([]);

  // Subscribe to Supabase Realtime INSERTs on lead_events.
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const channel = supabase
      .channel("public:lead_events")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lead_events" },
        (payload) => {
          const row = payload.new as LeadEventRow;
          setQueue((q) => [
            ...q,
            {
              id: row.id,
              displayName: row.display_name,
              city: row.city,
              intentType: row.intent_type,
              createdAt: row.created_at,
            },
          ]);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setConnected(true);
      });

    return () => {
      supabase.removeChannel(channel);
      setConnected(false);
    };
  }, []);

  // Drain the queue: show each item for ~5s, hidden for ~0.6s in between.
  useEffect(() => {
    if (current || queue.length === 0) return;
    const next = queue[0];
    if (!next) return;
    setQueue((q) => q.slice(1));
    setCurrent(next);
    const t = window.setTimeout(() => setCurrent(null), 5000);
    return () => window.clearTimeout(t);
  }, [current, queue]);

  if (!connected && !current) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      data-testid="live-activity-ticker"
    >
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-primary/20 bg-background/95 px-4 py-2.5 shadow-lg shadow-primary/10 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm text-foreground">
              <span className="font-semibold">{current.displayName}</span>
              <span className="text-muted-foreground"> from </span>
              <span className="font-medium">{current.city}</span>
              <span className="text-muted-foreground"> just </span>
              <span>{describe(current.intentType)}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
