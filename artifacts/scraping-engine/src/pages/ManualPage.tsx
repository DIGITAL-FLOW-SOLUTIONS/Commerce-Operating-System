import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { detectInput } from "@/lib/detection";
import { saveInput, saveStore } from "@/lib/cache";
import { runExtraction } from "@/lib/extractor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { id: "fashion", label: "Fashion & Clothing", emoji: "👗" },
  { id: "beauty", label: "Beauty & Skincare", emoji: "✨" },
  { id: "food", label: "Food & Snacks", emoji: "🍽️" },
  { id: "accessories", label: "Accessories & Jewellery", emoji: "💍" },
  { id: "home", label: "Home & Living", emoji: "🏠" },
  { id: "other", label: "Other / Mixed", emoji: "📦" },
];

const AFRICAN_COUNTRIES = [
  "Kenya", "Nigeria", "Ghana", "Uganda", "Tanzania", "Rwanda",
  "Ethiopia", "South Africa", "Senegal", "Ivory Coast",
];

type Step = "name" | "category" | "location" | "done";

export default function ManualPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("name");
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    if (step === "category") setStep("name");
    else if (step === "location") setStep("category");
    else setLocation("/");
  };

  const handleNameSubmit = () => {
    if (!storeName.trim()) return;
    setStep("category");
  };

  const handleCategorySubmit = (cat: string) => {
    setCategory(cat);
    setStep("location");
  };

  const handleLocationSubmit = async () => {
    if (!country) return;
    setLoading(true);

    const handle = storeName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const input = detectInput(storeName);
    const enriched = { ...input, handle, displayName: storeName };
    saveInput(enriched);

    try {
      const store = await runExtraction(enriched, () => {});
      const overridden = { ...store, name: storeName, country, category: CATEGORIES.find(c => c.id === category)?.label ?? store.category };
      saveStore(overridden);
      setStep("done");
      setTimeout(() => setLocation("/preview"), 1200);
    } catch {
      setLoading(false);
    }
  };

  const STEP_LABELS: Record<Step, string> = {
    name: "Step 1 of 3",
    category: "Step 2 of 3",
    location: "Step 3 of 3",
    done: "Done!",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-4 flex items-center gap-3">
        <button
          onClick={goBack}
          className="size-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="size-6 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-sm">Sokoa</span>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">{STEP_LABELS[step]}</Badge>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="mb-2">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{
                  width: step === "name" ? "33%" : step === "category" ? "66%" : "100%",
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "name" && (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <h2 className="font-display font-bold text-2xl mb-2">What's your store called?</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Enter the name of your business or brand.
                </p>
                <input
                  autoFocus
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                  placeholder="e.g. Amani Boutique"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-card text-sm font-medium outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground/60"
                />
                <Button
                  className="w-full mt-4 gap-2 rounded-xl h-11"
                  onClick={handleNameSubmit}
                  disabled={!storeName.trim()}
                >
                  Continue <ArrowRight className="size-4" />
                </Button>
              </motion.div>
            )}

            {step === "category" && (
              <motion.div
                key="category"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <h2 className="font-display font-bold text-2xl mb-2">What do you sell?</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Choose the category that best fits <span className="font-semibold text-foreground">{storeName}</span>.
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySubmit(cat.id)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-border bg-card text-left hover:border-primary/50 hover:bg-accent transition-all"
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-xs font-medium leading-snug">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <h2 className="font-display font-bold text-2xl mb-2">Where are you based?</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We'll set up local payment methods and delivery options for you.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {AFRICAN_COUNTRIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCountry(c)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        country === c
                          ? "border-primary bg-accent text-primary"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      {country === c && <CheckCircle2 className="size-3.5 flex-shrink-0" />}
                      {c}
                    </button>
                  ))}
                </div>
                <Button
                  className="w-full gap-2 rounded-xl h-11"
                  onClick={handleLocationSubmit}
                  disabled={!country || loading}
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}>
                      <Sparkles className="size-4" />
                    </motion.div>
                  ) : (
                    <>Build my store <ArrowRight className="size-4" /></>
                  )}
                </Button>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                  className="size-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="size-8 text-primary" />
                </motion.div>
                <h2 className="font-display font-bold text-xl mb-1">Store created!</h2>
                <p className="text-sm text-muted-foreground">Taking you to your preview…</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
