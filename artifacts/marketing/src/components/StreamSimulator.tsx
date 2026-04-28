import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Square,
  Pin,
  Zap,
  Users,
  ShoppingBag,
  TrendingUp,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage =
  | { id: number; kind: "comment"; user: string; text: string }
  | { id: number; kind: "order"; user: string; product: string; amount: number }
  | { id: number; kind: "system"; text: string }
  | { id: number; kind: "product"; product: string; code: string; price: number };

const COMMENT_POOL = [
  { user: "mumbi_w", text: "is the red still available??" },
  { user: "wanjiku99", text: "drop the link sis" },
  { user: "kev.254", text: "size 42?" },
  { user: "amani_b", text: "AJ7 please!!" },
  { user: "shiro_k", text: "shipping to mombasa?" },
  { user: "njoki.styles", text: "love the green one" },
  { user: "brian_t", text: "how much for the hoodie" },
  { user: "faith_l", text: "im buying right now" },
  { user: "kelly.m", text: "do you have black?" },
  { user: "pendo_w", text: "delivery to thika today?" },
];

const BUYERS = [
  "wanjiku99",
  "kev.254",
  "amani_b",
  "shiro_k",
  "brian_t",
  "faith_l",
  "kelly.m",
  "pendo_w",
  "njoki.styles",
  "mumbi_w",
];

const PRODUCTS = [
  { code: "AJ7", name: "Air Jordans · Red", price: 4500 },
  { code: "HD2", name: "Oversized Hoodie · Black", price: 2800 },
  { code: "GR4", name: "Cargo Pants · Olive", price: 3200 },
  { code: "DR1", name: "Emerald Wrap Dress", price: 3500 },
  { code: "BG9", name: "Beaded Tote Bag", price: 1800 },
];

function formatKES(value: number): string {
  return `KES ${value.toLocaleString("en-KE")}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function StreamSimulator() {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [flashSaleEndsAt, setFlashSaleEndsAt] = useState<number | null>(null);
  const [currentProduct, setCurrentProduct] = useState(PRODUCTS[0]!);
  const [showSummary, setShowSummary] = useState(false);

  const messageIdRef = useRef(0);

  const flashActive = flashSaleEndsAt !== null && Date.now() < flashSaleEndsAt;
  const flashRemaining = flashActive
    ? Math.max(0, Math.ceil((flashSaleEndsAt! - Date.now()) / 1000))
    : 0;

  const pushMessage = (
    m:
      | { kind: "comment"; user: string; text: string }
      | { kind: "order"; user: string; product: string; amount: number }
      | { kind: "system"; text: string }
      | { kind: "product"; product: string; code: string; price: number }
  ) => {
    setMessages((prev) => {
      messageIdRef.current += 1;
      const id = messageIdRef.current;
      const withId: ChatMessage =
        m.kind === "comment"
          ? { id, kind: "comment", user: m.user, text: m.text }
          : m.kind === "order"
            ? { id, kind: "order", user: m.user, product: m.product, amount: m.amount }
            : m.kind === "system"
              ? { id, kind: "system", text: m.text }
              : { id, kind: "product", product: m.product, code: m.code, price: m.price };
      const next = [...prev, withId];
      return next.slice(-12);
    });
  };

  // Tick: viewers, time, hearts
  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
      setViewers((v) => Math.max(0, v + Math.floor(Math.random() * 12) - 2));
      setHearts((h) => h + Math.floor(Math.random() * 8) + 2);
    }, 1000);
    return () => clearInterval(id);
  }, [isLive]);

  // Comments
  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      const c = pickRandom(COMMENT_POOL);
      pushMessage({ kind: "comment", user: c.user, text: c.text });
    }, 1800);
    return () => clearInterval(id);
  }, [isLive]);

  // Orders
  useEffect(() => {
    if (!isLive) return;
    const cadence = flashActive ? 1400 : 3500;
    const id = setInterval(() => {
      const product = pickRandom(PRODUCTS);
      const buyer = pickRandom(BUYERS);
      setOrders((o) => o + 1);
      setRevenue((r) => r + product.price);
      pushMessage({
        kind: "order",
        user: buyer,
        product: product.name,
        amount: product.price,
      });
    }, cadence);
    return () => clearInterval(id);
  }, [isLive, flashActive]);

  // Auto-clear flash sale ticker
  useEffect(() => {
    if (flashSaleEndsAt === null) return;
    const id = setInterval(() => {
      if (Date.now() >= flashSaleEndsAt) {
        setFlashSaleEndsAt(null);
        pushMessage({ kind: "system", text: "Flash sale ended — back to normal pricing" });
      }
    }, 250);
    return () => clearInterval(id);
  }, [flashSaleEndsAt]);

  const handleGoLive = () => {
    setIsLive(true);
    setViewers(180 + Math.floor(Math.random() * 60));
    setHearts(0);
    setOrders(0);
    setRevenue(0);
    setSeconds(0);
    setMessages([]);
    setShowSummary(false);
    pushMessage({ kind: "system", text: "Store is live · sokoa.shop/live/amani" });
  };

  const handleEndStream = () => {
    setIsLive(false);
    setFlashSaleEndsAt(null);
    setShowSummary(true);
  };

  const handleDropLink = () => {
    if (!isLive) return;
    const next = pickRandom(PRODUCTS);
    setCurrentProduct(next);
    pushMessage({
      kind: "product",
      product: next.name,
      code: next.code,
      price: next.price,
    });
  };

  const handleFlashSale = () => {
    if (!isLive) return;
    setFlashSaleEndsAt(Date.now() + 30_000);
    pushMessage({ kind: "system", text: "20% flash sale started · 30s only" });
  };

  const minutes = Math.floor(seconds / 60);
  const liveTimer = `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const fee = Math.max(0, Math.ceil(seconds / 3600 * 50)) || (isLive || showSummary ? 50 : 0);

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
      {/* Control panel */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="text-xs text-white/50 font-medium mb-1">SIMULATOR · NOT REAL DATA</div>
            <div className="font-bold font-display text-xl">@amani.kicks live store</div>
          </div>
          <div className="flex items-center gap-2">
            {isLive ? (
              <div className="bg-secondary/20 text-secondary text-xs font-bold rounded-full px-3 py-1.5 border border-secondary/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                LIVE · {liveTimer}
              </div>
            ) : (
              <div className="bg-white/10 text-white/60 text-xs font-bold rounded-full px-3 py-1.5">
                {showSummary ? "ENDED" : "OFFLINE"}
              </div>
            )}
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatTile icon={Users} label="Watching" value={viewers.toLocaleString()} />
          <StatTile icon={Heart} label="Hearts" value={hearts.toLocaleString()} />
          <StatTile icon={ShoppingBag} label="Orders" value={orders.toLocaleString()} accent />
          <StatTile icon={TrendingUp} label="Revenue" value={formatKES(revenue)} accent />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {!isLive && !showSummary && (
            <Button
              onClick={handleGoLive}
              className="flex-1 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-base"
            >
              <Play className="w-5 h-5 mr-2 fill-current" /> Go Live
            </Button>
          )}
          {!isLive && showSummary && (
            <Button
              onClick={handleGoLive}
              className="flex-1 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-base"
            >
              <Play className="w-5 h-5 mr-2 fill-current" /> Run another stream
            </Button>
          )}
          {isLive && (
            <>
              <Button
                onClick={handleDropLink}
                className="flex-1 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10"
              >
                <Pin className="w-4 h-4 mr-2" /> Drop product link
              </Button>
              <Button
                onClick={handleFlashSale}
                disabled={flashActive}
                className="flex-1 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 mr-2" />
                {flashActive ? `Flash sale · ${flashRemaining}s` : "Trigger flash sale"}
              </Button>
              <Button
                onClick={handleEndStream}
                variant="outline"
                className="h-12 rounded-full border-white/20 text-white hover:bg-white/10 font-semibold"
              >
                <Square className="w-4 h-4 mr-2 fill-current" /> End
              </Button>
            </>
          )}
        </div>

        {/* Summary state */}
        {!isLive && showSummary && (
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-white/60 font-medium mb-1">SESSION RECAP</div>
                <div className="font-bold font-display text-lg">{liveTimer} live · {orders} orders</div>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-white/50 font-medium">Sokoa fee</div>
                <div className="font-bold font-display text-lg">{formatKES(fee)}</div>
              </div>
              <div>
                <div className="text-xs text-white/50 font-medium">M-Pesa fee</div>
                <div className="font-bold font-display text-lg text-secondary">KES 0</div>
              </div>
              <div>
                <div className="text-xs text-white/50 font-medium">Net to Till</div>
                <div className="font-bold font-display text-lg">{formatKES(Math.max(0, revenue - fee))}</div>
              </div>
            </div>
          </div>
        )}

        {/* Idle state hint */}
        {!isLive && !showSummary && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
            <p className="text-white/60 text-sm">
              Tap <span className="font-bold text-secondary">Go Live</span> to simulate a 5-minute drop. You'll see viewers join, comments fly in, and M-Pesa orders land in real time.
            </p>
          </div>
        )}
      </div>

      {/* Phone preview */}
      <div className="relative max-w-[380px] w-full mx-auto">
        <div className="aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-8 border-white/10 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black">
          {/* Top status bar */}
          <div className="absolute top-0 left-0 right-0 p-4 z-10 flex items-center justify-between">
            <div className="bg-black/60 backdrop-blur-md rounded-full pl-1 pr-3 py-1 flex items-center gap-2 border border-white/10">
              <div className={`w-7 h-7 rounded-full ${isLive ? "bg-secondary" : "bg-white/20"} flex items-center justify-center text-[10px] font-bold`}>
                LIVE
              </div>
              <span className="text-xs font-medium">{viewers.toLocaleString()}</span>
            </div>
            {flashActive && (
              <div className="bg-secondary text-white text-[10px] font-bold rounded-full px-2 py-1 flex items-center gap-1 border border-white/20">
                <Zap className="w-3 h-3" /> -20% · {flashRemaining}s
              </div>
            )}
          </div>

          {/* Center: stylized scene */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary via-orange-400 to-pink-500 mx-auto mb-3 flex items-center justify-center text-3xl font-display font-bold border-4 border-white/10">
                A
              </div>
              <div className="text-sm font-bold">@amani.kicks</div>
              <div className="text-xs text-white/40 mt-1">{isLive ? "Sneaker drop · Tuesday" : "Tap Go Live to start"}</div>
            </div>
          </div>

          {/* Bottom: chat + product card */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 max-h-[55%] flex flex-col justify-end">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {m.kind === "comment" && (
                    <div className="text-xs leading-snug">
                      <span className="font-bold opacity-70">{m.user}:</span>{" "}
                      <span className="text-white/90">{m.text}</span>
                    </div>
                  )}
                  {m.kind === "system" && (
                    <div className="text-[11px] text-secondary font-bold">{m.text}</div>
                  )}
                  {m.kind === "order" && (
                    <div className="bg-secondary/20 border border-secondary/30 rounded-lg px-2 py-1.5 text-[11px] font-medium flex items-center justify-between gap-2">
                      <span className="text-white truncate">
                        <span className="font-bold">{m.user}</span> grabbed {m.product}
                      </span>
                      <span className="text-secondary font-bold shrink-0">+{formatKES(m.amount)}</span>
                    </div>
                  )}
                  {m.kind === "product" && (
                    <div className="bg-white text-black rounded-xl p-2.5 shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] font-bold text-primary flex items-center gap-1">
                          <Pin className="w-3 h-3" /> Pinned product · {m.code}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs">
                          <div className="font-bold leading-tight">{m.product}</div>
                          <div className="text-[10px] text-muted-foreground">Reply {m.code} to buy</div>
                        </div>
                        <Button
                          size="sm"
                          className="h-7 rounded-full bg-primary hover:bg-primary/90 text-white text-[10px] font-bold px-3 shrink-0"
                        >
                          {formatKES(m.price)}
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {!isLive && messages.length === 0 && (
              <div className="text-center text-white/30 text-xs italic py-8">
                Chat & orders will appear here
              </div>
            )}
          </div>
        </div>

        {/* Floating revenue counter */}
        <AnimatePresence>
          {(isLive || showSummary) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -right-3 top-20 bg-white text-foreground rounded-2xl px-3 py-2 shadow-xl"
            >
              <div className="text-[10px] text-muted-foreground font-medium leading-none mb-1">M-Pesa Till</div>
              <div className="font-bold text-sm text-primary leading-none">+{formatKES(revenue)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-3 border ${accent ? "bg-secondary/10 border-secondary/30" : "bg-white/5 border-white/10"}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-3.5 h-3.5 ${accent ? "text-secondary" : "text-white/50"}`} />
        <div className="text-[10px] uppercase tracking-wider font-bold text-white/50">{label}</div>
      </div>
      <div className={`font-display font-extrabold text-lg leading-none ${accent ? "text-secondary" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
