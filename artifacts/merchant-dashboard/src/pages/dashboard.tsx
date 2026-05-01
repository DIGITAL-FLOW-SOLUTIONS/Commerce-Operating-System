import React, { useState } from "react";
import { useData, Store, StoreType, AppState, Template } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Send,
  ShoppingBag,
  Video,
  Package,
} from "lucide-react";
import { SiTiktok, SiInstagram, SiFacebook } from "react-icons/si";
import { cn } from "@/lib/utils";
import { SokoaLogo } from "@/components/SokoaLogo";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

type InputMode = "business" | "tiktok" | "socials";
type SocialPlatform = "instagram" | "facebook";

const STORE_TYPES = [
  { id: "boutique", label: "Boutique", icon: ShoppingBag, color: "#8B5CF6" },
  { id: "tiktok", label: "TikTok Live", icon: SiTiktok, color: "#010101" },
  { id: "preorder", label: "Pre-order", icon: Package, color: "#F97316" },
  { id: "fb", label: "FB Store", icon: SiFacebook, color: "#1877F2" },
  { id: "ig", label: "IG Store", icon: SiInstagram, color: "#E4405F" },
];

const BUSINESS_SUGGESTIONS = [
  "Aisha's Boutique",
  "Nairobi Beads",
  "Kenyanz Clothing",
  "Mama's Kitchen",
  "Safari Crafts",
  "Urban Threads",
];

function StoreTypeIcon({
  label,
  icon: Icon,
  color,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 group focus:outline-none"
    >
      <div
        className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-md"
        style={color ? { borderColor: `${color}33` } : undefined}
      >
        <Icon
          className="w-6 h-6"
          style={{ color: color ?? undefined }}
        />
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium text-center leading-tight transition-colors">
        {label}
      </span>
    </button>
  );
}

function HeroCreateSection() {
  const { user, appState, setAppState } = useData();
  const [mode, setMode] = useState<InputMode>("business");
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("instagram");
  const [inputValue, setInputValue] = useState("");
  const [suggestionSeed, setSuggestionSeed] = useState(0);

  const shownSuggestions = BUSINESS_SUGGESTIONS.slice(
    suggestionSeed % BUSINESS_SUGGESTIONS.length,
    (suggestionSeed % BUSINESS_SUGGESTIONS.length) + 3
  ).concat(
    BUSINESS_SUGGESTIONS.slice(
      0,
      Math.max(0, 3 - (BUSINESS_SUGGESTIONS.length - (suggestionSeed % BUSINESS_SUGGESTIONS.length)))
    )
  ).slice(0, 3);

  const placeholder =
    mode === "business"
      ? "Enter your business name or describe what you sell..."
      : mode === "tiktok"
      ? "@your_tiktok_handle"
      : socialPlatform === "instagram"
      ? "@your_instagram_handle"
      : "facebook.com/your-page";

  const handleStoreType = (id: string) => {
    if (id === "tiktok") setMode("tiktok");
    else if (id === "fb" || id === "ig") {
      setMode("socials");
      setSocialPlatform(id === "fb" ? "facebook" : "instagram");
    } else setMode("business");
    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 md:py-12">
      {/* Workspace selector pill */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-colors focus:outline-none group">
            <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {user.name}&apos;s StoreSpace
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-52">
          <DropdownMenuItem className="text-xs text-muted-foreground cursor-default" disabled>
            Demo State
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {(["both", "tiktok_only", "boutique_only", "none"] as AppState[]).map((state) => (
            <DropdownMenuItem
              key={state}
              onClick={() => setAppState(state)}
              className={cn(
                "text-sm cursor-pointer",
                appState === state && "font-semibold text-primary"
              )}
            >
              {state === "both"
                ? "Both Stores"
                : state === "tiktok_only"
                ? "TikTok Only"
                : state === "boutique_only"
                ? "Boutique Only"
                : "No Stores"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground text-center"
      >
        Hi {user.name}, what do you want to make?
      </motion.h1>

      {/* Input box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-2xl border-2 border-border bg-background shadow-sm focus-within:border-primary/60 focus-within:shadow-md transition-all overflow-hidden">
          {/* Text area */}
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full resize-none px-5 pt-5 pb-2 text-base text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
              }
            }}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-3">
            {/* Mode toggles */}
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              {(
                [
                  { id: "business", label: "Business Name" },
                  { id: "tiktok", label: "TikTok Live" },
                  { id: "socials", label: "Socials" },
                ] as { id: InputMode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    setInputValue("");
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
                    mode === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Submit */}
            <Button
              size="sm"
              className="rounded-full h-8 w-8 p-0 shrink-0 bg-primary hover:bg-primary/90 shadow-sm"
              disabled={!inputValue.trim()}
            >
              <Send className="w-3.5 h-3.5" />
              <span className="sr-only">Create</span>
            </Button>
          </div>

          {/* Socials sub-tabs (shown when mode === 'socials') */}
          <AnimatePresence>
            {mode === "socials" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-border"
              >
                <div className="flex items-center gap-1 px-3 py-2 bg-muted/40">
                  {(
                    [
                      { id: "instagram", label: "Instagram", Icon: SiInstagram, color: "#E4405F" },
                      { id: "facebook", label: "Facebook", Icon: SiFacebook, color: "#1877F2" },
                    ] as { id: SocialPlatform; label: string; Icon: React.ElementType; color: string }[]
                  ).map(({ id, label, Icon, color }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSocialPlatform(id)}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                        socialPlatform === id
                          ? "bg-background shadow-sm border border-border"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                      <span style={socialPlatform === id ? { color } : undefined}>{label}</span>
                    </button>
                  ))}
                  <p className="ml-auto text-[10px] text-muted-foreground">
                    Free to set up. We never post on your behalf.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Store type icon tiles */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-4 md:gap-6"
      >
        {STORE_TYPES.map((st) => (
          <StoreTypeIcon
            key={st.id}
            label={st.label}
            icon={st.icon}
            color={st.color}
            onClick={() => handleStoreType(st.id)}
          />
        ))}
      </motion.div>

      {/* Business name suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-center gap-3"
      >
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setSuggestionSeed((s) => s + 3)}
        >
          Try from a Business name
          <RefreshCw className="w-3 h-3" />
        </button>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {shownSuggestions.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setMode("business");
                setInputValue(name);
              }}
              className="px-4 py-1.5 rounded-full bg-muted border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              {name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SmallStoreCard({ store }: { store: Store }) {
  const isTiktok = store.type === "tiktok";
  const Icon = isTiktok ? Video : ShoppingBag;

  return (
    <Card className="flex flex-col min-w-[280px] w-full md:w-auto overflow-hidden hover:border-primary/50 transition-colors">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold truncate">{store.name}</h4>
            <Badge
              variant="secondary"
              className="text-[10px] uppercase font-bold py-0 h-5"
            >
              {store.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {isTiktok ? "TikTok Live" : "Boutique"}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              {formatCurrency(store.revenueToday || 0)}{" "}
              <span className="text-muted-foreground font-normal text-xs ml-1">today</span>
            </span>
            <Button size="sm" variant="link" className="h-auto p-0 text-primary">
              Open
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-all hover:shadow-md h-full flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <Button variant="default" className="w-full shadow-lg" size="sm">
            Use Template
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold truncate">{template.name}</h3>
          <Badge variant="outline" className="text-[10px] bg-background">
            {template.theme}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {template.type === "tiktok"
            ? "Optimized for Live Commerce"
            : "Full Catalog Boutique"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { stores, templates } = useData();

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      {/* Hero Create Section */}
      <HeroCreateSection />

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* My Stores Section */}
      <AnimatePresence>
        {stores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold tracking-tight">
                Active Stores
              </h2>
              <Button variant="link" className="text-primary pr-0" asChild>
                <Link href="/stores">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:px-0 md:mx-0 snap-x">
              {stores.map((store) => (
                <div key={store.id} className="snap-start shrink-0">
                  <SmallStoreCard store={store} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Templates */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-display font-semibold tracking-tight">
              Store Templates
            </h2>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Start selling faster with premium themes.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates">View Gallery</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="h-full"
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
