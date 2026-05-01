import {
  Sparkles,
  Check,
  Download,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useUpgradeModal } from "@/contexts/upgrade-modal";
import { PLANS } from "@/components/UpgradeModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: "paid" | "failed" | "pending" | "refunded";
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const CURRENT_PLAN_ID = "pro";

const BILLING_HISTORY: BillingRecord[] = [
  { id: "inv-001", date: "May 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-002", date: "Apr 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-003", date: "Mar 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-004", date: "Feb 1, 2026",  description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-005", date: "Jan 1, 2026",  description: "Sokoa Starter — Monthly", amount: 0, currency: "KES", status: "paid" },
  { id: "inv-006", date: "Dec 1, 2025",  description: "Sokoa Starter — Monthly", amount: 0, currency: "KES", status: "refunded" },
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const { openUpgradeModal } = useUpgradeModal();
  const currentPlan = PLANS.find(p => p.id === CURRENT_PLAN_ID)!;

  return (
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
              <span className="text-3xl font-extrabold tracking-tight">
                {currentPlan.currency} {currentPlan.monthlyPrice.toLocaleString()}
              </span>
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
              <Button size="sm" className="gap-1.5" onClick={openUpgradeModal}>
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
  );
}
