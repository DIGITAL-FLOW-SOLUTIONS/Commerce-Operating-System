import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useCreateLead } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";
import {
  Play,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle2,
  Pin,
  ShoppingBag,
  Hash,
  Sparkles,
  Wallet,
  Bell,
  TrendingUp,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { StreamSimulator } from "@/components/StreamSimulator";

export default function TikTok() {
  const [, setLocation] = useLocation();
  const [handle, setHandle] = useState("");
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      toast({ title: "Add your TikTok handle first", variant: "destructive" });
      return;
    }

    createLead.mutate(
      {
        data: {
          inputValue: handle,
          source: "tiktok_page",
          intentType: "tiktok_live",
        },
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("sokoa_session_token", data.sessionToken);
          window.location.href = `/build/?input=${encodeURIComponent(`@${handle}`)}`;
        },
        onError: () => {
          window.location.href = `/build/?input=${encodeURIComponent(`@${handle}`)}`;
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="TikTok Live Selling for African Merchants | Sokoa"
        description="Turn viewers into buyers instantly with pay-per-hour stores designed specifically for TikTok Live. Drop a link, get paid in M-Pesa."
      />
      {/* Dark mode specific navbar for this page */}
      <div className="dark">
        <Navbar />
      </div>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-black" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-8 border border-secondary/30">
                <Play className="w-4 h-4 fill-current" /> Pay-per-hour Live Stores
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6">
                Don't lose buyers in the comments.
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
                Create a high-converting store that lives just for the duration of your stream. Drop the link, let them pay with M-Pesa, and watch the sales roll in real-time.
              </p>

              <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/50 font-medium">@</div>
                  <Input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace("@", ""))}
                    placeholder="your_tiktok_handle"
                    className="h-14 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-secondary text-base"
                    disabled={createLead.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createLead.isPending}
                  className="h-14 px-8 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-base transition-all hover:scale-[1.02] shrink-0"
                >
                  {createLead.isPending ? "Setting up..." : "Start Live Store"}
                </Button>
              </form>
              <p className="text-sm text-white/50 mt-4 pl-4">KES 50 / hour while live. Free otherwise.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-[400px] mx-auto"
            >
              <div className="aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-8 border-white/10 bg-zinc-900">
                <img
                  src="/images/tiktok-live.png"
                  alt="Live selling"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Simulated live UI overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <div className="bg-black/50 backdrop-blur-md rounded-full pl-1 pr-4 py-1 flex items-center gap-2 border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">LIVE</div>
                      <span className="text-sm font-medium">1.2k watching</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white text-black p-4 rounded-2xl shadow-xl animate-in slide-in-from-bottom-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-sm text-primary">Store is Live</div>
                        <div className="text-xs font-bold text-black/50">Pin to top</div>
                      </div>
                      <p className="text-sm font-medium mb-3">Buy today's featured products directly via M-Pesa. Tap the link below!</p>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 font-bold">
                        sokoa.shop/live/amani
                      </Button>
                    </div>

                    {/* Chat simulation */}
                    <div className="space-y-2 max-h-32 overflow-hidden">
                      <div className="text-sm">
                        <span className="font-bold opacity-70">mumbi:</span> is the red available?
                      </div>
                      <div className="text-sm">
                        <span className="font-bold opacity-70">wanjiku99:</span> buying right now!!
                      </div>
                      <div className="text-sm text-secondary font-bold">wanjiku99 just bought</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 3-card features */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <Clock className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Pay per hour</h3>
              <p className="text-white/60">Why pay a monthly subscription if you only sell live twice a week? KES 50 per hour only when your store is active.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <Zap className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Frictionless Checkout</h3>
              <p className="text-white/60">No account creation for buyers. Just enter phone number, receive M-Pesa prompt, and done. Lightning fast.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <ArrowRight className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Instant Payouts</h3>
              <p className="text-white/60">The money goes straight to your Paybill or Till number. Sokoa doesn't hold your funds hostage.</p>
            </div>
          </div>
        </div>
      </section>
      {/* How a Live store works — 4 steps */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4 border border-secondary/20">
              How it works
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Open a store at the start of your stream. Close it at the end.
            </h2>
            <p className="text-white/70 text-lg">
              No subscriptions, no monthly bills. Pay only for the hours your audience is watching and buying.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                step: "01",
                title: "Tap 'Go Live' inside Sokoa",
                body: "Pick the products you'll be showcasing tonight. Set your live price. Sokoa spins up a single-session storefront in 5 seconds.",
              },
              {
                step: "02",
                title: "Drop the link in your live",
                body: "Copy your sokoa.shop/live/handle URL into your TikTok bio, pinned comment, or pre-stream caption. Auto-pinned for the duration.",
              },
              {
                step: "03",
                title: "Viewers tap, pay with M-Pesa",
                body: "No app install, no signup, no leaving TikTok. STK push hits their phone in 2 seconds. Confirmation lands back in chat.",
              },
              {
                step: "04",
                title: "Hit 'End Stream' — store closes",
                body: "Your store goes back to sleep. You only pay for the hours it was live. Money is already in your Till.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-6 hover:border-secondary/30 transition-colors"
              >
                <div className="text-4xl font-display font-extrabold text-secondary/40 leading-none shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-display">{s.title}</h3>
                  <p className="text-white/60 leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* What goes inside a Live store */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
              Built for the rhythm of a live stream.
            </h2>
            <p className="text-lg text-white/70">
              Every feature is designed for the chaos of a live audience: comments flying, products selling out, and you needing to keep the energy up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Pin,
                title: "Auto-pinned link",
                body: "Your storefront link stays pinned to the top of chat for the whole stream. No re-typing.",
              },
              {
                icon: Hash,
                title: "Drop codes per product",
                body: "Shout 'reply CODE 03 for the green hoodie' and viewers get a one-click checkout for that exact item.",
              },
              {
                icon: Bell,
                title: "Real-time stock alerts",
                body: "When stock hits 3, 1, then 0 — Sokoa surfaces it on your screen so you can create urgency live.",
              },
              {
                icon: Sparkles,
                title: "Flash deals on the fly",
                body: "Slash 20% on a slow-moving product mid-stream with one tap. Auto-revert when the timer ends.",
              },
              {
                icon: Wallet,
                title: "M-Pesa receipts in chat",
                body: "Every successful payment auto-posts 'wanjiku99 just grabbed the red dress' — instant social proof.",
              },
              {
                icon: Eye,
                title: "Co-host dashboard",
                body: "Your moderator sees orders, stock, and payouts on a separate screen so you can stay on camera.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Interactive stream simulator */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute -top-20 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-4 border border-secondary/30">
              <Play className="w-4 h-4 fill-current" /> Try it live
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Run a fake live stream. See how it feels.
            </h2>
            <p className="text-white/70 text-lg">
              Tap Go Live, then trigger product drops and flash sales. Watch viewers, comments, and M-Pesa orders roll in just like a real Tuesday-evening drop.
            </p>
          </div>

          <StreamSimulator />
        </div>
      </section>
      {/* Pricing — what an actual live session costs */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 font-bold text-sm mb-6 border border-white/20">
                <Clock className="w-4 h-4" /> The math, plain and simple
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                A 3-hour live costs you KES 150.
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Every other platform makes you pay a monthly subscription whether you sell or not. Sokoa charges by the hour you're actually live and selling — nothing else.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "No setup fees, no monthly minimums",
                  "Stops billing the moment you end the stream",
                  "Sokoa never takes a cut of M-Pesa payments",
                  "First 10 hours of live selling are on us",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing">
                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 px-6 font-bold">
                  See full pricing <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div>
                    <div className="text-xs text-white/50 font-medium mb-1">TUESDAY EVENING DROP</div>
                    <div className="font-bold text-lg font-display">@amani.kicks</div>
                  </div>
                  <div className="bg-secondary/20 text-secondary text-xs font-bold rounded-full px-3 py-1.5 border border-secondary/30">
                    LIVE 03:14
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Hours streamed</span>
                    <span className="font-bold">3 hrs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Sokoa Live fee</span>
                    <span className="font-bold">KES 150</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Orders processed</span>
                    <span className="font-bold">42</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">M-Pesa fees (you keep 100%)</span>
                    <span className="font-bold text-secondary">KES 0</span>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/50 font-medium">Net payout to your Till</div>
                      <div className="text-2xl font-bold font-display">KES 84,200</div>
                    </div>
                    <TrendingUp className="w-10 h-10 text-secondary" />
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 text-sm text-white/50 font-medium">
                Real session from a Nairobi sneaker reseller, March 2025
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pinned-comment-to-checkout */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white/10 max-w-[420px] mx-auto">
                <img
                  src="/images/tiktok-creator.png"
                  alt="TikTok creator filming a live shopping stream"
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-2 md:-right-8 bg-white text-foreground rounded-2xl p-4 shadow-2xl w-[260px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Order placed</div>
                    <div className="text-[10px] text-muted-foreground font-medium">Reply code: AJ7 · Air Jordans</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div className="text-xs text-muted-foreground font-medium">M-Pesa Till · now</div>
                  <div className="font-bold text-base text-primary">+KES 4,500</div>
                </div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 font-bold text-sm mb-6 border border-white/20">
                <Pin className="w-4 h-4" /> Pinned-comment-to-checkout
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Every "drop the link" comment becomes a sale.
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">Sokoa watches your live chat for keywords like "link", "drop", or your product reply codes — and instantly DMs the right checkout link to that viewer. You stay on camera, Sokoa does the work.</p>

              <ul className="space-y-4 mb-10">
                {[
                  "Auto-detects buy intent and product code from chat",
                  "DMs a one-tap M-Pesa link to that exact viewer",
                  "Posts payment confirmations as social proof in chat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/features">
                <Button className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 rounded-full font-bold text-lg">
                  See all live features <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Quick answers, before you ask
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "Do I need a TikTok Shop account?",
                a: "No. Sokoa works with any TikTok account — Creator, Business, or personal — by sitting alongside your live, not inside TikTok Shop.",
              },
              {
                q: "What if my live runs longer than expected?",
                a: "You're billed per minute after the first hour. A 90-minute stream costs KES 75. The store auto-closes when you end the stream.",
              },
              {
                q: "Can my buyers in Tanzania or Uganda pay too?",
                a: "Yes. We support M-Pesa Kenya, M-Pesa Tanzania, MTN MoMo Uganda, and Airtel Money on the same checkout.",
              },
              {
                q: "What happens to my store between streams?",
                a: "It hibernates. The link still works, but it shows your 'next live in...' countdown so viewers can come back. Zero cost while idle.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold mb-2 font-display">{item.q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-secondary to-orange-600 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight text-white">
                Your next live should pay for itself.
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Set up your first TikTok Live store in under 90 seconds. Your first 10 live hours are on us.
              </p>
              <Link href="/signup?intent=tiktok">
                <Button className="bg-white text-secondary hover:bg-white/90 h-14 px-10 rounded-full font-bold text-lg">
                  Start free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="dark">
        <Footer />
      </div>
    </div>
  );
}
