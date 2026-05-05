import { useParams, Link } from "wouter";
import { CheckCircle2, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialSuccessPage() {
  const { storeId, orderId } = useParams<{ storeId: string; orderId: string }>();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180 }} className="text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-primary" />
        </div>
        <h1 className="font-display font-bold text-3xl mb-2">Order Placed!</h1>
        <p className="text-muted-foreground text-sm mb-1">Order #{orderId.slice(0, 8)}</p>
        <p className="text-muted-foreground text-sm mb-8">You'll receive an M-Pesa notification shortly. Your order will be delivered to the address provided.</p>
        <div className="flex flex-col gap-3">
          <Link href={`/social/${storeId}/track`}>
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl">
              <Package size={16} /> Track Order
            </button>
          </Link>
          <Link href={`/social/${storeId}`}>
            <button className="w-full py-3 rounded-xl border border-border font-semibold text-sm text-muted-foreground hover:bg-muted transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
