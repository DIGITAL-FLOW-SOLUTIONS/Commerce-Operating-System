import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useUpdateCustomer } from "@workspace/api-client-react";
import { useCustomer } from "@/lib/customer-context";
import { StoreHeader } from "@/components/ui/store-header";
import { useCart } from "@/lib/cart-context";
import { User, Mail, Lock, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const inputCls =
  "w-full border border-border rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-all";

export default function BoutiqueProfilePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [, navigate] = useLocation();
  const isDemo = storeId === "demo-boutique";
  const { session, setSession } = useCustomer();
  const { totalItems } = useCart();
  const updateCustomer = useUpdateCustomer();

  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const base = `/boutique/${storeId}`;

  if (!session) {
    navigate(`${base}/login`);
    return null;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (isDemo) {
      setSession({ ...session, name: name || null, email: email || null });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }

    try {
      const updated = await updateCustomer.mutateAsync({
        params: { storeId, customerId: session.customerId },
        data: {
          name: name || undefined,
          email: email || undefined,
          password: password || undefined,
        },
      });
      setSession({
        ...session,
        name: updated.name ?? null,
        email: updated.email ?? null,
        hasPassword: updated.hasPassword,
      });
      setPassword("");
      setConfirmPassword("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to update profile. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StoreHeader
        storeName="My Profile"
        showBack
        backTo={`${base}/dashboard`}
        cartCount={totalItems}
        cartTo={`${base}/cart`}
        compact
      />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-100 mb-3">
            <User size={32} className="text-white" />
          </div>
          <p className="font-display font-bold text-lg">{session.name ?? "My Account"}</p>
          <p className="text-muted-foreground text-sm">{session.phone}</p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Personal info section */}
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Personal Information
            </h2>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name</label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                <User size={15} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email Address</label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                <Mail size={15} className="text-muted-foreground shrink-0" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Password section */}
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              {session.hasPassword ? "Change Password" : "Set a Password"}
            </h2>
            <p className="text-xs text-muted-foreground -mt-1">
              {session.hasPassword
                ? "Update your account password for added security."
                : "Add a password to make future logins faster."}
            </p>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                {session.hasPassword ? "New Password" : "Password"}
              </label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-card focus-within:ring-2 focus-within:ring-primary/40 transition-all">
                <Lock size={15} className="text-muted-foreground shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {password && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputCls}
                />
              </div>
            )}
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={updateCustomer.isPending}
            className={`w-full py-4 rounded-xl font-display font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-sm ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {updateCustomer.isPending ? (
              <><Loader2 size={18} className="animate-spin" /> Saving...</>
            ) : saved ? (
              <><CheckCircle2 size={18} /> Saved!</>
            ) : (
              "Save Changes"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
