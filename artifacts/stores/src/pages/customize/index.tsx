import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useGetStore, useUpdateStore } from "@workspace/api-client-react";
import { getGetStoreQueryKey } from "@workspace/api-client-react";
import { DEMO_STORES } from "@/lib/mock-data";
import { SokoaLogo } from "@/components/SokoaLogo";
import {
  Palette, Type, Image, AlignLeft, Check, Loader2,
  ArrowLeft, Eye, Save, Smartphone, RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Theme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: "plus_jakarta" | "outfit" | "inter" | "poppins";
  logoUrl: string | null;
  bannerUrl: string | null;
  bannerText: string | null;
}

const FONT_OPTIONS: { value: Theme["fontFamily"]; label: string; preview: string }[] = [
  { value: "plus_jakarta", label: "Plus Jakarta Sans", preview: "The quick brown fox" },
  { value: "outfit", label: "Outfit", preview: "The quick brown fox" },
  { value: "inter", label: "Inter", preview: "The quick brown fox" },
  { value: "poppins", label: "Poppins", preview: "The quick brown fox" },
];

const FONT_CLASS: Record<Theme["fontFamily"], string> = {
  plus_jakarta: "font-sans",
  outfit: "font-display",
  inter: "font-sans",
  poppins: "font-sans",
};

const COLOR_PRESETS = [
  { primary: "#10b981", accent: "#f97316", bg: "#ffffff", label: "Sokoa Green" },
  { primary: "#6d28d9", accent: "#f59e0b", bg: "#fafafa", label: "Royal Purple" },
  { primary: "#0ea5e9", accent: "#fb923c", bg: "#f0f9ff", label: "Ocean Blue" },
  { primary: "#e11d48", accent: "#8b5cf6", bg: "#fff1f2", label: "Rose Bold" },
  { primary: "#0d9488", accent: "#fbbf24", bg: "#f0fdfa", label: "Teal Gold" },
  { primary: "#1d4ed8", accent: "#10b981", bg: "#eff6ff", label: "Classic Blue" },
];

const TABS = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "fonts", label: "Typography", icon: Type },
  { id: "branding", label: "Branding", icon: Image },
  { id: "banner", label: "Banner", icon: AlignLeft },
] as const;

type TabId = (typeof TABS)[number]["id"];

function StorePreview({ theme, storeName }: { theme: Theme; storeName: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-border shadow-lg"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Preview header */}
      <div className="px-3 py-2.5 border-b border-black/8 flex items-center justify-between"
        style={{ backgroundColor: theme.backgroundColor }}>
        <div className="flex items-center gap-2">
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt="logo" className="h-6 w-auto object-contain rounded" />
          ) : (
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {storeName[0]}
            </div>
          )}
          <span className="text-xs font-bold" style={{ fontFamily: theme.fontFamily === "outfit" ? "'Outfit'" : "'Plus Jakarta Sans'" }}>
            {storeName}
          </span>
        </div>
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ backgroundColor: theme.primaryColor + "20" }}
        >
          <span className="text-[8px]" style={{ color: theme.primaryColor }}>🛍</span>
        </div>
      </div>

      {/* Banner */}
      {theme.bannerText && (
        <div
          className="text-center text-[10px] font-semibold py-1.5 px-2"
          style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
        >
          {theme.bannerText}
        </div>
      )}

      {/* Hero area */}
      <div
        className="px-3 py-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor}18, ${theme.backgroundColor})`,
        }}
      >
        <div
          className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white text-base font-bold shadow"
          style={{ backgroundColor: theme.primaryColor }}
        >
          {storeName[0]}
        </div>
        <p className="font-bold text-xs" style={{ color: "#111" }}>{storeName}</p>
        <p className="text-[9px] mt-0.5" style={{ color: "#888" }}>★★★★★ 4.9 · 100+ orders</p>
        <button
          className="mt-2 text-[10px] font-bold px-3 py-1 rounded-full text-white shadow-sm"
          style={{ backgroundColor: theme.primaryColor }}
        >
          Shop Now →
        </button>
      </div>

      {/* Product grid preview */}
      <div className="px-3 pb-3 grid grid-cols-2 gap-2">
        {["Product A", "Product B"].map((name, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden border border-black/8">
            <div
              className="aspect-square flex items-center justify-center text-white text-[10px] font-bold"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
              }}
            >
              {name[0]}
            </div>
            <div className="p-1.5" style={{ backgroundColor: theme.backgroundColor }}>
              <p className="text-[9px] font-semibold leading-tight">{name}</p>
              <p className="text-[9px] font-bold mt-0.5" style={{ color: theme.primaryColor }}>KES 1,500</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div
        className="mx-3 mb-3 py-2 rounded-xl text-center text-[10px] font-bold text-white"
        style={{ backgroundColor: theme.primaryColor }}
      >
        Add to Cart
      </div>
    </div>
  );
}

export default function CustomizePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId?.startsWith("demo-");
  const [activeTab, setActiveTab] = useState<TabId>("colors");
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const { data: store, isLoading } = useGetStore(storeId!, {
    query: { enabled: !isDemo && !!storeId, queryKey: getGetStoreQueryKey(storeId!) },
  });

  const updateStore = useUpdateStore();

  const demoStore = isDemo
    ? storeId!.includes("tiktok")
      ? DEMO_STORES.tiktok
      : storeId!.includes("social")
      ? DEMO_STORES.social
      : DEMO_STORES.boutique
    : null;

  const initialTheme: Theme = {
    primaryColor: "#10b981",
    accentColor: "#f97316",
    backgroundColor: "#ffffff",
    fontFamily: "plus_jakarta",
    logoUrl: null,
    bannerUrl: null,
    bannerText: null,
    ...(isDemo ? demoStore?.theme : store?.theme),
  };

  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [storeName, setStoreName] = useState(isDemo ? (demoStore?.name ?? "") : (store?.name ?? ""));

  useEffect(() => {
    if (store) {
      setTheme({
        primaryColor: "#10b981",
        accentColor: "#f97316",
        backgroundColor: "#ffffff",
        fontFamily: "plus_jakarta",
        logoUrl: null,
        bannerUrl: null,
        bannerText: null,
        ...store.theme,
      });
      setStoreName(store.name);
    }
  }, [store]);

  function updateTheme(patch: Partial<Theme>) {
    setTheme((t) => ({ ...t, ...patch }));
    setHasChanges(true);
  }

  function applyPreset(preset: typeof COLOR_PRESETS[0]) {
    updateTheme({ primaryColor: preset.primary, accentColor: preset.accent, backgroundColor: preset.bg });
  }

  function resetTheme() {
    setTheme(initialTheme);
    setHasChanges(false);
  }

  async function handleSave() {
    if (isDemo) {
      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 2000);
      return;
    }

    try {
      await updateStore.mutateAsync({
        params: { storeId: storeId! },
        data: { theme },
      });
      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1 as any)} className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <SokoaLogo variant="submark" height={24} />
            <span className="font-display font-bold text-sm text-foreground">Store Customization</span>
            {hasChanges && (
              <span className="text-[10px] font-bold bg-secondary/15 text-secondary px-2 py-0.5 rounded-full">
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <button
                onClick={resetTheme}
                className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                title="Reset changes"
              >
                <RotateCcw size={16} />
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={updateStore.isPending || (!hasChanges && !isDemo)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
              }`}
            >
              {updateStore.isPending ? (
                <><Loader2 size={14} className="animate-spin" /> Saving...</>
              ) : saved ? (
                <><Check size={14} /> Saved!</>
              ) : (
                <><Save size={14} /> Save</>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: Controls */}
          <div className="space-y-5">
            {/* Store name */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => { setStoreName(e.target.value); setHasChanges(true); }}
                placeholder="Your store name"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all font-semibold"
              />
            </div>

            {/* Tab nav */}
            <div className="flex gap-1 bg-muted p-1 rounded-xl overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon size={13} />
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* COLORS TAB */}
                {activeTab === "colors" && (
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
                    {/* Presets */}
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        Color Presets
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {COLOR_PRESETS.map((preset) => {
                          const isActive =
                            preset.primary === theme.primaryColor &&
                            preset.accent === theme.accentColor;
                          return (
                            <button
                              key={preset.label}
                              onClick={() => applyPreset(preset)}
                              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                                isActive ? "border-foreground" : "border-transparent hover:border-border"
                              }`}
                            >
                              <div className="h-10 flex">
                                <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                                <div className="flex-1" style={{ backgroundColor: preset.accent }} />
                                <div className="flex-1" style={{ backgroundColor: preset.bg, border: "1px solid #e5e7eb" }} />
                              </div>
                              <div className="py-1 text-center bg-muted">
                                <p className="text-[10px] font-semibold text-foreground">{preset.label}</p>
                              </div>
                              {isActive && (
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                                  <Check size={10} className="text-white" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom colors */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Custom Colors
                      </p>
                      {[
                        { key: "primaryColor" as keyof Theme, label: "Primary Color", description: "Buttons, links, highlights" },
                        { key: "accentColor" as keyof Theme, label: "Accent Color", description: "Badges, discounts, alerts" },
                        { key: "backgroundColor" as keyof Theme, label: "Background Color", description: "Page background" },
                      ].map(({ key, label, description }) => (
                        <div key={key} className="flex items-center gap-4">
                          <div className="relative">
                            <input
                              type="color"
                              value={theme[key] as string}
                              onChange={(e) => updateTheme({ [key]: e.target.value })}
                              className="w-10 h-10 rounded-xl cursor-pointer border border-border p-0.5 bg-white"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{label}</p>
                            <p className="text-xs text-muted-foreground">{description}</p>
                          </div>
                          <code className="text-xs font-mono bg-muted px-2 py-1 rounded-lg">
                            {(theme[key] as string).toUpperCase()}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FONTS TAB */}
                {activeTab === "fonts" && (
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Font Family
                    </p>
                    <div className="space-y-2">
                      {FONT_OPTIONS.map((font) => (
                        <button
                          key={font.value}
                          onClick={() => updateTheme({ fontFamily: font.value })}
                          className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                            theme.fontFamily === font.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          <div className={`flex-1 ${FONT_CLASS[font.value]}`}>
                            <p className="font-bold text-base leading-tight">{font.label}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">{font.preview}</p>
                          </div>
                          {theme.fontFamily === font.value && (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* BRANDING TAB */}
                {activeTab === "branding" && (
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        Logo URL
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Paste a URL to your logo image. Transparent PNG or SVG recommended.
                      </p>
                      <input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={theme.logoUrl ?? ""}
                        onChange={(e) => updateTheme({ logoUrl: e.target.value || null })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      />
                      {theme.logoUrl && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl border border-border overflow-hidden bg-muted flex items-center justify-center">
                            <img
                              src={theme.logoUrl}
                              alt="Logo preview"
                              className="w-full h-full object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Logo preview</p>
                            <button
                              onClick={() => updateTheme({ logoUrl: null })}
                              className="text-xs text-destructive hover:underline mt-0.5"
                            >
                              Remove logo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border pt-5">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        Banner Image URL
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Optional hero banner for your store homepage. Recommended 1200×400px.
                      </p>
                      <input
                        type="url"
                        placeholder="https://example.com/banner.jpg"
                        value={theme.bannerUrl ?? ""}
                        onChange={(e) => updateTheme({ bannerUrl: e.target.value || null })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      />
                      {theme.bannerUrl && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                          <img
                            src={theme.bannerUrl}
                            alt="Banner preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* BANNER TAB */}
                {activeTab === "banner" && (
                  <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        Announcement Banner Text
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        A short banner shown at the top of your store. Great for promotions, shipping notices, or announcements.
                      </p>
                      <input
                        type="text"
                        placeholder="e.g. Free delivery on orders over KES 2,000"
                        value={theme.bannerText ?? ""}
                        onChange={(e) => updateTheme({ bannerText: e.target.value || null })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground text-right mt-1">
                        {(theme.bannerText?.length ?? 0)}/100
                      </p>
                    </div>

                    {/* Suggested banners */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Suggestions</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Free delivery on orders over KES 2,000",
                          "🔥 Sale — Up to 40% off",
                          "New arrivals every week",
                          "Order now, delivered tomorrow",
                          "Secure M-Pesa payments",
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => updateTheme({ bannerText: suggestion })}
                            className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium text-left"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    {theme.bannerText && (
                      <div
                        className="py-2 px-4 rounded-xl text-center text-sm font-semibold text-white"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        {theme.bannerText}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Live preview */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={12} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Mobile view</span>
            </div>
            <StorePreview theme={theme} storeName={storeName} />
            <p className="text-[10px] text-muted-foreground text-center">
              This is an approximate preview. The actual store may vary slightly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
