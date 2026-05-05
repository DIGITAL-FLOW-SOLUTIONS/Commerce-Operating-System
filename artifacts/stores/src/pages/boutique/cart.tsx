import { useParams, Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart-context";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatKes } from "@/lib/mock-data";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BoutiqueCartPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const { items, updateQuantity, removeItem, totalKes, totalItems } = useCart();
  const base = `/boutique/${storeId}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader storeName="Cart" showBack backTo={`${base}/products`} cartCount={totalItems} compact />
      <div className="flex-1 px-4 py-4 pb-36">
        {items.length === 0 ? (
          <EmptyState icon={<ShoppingBag size={24} />} title="Your cart is empty" description="Browse our collection and add items." action={<Link href={`${base}/products`}><button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl text-sm">Browse Products</button></Link>} />
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div key={item.productId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className="bg-card border border-border rounded-2xl p-3 flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0"><ProductImage imageUrl={item.imageUrl} name={item.productName} size="md" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm line-clamp-1">{item.productName}</p>
                    <PriceBadge priceKes={item.priceKes} size="sm" className="mt-0.5" />
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted"><Minus size={12} /></button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-sm text-primary">{formatKes(item.priceKes * item.quantity)}</span>
                    <button onClick={() => removeItem(item.productId)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground text-sm">{totalItems} items</span>
              <span className="font-display font-bold text-xl text-primary">{formatKes(totalKes)}</span>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate(`${base}/checkout`)} className="w-full py-4 rounded-xl font-display font-bold bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity">
              Checkout — {formatKes(totalKes)}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
