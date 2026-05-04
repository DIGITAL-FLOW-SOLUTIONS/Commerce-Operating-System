import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, ShoppingBag, Star, Users } from "lucide-react";
import { SiTiktok, SiFacebook, SiInstagram } from "react-icons/si";
import { loadStore, clearSession } from "@/lib/cache";
import type { ExtractedProduct, ExtractedStore, Platform } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLATFORM_META: Record<Platform, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  facebook: { label: "Facebook", icon: <SiFacebook className="size-3.5" />, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  instagram: { label: "Instagram", icon: <SiInstagram className="size-3.5" />, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  tiktok: { label: "TikTok", icon: <SiTiktok className="size-3.5" />, color: "text-foreground", bg: "bg-zinc-100 border-zinc-200" },
  manual: { label: "Manual", icon: <ShoppingBag className="size-3.5" />, color: "text-primary", bg: "bg-accent border-primary/20" },
};

const PRODUCT_PALETTES = [
  { from: "#f0fdf4", to: "#dcfce7", accent: "#16a34a" },
  { from: "#fff7ed", to: "#ffedd5", accent: "#ea580c" },
  { from: "#faf5ff", to: "#f3e8ff", accent: "#9333ea" },
  { from: "#eff6ff", to: "#dbeafe", accent: "#2563eb" },
  { from: "#fdf2f8", to: "#fce7f3", accent: "#db2777" },
  { from: "#fefce8", to: "#fef9c3", accent: "#ca8a04" },
  { from: "#f0fdfa", to: "#ccfbf1", accent: "#0d9488" },
  { from: "#fef2f2", to: "#fee2e2", accent: "#dc2626" },
];

function ProductCard({ product, index }: { product: ExtractedProduct; index: number }) {
  const palette = PRODUCT_PALETTES[index % PRODUCT_PALETTES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
    >
      <div
        className="relative h-40 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)` }}
      >
        <span className="text-5xl mb-1 drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-30"
          style={{ background: `linear-gradient(to top, ${palette.accent}40, transparent)` }}
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sold out
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <p className="text-[10px] uppercase tracking-wide font-semibold mb-1" style={{ color: palette.accent }}>
          {product.category}
        </p>
        <h3 className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2 flex-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/60">
          <p className="text-sm font-bold">KES {product.priceKes.toLocaleString()}</p>
          <button
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg text-white transition-all"
            style={{ backgroundColor: product.inStock ? palette.accent : "#9ca3af" }}
          >
            {product.inStock ? "Add to bag" : "Notify me"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StoreHeader({ store }: { store: ExtractedStore }) {
  const meta = PLATFORM_META[store.platform];
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5">
      <div
        className="h-24 relative"
        style={{ background: "linear-gradient(135deg, hsl(160 84% 39% / 0.15) 0%, hsl(25 95% 53% / 0.1) 100%)" }}
      >
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <div className="size-16 rounded-2xl bg-card border-2 border-border shadow-md flex items-center justify-center text-3xl">
            {store.coverEmoji}
          </div>
        </div>
      </div>
      <div className="px-5 pt-10 pb-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="font-display font-bold text-lg leading-tight">{store.name}</h2>
          <Badge variant="outline" className={`text-xs gap-1 flex-shrink-0 ${meta.bg} ${meta.color} border`}>
            {meta.icon} {meta.label}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />{store.city}, {store.country}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />{store.followers.toLocaleString()} followers
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{store.bio}</p>
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-base font-bold font-display text-primary">{store.products.length}</p>
            <p className="text-xs text-muted-foreground">Products</p>
          </div>
          <div>
            <p className="text-base font-bold font-display text-primary">{store.confidence}%</p>
            <p className="text-xs text-muted-foreground">Confidence</p>
          </div>
          <div>
            <p className="text-base font-bold font-display text-primary">Free</p>
            <p className="text-xs text-muted-foreground">To claim</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA({ store }: { store: ExtractedStore }) {
  const [, setLocation] = useLocation();

  const continuationPath = store.platform === "tiktok" ? "/tiktok" : "/~/";

  const handleClaim = () => {
    clearSession();
    window.location.href = continuationPath;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card border border-primary/20 rounded-2xl p-5 mb-6"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Star className="size-4 text-primary fill-primary/30" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base mb-0.5">This store is yours — claim it free</h3>
          <p className="text-xs text-muted-foreground">No credit card. Start selling in minutes.</p>
        </div>
      </div>
      <ul className="space-y-1.5 mb-4">
        {["Custom storefront & domain", "M-Pesa, card & bank payments", "Delivery & inventory tracking", "Real-time sales analytics"].map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-primary flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button className="w-full gap-2 rounded-xl h-11 text-sm font-semibold" onClick={handleClaim}>
        <ShoppingBag className="size-4" />
        Claim {store.name} — it's free
        <ArrowRight className="size-4 ml-auto" />
      </Button>
      <button
        onClick={() => setLocation("/manual")}
        className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors underline underline-offset-2"
      >
        Edit store details first
      </button>
    </motion.div>
  );
}

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const [store, setStore] = useState<ExtractedStore | null>(null);

  useEffect(() => {
    const s = loadStore();
    if (!s) {
      setLocation("/");
      return;
    }
    setStore(s);
  }, [setLocation]);

  if (!store) return null;

  const inStockCount = store.products.filter((p) => p.inStock).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <img src="/logos/sokoa-horizontal.svg" alt="Sokoa" className="h-6" />
        <Badge variant="outline" className="text-xs bg-accent text-primary border-primary/20">
          Store preview
        </Badge>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <StoreHeader store={store} />
        </motion.div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-sm">
            Products <span className="text-muted-foreground font-normal">({store.products.length} found · {inStockCount} in stock)</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {store.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <CTA store={store} />

        <p className="text-center text-xs text-muted-foreground pb-8">
          Products are AI-estimated from your social media. You can edit everything after claiming.
        </p>
      </div>
    </div>
  );
}
