import { useState, useMemo } from "react";
import {
  LayoutGrid,
  ShoppingBag,
  Package,
  Eye,
  ArrowUpRight,
  Sparkles,
  Flame,
  BadgeCheck,
  Search,
  X,
  Star,
  Zap,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type StoreKind = "tiktok" | "boutique" | "preorder";
type ThemeStyle = "Dark" | "Light" | "Vibrant" | "Warm" | "Minimal";
type FilterId = "all" | StoreKind;

interface Template {
  id: string;
  name: string;
  kind: StoreKind;
  theme: ThemeStyle;
  imageUrl: string;
  description: string;
  features: string[];
  badge?: "popular" | "new" | "pro";
  gradient: string; // fallback gradient class
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;

const TEMPLATES: Template[] = [
  // TikTok Live
  {
    id: "t1",
    name: "Live Commerce Pro",
    kind: "tiktok",
    theme: "Dark",
    imageUrl: `${BASE}templates/tiktok-live.png`,
    description: "A high-energy dark storefront built to convert viewers during live sessions. Bold product cards, countdown timers, and an instant M-PESA checkout.",
    features: ["Countdown timer", "Pinned product spotlight", "Order feed", "Live badge"],
    badge: "popular",
    gradient: "from-rose-900 via-pink-900 to-violet-900",
  },
  {
    id: "t2",
    name: "Flash Drop",
    kind: "tiktok",
    theme: "Vibrant",
    imageUrl: `${BASE}templates/tiktok-live.png`,
    description: "Neon-accented layout made for limited drops and hype launches. Creates urgency with stock counters and animated call-to-action buttons.",
    features: ["Stock counter", "Animated CTA", "Hype banner", "Share link"],
    badge: "new",
    gradient: "from-fuchsia-700 via-purple-800 to-indigo-900",
  },
  {
    id: "t3",
    name: "Stream & Sell",
    kind: "tiktok",
    theme: "Minimal",
    imageUrl: `${BASE}templates/tiktok-live.png`,
    description: "Clean and distraction-free. Let your products do the talking with a minimal live storefront that loads fast on any connection.",
    features: ["Speed-optimised", "Clean grid", "One-tap buy", "Session replay"],
    gradient: "from-slate-700 via-slate-800 to-slate-900",
  },

  // Boutique
  {
    id: "t4",
    name: "Elegant Boutique",
    kind: "boutique",
    theme: "Light",
    imageUrl: `${BASE}templates/boutique.png`,
    description: "Sophisticated and timeless. The go-to for fashion, beauty, and lifestyle brands that want a premium storefront with editorial-style product displays.",
    features: ["Editorial grid", "Brand lookbook", "Size guide", "Wishlist"],
    badge: "popular",
    gradient: "from-stone-200 via-rose-100 to-pink-100",
  },
  {
    id: "t5",
    name: "Tech Hub",
    kind: "boutique",
    theme: "Dark",
    imageUrl: `${BASE}templates/electronics.png`,
    description: "Built for electronics, gadgets, and tech accessories. Features spec comparison tables, product variants, and a trust badge section.",
    features: ["Spec table", "Variant picker", "Trust badges", "Tech reviews"],
    gradient: "from-slate-800 via-blue-900 to-indigo-950",
  },
  {
    id: "t6",
    name: "Streetwear Drop",
    kind: "boutique",
    theme: "Vibrant",
    imageUrl: `${BASE}templates/fashion.png`,
    description: "Bold, loud, and unapologetically street. Designed for fashion drops, limited editions, and brand collabs.",
    features: ["Drop timer", "Look-of-the-day", "UGC gallery", "Collab badge"],
    badge: "new",
    gradient: "from-orange-600 via-red-700 to-rose-900",
  },
  {
    id: "t7",
    name: "African Heritage",
    kind: "boutique",
    theme: "Warm",
    imageUrl: `${BASE}templates/fashion.png`,
    description: "Warm earth tones and rich textures inspired by African artisanship. Perfect for handmade goods, beadwork, fabrics, and cultural products.",
    features: ["Artisan story", "Handmade badge", "Category showcase", "Story mode"],
    gradient: "from-amber-700 via-orange-800 to-stone-900",
  },
  {
    id: "t8",
    name: "Nairobi Market",
    kind: "boutique",
    theme: "Light",
    imageUrl: `${BASE}templates/boutique.png`,
    description: "A vibrant marketplace feel inspired by Nairobi's street markets. Multi-category display with a bargain-section and featured deals.",
    features: ["Multi-category", "Deal section", "Bargain corner", "Daily picks"],
    gradient: "from-green-100 via-emerald-100 to-teal-100",
  },

  // Pre-order
  {
    id: "t9",
    name: "Launch Ready",
    kind: "preorder",
    theme: "Light",
    imageUrl: `${BASE}templates/boutique.png`,
    description: "A clean, conversion-focused pre-order page. Collect deposits, build a waitlist, and generate hype before your products arrive.",
    features: ["Deposit collection", "Waitlist form", "Launch countdown", "Social share"],
    badge: "popular",
    gradient: "from-violet-100 via-purple-100 to-indigo-100",
  },
  {
    id: "t10",
    name: "Countdown Drop",
    kind: "preorder",
    theme: "Dark",
    imageUrl: `${BASE}templates/tiktok-live.png`,
    description: "High-drama dark pre-order page with a live countdown clock. Creates maximum anticipation for your next big product launch.",
    features: ["Live countdown", "Email capture", "Teaser reveal", "Early-bird pricing"],
    gradient: "from-zinc-900 via-neutral-900 to-black",
  },
  {
    id: "t11",
    name: "Early Access",
    kind: "preorder",
    theme: "Vibrant",
    imageUrl: `${BASE}templates/electronics.png`,
    description: "Invite-only pre-order storefront with exclusive early-access branding. Ideal for product launches you want to feel scarce and premium.",
    features: ["Access code gate", "Scarcity counter", "VIP badge", "Referral unlock"],
    badge: "pro",
    gradient: "from-cyan-600 via-teal-700 to-emerald-900",
  },
];

// ─── Filter config ────────────────────────────────────────────────────────────

const FILTERS: { id: FilterId; label: string; icon: React.ReactNode }[] = [
  { id: "all",      label: "All templates", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: "tiktok",   label: "TikTok Live",   icon: <SiTiktok className="h-3.5 w-3.5" /> },
  { id: "boutique", label: "Boutique",       icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  { id: "preorder", label: "Pre-order",      icon: <Package className="h-3.5 w-3.5" /> },
];

const KIND_LABEL: Record<StoreKind, string> = {
  tiktok:   "TikTok Live",
  boutique: "Boutique",
  preorder: "Pre-order",
};

const KIND_COLOR: Record<StoreKind, string> = {
  tiktok:   "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  boutique: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  preorder: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const KIND_ICON: Record<StoreKind, React.ReactNode> = {
  tiktok:   <SiTiktok className="h-3 w-3" />,
  boutique: <ShoppingBag className="h-3 w-3" />,
  preorder: <Package className="h-3 w-3" />,
};

const BADGE_META = {
  popular: { label: "Popular", icon: <Flame className="h-3 w-3" />, cls: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  new:     { label: "New",     icon: <Sparkles className="h-3 w-3" />, cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  pro:     { label: "Pro",     icon: <Zap className="h-3 w-3" />, cls: "bg-primary/10 text-primary border-primary/20" },
};

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  onPreview,
}: {
  template: Template;
  onPreview: (t: Template) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-md hover:border-border/70 transition-all duration-200"
    >
      {/* Preview image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Gradient fallback behind image */}
        <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br", template.gradient)} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 dark:bg-black/80 text-foreground gap-1.5 text-xs shadow"
            onClick={() => onPreview(template)}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>
          <Button size="sm" className="gap-1.5 text-xs shadow">
            <ArrowUpRight className="h-3.5 w-3.5" /> Use this
          </Button>
        </div>

        {/* Badge */}
        {template.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm", BADGE_META[template.badge].cls)}>
              {BADGE_META[template.badge].icon}
              {BADGE_META[template.badge].label}
            </span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-3.5 flex items-start justify-between gap-2 flex-1">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-card-foreground truncate">{template.name}</h3>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className={cn("inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium", KIND_COLOR[template.kind])}>
              {KIND_ICON[template.kind]} {KIND_LABEL[template.kind]}
            </span>
            <span className="text-[10px] text-muted-foreground">{template.theme}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onPreview(template)}
          title="Preview"
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Preview Modal ────────────────────────────────────────────────────────────

function PreviewModal({
  template,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  if (!template) return null;
  return (
    <Dialog open={!!template} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
        {/* Image */}
        <div className={cn("relative aspect-video w-full overflow-hidden bg-gradient-to-br", template.gradient)}>
          <img
            src={template.imageUrl}
            alt={template.name}
            className="h-full w-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Info */}
        <div className="p-5 space-y-4">
          <DialogHeader className="space-y-1 text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <DialogTitle className="text-lg font-bold leading-tight">{template.name}</DialogTitle>
                  {template.badge && (
                    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", BADGE_META[template.badge].cls)}>
                      {BADGE_META[template.badge].icon}
                      {BADGE_META[template.badge].label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium", KIND_COLOR[template.kind])}>
                    {KIND_ICON[template.kind]} {KIND_LABEL[template.kind]}
                  </span>
                  <span className="text-xs text-muted-foreground">{template.theme} theme</span>
                </div>
              </div>
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
              {template.description}
            </DialogDescription>
          </DialogHeader>

          {/* Features */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Included features</p>
            <div className="grid grid-cols-2 gap-1.5">
              {template.features.map(f => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-2 pt-1">
            <Button className="flex-1 gap-1.5">
              <ArrowUpRight className="h-4 w-4" />
              Use this template
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={onClose}>
              <X className="h-4 w-4" /> Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return TEMPLATES.filter(t => {
      const matchKind = filter === "all" || t.kind === filter;
      const matchSearch = !q || t.name.toLowerCase().includes(q) || KIND_LABEL[t.kind].toLowerCase().includes(q) || t.theme.toLowerCase().includes(q);
      return matchKind && matchSearch;
    });
  }, [filter, search]);

  const counts: Record<FilterId, number> = {
    all:      TEMPLATES.length,
    tiktok:   TEMPLATES.filter(t => t.kind === "tiktok").length,
    boutique: TEMPLATES.filter(t => t.kind === "boutique").length,
    preorder: TEMPLATES.filter(t => t.kind === "preorder").length,
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
              <Star className="h-6 w-6 text-muted-foreground" />
              Templates
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Choose a template and launch your store in minutes.</p>
          </div>
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search templates…"
              className="flex h-9 w-full rounded-xl border border-input bg-card px-3 py-1 pl-9 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-shadow"
            />
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                  filter === f.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20"
                )}
              >
                {f.icon}
                {f.label}
                <span className={cn(
                  "ml-0.5 rounded-full px-1 py-px text-[10px] font-semibold",
                  filter === f.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {counts[f.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center space-y-3"
            >
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <div>
                <p className="font-semibold">No templates found</p>
                <p className="text-sm text-muted-foreground mt-1">Try a different keyword or filter.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setSearch(""); setFilter("all"); }}>
                Show all templates
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(t => (
                  <TemplateCard key={t.id} template={t} onPreview={setPreview} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Can't find what you're looking for?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Enterprise merchants can request custom template designs from our team.</p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
            <ArrowUpRight className="h-3.5 w-3.5" /> Request custom
          </Button>
        </div>

      </div>

      <PreviewModal template={preview} onClose={() => setPreview(null)} />
    </>
  );
}
