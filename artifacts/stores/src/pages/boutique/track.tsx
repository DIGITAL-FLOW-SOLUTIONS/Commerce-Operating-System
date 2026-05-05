import { useState } from "react";
import { useParams } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { StoreHeader } from "@/components/ui/store-header";
import { EmptyState } from "@/components/ui/empty-state";
import { useCart } from "@/lib/cart-context";
import { formatKes } from "@/lib/mock-data";
import { Smartphone, Package, CheckCircle2, Truck, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const STATUS = {
  pending: { label: "Awaiting payment", color: "text-yellow-700 bg-yellow-50", icon: Clock },
  paid: { label: "Paid", color: "text-emerald-700 bg-emerald-50", icon: CheckCircle2 },
  processing: { label: "Processing", color: "text-blue-700 bg-blue-50", icon: Package },
  shipped: { label: "Shipped", color: "text-purple-700 bg-purple-50", icon: Truck },
  delivered: { label: "Delivered", color: "text-emerald-700 bg-emerald-50", icon: CheckCircle2 },
  failed: { label: "Failed", color: "text-red-700 bg-red-50", icon: Clock },
} as Record<string, any>;

export default function BoutiqueTrackPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const [phone, setPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState<string | null>(null);
  const { totalItems } = useCart();

  const { data: orders, isLoading } = useListOrders(storeId, searchPhone ? { phone: searchPhone } : undefined, {
    query: { enabled: !!searchPhone && !isDemo, queryKey: getListOrdersQueryKey(storeId, searchPhone ? { phone: searchPhone } : undefined) },
  });

  const demoOrders = searchPhone ? [{ id: "demo-bo-t1", phone: searchPhone, totalKes: 8500, status: "shipped", items: [{ productName: "Tailored Linen Blazer", quantity: 1, unitPriceKes: 8500, totalKes: 8500, productId: "bo-p7" }], createdAt: new Date(Date.now() - 86400000 * 3).toISOString() }] : [];
  const displayOrders = isDemo ? demoOrders : (orders ?? []);

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeName="Track Order" showBack backTo={`/boutique/${storeId}`} cartCount={totalItems} cartTo={`/boutique/${storeId}/cart`} compact />
      <div className="px-4 py-6 max-w-lg mx-auto">
        <h2 className="font-display font-bold text-xl mb-1">Track your order</h2>
        <p className="text-muted-foreground text-sm mb-6">Enter your phone number to find your orders.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (phone.length >= 9) setSearchPhone(phone); }} className="flex gap-3 mb-8">
          <div className="flex-1 flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40">
            <Smartphone size={16} className="text-primary shrink-0" />
            <input type="tel" placeholder="0712 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground font-semibold px-4 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">Search</button>
        </form>

        {isLoading && <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-primary" /></div>}
        {searchPhone && !isLoading && displayOrders.length === 0 && <EmptyState icon={<Package size={24} />} title="No orders found" description="No orders associated with this phone number." />}

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
                  <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}</span>
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
