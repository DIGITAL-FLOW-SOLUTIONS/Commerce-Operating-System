import { useParams, useLocation } from "wouter";
import { useGetStore } from "@workspace/api-client-react";
import { useListProducts } from "@workspace/api-client-react";
import { getGetStoreQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_STORES, DEMO_PRODUCTS, formatKes } from "@/lib/mock-data";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { Zap, Star, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function TikTokProductPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-tiktok";

  const { data: store } = useGetStore(storeId, {
    query: { enabled: !isDemo, queryKey: getGetStoreQueryKey(storeId) },
  });
  const { data: products } = useListProducts(storeId, undefined, {
    query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId) },
  });

  const activeStore = isDemo ? DEMO_STORES.tiktok : store;
  const activeProducts = isDemo ? DEMO_PRODUCTS.tiktok : (products ?? []);
  const product = activeProducts[0];

  if (!product || !activeStore) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-white/60 text-sm">Loading store...</p>
        </div>
      </div>
    );
  }

  const basePath = `/tiktok/${storeId}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Banner */}
      {activeStore.theme.bannerText && (
        <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white text-center text-xs font-bold py-2 px-4 tracking-wide animate-pulse">
          {activeStore.theme.bannerText}
        </div>
      )}

      {/* Header */}
      <header className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-base">{activeStore.name}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs text-rose-400 font-semibold">LIVE NOW</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
          <Clock size={12} className="text-orange-400" />
          <span className="text-xs font-semibold text-orange-400">Limited Stock</span>
        </div>
      </header>

      {/* Product image */}
      <div className="relative mx-4 mt-3 rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <ProductImage imageUrl={product.imageUrl} name={product.name} size="xl" />
        {product.originalPriceKes && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            SALE
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          4.9 · {activeStore.orderCount}+ orders
        </div>
      </div>

      {/* Product info */}
      <div className="flex-1 px-4 pt-5 pb-28">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl leading-tight mb-2">{product.name}</h2>
          <PriceBadge
            priceKes={product.priceKes}
            originalPriceKes={product.originalPriceKes}
            size="xl"
            className="mb-4"
          />
          {product.description && (
            <p className="text-white/70 text-sm leading-relaxed mb-5">{product.description}</p>
          )}

          {/* Trust signals */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { icon: Shield, label: "Secure Checkout" },
              { icon: Zap, label: "Fast Delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/8 rounded-xl px-3 py-2.5">
                <Icon size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-white/80">{label}</span>
              </div>
            ))}
          </div>

          {product.stock !== null && product.stock !== undefined && product.stock < 30 && (
            <div className="mt-4 bg-rose-500/15 border border-rose-500/30 rounded-xl px-4 py-3">
              <p className="text-rose-400 text-sm font-semibold">
                Only {product.stock} left in stock!
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`${basePath}/checkout`)}
          className="w-full py-4 rounded-2xl font-display font-bold text-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/30 active:opacity-90 transition-all"
        >
          Buy Now — {formatKes(product.priceKes)}
        </motion.button>
      </div>
    </div>
  );
}
