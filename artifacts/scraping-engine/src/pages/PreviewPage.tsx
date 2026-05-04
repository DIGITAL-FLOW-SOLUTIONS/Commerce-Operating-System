import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Sparkles, Star, Users } from "lucide-react";
import { SiTiktok, SiFacebook, SiInstagram } from "react-icons/si";
import { loadStore, clearSession } from "@/lib/cache";
import type { ExtractedProduct, ExtractedStore, Platform } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLATFORM_META: Record<Platform, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  facebook: { label: "Facebook", icon: <SiFacebook className="size-3.5" />, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  instagram: { label: "Instagram", icon: <SiInstagram className="size-3.5" />, color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
  tiktok: { label: "TikTok", icon: <SiTiktok className="size-3.5" />, color: "text-foreground", bg: "bg-zinc-50 border-zinc-200" },
  manual: { label: "Manual", icon: <Sparkles className="size-3.5" />, color: "text-primary", bg: "bg-accent border-primary/20" },
};

function ProductCard({ product, index }: { product: ExtractedProduct; index: number }) {
  const BG_COLORS = [
    "from-emerald-50 to-teal-50",
    "from-orange-50 to-amber-50",
    "from-purple-50 to-pink-50",
    "from-blue-50 to-cyan-50",
    "from-rose-50 to-red-50",
    "from-yellow-50 to-lime-50",
  ];
  const bg = BG_COLORS[index % BG_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
    >
      <div className={`bg-gradient-to-br ${bg} h-28 flex items-center justify-center`}>
        <span className="text-4xl">{product.emoji}</span>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-sm font-bold text-primary">
            KES {product.priceKes.toLocaleString()}
          </p>
          {!product.inStock && (
            <Badge variant="outline" className="text-xs text-muted-foreground">Out of stock</Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StoreHeader({ store }: { store: ExtractedStore }) {
  const meta = PLATFORM_META[store.platform];
  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-5">
      <div className="flex items-start gap-4">
        <div className="size-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">{store.coverEmoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="font-display font-bold text-lg leading-tight">{store.name}</h2>
            <Badge variant="outline" className={`text-xs gap-1 ${meta.bg} ${meta.color} border`}>
              {meta.icon} {meta.label}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />{store.city}, {store.country}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3" />{store.followers.toLocaleString()} followers
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{store.bio}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-base font-bold font-display text-primary">{store.products.length}</p>
          <p className="text-xs text-muted-foreground">Products found</p>
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
  );
}

function CTA({ store }: { store: ExtractedStore }) {
  const [, setLocation] = useLocation();

  const continuationPath = store.platform === "tiktok"
    ? "/tiktok"
    : "/dashboard";

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
          <Sparkles className="size-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base mb-0.5">This store is yours — claim it free</h3>
          <p className="text-xs text-muted-foreground">No credit card needed. Start selling in minutes.</p>
        </div>
      </div>
      <ul className="space-y-1.5 mb-4">
        {["Custom domain & storefront", "Mpesa, card & bank payments", "Delivery & inventory tools", "Sales analytics dashboard"].map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-primary flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button className="w-full gap-2 rounded-xl h-11 text-sm font-semibold" onClick={handleClaim}>
        <Star className="size-4" />
        Claim {store.name} free
        <ArrowRight className="size-4 ml-auto" />
      </Button>
      <button
        onClick={() => setLocation("/")}
        className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors underline underline-offset-2"
      >
        Try a different page instead
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="size-6 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm">Sokoa</span>
        </div>
        <Badge variant="outline" className="text-xs bg-accent text-primary border-primary/20">
          Store preview
        </Badge>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <StoreHeader store={store} />
        </motion.div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-sm">Products extracted ({store.products.length})</h3>
          <p className="text-xs text-muted-foreground">AI-inferred from your posts</p>
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
