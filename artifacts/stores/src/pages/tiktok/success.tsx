import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useSubmitDeliveryInfo } from "@workspace/api-client-react";
import { KENYA_COUNTIES, formatKes } from "@/lib/mock-data";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function InputField({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold text-white/60 mb-1.5 block">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
      />
    </div>
  );
}

export default function TikTokSuccessPage() {
  const { storeId, orderId } = useParams<{ storeId: string; orderId: string }>();
  const [, navigate] = useLocation();
  const submitDelivery = useSubmitDeliveryInfo();

  const [form, setForm] = useState({
    country: "Kenya",
    county: "",
    town: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.county || !form.town || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    if (orderId === "demo-order") {
      setSubmitted(true);
      return;
    }

    try {
      await submitDelivery.mutateAsync({
        params: { storeId, orderId },
        data: {
          country: form.country,
          county: form.county,
          town: form.town,
          email: form.email || null,
          phone: form.phone,
          notes: form.notes || null,
        },
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-emerald-400" />
          </div>
          <h1 className="font-display font-bold text-3xl mb-2">Order Confirmed!</h1>
          <p className="text-white/60 mb-8">Your delivery details have been saved. We'll be in touch shortly.</p>
          <button
            onClick={() => navigate(`/tiktok/${storeId}`)}
            className="bg-emerald-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Success banner */}
      <div className="bg-emerald-600 px-4 py-5 text-center">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <CheckCircle2 size={32} className="mx-auto mb-2 text-white" />
          <h1 className="font-display font-bold text-xl">Payment Successful!</h1>
          <p className="text-emerald-100 text-sm mt-1">Order #{orderId.slice(0, 8)}</p>
        </motion.div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <h2 className="font-display font-bold text-lg mb-1">Where should we deliver?</h2>
        <p className="text-white/50 text-sm mb-6">Fill in your delivery details to complete the order.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/60 mb-1.5 block">
              County <span className="text-rose-400">*</span>
            </label>
            <select
              value={form.county}
              onChange={(e) => update("county", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            >
              <option value="">Select county</option>
              {KENYA_COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <InputField
            label="Town / Area"
            required
            placeholder="e.g. Westlands"
            value={form.town}
            onChange={(e) => update("town", e.target.value)}
          />
          <InputField
            label="Phone Number"
            required
            type="tel"
            placeholder="0712 345 678"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <InputField
            label="Email (optional)"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <div>
            <label className="text-xs font-semibold text-white/60 mb-1.5 block">Additional notes</label>
            <textarea
              placeholder="Delivery instructions, landmarks..."
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
            />
          </div>

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitDelivery.isPending}
            className="w-full py-4 rounded-2xl font-display font-bold text-base bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {submitDelivery.isPending ? (
              <><Loader2 size={18} className="animate-spin" /> Saving...</>
            ) : "Confirm Delivery Details"}
          </button>
        </form>
      </div>
    </div>
  );
}
