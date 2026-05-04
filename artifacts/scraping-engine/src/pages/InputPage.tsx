import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Sparkles, Store, Users, Zap } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { detectInput, getPlatformHint } from "@/lib/detection";
import { saveInput } from "@/lib/cache";
import type { Platform } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EXAMPLES = [
  { label: "Facebook", value: "https://www.facebook.com/amaniboutique.ke", platform: "facebook" as Platform },
  { label: "Instagram", value: "https://www.instagram.com/zuriafashion", platform: "instagram" as Platform },
  { label: "TikTok", value: "@kenyafashionhub", platform: "tiktok" as Platform },
];

const TRUST_STATS = [
  { icon: Store, value: "2,400+", label: "stores created" },
  { icon: Zap, value: "47 sec", label: "avg setup time" },
  { icon: Users, value: "18 countries", label: "across Africa" },
];

const PLATFORM_COLORS: Record<Platform, string> = {
  facebook: "text-blue-600",
  instagram: "text-pink-500",
  tiktok: "text-foreground",
  manual: "text-muted-foreground",
};

const PLATFORM_BG: Record<Platform, string> = {
  facebook: "bg-blue-50 border-blue-200",
  instagram: "bg-pink-50 border-pink-200",
  tiktok: "bg-zinc-50 border-zinc-200",
  manual: "bg-muted border-border",
};

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  facebook: <Facebook className="size-4" />,
  instagram: <Instagram className="size-4" />,
  tiktok: <SiTiktok className="size-4" />,
  manual: <Store className="size-4" />,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  facebook: "Facebook Page",
  instagram: "Instagram Profile",
  tiktok: "TikTok Account",
  manual: "Business Name",
};

const PLACEHOLDERS: Record<Platform | "default", string> = {
  default: "Paste your Facebook, Instagram or TikTok link…",
  facebook: "e.g. facebook.com/myboutique or paste the full URL",
  instagram: "e.g. instagram.com/mybrand or paste the full URL",
  tiktok: "e.g. @mystore or tiktok.com/@mystore",
  manual: "e.g. Amani Boutique — we'll set it up step by step",
};

export default function InputPage() {
  const [, setLocation] = useLocation();
  const [value, setValue] = useState("");
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setDetectedPlatform(getPlatformHint(v));
  };

  const handleSubmit = (inputValue?: string) => {
    const raw = (inputValue ?? value).trim();
    if (!raw) return;
    const detected = detectInput(raw);
    saveInput(detected);
    setLoading(true);
    setTimeout(() => setLocation("/processing"), 300);
  };

  const handleExample = (example: typeof EXAMPLES[0]) => {
    setValue(example.value);
    setDetectedPlatform(example.platform);
    setTimeout(() => handleSubmit(example.value), 50);
  };

  const handleManual = () => {
    const raw = value.trim() || "My Store";
    const detected = detectInput(raw);
    saveInput(detected);
    setLocation("/manual");
  };

  const placeholder = detectedPlatform ? PLACEHOLDERS[detectedPlatform] : PLACEHOLDERS.default;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-base">Sokoa</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 text-xs font-medium border-primary/30 text-primary bg-accent">
              Store creation engine
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight mb-3">
              Turn your social presence<br />
              <span className="text-primary">into a real store</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto">
              Paste your Facebook, Instagram, or TikTok link. We'll build your store in under a minute.
            </p>
          </div>

          <div className="mb-4">
            <div
              className={`relative flex items-center rounded-2xl border-2 bg-card transition-all duration-200 overflow-hidden ${
                detectedPlatform
                  ? `${PLATFORM_BG[detectedPlatform]} shadow-md`
                  : "border-border focus-within:border-primary/60 focus-within:shadow-md"
              }`}
            >
              <div className="pl-4 pr-2 flex-shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={detectedPlatform ?? "default"}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${detectedPlatform ? PLATFORM_COLORS[detectedPlatform] : "text-muted-foreground"}`}
                  >
                    {detectedPlatform ? PLATFORM_ICONS[detectedPlatform] : <Store className="size-4" />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={placeholder}
                className="flex-1 py-4 pr-2 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground/60"
              />
              <div className="pr-3">
                <Button
                  size="sm"
                  onClick={() => handleSubmit()}
                  disabled={!value.trim() || loading}
                  className="rounded-xl gap-1.5 h-9"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    >
                      <Sparkles className="size-4" />
                    </motion.div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Build store</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {detectedPlatform && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className={`text-xs mt-2 px-1 font-medium ${PLATFORM_COLORS[detectedPlatform]}`}>
                    {PLATFORM_ICONS[detectedPlatform]}
                    <span className="ml-1.5">{PLATFORM_LABELS[detectedPlatform]} detected</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <p className="text-xs text-muted-foreground text-center mb-3">Try an example</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.platform}
                  onClick={() => handleExample(ex)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all hover:shadow-sm ${PLATFORM_BG[ex.platform]} ${PLATFORM_COLORS[ex.platform]}`}
                >
                  {PLATFORM_ICONS[ex.platform]}
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleManual}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Enter my store details manually instead
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 w-full max-w-sm"
        >
          <div className="grid grid-cols-3 gap-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="size-8 mx-auto mb-1.5 rounded-lg bg-accent flex items-center justify-center">
                  <stat.icon className="size-4 text-primary" />
                </div>
                <p className="text-sm font-bold font-display">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
