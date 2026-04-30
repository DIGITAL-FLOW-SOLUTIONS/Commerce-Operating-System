import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Wallet, Package, TrendingUp } from "lucide-react";
import { SiGoogle, SiInstagram } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SokoaLogo } from "@/components/SokoaLogo";
import { validateEmail, emailErrorMessage } from "@/lib/email-validation";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const trimmed = email.trim();
  const isEmpty = trimmed.length === 0;
  const result = useMemo(() => validateEmail(trimmed), [trimmed]);
  const isValid = result.ok;
  const showError = touched && !isEmpty && !isValid;
  const errorText = !isValid && !isEmpty ? emailErrorMessage(result.reason) : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!result.ok) return;
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Log in to Sokoa"
        description="Welcome back. Log in to manage your Sokoa storefront."
      />

      {/* Left — form */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-10 md:px-14 py-8 relative">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Sokoa home" className="inline-flex">
            <SokoaLogo variant="horizontal" theme="light" height={32} />
          </Link>
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-sm w-full mx-auto py-12">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-center mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-center text-muted-foreground mb-8">Log in to your Sokoa.</p>

            <form className="space-y-3" onSubmit={handleSubmit} noValidate>
              <div>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  aria-invalid={showError}
                  aria-describedby={showError ? "email-error" : undefined}
                  className={`h-12 rounded-xl bg-muted/60 border ${
                    showError ? "border-destructive focus-visible:ring-destructive" : "border-transparent focus-visible:ring-primary focus-visible:border-primary"
                  } px-4 text-base`}
                />
                {showError && (
                  <p id="email-error" className="mt-2 text-xs font-medium text-destructive">
                    {errorText}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isValid}
                className="w-full h-12 rounded-xl font-bold text-base bg-primary text-black hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20 transition-all"
              >
                Continue
              </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold text-muted-foreground tracking-wider">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 font-semibold text-gray-700 shadow-sm"
              >
                <SiGoogle className="w-4 h-4" style={{ color: "#4285F4" }} />
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full h-12 rounded-xl bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 font-semibold text-white shadow-sm"
              >
                <FaApple className="w-5 h-5 -mt-0.5" />
                Continue with Apple
              </button>
            </div>

            <div className="text-center mt-8 space-y-3">
              <a href="#" className="text-sm text-primary font-semibold hover:underline">
                Forgot your password?
              </a>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Sokoa brand visual */}
      <LoginVisual />
    </div>
  );
}

function LoginVisual() {
  return (
    <aside className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-secondary via-orange-500 to-rose-600 items-center justify-center p-12">
      {/* Decorative ambient blobs */}
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-yellow-300/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary/40 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Composition */}
      <div className="relative w-full max-w-[440px] aspect-[4/5]">
        {/* Center: phone-like dashboard frame */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute inset-x-12 top-6 bottom-16 rounded-[2rem] bg-white border-[6px] border-white/30 shadow-2xl overflow-hidden"
        >
          {/* Status bar */}
          <div className="bg-foreground text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SokoaLogo variant="mark" theme="light" height={20} />
              <span className="text-[11px] font-bold">Boutique</span>
            </div>
            <div className="text-[10px] font-medium text-white/60">Today</div>
          </div>

          {/* Revenue card */}
          <div className="p-4 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Revenue today
            </div>
            <div className="flex items-end gap-2 mb-1">
              <div className="text-2xl font-display font-extrabold text-foreground">KES 45,200</div>
              <div className="text-[10px] font-bold text-primary mb-1.5 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +28%
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground font-medium">42 orders · 11 buyers</div>

            {/* Bar chart */}
            <div className="mt-3 flex items-end gap-1.5 h-14">
              {[40, 65, 50, 80, 95, 75, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary to-emerald-300"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[8px] text-muted-foreground font-bold">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={`day-${i}`}>{d}</span>
              ))}
            </div>
          </div>

          {/* Order rows */}
          <div className="px-4 pt-1 pb-3 space-y-1.5">
            {[
              { name: "Emerald wrap · M", price: "KES 3,200" },
              { name: "Air Jordans · 42", price: "KES 4,500" },
              { name: "Beaded earrings", price: "KES 1,200" },
            ].map((o) => (
              <div
                key={o.name}
                className="flex items-center justify-between bg-muted/40 rounded-lg px-2.5 py-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Package className="w-3 h-3" />
                  </div>
                  <div className="text-[10px] font-bold text-foreground truncate">{o.name}</div>
                </div>
                <div className="text-[10px] font-extrabold text-primary shrink-0">{o.price}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating: M-Pesa to your till */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -left-8 bottom-32 bg-white rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 max-w-[210px]"
        >
          <div className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-foreground">+KES 4,500</div>
            <div className="text-[10px] text-muted-foreground font-medium truncate">
              M-Pesa · 0712****89
            </div>
          </div>
        </motion.div>

        {/* Floating: handle pill */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute -right-6 top-24 bg-white/95 backdrop-blur rounded-full pl-1 pr-3 py-1 shadow-xl flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 via-secondary to-yellow-400 flex items-center justify-center text-white text-xs">
            <SiInstagram className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-foreground">@nyota.boutique</span>
        </motion.div>
      </div>

      {/* Tagline anchored bottom */}
      <div className="absolute bottom-10 left-12 right-12 text-white">
        <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-2">
          Your shop is waiting.
        </h2>
        <p className="text-white/80 text-sm font-medium">
          Pick up where you left off — orders, stock, and M-Pesa receipts in one place.
        </p>
      </div>
    </aside>
  );
}
