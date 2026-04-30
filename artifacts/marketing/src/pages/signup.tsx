import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, ShoppingBag, Wallet, BadgeCheck, MapPin, Star, Radio } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SokoaLogo } from "@/components/SokoaLogo";
import { validateEmail, emailErrorMessage } from "@/lib/email-validation";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [hasLead, setHasLead] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sokoa_session_token")) {
      setHasLead(true);
    }
  }, []);

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
    localStorage.setItem("sokoa_signup_email", result.normalized);
    setLocation("/build");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Create your Sokoa account"
        description="Open a free Sokoa account in seconds. Sell on Instagram, Facebook, TikTok, and WhatsApp with M-Pesa checkout."
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
            {hasLead && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-primary mb-1">Your store is ready to claim</p>
                  <p className="text-xs text-primary/80">
                    Sign up below to attach the store we just built for you.
                  </p>
                </div>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-center mb-2 tracking-tight">
              Join Sokoa
            </h1>
            <p className="text-center text-muted-foreground mb-8">Create your free account.</p>

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

            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              By clicking <span className="font-semibold text-foreground">Continue</span>, you agree to Sokoa's{" "}
              <a href="#" className="underline hover:text-foreground">privacy notice</a> and{" "}
              <a href="#" className="underline hover:text-foreground">terms</a>, and to receive product updates.
            </p>

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

            <p className="text-center mt-8 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right — Sokoa brand visual */}
      <SignupVisual />
    </div>
  );
}

function SignupVisual() {
  return (
    <aside className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-emerald-500 to-emerald-700 items-center justify-center p-12">
      {/* Subtle grid pattern (matches login's tactile feel) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Soft ambient highlights */}
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] bg-secondary/25 rounded-full blur-3xl" />

      {/* Composition */}
      <div className="relative w-full max-w-[400px] -mt-16">
        {/* Center card: Sokoa storefront preview */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-white rounded-[24px] shadow-2xl overflow-hidden ring-1 ring-black/5"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 border-b border-black/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 mx-3 bg-zinc-700/60 rounded-md px-3 py-1 text-[10px] text-zinc-300 font-mono truncate">
              sokoa.shop/amani.kicks
            </div>
          </div>

          {/* Cover banner */}
          <div className="relative h-16 bg-gradient-to-br from-secondary via-rose-400 to-pink-500">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          {/* Profile block */}
          <div className="px-5 -mt-7 relative">
            <div className="w-14 h-14 rounded-2xl ring-4 ring-white bg-gradient-to-br from-yellow-300 via-secondary to-rose-500 shadow-md flex items-center justify-center text-white text-xl font-display font-extrabold">
              A
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <h3 className="text-base font-display font-extrabold text-foreground">Amani Kicks</h3>
              <BadgeCheck className="w-4 h-4 text-primary fill-primary/15" />
            </div>
            <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Nairobi, KE
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9 · 312 reviews
              </span>
            </div>
          </div>

          {/* Tab strip */}
          <div className="px-5 mt-4 flex gap-5 border-b border-border/60 text-xs font-semibold">
            <div className="pb-2 border-b-2 border-foreground text-foreground">Shop</div>
            <div className="pb-2 text-muted-foreground">Live</div>
            <div className="pb-2 text-muted-foreground">About</div>
          </div>

          {/* Product grid (single row, 3-up) */}
          <div className="p-3.5 grid grid-cols-3 gap-2.5">
            {[
              { name: "AJ4 · Bred", price: "4,500", grad: "from-rose-200 to-rose-400", tag: "Hot" },
              { name: "AF1 · White", price: "5,200", grad: "from-zinc-100 to-zinc-300", tag: null },
              { name: "Yeezy · Zebra", price: "6,800", grad: "from-stone-200 to-stone-400", tag: "12" },
            ].map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-muted/40">
                <div className={`relative h-14 bg-gradient-to-br ${p.grad} flex items-center justify-center`}>
                  <div className="w-10 h-4 bg-white/75" style={{ clipPath: "polygon(0% 60%, 15% 30%, 35% 20%, 70% 25%, 100% 60%, 100% 100%, 0% 100%)" }} />
                  {p.tag && (
                    <span className="absolute top-1 right-1 bg-secondary text-white text-[8px] font-extrabold px-1 py-0.5 rounded uppercase tracking-wider">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="px-1.5 py-1">
                  <div className="text-[9px] font-semibold text-foreground truncate">{p.name}</div>
                  <div className="text-[9px] font-extrabold text-primary mt-0.5">KES {p.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky M-Pesa CTA */}
          <div className="px-3.5 pb-3.5">
            <div className="bg-primary text-black rounded-lg py-2 text-center text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-primary/30">
              <Wallet className="w-3.5 h-3.5" /> Pay with M-Pesa
            </div>
          </div>
        </motion.div>

        {/* Floating: Live now pill (anchored top-left, peeks above card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute -left-5 -top-5 bg-white rounded-2xl pl-2 pr-3.5 py-2 shadow-2xl flex items-center gap-2.5 z-20"
        >
          <div className="relative w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center shrink-0">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-60" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[9px] font-extrabold text-rose-600 uppercase tracking-wider leading-none">Live now</div>
            <div className="text-[11px] font-semibold text-foreground leading-none">47 watching</div>
          </div>
        </motion.div>

        {/* Floating: Order received card (peeks bottom-right, below CTA) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute -right-12 -bottom-10 bg-white rounded-2xl p-3 shadow-2xl flex items-center gap-2.5 z-20"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-foreground leading-tight">wanjiku99 paid</div>
            <div className="text-[10px] text-primary font-extrabold leading-tight mt-0.5">+KES 4,500 · M-Pesa</div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
        </motion.div>
      </div>

      {/* Tagline anchored bottom */}
      <div className="absolute bottom-10 left-12 right-12 text-white">
        <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-2">
          Your shop, ready in 3 minutes.
        </h2>
        <p className="text-white/80 text-sm font-medium">
          A storefront, M-Pesa checkout, and live-selling stack — built for African social sellers.
        </p>
      </div>
    </aside>
  );
}
