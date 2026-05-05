import { useParams, Link, useLocation } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { useCustomer } from "@/lib/customer-context";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { StoreHeader } from "@/components/ui/store-header";
import { formatKes } from "@/lib/mock-data";
import {
  User, Package, Heart, Settings, ChevronRight,
  ShoppingBag, TrendingUp, Star, LogOut, MapPin
} from "lucide-react";
import { motion } from "framer-motion";

const DEMO_ORDERS = [
  { id: "demo-bo-1", totalKes: 2400, status: "delivered", createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), items: [{ productName: "Silk Finish Foundation" }] },
  { id: "demo-bo-2", totalKes: 3200, status: "shipped", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), items: [{ productName: "Retinol Night Cream" }] },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-emerald-100 text-emerald-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
};

export default function BoutiqueDashboardPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-boutique";
  const { session, clearSession } = useCustomer();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  const { data: orders } = useListOrders(storeId, session?.phone ? { phone: session.phone } : undefined, {
    query: {
      enabled: !!session?.phone && !isDemo,
      queryKey: getListOrdersQueryKey(storeId, session?.phone ? { phone: session.phone } : undefined),
    },
  });

  const base = `/boutique/${storeId}`;

  if (!session) {
    navigate(`${base}/login`);
    return null;
  }

  const displayOrders = isDemo ? DEMO_ORDERS : (orders ?? []);
  const recentOrders = displayOrders.slice(0, 3);
  const totalSpent = displayOrders
    .filter((o) => o.status === "delivered" || o.status === "paid")
    .reduce((sum: number, o: any) => sum + o.totalKes, 0);

  const QUICK_LINKS = [
    { icon: Package, label: "My Orders", sublabel: `${displayOrders.length} orders`, to: `${base}/orders` },
    { icon: Heart, label: "Wishlist", sublabel: `${favorites.length} saved items`, to: `${base}/wishlist` },
    { icon: Settings, label: "Profile", sublabel: "Update your details", to: `${base}/profile` },
    { icon: MapPin, label: "Track Order", sublabel: "See delivery status", to: `${base}/track` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader
        storeName="My Account"
        showBack
        backTo={base}
        cartCount={totalItems}
        cartTo={`${base}/cart`}
        compact
      />

      <div className="px-4 py-5 max-w-lg mx-auto space-y-5">
        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User size={26} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-xl truncate">
                {session.name ?? "My Account"}
              </p>
              <p className="text-white/70 text-sm">{session.phone}</p>
              {session.email && <p className="text-white/60 text-xs">{session.email}</p>}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/20">
            {[
              { icon: ShoppingBag, value: displayOrders.length, label: "Orders" },
              { icon: Heart, value: favorites.length, label: "Saved" },
              { icon: TrendingUp, value: `KES ${(totalSpent / 1000).toFixed(1)}k`, label: "Spent" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={14} className="text-white/60 mx-auto mb-1" />
                <p className="font-display font-bold text-lg leading-tight">{value}</p>
                <p className="text-white/60 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          {QUICK_LINKS.map((link, idx) => (
            <Link key={link.label} href={link.to}>
              <div className={`flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors ${idx < QUICK_LINKS.length - 1 ? "border-b border-border" : ""}`}>
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <link.icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.sublabel}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Recent orders */}
        {recentOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-base">Recent Orders</h2>
              <Link href={`${base}/orders`}>
                <span className="text-primary text-xs font-semibold">See all</span>
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {order.items?.[0]?.productName ?? `Order #${order.id.slice(0, 6)}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 ml-3 shrink-0">
                    <span className="font-bold text-sm text-primary">{formatKes(order.totalKes)}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] ?? "bg-muted text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          onClick={() => { clearSession(); navigate(base); }}
          className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-destructive hover:bg-destructive/5 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={15} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
