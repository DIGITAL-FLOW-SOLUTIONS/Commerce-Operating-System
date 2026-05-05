import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useCreateOrder } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart-context";
import { useCustomer } from "@/lib/customer-context";
import { StoreHeader } from "@/components/ui/store-header";
import { formatKes, KENYA_COUNTIES } from "@/lib/mock-data";
import { Smartphone, Loader2, User } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const inputCls = "w-full border border-border rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all";

export default function BoutiqueCheckoutPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-boutique";
  const { items, totalKes, clearCart } = useCart();
  const { session } = useCustomer();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState({ phone: session?.phone ?? "", county: "", town: "", notes: "" });
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone || form.phone.length < 9) { setError("Enter a valid phone number."); return; }
    if (!form.county || !form.town) { setError("Please fill in all required fields."); return; }
    setError("");

    if (isDemo || items.length === 0) {
      clearCart();
      navigate(`/boutique/${storeId}/success/demo-order`);
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        params: { storeId },
        data: { phone: form.phone, items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })), paymentMethod: "mpesa" },
      });
      clearCart();
      navigate(`/boutique/${storeId}/success/${order.id}`);
    } catch {
      navigate(`/boutique/${storeId}/error`);
    }
  }

  const base = `/boutique/${storeId}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader storeName="Checkout" showBack backTo={`${base}/cart`} compact />
      <div className="flex-1 px-4 py-5 max-w-lg mx-auto w-full pb-32">
        {/* Order summary */}
        <div className="bg-primary/8 rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">{items.length} items</p>
              <p className="font-display font-bold text-xl text-primary">{formatKes(totalKes)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Payment via</p>
              <p className="font-bold text-sm">M-Pesa</p>
            </div>
          </div>
        </div>

        {/* Account prompt */}
        {!session && (
          <div className="bg-muted rounded-xl p-3 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <p className="text-sm text-foreground">Sign in for faster checkout</p>
            </div>
            <Link href={`${base}/account`}>
              <button className="text-primary text-xs font-semibold">Sign In</button>
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Phone Number (M-Pesa) <span className="text-destructive">*</span></label>
            <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40">
              <Smartphone size={16} className="text-primary shrink-0" />
              <input type="tel" placeholder="0712 345 678" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">County <span className="text-destructive">*</span></label>
            <select value={form.county} onChange={(e) => update("county", e.target.value)} className={inputCls}>
              <option value="">Select county</option>
              {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Town / Area <span className="text-destructive">*</span></label>
            <input type="text" placeholder="e.g. Westlands" value={form.town} onChange={(e) => update("town", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Delivery notes (optional)</label>
            <textarea placeholder="Landmarks, instructions..." value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} className={`${inputCls} resize-none`} />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={createOrder.isPending} className="w-full py-4 rounded-xl font-display font-bold text-base bg-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm mt-2">
            {createOrder.isPending ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : `Pay via M-Pesa — ${formatKes(totalKes)}`}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
