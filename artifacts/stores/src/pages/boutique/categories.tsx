import { useParams, Link } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { getListProductsQueryKey } from "@workspace/api-client-react";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { useCart } from "@/lib/cart-context";
import { ChevronRight, Grid3X3 } from "lucide-react";
import { motion } from "framer-motion";

function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    Makeup: "from-pink-400 to-rose-500",
    Skincare: "from-emerald-400 to-teal-500",
    "Hair Care": "from-amber-400 to-orange-500",
    Fashion: "from-violet-400 to-purple-600",
    Accessories: "from-sky-400 to-blue-500",
    Fragrance: "from-fuchsia-400 to-pink-500",
  };
  return map[category] ?? "from-slate-400 to-gray-500";
}

export default function BoutiqueCategoriesPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const { totalItems } = useCart();

  const { data: products } = useListProducts(storeId, undefined, {
    query: { enabled: !isDemo, queryKey: getListProductsQueryKey(storeId) },
  });

  const activeProducts = isDemo ? DEMO_PRODUCTS.boutique : (products ?? []);

  // Group products by category
  const categoryMap = activeProducts.reduce((acc, p) => {
    if (!p.category) return acc;
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof activeProducts>);

  const categories = Object.entries(categoryMap).sort((a, b) => b[1].length - a[1].length);
  const base = `/boutique/${storeId}`;

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader
        storeName="Categories"
        showBack
        backTo={base}
        cartCount={totalItems}
        cartTo={`${base}/cart`}
        compact
      />

      <div className="px-4 py-5 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <Grid3X3 size={18} className="text-primary" />
          <h2 className="font-display font-bold text-lg">{categories.length} Categories</h2>
        </div>

        <div className="space-y-3">
          {categories.map(([category, items], idx) => {
            const gradient = getCategoryGradient(category);
            const previews = items.slice(0, 3);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
              >
                <Link href={`${base}/products?category=${encodeURIComponent(category)}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4 p-4">
                      {/* Category icon / gradient */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} shrink-0 flex items-center justify-center shadow-sm`}>
                        <span className="font-display font-bold text-white text-xl">
                          {category[0]}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-base">{category}</p>
                        <p className="text-sm text-muted-foreground">{items.length} product{items.length !== 1 ? "s" : ""}</p>
                      </div>

                      {/* Product thumbnails */}
                      <div className="flex -space-x-2 mr-1">
                        {previews.map((p) => (
                          <div key={p.id} className="w-9 h-9 rounded-lg border-2 border-white overflow-hidden shadow-sm">
                            <ProductImage imageUrl={p.imageUrl} name={p.name} size="sm" />
                          </div>
                        ))}
                      </div>

                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No categories yet.
          </div>
        )}
      </div>
    </div>
  );
}
