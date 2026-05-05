import { useParams, Link } from "wouter";
import { useGetStore, useListProducts } from "@workspace/api-client-react";
import { getGetStoreQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_STORES, DEMO_PRODUCTS } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { useCart } from "@/lib/cart-context";
import { useCustomer } from "@/lib/customer-context";
import { ArrowRight, Star, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BoutiqueHomePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const { totalItems } = useCart();
  const { session } = useCustomer();

  const { data: store } = useGetStore(storeId, { query: { enabled: !isDemo, queryKey: getGetStoreQueryKey(storeId) } });
  const { data: products } = useListProducts(storeId, undefined, { query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId) } });

  const activeStore = isDemo ? DEMO_STORES.boutique : store;
  const activeProducts = isDemo ? DEMO_PRODUCTS.boutique : (products ?? []);
  const featured = activeProducts.filter((p) => p.featured).slice(0, 4);
  const categories = [...new Set(activeProducts.map((p) => p.category).filter(Boolean))];
  const base = `/boutique/${storeId}`;

  if (!activeStore) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeName={activeStore.name} cartCount={totalItems} cartTo={`${base}/cart`} />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 text-white px-4 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-64 h-64 rounded-full bg-white/20 absolute -top-16 -right-16" />
          <div className="w-40 h-40 rounded-full bg-white/10 absolute bottom-0 left-0" />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} /> New arrivals this week
          </div>
          <h1 className="font-display font-bold text-3xl mb-2">{activeStore.name}</h1>
          {activeStore.theme.bannerText && (
            <p className="text-white/80 text-sm mb-6">{activeStore.theme.bannerText}</p>
          )}
          <div className="flex items-center justify-center gap-1.5 text-sm text-white/70 mb-6">
            <Star size={13} className="text-yellow-300 fill-yellow-300" />
            4.9 rating · {activeStore.orderCount}+ happy customers
          </div>
          <Link href={`${base}/products`}>
            <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 shadow-lg hover:bg-white/95 transition-colors">
              Shop Collection <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>

      {/* Account bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {session ? `Welcome back, ${session.name ?? session.phone}` : "Create an account for faster checkout"}
        </p>
        <Link href={session ? `${base}/account` : `${base}/account`}>
          <button className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:opacity-80 transition-opacity">
            <User size={14} />
            {session ? "My Account" : "Sign In"}
          </button>
        </Link>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="px-4 py-5">
          <h2 className="font-display font-bold text-lg mb-3">Categories</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <Link key={cat} href={`${base}/products?category=${cat}`}>
                <button className="shrink-0 px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                  {cat}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured */}
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">Featured Products</h2>
          <Link href={`${base}/products`}>
            <span className="text-primary text-sm font-semibold">See all</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((product, idx) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <Link href={`${base}/products/${product.id}`}>
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all group">
                  <div className="aspect-square overflow-hidden">
                    <ProductImage imageUrl={product.imageUrl} name={product.name} size="lg" className="group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    {product.category && <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>}
                    <p className="font-semibold text-sm leading-tight mt-0.5 mb-2 line-clamp-2">{product.name}</p>
                    <PriceBadge priceKes={product.priceKes} originalPriceKes={product.originalPriceKes} size="sm" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
