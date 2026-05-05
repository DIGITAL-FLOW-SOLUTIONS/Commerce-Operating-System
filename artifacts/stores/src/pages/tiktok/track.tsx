import { useState } from "react";
import { useParams } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { StoreHeader } from "@/components/ui/store-header";
import { formatKes } from "@/lib/mock-data";
import { Smartphone, Package, CheckCircle2, Clock, Truck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const STATUS_CONFIG: Record<string, { label: string; icon: typeof Package; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "text-yellow-400" },
  paid: { label: "Paid", icon: CheckCircle2, color: "text-emerald-400" },
  processing: { label: "Processing", icon: Package, color: "text-blue-400" },
  shipped: { label: "Shipped", icon: Truck, color: "text-purple-400" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-emerald-400" },
  failed: { label: "Failed", icon: Clock, color: "text-rose-400" },
};

export default function TikTokTrackPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [phone, setPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState<string | null>(null);

  const { data: orders, isLoading } = useListOrders(
    storeId,
    searchPhone ? { phone: searchPhone } : undefined,
    {
      query: {
        enabled: !!searchPhone && storeId !== "demo-tiktok",
        queryKey: getListOrdersQueryKey(storeId, searchPhone ? { phone: searchPhone } : undefined),
      },
    }
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length >= 9) setSearchPhone(phone);
  }

  const isDemo = storeId === "demo-tiktok";
  const demoOrders = searchPhone
    ? [
        {
          id: "demo-order-1",
          phone: searchPhone,
          totalKes: 1500,
          status: "paid",
          items: [{ productName: "Premium Shea Butter Gift Set", quantity: 1, unitPriceKes: 1500, totalKes: 1500, productId: "tt-p1" }],
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ]
    : [];

  const displayOrders = isDemo ? demoOrders : (orders ?? []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <StoreHeader
        storeName="Track Your Order"
        showBack
        backTo={`/tiktok/${storeId}`}
        className="bg-gray-900/90 border-gray-800"
        compact
      />

      <div className="px-4 py-6 max-w-lg mx-auto w-full">
        <h2 className="font-display font-bold text-xl mb-1">Order Tracking</h2>
        <p className="text-white/50 text-sm mb-6">Enter your phone number to find your orders.</p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="flex-1 flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 focus-within:ring-2 ring-emerald-500/50">
            <Smartphone size={16} className="text-emerald-400 shrink-0" />
            <input
              type="tel"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent flex-1 text-white placeholder:text-white/30 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-500 text-white font-semibold px-4 py-3 rounded-xl text-sm hover:bg-emerald-600 transition-colors"
          >
            Search
          </button>
        </form>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-emerald-400" />
          </div>
        )}

        {searchPhone && !isLoading && displayOrders.length === 0 && (
          <div className="text-center py-12">
            <Package size={40} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/50 text-sm">No orders found for this number.</p>
          </div>
        )}

        <div className="space-y-4">
          {displayOrders.map((order: any) => {
            const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
            const Icon = status.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-white/40">#{order.id.slice(0, 8)}</span>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${status.color}`}>
                    <Icon size={13} />
                    {status.label}
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/70">{item.productName} × {item.quantity}</span>
                      <span className="text-white font-semibold">{formatKes(item.totalKes)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                  <span className="text-white/40 text-xs">
                    {new Date(order.createdAt).toLocaleDateString("en-KE", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                  <span className="font-display font-bold text-emerald-400">{formatKes(order.totalKes)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
