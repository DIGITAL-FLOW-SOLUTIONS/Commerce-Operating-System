import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useLookupCustomer } from "@workspace/api-client-react";
import { useCustomer } from "@/lib/customer-context";
import { SokoaLogo } from "@/components/SokoaLogo";
import { Smartphone, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BoutiqueLoginPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-boutique";
  const { setSession } = useCustomer();
  const lookupCustomer = useLookupCustomer();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!trimmed || trimmed.length < 9) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");

    if (isDemo) {
      setSession({ customerId: "demo-customer", phone: trimmed, name: null, email: null, hasPassword: false });
      navigate(`/boutique/${storeId}/dashboard`);
      return;
    }

    try {
      const customer = await lookupCustomer.mutateAsync({
        params: { storeId },
        data: { phone: trimmed },
      });
      setSession({
        customerId: customer.id,
        phone: customer.phone,
        name: customer.name ?? null,
        email: customer.email ?? null,
        hasPassword: customer.hasPassword,
      });
      navigate(`/boutique/${storeId}/dashboard`);
    } catch {
      setError("Could not look up your account. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50/30 flex flex-col">
      {/* Header */}
      <div className="px-4 py-5 flex items-center gap-2">
        <SokoaLogo variant="submark" height={28} />
        <span className="font-display font-bold text-sm text-foreground">Sokoa Stores</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <SokoaLogo variant="mark" height={36} className="[&_path]:stroke-white [&_circle]:fill-orange-300" />
            </div>
          </div>

          <h1 className="font-display font-bold text-2xl text-center text-foreground mb-1">Welcome back</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Enter your phone number to access your account. We'll find it instantly — no password needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-3.5 bg-white focus-within:ring-2 focus-within:ring-violet-500/40 shadow-sm transition-all">
              <Smartphone size={18} className="text-violet-500 shrink-0" />
              <input
                type="tel"
                placeholder="0712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                className="bg-transparent flex-1 text-base text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={lookupCustomer.isPending}
              className="w-full py-4 rounded-2xl font-display font-bold text-base bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {lookupCustomer.isPending ? (
                <><Loader2 size={18} className="animate-spin" /> Looking up...</>
              ) : (
                <>Continue <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            New customer? We'll create your account automatically.
          </p>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <button
              onClick={() => navigate(`/boutique/${storeId}`)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to store
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
