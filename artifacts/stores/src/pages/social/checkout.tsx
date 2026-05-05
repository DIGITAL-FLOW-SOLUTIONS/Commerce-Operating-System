import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useCreateOrder } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart-context";
import { StoreHeader } from "@/components/ui/store-header";
import { formatKes, KENYA_COUNTIES } from "@/lib/mock-data";
import { Smartphone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-border rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all";

export default function SocialCheckoutPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-social";
  const { items, totalKes, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState({ phone: "", county: "", town: "", notes: "" });
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone || form.phone.length < 9) { setError("Enter a valid phone number."); return; }
    if (!form.county || !form.town) { setError("Please fill all required fields."); return; }
    setError("");

    if (isDemo || items.length === 0) {
      clearCart();
      navigate(`/social/${storeId}/success/demo-order`);
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        params: { storeId },
        data: {
          phone: form.phone,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          paymentMethod: "mpesa",
        },
      });
      clearCart();
      navigate(`/social/${storeId}/success/${order.id}`);
    } catch {
      navigate(`/social/${storeId}/error`);
    }
  }

  const base = `/social/${storeId}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader storeName="Checkout" showBack backTo={`${base}/cart`} compact />

      <div className="flex-1 px-4 py-5 max-w-lg mx-auto w-full pb-32">
        <div className="bg-primary/8 rounded-2xl p-4 mb-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">{items.length} items</p>
            <p className="font-display font-bold text-xl text-primary">{formatKes(totalKes)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Payment via</p>
            <p className="font-bold text-sm text-foreground">M-Pesa</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Phone Number (M-Pesa)" required>
            <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40">
              <Smartphone size={16} className="text-primary shrink-0" />
              <input
                type="tel"
                placeholder="0712 345 678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </Field>
          <Field label="County" required>
            <select value={form.county} onChange={(e) => update("county", e.target.value)} className={inputCls}>
              <option value="">Select county</option>
              {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Town / Area" required>
            <input type="text" placeholder="e.g. Westlands" value={form.town} onChange={(e) => update("town", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Delivery notes (optional)">
            <textarea placeholder="Landmarks, instructions..." value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} className={`${inputCls} resize-none`} />
          </Field>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={createOrder.isPending}
            className="w-full py-4 rounded-xl font-display font-bold text-base bg-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm mt-3"
          >
            {createOrder.isPending ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : `Pay via M-Pesa — ${formatKes(totalKes)}`}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
