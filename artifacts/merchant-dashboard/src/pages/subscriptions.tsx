import { useState } from "react";
import {
  Sparkles,
  Check,
  X,
  Download,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Calendar,
  Zap,
  Crown,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: "paid" | "failed" | "pending" | "refunded";
}

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

// ─── Static Data ──────────────────────────────────────────────────────────────

const CURRENT_PLAN_ID: Plan["id"] = "pro";
const ANNUAL_DISCOUNT = 0.17; // 2 months free ≈ 17% off

const BILLING_HISTORY: BillingRecord[] = [
  { id: "inv-001", date: "May 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-002", date: "Apr 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-003", date: "Mar 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-004", date: "Feb 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-005", date: "Jan 1, 2026",  description: "Sokoa Starter — Monthly", amount: 0,    currency: "KES", status: "paid" },
  { id: "inv-006", date: "Dec 1, 2025",  description: "Sokoa Starter — Monthly", amount: 0,    currency: "KES", status: "refunded" },
];

const PLANS: Plan[] = [
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

const STATUS_META = {
  paid:     { label: "Paid",     icon: <CheckCircle2 className="h-3.5 w-3.5" />, cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  failed:   { label: "Failed",   icon: <XCircle className="h-3.5 w-3.5" />,      cls: "text-destructive bg-destructive/10 border-destructive/20" },
  pending:  { label: "Pending",  icon: <Clock className="h-3.5 w-3.5" />,        cls: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
  refunded: { label: "Refunded", icon: <RefreshCw className="h-3.5 w-3.5" />,    cls: "text-muted-foreground bg-muted border-border" },
};

function StatusPill({ status }: { status: BillingRecord["status"] }) {
  const m = STATUS_META[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", m.cls)}>
      {m.icon}{m.label}
    </span>
  );
}

function fmt(amount: number, currency: string) {
  if (amount === 0) return "Free";
  return `${currency} ${amount.toLocaleString()}`;
}

function effectiveMonthlyPrice(plan: Plan, billing: Billing): number {
  if (plan.monthlyPrice === 0) return 0;
  if (billing === "annual") return Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT));
  return plan.monthlyPrice;
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  isCurrent,
  billing,
}: {
  plan: Plan;
  isCurrent: boolean;
  billing: Billing;
}) {
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

      {/* Plan header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", plan.accent)}>
          {plan.icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-base leading-tight">{plan.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{plan.tagline}</p>
        </div>
      </div>

      {/* Price */}
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

      {/* Features */}
      <ul className="flex-1 space-y-2 mb-6">
        {plan.features.map(f => (
          <li key={f.text} className="flex items-start gap-2">
            {f.included
              ? <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
              : <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 mt-0.5" />
            }
            <span className={cn("text-xs leading-snug", f.included ? "text-foreground" : "text-muted-foreground/40 line-through")}>{f.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
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

// ─── Billing Toggle ───────────────────────────────────────────────────────────

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) {
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  // Auto-open if ?plans query param present (e.g. from sidebar upgrade button)
  const [upgradeOpen, setUpgradeOpen] = useState(
    () => new URLSearchParams(window.location.search).has("plans")
  );
  const [billing, setBilling] = useState<Billing>("monthly");
  const currentPlan = PLANS.find(p => p.id === CURRENT_PLAN_ID)!;

  return (
    <>
      <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in duration-300 pb-12">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
            Subscriptions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Your plan and billing history.</p>
        </div>

        {/* ── Active Plan ─────────────────────────────────────────────── */}
        <section>
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-500 via-primary to-indigo-500" />

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", currentPlan.accent)}>
                  {currentPlan.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Plan</p>
                  <h2 className="font-bold text-lg leading-tight">{currentPlan.name}</h2>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold tracking-tight">{currentPlan.currency} {currentPlan.monthlyPrice.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
                <Calendar className="h-3.5 w-3.5" />
                Renews June 1, 2026
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {[
                  "10 stores per category",
                  "100 products per store",
                  "Custom domain",
                  "No Sokoa badge",
                  "Advanced analytics",
                  "Priority support",
                ].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 shrink-0 text-emerald-500" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                <Button size="sm" className="gap-1.5" onClick={() => setUpgradeOpen(true)}>
                  <ArrowUpRight className="h-3.5 w-3.5" /> Upgrade Plan
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <CreditCard className="h-3.5 w-3.5" /> Manage Payment
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground ml-auto text-xs">
                  Cancel Plan
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Billing History ──────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Billing History</h2>

          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border/60">
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/40">
              <span>Description</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Status</span>
              <span />
            </div>

            {BILLING_HISTORY.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: i * 0.04 }}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-4 px-5 py-3.5 items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{rec.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{rec.date}</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-right">{fmt(rec.amount, rec.currency)}</span>
                <div className="hidden sm:flex justify-end">
                  <StatusPill status={rec.status} />
                </div>
                <div className="hidden sm:flex justify-end">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" title="Download">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="col-span-2 flex items-center justify-between sm:hidden pt-1.5">
                  <StatusPill status={rec.status} />
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground gap-1">
                    <Download className="h-3 w-3" /> Invoice
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Plan Comparison Modal ─────────────────────────────────────── */}
      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="max-w-4xl w-full p-0 gap-0 max-h-[92vh] flex flex-col overflow-hidden">
          <DialogTitle className="sr-only">Choose your plan</DialogTitle>
          <DialogDescription className="sr-only">Compare Sokoa plans and select the one that fits your business.</DialogDescription>

          {/* Header — explicit close button so it stays above plan cards */}
          <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border/60 shrink-0">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-primary" /> Choose your plan
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">Start free, upgrade when you're ready.</p>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground -mr-1">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center pt-5 px-5 shrink-0">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>

          {/* Plan cards — scrollable */}
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
    </>
  );
}
