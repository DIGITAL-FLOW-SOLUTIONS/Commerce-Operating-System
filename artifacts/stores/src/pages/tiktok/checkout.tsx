import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useGetStore, useListProducts, useCreateOrder } from "@workspace/api-client-react";
import { getGetStoreQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_STORES, DEMO_PRODUCTS, formatKes } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { Smartphone, Plus, Minus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TikTokCheckoutPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-tiktok";

  const { data: store } = useGetStore(storeId, {
    query: { enabled: !isDemo, queryKey: getGetStoreQueryKey(storeId) },
  });
  const { data: products } = useListProducts(storeId, undefined, {
    query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId) },
  });
  const createOrder = useCreateOrder();

  const activeStore = isDemo ? DEMO_STORES.tiktok : store;
  const activeProducts = isDemo ? DEMO_PRODUCTS.tiktok : (products ?? []);
  const product = activeProducts[0];

  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const total = product ? product.priceKes * quantity : 0;

  async function handleCheckout() {
    setError("");
    if (!phone || phone.length < 9) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!product) return;

    if (isDemo) {
      navigate(`/tiktok/${storeId}/success/demo-order`);
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        params: { storeId },
        data: {
          phone: phone.trim(),
          items: [{ productId: product.id, quantity }],
          paymentMethod: "mpesa",
        },
      });
      navigate(`/tiktok/${storeId}/success/${order.id}`);
    } catch {
      navigate(`/tiktok/${storeId}/error`);
    }
  }

  if (!product || !activeStore) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <StoreHeader
        storeName={activeStore.name}
        backTo={`/tiktok/${storeId}`}
        showBack
        className="bg-gray-900/90 border-gray-800"
        compact
      />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full space-y-5">
        {/* Product summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
            <ProductImage imageUrl={product.imageUrl} name={product.name} size="md" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{product.name}</p>
            <p className="text-emerald-400 font-bold mt-0.5">{formatKes(product.priceKes)}</p>
          </div>
        </motion.div>

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-gray-900 rounded-2xl p-5"
        >
          <label className="text-sm font-semibold text-white/70 mb-3 block">Quantity</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-display font-bold text-2xl w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock ?? 99, q + 1))}
              className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <Plus size={16} />
            </button>
            <span className="text-white/40 text-sm ml-auto">
              {product.stock ? `${product.stock} available` : "In stock"}
            </span>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-2xl p-5"
        >
          <label className="text-sm font-semibold text-white/70 mb-3 block">
            M-Pesa Phone Number
          </label>
          <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 focus-within:ring-2 ring-emerald-500/50">
            <Smartphone size={18} className="text-emerald-400 shrink-0" />
            <input
              type="tel"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent flex-1 text-white placeholder:text-white/30 outline-none text-base"
            />
          </div>
          <p className="text-white/40 text-xs mt-2">You'll receive an M-Pesa push notification</p>
          {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
        </motion.div>

        {/* Total */}
        <div className="flex items-center justify-between px-1">
          <span className="text-white/60 text-sm">Total</span>
          <span className="font-display font-bold text-2xl text-emerald-400">{formatKes(total)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCheckout}
          disabled={createOrder.isPending}
          className="w-full py-4 rounded-2xl font-display font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {createOrder.isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Processing...
            </>
          ) : (
            `Pay via M-Pesa — ${formatKes(total)}`
          )}
        </motion.button>
      </div>
    </div>
  );
}
