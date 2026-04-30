import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, ShoppingBag, Wallet, Play } from "lucide-react";
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
                className="w-full h-12 rounded-xl font-bold text-base bg-primary text-black hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none shadow-lg shadow-primary/20 transition-all"
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
      {/* Decorative ambient blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Composition */}
      <div className="relative w-full max-w-[460px] aspect-[4/5]">
        {/* Center: faux TikTok-style phone frame */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute inset-x-12 top-8 bottom-12 rounded-[2rem] bg-zinc-900 border-[6px] border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Stream gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 via-zinc-900 to-zinc-900" />

          {/* LIVE pill */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-secondary text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Play className="w-2.5 h-2.5 fill-current" /> LIVE
          </div>
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            1.2k watching
          </div>

          {/* Center seller silhouette */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-secondary to-pink-600 opacity-90 blur-sm" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 via-secondary to-rose-500" />

          {/* Bottom drawer: storefront link */}
          <div className="absolute inset-x-3 bottom-3 bg-white rounded-2xl p-3 shadow-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Store is live
              </div>
            </div>
            <div className="text-xs font-semibold text-foreground mb-2 truncate">
              Tap to shop today's drop · M-Pesa
            </div>
            <div className="bg-primary text-white text-[11px] font-bold rounded-lg py-2 text-center">
              sokoa.shop/live/amani
            </div>
          </div>
        </motion.div>

        {/* Floating: "Order placed" card */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -left-6 top-20 bg-white rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 max-w-[220px]"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-foreground">wanjiku99 just bought</div>
            <div className="text-[10px] text-muted-foreground font-medium truncate">
              Emerald wrap dress · M
            </div>
          </div>
        </motion.div>

        {/* Floating: M-Pesa receipt */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute -right-4 top-44 bg-white rounded-2xl p-3.5 shadow-2xl max-w-[200px]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              M-Pesa · just now
            </div>
          </div>
          <div className="text-base font-display font-extrabold text-primary">+KES 4,500</div>
          <div className="text-[10px] text-muted-foreground font-medium">to your Till</div>
        </motion.div>

        {/* Floating: handle pill (lower-left) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="absolute -left-2 bottom-16 bg-white/95 backdrop-blur rounded-full pl-1 pr-4 py-1 shadow-xl flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 via-secondary to-yellow-400 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="text-xs font-bold text-foreground">@amani.kicks</span>
        </motion.div>
      </div>

      {/* Tagline anchored bottom */}
      <div className="absolute bottom-10 left-12 right-12 text-white">
        <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-2">
          Sell live. Get paid in M-Pesa. Today.
        </h2>
        <p className="text-white/80 text-sm font-medium">
          The store, payments &amp; live-selling stack for African social sellers.
        </p>
      </div>
    </aside>
  );
}
