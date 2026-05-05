import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useLookupCustomer, useUpdateCustomer } from "@workspace/api-client-react";
import { getLookupCustomerMutationOptions, getUpdateCustomerMutationOptions } from "@workspace/api-client-react";
import { useCustomer } from "@/lib/customer-context";
import { StoreHeader } from "@/components/ui/store-header";
import { useCart } from "@/lib/cart-context";
import { Smartphone, LogOut, User, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const inputCls = "w-full border border-border rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all";

export default function BoutiqueAccountPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-boutique";
  const { session, setSession, clearSession } = useCustomer();
  const { totalItems } = useCart();

  const lookupCustomer = useLookupCustomer();
  const updateCustomer = useUpdateCustomer();

  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "profile">("phone");
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const base = `/boutique/${storeId}`;

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!phone || phone.length < 9) { setError("Enter a valid phone number."); return; }
    setError("");

    if (isDemo) {
      setSession({ customerId: "demo-customer", phone, name: null, email: null, hasPassword: false });
      setStep("profile");
      return;
    }

    try {
      const customer = await lookupCustomer.mutateAsync({ params: { storeId }, data: { phone } });
      setSession({ customerId: customer.id, phone: customer.phone, name: customer.name ?? null, email: customer.email ?? null, hasPassword: customer.hasPassword });
      setName(customer.name ?? "");
      setEmail(customer.email ?? "");
      setStep("profile");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (isDemo) { setSaved(true); setTimeout(() => setSaved(false), 2000); return; }
    if (!session) return;
    try {
      const updated = await updateCustomer.mutateAsync({ params: { storeId, customerId: session.customerId }, data: { name: name || undefined, email: email || undefined } });
      setSession({ ...session, name: updated.name ?? null, email: updated.email ?? null });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { setError("Failed to save."); }
  }

  if (session) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StoreHeader storeName="My Account" showBack backTo={base} cartCount={totalItems} cartTo={`${base}/cart`} compact />
        <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={28} className="text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-xl">{session.name ?? "My Account"}</p>
              <p className="text-muted-foreground text-sm">{session.phone}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 mb-8">
            <h2 className="font-display font-bold text-base">Profile Details</h2>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name</label>
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={updateCustomer.isPending} className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${saved ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"} disabled:opacity-60`}>
              {updateCustomer.isPending ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : saved ? <><CheckCircle2 size={16} /> Saved!</> : "Save Changes"}
            </motion.button>
          </form>

          <div className="space-y-2">
            <button onClick={() => navigate(`${base}/orders`)} className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors text-left px-4">My Orders</button>
            <button onClick={() => navigate(`${base}/wishlist`)} className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors text-left px-4">My Wishlist</button>
            <button onClick={() => { clearSession(); navigate(base); }} className="w-full py-3 rounded-xl border border-border text-sm font-semibold text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2 px-4">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader storeName="Sign In" showBack backTo={base} compact />
      <div className="flex-1 px-4 py-10 max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Enter your phone number to access your account.</p>
        </div>
        <form onSubmit={handleLookup} className="space-y-4">
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40">
            <Smartphone size={16} className="text-primary shrink-0" />
            <input type="tel" placeholder="0712 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={lookupCustomer.isPending} className="w-full py-3.5 rounded-xl font-display font-bold bg-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-60">
            {lookupCustomer.isPending ? <><Loader2 size={18} className="animate-spin" /> Looking up...</> : "Continue"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
