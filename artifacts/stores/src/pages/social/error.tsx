import { useParams, Link } from "wouter";
import { XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialErrorPage() {
  const { storeId } = useParams<{ storeId: string }>();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-destructive" />
        </div>
        <h1 className="font-display font-bold text-3xl mb-2">Payment Failed</h1>
        <p className="text-muted-foreground text-sm mb-8">Something went wrong. Please check your M-Pesa balance and try again.</p>
        <div className="flex flex-col gap-3">
          <Link href={`/social/${storeId}/checkout`}>
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl">
              <RotateCcw size={16} /> Try Again
            </button>
          </Link>
          <Link href={`/social/${storeId}`}>
            <button className="w-full py-3 rounded-xl border border-border font-semibold text-sm text-muted-foreground hover:bg-muted transition-colors">
              Back to Store
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
