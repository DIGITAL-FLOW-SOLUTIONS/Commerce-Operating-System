import { useParams, Link } from "wouter";
import { useGetStore, useListProducts } from "@workspace/api-client-react";
import { getGetStoreQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_STORES, DEMO_PRODUCTS, formatKes } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialHomePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-social";
  const { totalItems } = useCart();

  const { data: store } = useGetStore(storeId, {
    query: { enabled: !isDemo, queryKey: getGetStoreQueryKey(storeId) },
  });
  const { data: products } = useListProducts(storeId, undefined, {
    query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId) },
  });

  const activeStore = isDemo ? DEMO_STORES.social : store;
  const activeProducts = isDemo ? DEMO_PRODUCTS.social : (products ?? []);
  const featured = activeProducts.filter((p) => p.featured);
  const base = `/social/${storeId}`;

  if (!activeStore) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader
        storeName={activeStore.name}
        cartCount={totalItems}
        cartTo={`${base}/cart`}
      />

      {/* Hero banner */}
      {activeStore.theme.bannerText && (
        <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-2.5 px-4">
          {activeStore.theme.bannerText}
        </div>
      )}

      {/* Store hero */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 px-4 py-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <span className="font-display font-bold text-2xl text-primary-foreground">
            {activeStore.name[0]}
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl mb-1">{activeStore.name}</h1>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <Star size={13} className="text-yellow-500 fill-yellow-500" />
          <span>4.8 rating · {activeStore.orderCount}+ orders delivered</span>
        </div>
        <Link href={`${base}/products`}>
          <button className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-sm">
            Shop All Products
            <ArrowRight size={15} />
          </button>
        </Link>
      </div>

      {/* Featured products */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">Featured</h2>
          <Link href={`${base}/products`}>
            <span className="text-primary text-sm font-semibold">See all</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {featured.slice(0, 6).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
            >
              <Link href={`${base}/products/${product.id}`}>
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <ProductImage imageUrl={product.imageUrl} name={product.name} size="lg" />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{product.name}</p>
                    <PriceBadge priceKes={product.priceKes} originalPriceKes={product.originalPriceKes} size="sm" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Track order */}
      <div className="mx-4 mb-8 bg-muted rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">Track your order</p>
          <p className="text-muted-foreground text-xs mt-0.5">Enter your phone number</p>
        </div>
        <Link href={`${base}/track`}>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl">
            Track
          </button>
        </Link>
      </div>
    </div>
  );
}
