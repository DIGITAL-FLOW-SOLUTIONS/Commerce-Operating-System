import { useState } from "react";
import { useParams, Link, useSearch } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function BoutiqueProductsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("category");
  const [category, setCategory] = useState<string | null>(initialCategory);
  const { totalItems } = useCart();
  const { toggle, isFavorite } = useFavorites();

  const { data: products } = useListProducts(storeId, category ? { category } : undefined, {
    query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId, category ? { category } : undefined) },
  });

  const activeProducts = isDemo ? DEMO_PRODUCTS.boutique : (products ?? []);
  const categories = [...new Set(activeProducts.map((p) => p.category).filter(Boolean))];
  const filtered = category ? activeProducts.filter((p) => p.category === category) : activeProducts;
  const base = `/boutique/${storeId}`;

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeName="All Products" showBack backTo={base} cartCount={totalItems} cartTo={`${base}/cart`} compact />

      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        <button onClick={() => setCategory(null)} className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>All</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat ?? null)} className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{cat}</button>
        ))}
      </div>

      <div className="px-4 py-3 pb-8">
        <p className="text-xs text-muted-foreground mb-4">{filtered.length} products</p>
        {filtered.length === 0 ? (
          <EmptyState icon={<ShoppingBag size={24} />} title="No products" description="No products in this category yet." />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="relative">
                <Link href={`${base}/products/${product.id}`}>
                  <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all group">
                    <div className="relative aspect-square overflow-hidden">
                      <ProductImage imageUrl={product.imageUrl} name={product.name} size="lg" className="group-hover:scale-105 transition-transform duration-500" />
                      <button
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
                        onClick={(e) => { e.preventDefault(); toggle(product.id); }}
                      >
                        <Heart size={14} className={isFavorite(product.id) ? "text-rose-500 fill-rose-500" : "text-muted-foreground"} />
                      </button>
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
        )}
      </div>
    </div>
  );
}
