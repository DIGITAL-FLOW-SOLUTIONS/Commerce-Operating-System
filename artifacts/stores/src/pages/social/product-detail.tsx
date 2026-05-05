import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useGetProduct } from "@workspace/api-client-react";
import { getGetProductQueryKey } from "@workspace/api-client-react";
import { DEMO_PRODUCTS } from "@/lib/mock-data";
import { StoreHeader } from "@/components/ui/store-header";
import { ProductImage } from "@/components/ui/product-image";
import { PriceBadge } from "@/components/ui/price-badge";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, CheckCircle2, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialProductDetailPage() {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-social";
  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { data: product } = useGetProduct(storeId, productId, {
    query: {
      enabled: !isDemo && !!productId,
      queryKey: getGetProductQueryKey(storeId, productId),
    },
  });

  const activeProduct = isDemo
    ? DEMO_PRODUCTS.social.find((p) => p.id === productId) ?? DEMO_PRODUCTS.social[0]
    : product;

  const base = `/social/${storeId}`;

  if (!activeProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  function handleAddToCart() {
    addItem({
      productId: activeProduct!.id,
      productName: activeProduct!.name,
      priceKes: activeProduct!.priceKes,
      imageUrl: activeProduct!.imageUrl,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader
        storeName={activeProduct.name}
        showBack
        backTo={`${base}/products`}
        cartCount={totalItems}
        cartTo={`${base}/cart`}
        compact
      />

      <div className="flex-1 pb-28">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <ProductImage imageUrl={activeProduct.imageUrl} name={activeProduct.name} size="xl" />
        </div>

        <div className="px-4 py-5">
          {activeProduct.category && (
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {activeProduct.category}
            </span>
          )}
          <h1 className="font-display font-bold text-2xl mt-1 mb-3">{activeProduct.name}</h1>
          <PriceBadge
            priceKes={activeProduct.priceKes}
            originalPriceKes={activeProduct.originalPriceKes}
            size="lg"
            className="mb-4"
          />

          {activeProduct.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {activeProduct.description}
            </p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-semibold text-foreground">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-base w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {activeProduct.stock !== null && activeProduct.stock !== undefined && activeProduct.stock < 20 && (
            <p className="text-secondary text-sm font-semibold bg-secondary/10 px-3 py-2 rounded-xl">
              Only {activeProduct.stock} left in stock
            </p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex gap-3 max-w-lg mx-auto">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {added ? (
              <><CheckCircle2 size={16} /> Added to cart</>
            ) : (
              <><ShoppingBag size={16} /> Add to Cart</>
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              handleAddToCart();
              navigate(`${base}/cart`);
            }}
            className="px-5 py-3.5 rounded-xl border border-border font-semibold text-sm hover:bg-muted transition-colors"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}
