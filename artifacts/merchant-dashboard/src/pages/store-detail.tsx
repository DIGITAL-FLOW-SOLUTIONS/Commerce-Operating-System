import { useState, useMemo } from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft, Globe, Lock, ExternalLink, Edit3, TrendingUp, TrendingDown,
  ShoppingBag, Users, Package, BarChart3, Settings, Search, Plus,
  AlertTriangle, RefreshCw, Store, MapPin, Phone, Clock, Bell,
  ChevronRight, Download, Upload, Filter, MoreHorizontal, X, Check,
  Truck, CircleDot, CheckCircle2, XCircle, Loader2, ArrowUpRight,
  Smartphone, Landmark, Building2, Wallet, Star, Pencil, Trash2,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from "@/lib/mock-data";
import { getStoreDetail, OrderStatus, StoreProduct, StorePayout, PayoutMethodType } from "@/lib/store-detail-data";
import { cn } from "@/lib/utils";

type Tab = "overview" | "payout" | "orders" | "inventory" | "customers" | "settings";

const fmt = (n: number) => `KES ${n.toLocaleString()}`;

const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
  pending:    { label: "Pending",    icon: CircleDot,    className: "text-amber-600 bg-amber-500/10 dark:text-amber-400" },
  processing: { label: "Processing", icon: Loader2,      className: "text-blue-600 bg-blue-500/10 dark:text-blue-400" },
  shipped:    { label: "Shipped",    icon: Truck,        className: "text-violet-600 bg-violet-500/10 dark:text-violet-400" },
  delivered:  { label: "Delivered",  icon: CheckCircle2, className: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      className: "text-destructive bg-destructive/10" },
};

function KpiCard({ title, value, sub, trend, icon: Icon, highlight }: {
  title: string; value: string; sub?: string; trend?: number; icon: React.ComponentType<{ className?: string }>; highlight?: boolean;
}) {
  return (
    <Card className={cn("relative overflow-hidden", highlight && "border-primary/30 bg-primary/5")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold tracking-tight mt-1 text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 mt-1.5 text-xs font-medium", trend >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive")}>
                {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(trend)}% vs last month
              </div>
            )}
          </div>
          <div className={cn("rounded-xl p-2.5 shrink-0", highlight ? "bg-primary/10" : "bg-muted")}>
            <Icon className={cn("h-5 w-5", highlight ? "text-primary" : "text-muted-foreground")} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StockBadge({ count }: { count: number }) {
  if (count === 0) return <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">Out of stock</span>;
  if (count <= 4) return <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400"><AlertTriangle className="h-2.5 w-2.5" />Low stock</span>;
  return <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">In stock</span>;
}

function AddProductDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a new product to your online and/or physical store.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label>Product Name</Label>
              <Input placeholder="e.g. Ankara Wrap Dress" />
            </div>
            <div className="space-y-1.5">
              <Label>SKU</Label>
              <Input placeholder="AWD-001" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input placeholder="Dresses" />
            </div>
            <div className="space-y-1.5">
              <Label>Price (KES)</Label>
              <Input type="number" placeholder="3200" />
            </div>
            <div className="space-y-1.5">
              <Label>Online Stock</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-1.5">
              <Label>Physical Stock</Label>
              <Input type="number" placeholder="5" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}><Check className="h-4 w-4 mr-1.5" />Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SyncStockDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sync Physical Stock</DialogTitle>
          <DialogDescription>Update your physical shop stock quantities. Changes will reflect in your unified inventory view.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Physical Shop Address</span>
            </div>
            <p className="text-xs text-muted-foreground pl-6">Westlands, Nairobi — Set in Settings</p>
          </div>
          <p className="text-sm text-muted-foreground">Enter the current physical stock count for each product below.</p>
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {["Ankara Wrap Dress", "Beaded Necklace Set", "Linen Kaftan", "Leather Sandals"].map(name => (
              <div key={name} className="flex items-center gap-3">
                <span className="flex-1 text-sm truncate">{name}</span>
                <Input type="number" className="w-20 h-8 text-sm" defaultValue={Math.floor(Math.random() * 15)} />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}><RefreshCw className="h-4 w-4 mr-1.5" />Sync Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OverviewTab({ data, storeName }: { data: ReturnType<typeof getStoreDetail>; storeName: string }) {
  const chartData = data.revenueChart.filter((_, i) => i % 3 === 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Today's Revenue" value={fmt(data.revenue.today)} trend={data.revenue.growth} icon={TrendingUp} highlight />
        <KpiCard title="This Month" value={fmt(data.revenue.thisMonth)} sub={`${data.orders.total} orders total`} icon={BarChart3} />
        <KpiCard title="Customers" value={data.customers.total.toString()} sub={`${data.customers.newThisMonth} new this month`} icon={Users} />
        <KpiCard title="Avg Order Value" value={fmt(data.revenue.avgOrderValue)} icon={ShoppingBag} />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Revenue Trend</CardTitle>
              <CardDescription>Online vs physical shop — last 30 days</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" />Online</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-emerald-500" />Physical</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPhysical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} className="fill-muted-foreground" tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} className="fill-muted-foreground" tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(val: number) => [`KES ${val.toLocaleString()}`, undefined]}
              />
              <Area type="monotone" dataKey="online" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorOnline)" name="Online" />
              <Area type="monotone" dataKey="physical" stroke="#10b981" strokeWidth={2} fill="url(#colorPhysical)" name="Physical" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Products</CardTitle>
              <Link href="#"><span className="text-xs text-primary hover:underline cursor-pointer">View all</span></Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground font-medium text-right shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium truncate">{p.name}</span>
                    <span className="text-sm font-semibold text-foreground shrink-0">{fmt(p.revenue)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${(p.sold / data.topProducts[0].sold) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{p.sold} sold</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Orders</CardTitle>
              <Link href="#"><span className="text-xs text-primary hover:underline cursor-pointer">View all</span></Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recentOrders.map(order => {
              const cfg = ORDER_STATUS_CONFIG[order.status];
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                  <div className={cn("rounded-full p-1.5", cfg.className)}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{order.orderNumber} · {order.customerName.split(" ")[0]}</span>
                      <span className="text-sm font-semibold">{fmt(order.total)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[11px] text-muted-foreground">{order.date}</span>
                      <span className={cn("text-[10px] font-semibold uppercase tracking-wide", cfg.className.split(" ")[0])}>{cfg.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2.5"><CircleDot className="h-4 w-4 text-amber-600 dark:text-amber-400" /></div>
            <div><p className="text-xs text-muted-foreground">Pending</p><p className="text-xl font-bold">{data.orders.pending}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5"><Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /></div>
            <div><p className="text-xs text-muted-foreground">Processing</p><p className="text-xl font-bold">{data.orders.processing}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /></div>
            <div><p className="text-xs text-muted-foreground">Delivered</p><p className="text-xl font-bold">{data.orders.delivered}</p></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OrdersTab({ data }: { data: ReturnType<typeof getStoreDetail> }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(() => {
    return data.allOrders.filter(o => {
      const matchSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || o.orderNumber.includes(search);
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data.allOrders, search, statusFilter]);

  const statusOptions: { label: string; value: "all" | OrderStatus }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="search" placeholder="Search orders…" value={search} onChange={e => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map(opt => (
            <button key={opt.value} onClick={() => setStatusFilter(opt.value)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>
              {opt.label}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground text-sm">No orders found</td></tr>
              ) : filtered.map(order => {
                const cfg = ORDER_STATUS_CONFIG[order.status];
                const Icon = cfg.icon;
                return (
                  <tr key={order.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-xs">{order.orderNumber}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-[11px] text-muted-foreground">{order.customerEmail}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{order.items} item{order.items !== 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        order.source === "online" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                        {order.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{fmt(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", cfg.className)}>
                        <Icon className="h-2.5 w-2.5" />{cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark Shipped</DropdownMenuItem>
                          <DropdownMenuItem>Mark Delivered</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function InventoryTab({ data }: { data: ReturnType<typeof getStoreDetail> }) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(data.products.map(p => p.category)))], [data.products]);

  const filtered = useMemo(() => {
    return data.products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [data.products, search, categoryFilter]);

  const lowStockCount = data.products.filter(p => (p.onlineStock + p.physicalStock) > 0 && (p.onlineStock + p.physicalStock) <= 4).length;
  const outOfStockCount = data.products.filter(p => p.onlineStock === 0 && p.physicalStock === 0).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Products</p><p className="text-2xl font-bold mt-1">{data.products.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Low Stock</p><p className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">{lowStockCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Out of Stock</p><p className="text-2xl font-bold mt-1 text-destructive">{outOfStockCount}</p></CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Physical Sync</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Connected</p>
          </div>
        </CardContent></Card>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="search" placeholder="Search products, SKU…" value={search} onChange={e => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>
              {cat === "all" ? "All categories" : cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setSyncOpen(true)}><RefreshCw className="h-3.5 w-3.5" />Sync Physical Stock</Button>
          <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}><Plus className="h-3.5 w-3.5" />Add Product</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">Online</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">Physical</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="px-4 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground text-sm">No products found</td></tr>
              ) : filtered.map(product => (
                <tr key={product.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br shrink-0", product.imageGradient)} />
                      <span className="font-medium truncate max-w-[140px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell font-mono text-xs text-muted-foreground">{product.sku}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{product.category}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn("font-semibold", product.onlineStock === 0 ? "text-destructive" : product.onlineStock <= 4 ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
                      {product.onlineStock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn("font-semibold", product.physicalStock === 0 ? "text-destructive" : product.physicalStock <= 4 ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
                      {product.physicalStock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell font-bold">{product.onlineStock + product.physicalStock}</td>
                  <td className="px-4 py-3 font-semibold">KES {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><StockBadge count={product.onlineStock + product.physicalStock} /></td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>View Sales History</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AddProductDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <SyncStockDialog open={syncOpen} onClose={() => setSyncOpen(false)} />
    </div>
  );
}

function CustomersTab({ data }: { data: ReturnType<typeof getStoreDetail> }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() =>
    data.allCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())),
    [data.allCustomers, search]);

  const totalRevenue = data.allCustomers.reduce((sum, c) => sum + c.totalSpend, 0);
  const returningPct = Math.round((data.customers.returning / data.customers.total) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Customers</p><p className="text-2xl font-bold mt-1">{data.customers.total}</p><p className="text-xs text-muted-foreground mt-0.5">{data.customers.newThisMonth} new this month</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Returning Rate</p><p className="text-2xl font-bold mt-1 text-primary">{returningPct}%</p><p className="text-xs text-muted-foreground mt-0.5">{data.customers.returning} repeat buyers</p></CardContent></Card>
        <Card className="col-span-2 lg:col-span-1"><CardContent className="p-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Revenue from Customers</p><p className="text-2xl font-bold mt-1">{fmt(totalRevenue)}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="search" placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pl-9" />
        </div>
        <Button variant="outline" size="sm" className="ml-auto gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Spend</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Last Purchase</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">No customers found</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                    <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold">{fmt(c.totalSpend)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-center">{c.ordersCount}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{c.lastPurchase}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      c.isRepeat ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                      {c.isRepeat ? "Returning" : "New"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const PAYOUT_TYPE_CONFIG: Record<PayoutMethodType, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
}> = {
  till: {
    label: "M-Pesa Till",
    icon: Smartphone,
    color: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
    fields: [
      { key: "Till Number", label: "Till Number", placeholder: "e.g. 987654" },
      { key: "Account Name", label: "Account Name", placeholder: "e.g. Aisha's Collection" },
    ],
  },
  paybill: {
    label: "M-Pesa Paybill",
    icon: Building2,
    color: "text-blue-600 bg-blue-500/10 dark:text-blue-400",
    fields: [
      { key: "Business Number", label: "Business Number", placeholder: "e.g. 400200" },
      { key: "Account Number", label: "Account Number", placeholder: "e.g. STORE001" },
      { key: "Account Name", label: "Account Name", placeholder: "e.g. Aisha's Collection" },
    ],
  },
  bank: {
    label: "Bank Account",
    icon: Landmark,
    color: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
    fields: [
      { key: "Bank", label: "Bank Name", placeholder: "e.g. Equity Bank" },
      { key: "Account Number", label: "Account Number", placeholder: "e.g. 0123456789" },
      { key: "Account Name", label: "Account Name", placeholder: "e.g. Aisha Kamau" },
      { key: "Branch", label: "Branch", placeholder: "e.g. Westlands, Nairobi" },
    ],
  },
};

function PayoutMethodDialog({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing?: StorePayout | null;
}) {
  const [selectedType, setSelectedType] = useState<PayoutMethodType>(editing?.type ?? "till");
  const [isDefault, setIsDefault] = useState(editing?.isDefault ?? false);
  const cfg = PAYOUT_TYPE_CONFIG[selectedType];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Payout Method" : "Add Payout Method"}</DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the details for this payout method."
              : "Choose how you'd like to receive payments for this store."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          {!editing && (
            <div>
              <Label className="mb-2 block">Payment type</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["till", "paybill", "bank"] as PayoutMethodType[]).map(type => {
                  const c = PAYOUT_TYPE_CONFIG[type];
                  const Icon = c.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all",
                        selectedType === type
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80"
                      )}
                    >
                      <div className={cn("rounded-lg p-2", c.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-semibold leading-tight">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {cfg.fields.map(field => (
              <div key={field.key} className="space-y-1.5">
                <Label>{field.label}</Label>
                <Input
                  placeholder={field.placeholder}
                  defaultValue={editing?.details[field.key] ?? ""}
                  type={field.type ?? "text"}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Set as default</p>
              <p className="text-xs text-muted-foreground">Payments go here automatically</p>
            </div>
            <button
              onClick={() => setIsDefault(v => !v)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                isDefault ? "bg-primary" : "bg-muted"
              )}
            >
              <span className={cn("pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform",
                isDefault ? "translate-x-4" : "translate-x-0")} />
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>
            <Check className="h-4 w-4 mr-1.5" />
            {editing ? "Save Changes" : "Add Method"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PayoutMethodCard({
  payout,
  onEdit,
}: {
  payout: StorePayout;
  onEdit: (p: StorePayout) => void;
}) {
  const cfg = PAYOUT_TYPE_CONFIG[payout.type];
  const Icon = cfg.icon;

  return (
    <Card className={cn("relative overflow-hidden transition-all hover:shadow-sm", payout.isDefault && "border-primary/30 bg-primary/[0.02]")}>
      {payout.isDefault && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
            <Star className="h-2.5 w-2.5 fill-primary" />Default
          </span>
        </div>
      )}
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div className={cn("rounded-xl p-3 shrink-0", cfg.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <p className="font-semibold text-sm">{payout.label}</p>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {Object.entries(payout.details).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">{k}:</span>
                    <span className="text-[11px] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Total Processed</p>
                <p className="text-base font-bold mt-0.5">{fmt(payout.totalProcessed)}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Last Payout</p>
                <p className="text-base font-bold mt-0.5">{fmt(payout.lastPayoutAmount)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{payout.lastPayoutDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs"
                onClick={() => onEdit(payout)}
              >
                <Pencil className="h-3 w-3" />Edit
              </Button>
              {!payout.isDefault && (
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground">
                  <Star className="h-3 w-3" />Set as default
                </Button>
              )}
              {!payout.isDefault && (
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-destructive hover:text-destructive ml-auto">
                  <Trash2 className="h-3 w-3" />Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PayoutTab({ data }: { data: ReturnType<typeof getStoreDetail> }) {
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<StorePayout | null>(null);
  const [payouts, setPayouts] = useState<StorePayout[]>(data.payouts);

  const totalProcessed = payouts.reduce((sum, p) => sum + p.totalProcessed, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Payout Methods</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Revenue collected in this store is sent to these accounts
          </p>
        </div>
        <Button size="sm" className="gap-1.5 shrink-0" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4" />Add Method
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Processed</p>
            <p className="text-2xl font-bold mt-1">{fmt(totalProcessed)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Across all methods</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active Methods</p>
            <p className="text-2xl font-bold mt-1">{payouts.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{payouts.filter(p => p.isDefault).length} default</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Next Payout</p>
            <p className="text-2xl font-bold mt-1">Daily</p>
            <p className="text-xs text-muted-foreground mt-0.5">Auto at 6:00 AM</p>
          </CardContent>
        </Card>
      </div>

      {payouts.length === 0 ? (
        <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed gap-3 text-center px-4">
          <div className="rounded-full bg-muted p-4">
            <Wallet className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No payout methods yet</p>
            <p className="text-sm text-muted-foreground mt-0.5">Add a Till, Paybill, or Bank account to receive payments</p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />Add Payout Method
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {payouts.map(payout => (
            <PayoutMethodCard
              key={payout.id}
              payout={payout}
              onEdit={p => setEditTarget(p)}
            />
          ))}
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-start gap-3">
        <div className="rounded-full bg-primary/10 p-1.5 shrink-0 mt-0.5">
          <Bell className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Daily payouts enabled</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Revenue collected is automatically sent to your default payout method every morning at 6:00 AM. You can change the schedule in Settings.
          </p>
        </div>
      </div>

      <PayoutMethodDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <PayoutMethodDialog open={!!editTarget} onClose={() => setEditTarget(null)} editing={editTarget} />
    </div>
  );
}

function SettingsTab({ storeName, storeUrl }: { storeName: string; storeUrl?: string }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader><CardTitle className="text-base">Store Details</CardTitle><CardDescription>Basic information about your online store.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Store Name</Label><Input defaultValue={storeName} /></div>
          <div className="space-y-1.5"><Label>Store URL</Label>
            <div className="flex items-center gap-2">
              <div className="flex h-9 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">sokoa.shop/</div>
              <Input className="rounded-l-none" defaultValue={storeUrl?.replace(/\.sokoa\.shop$/, "") ?? ""} />
            </div>
          </div>
          <div className="space-y-1.5"><Label>Store Description</Label>
            <textarea rows={3} defaultValue="Handcrafted African fashion & accessories, shipped across Kenya."
              className="flex min-h-[72px] w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none" />
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Store className="h-4 w-4 text-muted-foreground" /><CardTitle className="text-base">Physical Shop Integration</CardTitle></div>
          <CardDescription>Connect your physical shop to sync orders and inventory.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
            <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Physical shop is connected and syncing</span>
          </div>
          <div className="space-y-1.5"><Label>Shop Name</Label><Input defaultValue="Aisha's Collection — Westlands" /></div>
          <div className="space-y-1.5"><Label>Address</Label><Input defaultValue="Westlands Shopping Centre, Nairobi" /></div>
          <div className="space-y-1.5"><Label>Phone Number</Label><Input defaultValue="+254 712 345 678" /></div>
          <div className="space-y-1.5">
            <Label>Opening Hours</Label>
            <div className="grid grid-cols-2 gap-2">
              <div><p className="text-xs text-muted-foreground mb-1">Mon – Fri</p><Input defaultValue="9:00 AM – 7:00 PM" /></div>
              <div><p className="text-xs text-muted-foreground mb-1">Sat – Sun</p><Input defaultValue="10:00 AM – 5:00 PM" /></div>
            </div>
          </div>
          <Button size="sm">Update Shop Info</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Bell className="h-4 w-4 text-muted-foreground" /><CardTitle className="text-base">Notifications</CardTitle></div>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "New online orders", desc: "Get notified when a new order is placed", defaultOn: true },
            { label: "Low stock alerts", desc: "Alert when stock falls below 5 units", defaultOn: true },
            { label: "Physical shop sales", desc: "Notify when a sale is made in-store", defaultOn: false },
            { label: "Daily sales summary", desc: "Receive a daily revenue report", defaultOn: true },
            { label: "Customer messages", desc: "Notify on new customer enquiries", defaultOn: false },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button className={cn("relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                item.defaultOn ? "bg-primary" : "bg-muted")} role="switch">
                <span className={cn("pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform",
                  item.defaultOn ? "translate-x-4" : "translate-x-0")} />
              </button>
            </div>
          ))}
          <Button size="sm" className="mt-2">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview",   label: "Overview",   icon: BarChart3 },
  { id: "payout",     label: "Payout",     icon: Wallet },
  { id: "orders",     label: "Orders",     icon: ShoppingBag },
  { id: "inventory",  label: "Inventory",  icon: Package },
  { id: "customers",  label: "Customers",  icon: Users },
  { id: "settings",   label: "Settings",   icon: Settings },
];

export default function StoreDetail() {
  const [, params] = useRoute("/stores/:id");
  const { stores } = useData();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const storeId = params?.id ?? "";
  const store = stores.find(s => s.id === storeId);
  const data = getStoreDetail(storeId);

  if (!store) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
        <div>
          <p className="font-semibold">Store not found</p>
          <p className="text-sm text-muted-foreground mt-0.5">This store doesn't exist or you don't have access.</p>
        </div>
        <Link href="/stores"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1.5" />Back to Stores</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/stores">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> My Stores
          </button>
        </Link>
        <div className="hidden sm:block text-muted-foreground">/</div>
        <span className="text-sm font-medium truncate">{store.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="h-14 w-20 rounded-lg overflow-hidden shrink-0 bg-muted">
          {store.thumbnailUrl ? (
            <img src={store.thumbnailUrl} alt={store.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-violet-900">
              <ShoppingBag className="h-6 w-6 text-white/40" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">{store.name}</h1>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              store.status === "active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : store.status === "draft" ? "bg-muted text-muted-foreground"
                : "bg-destructive/10 text-destructive")}>
              {store.status}
            </span>
            {store.activeSession && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600 dark:text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />Live
              </span>
            )}
          </div>
          {store.url && (
            <a href={`https://${store.url}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline mt-1">
              <Globe className="h-3.5 w-3.5" />{store.url}
            </a>
          )}
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>Updated {store.updatedAt}</span>
            {store.type === "tiktok" ? <span className="font-medium text-pink-600 dark:text-pink-400">TikTok Live Store</span> : <span>Boutique</span>}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {store.url && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a href={`https://${store.url}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />Visit
              </a>
            </Button>
          )}
          <Button size="sm" className="gap-1.5"><Edit3 className="h-3.5 w-3.5" />Edit Store</Button>
        </div>
      </div>

      <div className="flex items-center gap-0.5 border-b border-border overflow-x-auto pb-px">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border")}>
              <Icon className="h-4 w-4" />{tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === "overview"  && <OverviewTab data={data} storeName={store.name} />}
        {activeTab === "payout"    && <PayoutTab data={data} />}
        {activeTab === "orders"    && <OrdersTab data={data} />}
        {activeTab === "inventory" && <InventoryTab data={data} />}
        {activeTab === "customers" && <CustomersTab data={data} />}
        {activeTab === "settings"  && <SettingsTab storeName={store.name} storeUrl={store.url} />}
      </div>
    </div>
  );
}
