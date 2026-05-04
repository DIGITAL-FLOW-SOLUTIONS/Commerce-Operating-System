import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Sparkles, XCircle } from "lucide-react";
import { loadInput, saveStore } from "@/lib/cache";
import { buildProcessingSteps, runExtraction } from "@/lib/extractor";
import type { ProcessingStep } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877f2",
  instagram: "#e1306c",
  tiktok: "#000000",
  manual: "hsl(var(--primary))",
};

function StepRow({ step, index }: { step: ProcessingStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="flex items-start gap-3 py-2.5"
    >
      <div className="mt-0.5 flex-shrink-0">
        <AnimatePresence mode="wait">
          {step.status === "done" && (
            <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <CheckCircle2 className="size-5 text-primary" />
            </motion.div>
          )}
          {step.status === "running" && (
            <motion.div key="running" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Loader2 className="size-5 text-primary animate-spin" />
            </motion.div>
          )}
          {step.status === "error" && (
            <motion.div key="error" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <XCircle className="size-5 text-destructive" />
            </motion.div>
          )}
          {step.status === "pending" && (
            <motion.div key="pending" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Circle className="size-5 text-muted-foreground/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug transition-colors ${
            step.status === "done"
              ? "text-foreground"
              : step.status === "running"
              ? "text-foreground"
              : "text-muted-foreground/60"
          }`}
        >
          {step.label}
        </p>
        {step.sublabel && (
          <p
            className={`text-xs mt-0.5 transition-colors ${
              step.status === "pending" ? "text-muted-foreground/40" : "text-muted-foreground"
            }`}
          >
            {step.sublabel}
          </p>
        )}
      </div>
      {step.status === "done" && (
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-primary font-medium"
        >
          Done
        </motion.span>
      )}
    </motion.div>
  );
}

export default function ProcessingPage() {
  const [, setLocation] = useLocation();
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  const [storeName, setStoreName] = useState("your store");
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const input = loadInput();
    if (!input) {
      setLocation("/");
      return;
    }

    const initialSteps = buildProcessingSteps(input.platform);
    setSteps(initialSteps);

    const updateStep = (stepId: string, status: "running" | "done") => {
      setSteps((prev) => {
        const next = prev.map((s) => (s.id === stepId ? { ...s, status } : s));
        const doneCount = next.filter((s) => s.status === "done").length;
        setProgress(Math.round((doneCount / next.length) * 100));
        return next;
      });
    };

    runExtraction(input, updateStep)
      .then((store) => {
        setStoreName(store.name);
        saveStore(store);
        setTimeout(() => setLocation("/preview"), 600);
      })
      .catch(() => {
        setFailed(true);
      });
  }, [setLocation]);

  const input = loadInput();
  const platformColor = input ? PLATFORM_COLORS[input.platform] : "hsl(var(--primary))";

  const funMessages = [
    "Reading your posts…",
    "Spotting products in captions…",
    "Matching prices to the market…",
    "Laying out your storefront…",
    "Almost done!",
  ];
  const doneCount = steps.filter((s) => s.status === "done").length;
  const currentMessage = funMessages[Math.min(doneCount, funMessages.length - 1)];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            className="size-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${platformColor}18` }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Sparkles className="size-7" style={{ color: platformColor }} />
          </motion.div>
          <h2 className="font-display font-bold text-xl mb-1">
            Building <span style={{ color: platformColor }}>{storeName}</span>
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm text-muted-foreground"
            >
              {currentMessage}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative mb-2">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: platformColor }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <p className="text-right text-xs text-muted-foreground mt-1">{progress}%</p>
        </div>

        <div className="bg-card border border-border rounded-2xl px-4 py-2 mb-6 divide-y divide-border">
          {steps.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} />
          ))}
        </div>

        {failed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Couldn't extract the page automatically.</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => setLocation("/")}>Try again</Button>
              <Button size="sm" onClick={() => setLocation("/manual")}>Enter manually</Button>
            </div>
          </motion.div>
        )}

        {!failed && (
          <p className="text-center text-xs text-muted-foreground">
            This usually takes 30–60 seconds.{" "}
            <button
              onClick={() => setLocation("/")}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
}
