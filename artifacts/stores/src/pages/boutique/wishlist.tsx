import { useParams, Link } from "wouter";
import { useFavorites } from "@/lib/favorites-context";
import { useCart } from "@/lib/cart-context";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function BoutiqueWishlistPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const isDemo = storeId === "demo-boutique";
  const { favorites, toggle } = useFavorites();
  const { addItem, totalItems } = useCart();
  const base = `/boutique/${storeId}`;

  const allProducts = isDemo ? DEMO_PRODUCTS.boutique : [];
  const wishlistProducts = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader storeName="Wishlist" showBack backTo={`${base}/account`} cartCount={totalItems} cartTo={`${base}/cart`} compact />
      <div className="px-4 py-5 max-w-lg mx-auto">
        {wishlistProducts.length === 0 ? (
          <EmptyState icon={<Heart size={24} />} title="Your wishlist is empty" description="Save items you love to your wishlist." action={<Link href={`${base}/products`}><button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm">Browse Products</button></Link>} />
        ) : (
          <div className="space-y-3">
            {wishlistProducts.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="bg-card border border-border rounded-2xl p-3 flex gap-3 items-center">
                <Link href={`${base}/products/${product.id}`}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0"><ProductImage imageUrl={product.imageUrl} name={product.name} size="md" /></div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                  <PriceBadge priceKes={product.priceKes} originalPriceKes={product.originalPriceKes} size="sm" className="mt-0.5" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => toggle(product.id)} className="p-1.5 text-rose-400 hover:text-rose-600 transition-colors"><Heart size={16} className="fill-current" /></button>
                  <button onClick={() => addItem({ productId: product.id, productName: product.name, priceKes: product.priceKes, imageUrl: product.imageUrl })} className="p-1.5 text-primary hover:opacity-80 transition-opacity"><ShoppingBag size={16} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
