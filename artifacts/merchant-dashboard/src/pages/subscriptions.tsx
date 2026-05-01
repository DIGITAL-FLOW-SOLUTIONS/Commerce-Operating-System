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
  BarChart2,
  Globe,
  Headphones,
  Video,
  ShoppingBag,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useData, Store, StoreType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  included: boolean;
}

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: "paid" | "failed" | "pending" | "refunded";
}

interface AddonDef {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

// ─── Static Mock Data ─────────────────────────────────────────────────────────

const PLAN_NAME = "Sokoa Pro";
const PLAN_PRICE = 2499;
const PLAN_CURRENCY = "KES";
const PLAN_RENEWS_AT = "June 1, 2026";
const PLAN_STORE_LIMIT = 10;
const PLAN_STORES_USED = 3;

const PLAN_FEATURES: PlanFeature[] = [
  { text: "Up to 10 stores", included: true },
  { text: "Advanced analytics", included: true },
  { text: "Priority support", included: true },
  { text: "Custom domains", included: true },
  { text: "TikTok Live integration", included: true },
  { text: "Boutique storefronts", included: true },
  { text: "Team members (up to 5)", included: true },
  { text: "White-label branding", included: false },
  { text: "Dedicated account manager", included: false },
];

const BILLING_HISTORY: BillingRecord[] = [
  { id: "inv-001", date: "May 1, 2026", description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-002", date: "Apr 1, 2026", description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-003", date: "Mar 1, 2026", description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-004", date: "Feb 1, 2026", description: "Sokoa Pro — Monthly", amount: 2499, currency: "KES", status: "paid" },
  { id: "inv-005", date: "Jan 1, 2026", description: "Sokoa Starter — Monthly", amount: 999, currency: "KES", status: "paid" },
  { id: "inv-006", date: "Dec 1, 2025", description: "Sokoa Starter — Monthly", amount: 999, currency: "KES", status: "refunded" },
];

const AVAILABLE_ADDONS: AddonDef[] = [
  {
    id: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Deep sales insights & conversion funnel reporting",
    price: 499,
    icon: <BarChart2 className="h-4 w-4" />,
  },
  {
    id: "custom_domain",
    name: "Custom Domain",
    description: "Connect your own branded domain to this store",
    price: 299,
    icon: <Globe className="h-4 w-4" />,
  },
  {
    id: "priority_support",
    name: "Priority Support",
    description: "24/7 dedicated support for this store",
    price: 399,
    icon: <Headphones className="h-4 w-4" />,
  },
];

const INITIAL_ADDONS: Record<string, Set<string>> = {
  s1: new Set(["advanced_analytics", "custom_domain"]),
  s2: new Set(["advanced_analytics"]),
  s3: new Set([]),
  s4: new Set(["custom_domain"]),
  s5: new Set([]),
  s6: new Set(["priority_support"]),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtAmount(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

const STATUS_CONFIG = {
  paid: {
    label: "Paid",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  failed: {
    label: "Failed",
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  pending: {
    label: "Pending",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  refunded: {
    label: "Refunded",
    icon: <RefreshCw className="h-3.5 w-3.5" />,
    className: "bg-muted text-muted-foreground border-border",
  },
};

const TYPE_ICON: Record<StoreType, React.ReactNode> = {
  tiktok: <Video className="h-3.5 w-3.5" />,
  boutique: <ShoppingBag className="h-3.5 w-3.5" />,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: BillingRecord["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", cfg.className)}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function StoreAddonCard({ store, addons, onToggle }: {
  store: Store;
  addons: Set<string>;
  onToggle: (storeId: string, addonId: string) => void;
}) {
  const addonTotal = AVAILABLE_ADDONS.filter(a => addons.has(a.id)).reduce((sum, a) => sum + a.price, 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white",
                store.type === "tiktok" ? "bg-gradient-to-br from-rose-500 to-pink-600" : "bg-gradient-to-br from-violet-500 to-indigo-600"
              )}>
                {TYPE_ICON[store.type]}
              </div>
              <div className="min-w-0">
                <CardTitle className="text-sm font-semibold truncate">{store.name}</CardTitle>
                <CardDescription className="text-[11px]">
                  {store.type === "tiktok" ? "TikTok Live" : "Boutique"} · {store.status === "active" ? "Active" : store.status === "draft" ? "Draft" : "Expired"}
                </CardDescription>
              </div>
            </div>
            {addonTotal > 0 && (
              <span className="text-xs font-medium text-muted-foreground shrink-0">
                +{PLAN_CURRENCY} {addonTotal.toLocaleString()}/mo
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 divide-y divide-border/50">
          {AVAILABLE_ADDONS.map(addon => {
            const enabled = addons.has(addon.id);
            return (
              <div key={addon.id} className="flex items-center gap-3 py-3">
                <div className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                  enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {addon.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{addon.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{addon.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-muted-foreground font-medium hidden sm:block">
                    {PLAN_CURRENCY} {addon.price}/mo
                  </span>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => onToggle(store.id, addon.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const { stores } = useData();

  const [storeAddons, setStoreAddons] = useState<Record<string, Set<string>>>(() => {
    const map: Record<string, Set<string>> = {};
    for (const store of stores) {
      map[store.id] = new Set(INITIAL_ADDONS[store.id] ?? []);
    }
    return map;
  });

  function toggleAddon(storeId: string, addonId: string) {
    setStoreAddons(prev => {
      const current = new Set(prev[storeId] ?? []);
      if (current.has(addonId)) {
        current.delete(addonId);
      } else {
        current.add(addonId);
      }
      return { ...prev, [storeId]: current };
    });
  }

  const usagePercent = Math.round((PLAN_STORES_USED / PLAN_STORE_LIMIT) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300 pb-12">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
          <Sparkles className="h-6 w-6 text-muted-foreground" />
          Subscriptions
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your plan, add-ons, and billing history.</p>
      </div>

      {/* ── Active Plan ──────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Current Plan</h2>

        <div className="relative rounded-xl overflow-hidden border border-border bg-card">
          {/* gradient accent strip */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-primary to-indigo-500" />
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">

              {/* Left: plan name + price */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Zap className="h-3 w-3" /> {PLAN_NAME}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold tracking-tight">{PLAN_CURRENCY} {PLAN_PRICE.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Renews {PLAN_RENEWS_AT}
                </div>

                {/* Store usage bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Stores used</span>
                    <span className="font-medium">{PLAN_STORES_USED} / {PLAN_STORE_LIMIT}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: features */}
              <div className="sm:w-64 shrink-0 space-y-2">
                {PLAN_FEATURES.map(f => (
                  <div key={f.text} className="flex items-center gap-2">
                    {f.included ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={cn("text-xs", f.included ? "text-foreground" : "text-muted-foreground/50 line-through")}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/60">
              <Button size="sm" className="gap-1.5">
                <ArrowUpRight className="h-3.5 w-3.5" /> Upgrade Plan
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5">
                <CreditCard className="h-3.5 w-3.5" /> Manage Payment
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground ml-auto">
                Cancel Plan
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade teaser */}
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 bg-muted/30">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Upgrade to Sokoa Enterprise</p>
            <p className="text-xs text-muted-foreground mt-0.5">White-label branding, dedicated account manager & unlimited stores.</p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 gap-1">
            Learn more <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </section>

      {/* ── Store Add-ons ─────────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Store Add-ons</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Enable premium features on a per-store basis.</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            Billed monthly per store
          </div>
        </div>

        {stores.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
            No stores yet. Create a store to manage add-ons.
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2">
              {stores.map(store => (
                <StoreAddonCard
                  key={store.id}
                  store={store}
                  addons={storeAddons[store.id] ?? new Set()}
                  onToggle={toggleAddon}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </section>

      {/* ── Billing History ───────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Billing History</h2>

        <Card>
          <div className="divide-y divide-border/60">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Description</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Status</span>
              <span className="text-right">Invoice</span>
            </div>

            {BILLING_HISTORY.map((record, i) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: i * 0.04 }}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-1 px-4 py-3.5 items-center"
              >
                {/* Description + date */}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{record.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{record.date}</p>
                </div>

                {/* Amount */}
                <span className="text-sm font-semibold text-right">
                  {fmtAmount(record.amount, record.currency)}
                </span>

                {/* Status */}
                <div className="hidden sm:flex justify-end">
                  <StatusBadge status={record.status} />
                </div>

                {/* Download */}
                <div className="hidden sm:flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="Download invoice"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Mobile: status row */}
                <div className="col-span-2 flex items-center justify-between sm:hidden">
                  <StatusBadge status={record.status} />
                  <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs text-muted-foreground px-2">
                    <Download className="h-3 w-3" /> Invoice
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

    </div>
  );
}
