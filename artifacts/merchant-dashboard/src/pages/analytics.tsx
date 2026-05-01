import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, PieChart, Pie,
} from "recharts";
import {
  TrendingUp, TrendingDown, Minus, ShoppingBag, Users, Wallet,
  BarChart3, MapPin, Crown, Store, Package, ArrowUpRight, ArrowDownRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  REVENUE_SERIES, STORE_PERFORMANCE, TOP_PRODUCTS,
  CITY_DATA, TOP_CUSTOMERS, SUMMARY_TOTALS, TimeRange,
} from "@/lib/analytics-data";

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : `${n}`;

const fmtKES = (n: number) => `KES ${n.toLocaleString()}`;

function KpiCard({
  label, value, sub, growth, icon: Icon, color, delay,
}: {
  label: string; value: string; sub?: string; growth: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string; delay: number;
}) {
  const up = growth > 0;
  const flat = growth === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.22 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className={cn("rounded-xl p-2.5", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <div className={cn(
              "flex items-center gap-0.5 text-xs font-semibold",
              flat ? "text-muted-foreground" : up ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
            )}>
              {flat ? <Minus className="h-3 w-3" /> : up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {flat ? "—" : `${Math.abs(growth)}%`}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            {sub && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{sub}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const TIME_OPTIONS: { id: TimeRange; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-popover/95 backdrop-blur p-3 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-emerald-600 dark:text-emerald-400">
        Revenue: <span className="font-bold">{fmtKES(payload[0]?.value)}</span>
      </p>
      <p className="text-muted-foreground">
        Orders: <span className="font-bold text-foreground">{payload[1]?.value}</span>
      </p>
    </div>
  );
}

function RevenueTrendCard() {
  const [range, setRange] = useState<TimeRange>("30d");
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const data = REVENUE_SERIES[range];

  const totalRev = data.reduce((s, p) => s + p.revenue, 0);
  const totalOrd = data.reduce((s, p) => s + p.orders, 0);

  const tick = dark ? "#6b7280" : "#9ca3af";
  const grid = dark ? "#1f2937" : "#f3f4f6";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" /> Revenue Trend
            </CardTitle>
            <CardDescription className="mt-0.5">
              KES {totalRev.toLocaleString()} · {totalOrd} orders in the last {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "90 days"}
            </CardDescription>
          </div>
          <div className="flex rounded-lg border p-0.5 gap-0.5">
            {TIME_OPTIONS.map(t => (
              <button
                key={t.id}
                onClick={() => setRange(t.id)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                  range === t.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: tick }} axisLine={false} tickLine={false}
              interval={range === "90d" ? 13 : range === "30d" ? 5 : 0} />
            <YAxis tick={{ fontSize: 11, fill: tick }} axisLine={false} tickLine={false}
              tickFormatter={v => `${fmt(v)}`} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2}
              fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#10b981" }} />
            <Area type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={1.5}
              fill="url(#ordGrad)" dot={false} activeDot={{ r: 3, fill: "#6366f1" }} yAxisId={0} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2 px-1">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-2 w-4 rounded-full bg-emerald-500 inline-block" /> Revenue
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-2 w-4 rounded-full bg-indigo-500 inline-block" /> Orders
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function StorePerformanceCard() {
  const maxRev = Math.max(...STORE_PERFORMANCE.map(s => s.revenue));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Store className="h-4 w-4 text-muted-foreground" /> Store Performance
        </CardTitle>
        <CardDescription>Revenue by store this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3.5">
        {STORE_PERFORMANCE.map((s, i) => (
          <motion.div
            key={s.storeId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.2 }}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-sm font-medium truncate">{s.storeName}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[9px] px-1.5 py-0 shrink-0",
                    s.type === "tiktok" ? "bg-pink-500/10 text-pink-600 dark:text-pink-400" : "bg-primary/10 text-primary"
                  )}
                >
                  {s.type === "tiktok" ? "Live" : "Shop"}
                </Badge>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-xs">
                <span className="font-semibold text-foreground hidden sm:block">
                  KES {fmt(s.revenue)}
                </span>
                <span className={cn(
                  "flex items-center gap-0.5 font-semibold",
                  s.growth > 0 ? "text-emerald-600 dark:text-emerald-400"
                    : s.growth < 0 ? "text-destructive"
                    : "text-muted-foreground"
                )}>
                  {s.growth > 0 ? <ArrowUpRight className="h-3 w-3" />
                    : s.growth < 0 ? <ArrowDownRight className="h-3 w-3" />
                    : <Minus className="h-3 w-3" />}
                  {s.growth === 0 ? "New" : `${Math.abs(s.growth)}%`}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(s.revenue / maxRev) * 100}%` }}
                transition={{ delay: 0.1 + 0.05 * i, duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: s.color }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {s.orders} orders · {s.customers} customers
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function TopProductsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" /> Best-Selling Products
        </CardTitle>
        <CardDescription>By revenue this month across all stores</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border">
        {TOP_PRODUCTS.map((p, i) => (
          <motion.div
            key={p.rank}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className={cn(
              "text-sm font-bold w-5 shrink-0 text-center",
              p.rank === 1 ? "text-amber-500" : p.rank === 2 ? "text-slate-400" : p.rank === 3 ? "text-orange-400" : "text-muted-foreground"
            )}>
              {p.rank === 1 ? <Crown className="h-4 w-4 text-amber-500 mx-auto" /> : p.rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.category} · {p.storeName}</p>
            </div>
            <div className="text-right shrink-0 space-y-0.5">
              <p className="text-sm font-semibold text-foreground">KES {fmt(p.revenue)}</p>
              <div className="flex items-center justify-end gap-1">
                <span className="text-[10px] text-muted-foreground">{p.unitsSold} sold</span>
                {p.trend !== "flat" && (
                  <span className={cn(
                    "text-[10px] font-semibold flex items-center gap-0.5",
                    p.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                  )}>
                    {p.trend === "up" ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {Math.abs(p.trendPct)}%
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function GeographyCard() {
  const max = Math.max(...CITY_DATA.map(c => c.orders));
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" /> Customer Geography
        </CardTitle>
        <CardDescription>Order distribution by city</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {CITY_DATA.map((c, i) => (
          <motion.div
            key={c.city}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.2 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground flex items-center gap-1.5">
                {c.city}
                {c.county && <span className="text-muted-foreground font-normal">{c.county}</span>}
              </span>
              <span className="font-semibold text-foreground">{c.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.pct}%` }}
                transition={{ delay: 0.1 + 0.05 * i, duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              {c.orders} orders · KES {c.revenue.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function TopCustomersCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" /> Top Customers
        </CardTitle>
        <CardDescription>By total spend, all stores combined</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border">
        {TOP_CUSTOMERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0",
              c.avatarColor
            )}>
              {c.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.orders} orders · last {c.lastOrder}</p>
            </div>
            <p className="text-sm font-semibold text-foreground shrink-0">
              KES {fmt(c.totalSpend)}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Performance overview · May 2026
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Compared to last month
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total Revenue"  value={`KES ${fmt(SUMMARY_TOTALS.revenue)}`}  growth={SUMMARY_TOTALS.revGrowth} icon={Wallet}      color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" delay={0}    />
        <KpiCard label="Total Orders"   value={SUMMARY_TOTALS.orders.toLocaleString()} growth={SUMMARY_TOTALS.ordGrowth} icon={ShoppingBag} color="bg-blue-500/10 text-blue-600 dark:text-blue-400"          delay={0.05} />
        <KpiCard label="Customers"      value={SUMMARY_TOTALS.customers.toLocaleString()} growth={SUMMARY_TOTALS.cusGrowth} icon={Users}    color="bg-violet-500/10 text-violet-600 dark:text-violet-400"    delay={0.1}  />
        <KpiCard label="Avg Order Value" value={`KES ${SUMMARY_TOTALS.avgOrder}`}      growth={SUMMARY_TOTALS.aovGrowth} icon={TrendingUp}  color="bg-amber-500/10 text-amber-600 dark:text-amber-400"        delay={0.15} />
      </div>

      <RevenueTrendCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StorePerformanceCard />
        <GeographyCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopProductsCard />
        <TopCustomersCard />
      </div>
    </div>
  );
}
