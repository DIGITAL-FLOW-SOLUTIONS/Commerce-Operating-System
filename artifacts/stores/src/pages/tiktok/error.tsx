import { useParams, useLocation } from "wouter";
import { XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function TikTokErrorPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-rose-400" />
        </div>
        <h1 className="font-display font-bold text-3xl mb-2">Payment Failed</h1>
        <p className="text-white/50 mb-2 text-sm">
          Something went wrong with your M-Pesa payment.
        </p>
        <p className="text-white/40 text-xs mb-8">
          Make sure your M-Pesa account has sufficient funds and try again.
        </p>
        <button
          onClick={() => navigate(`/tiktok/${storeId}/checkout`)}
          className="flex items-center gap-2 mx-auto bg-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
        <button
          onClick={() => navigate(`/tiktok/${storeId}`)}
          className="mt-3 text-white/40 text-sm hover:text-white/60 transition-colors block mx-auto"
        >
          Back to store
        </button>
      </motion.div>
    </div>
  );
}
