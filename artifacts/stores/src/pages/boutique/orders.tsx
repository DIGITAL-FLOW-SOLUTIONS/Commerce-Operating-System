import { useParams, Link } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { useCustomer } from "@/lib/customer-context";
import { StoreHeader } from "@/components/ui/store-header";
import { EmptyState } from "@/components/ui/empty-state";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/mock-data";
import { Package, CheckCircle2, Truck, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const STATUS = {
  pending: { label: "Pending payment", color: "text-yellow-700 bg-yellow-50", icon: Clock },
  paid: { label: "Paid", color: "text-emerald-700 bg-emerald-50", icon: CheckCircle2 },
  processing: { label: "Processing", color: "text-blue-700 bg-blue-50", icon: Package },
  shipped: { label: "Shipped", color: "text-purple-700 bg-purple-50", icon: Truck },
  delivered: { label: "Delivered", color: "text-emerald-700 bg-emerald-50", icon: CheckCircle2 },
  failed: { label: "Failed", color: "text-red-700 bg-red-50", icon: Clock },
} as Record<string, any>;

export default function BoutiqueOrdersPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const { session } = useCustomer();
  const { totalItems } = useCart();
  const base = `/boutique/${storeId}`;

  const { data: orders, isLoading } = useListOrders(storeId, session?.phone ? { phone: session.phone } : undefined, {
    query: { enabled: !!session?.phone && !isDemo, queryKey: getListOrdersQueryKey(storeId, session?.phone ? { phone: session.phone } : undefined) },
  });

  const demoOrders = isDemo && session ? [
    { id: "demo-bo-1", storeId, phone: session.phone, totalKes: 2400, status: "delivered", items: [{ productName: "Silk Finish Foundation", quantity: 1, unitPriceKes: 2400, totalKes: 2400, productId: "bo-p1" }], createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), updatedAt: new Date().toISOString() },
    { id: "demo-bo-2", storeId, phone: session.phone, totalKes: 3200, status: "shipped", items: [{ productName: "Retinol Night Cream", quantity: 1, unitPriceKes: 3200, totalKes: 3200, productId: "bo-p3" }], createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), updatedAt: new Date().toISOString() },
  ] : [];
  const displayOrders = isDemo ? demoOrders : (orders ?? []);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StoreHeader storeName="My Orders" showBack backTo={base} compact />
        <EmptyState icon={<Package size={24} />} title="Sign in to view orders" description="Access your account to see your order history." action={<Link href={`${base}/account`}><button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm">Sign In</button></Link>} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeName="My Orders" showBack backTo={`${base}/account`} cartCount={totalItems} cartTo={`${base}/cart`} compact />
      <div className="px-4 py-5 max-w-lg mx-auto">
        {isLoading && <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-primary" /></div>}
        {!isLoading && displayOrders.length === 0 && <EmptyState icon={<Package size={24} />} title="No orders yet" description="Place your first order to see it here." action={<Link href={`${base}/products`}><button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm">Browse Products</button></Link>} />}
        <div className="space-y-3">
          {displayOrders.map((order: any, idx: number) => {
            const s = STATUS[order.status] ?? STATUS.pending;
            const Icon = s.icon;
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                  <span className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.color}`}><Icon size={12} />{s.label}</span>
                </div>
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.productName} × {item.quantity}</span>
                    <span className="font-semibold">{formatKes(item.totalKes)}</span>
                  </div>
                ))}
                <div className="pt-3 mt-2 border-t border-border flex justify-between">
                  <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="font-display font-bold text-primary">{formatKes(order.totalKes)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
