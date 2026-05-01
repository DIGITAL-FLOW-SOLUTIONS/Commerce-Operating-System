import { useState } from "react";
import {
  Sparkles,
  Check,
  X,
  Zap,
  Crown,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useUpgradeModal } from "@/contexts/upgrade-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: "starter" | "pro" | "enterprise";
  name: string;
  monthlyPrice: number;
  currency: string;
  tagline: string;
  icon: React.ReactNode;
  accent: string;
  features: PlanFeature[];
}

type Billing = "monthly" | "annual";

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENT_PLAN_ID: Plan["id"] = "pro";
const ANNUAL_DISCOUNT = 0.17;

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    currency: "KES",
    tagline: "Everything you need to start selling online.",
    icon: <Zap className="h-5 w-5" />,
    accent: "from-slate-400 to-slate-500",
    features: [
      { text: "1 TikTok Live store", included: true },
      { text: "1 Boutique storefront", included: true },
      { text: "1 Pre-order store", included: true },
      { text: "Up to 10 products per store", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Sokoa badge on your store", included: true },
      { text: "Custom domain", included: false },
      { text: "Priority support", included: false },
      { text: "Remove Sokoa badge", included: false },
      { text: "Create & sell stores", included: false },
    ],
  },
  {
    id: "pro",
    name: "Sokoa Pro",
    monthlyPrice: 2499,
    currency: "KES",
    tagline: "For serious sellers ready to scale.",
    icon: <Sparkles className="h-5 w-5" />,
    accent: "from-violet-500 to-indigo-600",
    features: [
      { text: "10 TikTok Live stores", included: true },
      { text: "10 Boutique storefronts", included: true },
      { text: "10 Pre-order stores", included: true },
      { text: "Up to 100 products per store", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority 24/7 support", included: true },
      { text: "No Sokoa badge", included: true },
      { text: "Custom domain", included: true },
      { text: "3 team members", included: true },
      { text: "Create & sell stores", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 8499,
    currency: "KES",
    tagline: "Unlimited power. Build a commerce empire.",
    icon: <Crown className="h-5 w-5" />,
    accent: "from-amber-400 to-orange-500",
    features: [
      { text: "Unlimited stores (all types)", included: true },
      { text: "Unlimited products per store", included: true },
      { text: "Advanced analytics + custom reports", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "No Sokoa badge", included: true },
      { text: "Custom domain", included: true },
      { text: "20 team members", included: true },
      { text: "White-label branding", included: true },
      { text: "API access", included: true },
      { text: "Create & sell stores as a business", included: true },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function effectiveMonthlyPrice(plan: Plan, billing: Billing): number {
  if (plan.monthlyPrice === 0) return 0;
  if (billing === "annual") return Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT));
  return plan.monthlyPrice;
}

// ─── Billing Toggle ───────────────────────────────────────────────────────────

function BillingToggle({ value, onChange }: { value: Billing; onChange: (v: Billing) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted p-1 gap-1">
      <button
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          value === "monthly"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("annual")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all flex items-center gap-1.5",
          value === "annual"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors",
          value === "annual"
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            : "bg-muted-foreground/10 text-muted-foreground"
        )}>
          Save 17%
        </span>
      </button>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, isCurrent, billing }: { plan: Plan; isCurrent: boolean; billing: Billing }) {
  const isEnterprise = plan.id === "enterprise";
  const isFree = plan.monthlyPrice === 0;
  const displayPrice = effectiveMonthlyPrice(plan, billing);

  return (
    <div className={cn(
      "relative flex flex-col rounded-2xl border p-5 transition-all",
      isCurrent
        ? "border-primary/60 bg-primary/5 ring-1 ring-primary/20"
        : "border-border bg-card hover:border-border/60 hover:shadow-sm"
    )}>
      {isCurrent && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-primary-foreground shadow whitespace-nowrap">
          <Check className="h-3 w-3" /> Current plan
        </span>
      )}

      <div className="flex items-start gap-3 mb-4">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", plan.accent)}>
          {plan.icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-base leading-tight">{plan.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{plan.tagline}</p>
        </div>
      </div>

      <div className="mb-5 min-h-[3rem]">
        {isFree ? (
          <span className="text-2xl font-extrabold tracking-tight">Free</span>
        ) : (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight">
                {plan.currency} {displayPrice.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">/mo</span>
            </div>
            {billing === "annual" && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Billed {plan.currency} {(displayPrice * 12).toLocaleString()}/yr · Save 17%
              </p>
            )}
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-2 mb-6">
        {plan.features.map(f => (
          <li key={f.text} className="flex items-start gap-2">
            {f.included
              ? <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
              : <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 mt-0.5" />
            }
            <span className={cn(
              "text-xs leading-snug",
              f.included ? "text-foreground" : "text-muted-foreground/40 line-through"
            )}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Button variant="outline" size="sm" disabled className="w-full opacity-60">
          <Check className="h-3.5 w-3.5 mr-1.5" /> Current Plan
        </Button>
      ) : isEnterprise ? (
        <Button size="sm" variant="outline" className="w-full gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> Contact Sales
        </Button>
      ) : (
        <Button size="sm" className="w-full gap-1.5">
          <ArrowUpRight className="h-3.5 w-3.5" /> Choose Plan
        </Button>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function UpgradeModal() {
  const { isOpen, closeUpgradeModal } = useUpgradeModal();
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeUpgradeModal(); }}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0 max-h-[92vh] flex flex-col overflow-hidden">
        <DialogTitle className="sr-only">Choose your plan</DialogTitle>
        <DialogDescription className="sr-only">
          Compare Sokoa plans and select the one that fits your business.
        </DialogDescription>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border/60 shrink-0">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="h-5 w-5 text-primary" /> Choose your plan
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Start free, upgrade when you're ready.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center pt-5 px-5 shrink-0">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        {/* Plan cards */}
        <div className="overflow-y-auto px-5 pb-5 pt-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {PLANS.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={plan.id === CURRENT_PLAN_ID}
                billing={billing}
              />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            All plans include secure checkout, M-PESA integration &amp; real-time order tracking.
            <br />Cancel anytime. No hidden fees.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
