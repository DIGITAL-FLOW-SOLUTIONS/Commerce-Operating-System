import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useCreateLead } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";
import {
  Timer,
  Ticket,
  ShieldCheck,
  Flame,
  ArrowRight,
  CheckCircle2,
  Lock,
  Wallet,
  Bell,
  Hash,
  ScanLine,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

function CountdownTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[64px]">
      <span className="text-2xl md:text-3xl font-display font-extrabold text-white tabular-nums">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{label}</span>
    </div>
  );
}

function useDropCountdown() {
  // Always set the countdown to 23h 59m 12s ahead of "now" so it always feels live.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const target = now + 1000 * (60 * 60 * 23 + 60 * 59 + 12);
  const diff = Math.max(0, target - now);
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return {
    h: String(hours).padStart(2, "0"),
    m: String(minutes).padStart(2, "0"),
    s: String(seconds).padStart(2, "0"),
  };
}

export default function Sneakers() {
  const [, setLocation] = useLocation();
  const [handle, setHandle] = useState("");
  const createLead = useCreateLead();
  const { h, m, s } = useDropCountdown();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      toast({ title: "Add your store name or IG handle first", variant: "destructive" });
      return;
    }

    createLead.mutate(
      {
        data: {
          inputValue: handle,
          source: "sneakers_page",
          intentType: "signup",
        },
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("sokoa_session_token", data.sessionToken);
          setLocation("/signup?intent=sneakers");
        },
        onError: () => {
          setLocation("/signup?intent=sneakers");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Sokoa for Sneakerheads — Hype drops, raffles, M-Pesa | Sokoa"
        description="Run hyped sneaker drops in Nairobi without the chaos. Pre-drop countdowns, raffle-style stock allocation, and resale-protection — all with M-Pesa checkout."
      />

      <div className="dark">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-black to-secondary/10" />
        <div className="absolute top-32 -left-32 w-[28rem] h-[28rem] bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 text-red-400 font-bold text-sm mb-8 border border-red-500/30">
                <Flame className="w-4 h-4 fill-current" /> Built for Nairobi sneakerheads
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-6">
                Drop your heat.{" "}
                <span className="bg-gradient-to-r from-red-400 to-secondary bg-clip-text text-transparent">
                  Without the chaos.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
                Stop juggling DMs, M-Pesa screenshots and angry "you said it was mine" comments. Run timed drops with real raffles, real waitlists, and bot-blocked checkout.
              </p>

              <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/50 font-medium">@</div>
                  <Input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.replace("@", ""))}
                    placeholder="your_store_handle"
                    className="h-14 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-red-500 text-base"
                    disabled={createLead.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createLead.isPending}
                  className="h-14 px-8 rounded-full bg-red-500 hover:bg-red-500/90 text-white font-bold text-base transition-all hover:scale-[1.02] shrink-0"
                >
                  {createLead.isPending ? "Setting up..." : "Plan your drop"}
                </Button>
              </form>
              <p className="text-sm text-white/50 mt-4 pl-4">Free to set up. KES 80 / pair sold. No drop fees.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-[460px] mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={`${import.meta.env.BASE_URL}images/sneakers-hero.png`}
                  alt="Kenyan sneaker reseller showing off a fresh pair"
                  className="w-full h-auto block"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                {/* Floating drop card */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">Drop in</span>
                  </div>
                  <div className="bg-secondary text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                    240 watching
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
                    <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Air Jordan 4 · Red Cement</div>
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="font-display font-extrabold text-2xl">KES 18,500</div>
                      <div className="text-xs text-white/50">12 pairs · sizes 39–46</div>
                    </div>
                    <div className="flex items-end justify-center gap-2">
                      <CountdownTile label="hrs" value={h} />
                      <span className="text-white/40 font-bold text-2xl pb-3">:</span>
                      <CountdownTile label="min" value={m} />
                      <span className="text-white/40 font-bold text-2xl pb-3">:</span>
                      <CountdownTile label="sec" value={s} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three feature pillars */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest mb-5">
              The three pains
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              Hype kills hustle. We fix three things.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Timer,
                title: "The countdown",
                pain: "You post 'drop at 8pm' and at 7:58 your DMs are 600 deep. Half your buyers miss it.",
                fix: "Schedule the drop. Sokoa publishes a public timer page, sends WhatsApp + SMS reminders 1 hour and 5 mins before, and unlocks checkout exactly on cue.",
              },
              {
                icon: Ticket,
                title: "The raffle",
                pain: "You've got 12 pairs and 80 'I want size 42' comments. Whoever you pick, the rest call you a fraud.",
                fix: "Buyers reserve a slot for KES 100 (refundable). At drop time we randomly draw winners by size. Losers get an instant M-Pesa refund. No bias, no beef.",
              },
              {
                icon: ShieldCheck,
                title: "The resellers",
                pain: "Bots, multi-account scalpers, and that one guy buying 6 pairs to flip on Jiji at 2x.",
                fix: "Phone-verified accounts only. Per-buyer cap (default: 1 pair). M-Pesa name-match required at checkout. Bots get a captcha they cannot pass.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-7 hover:border-red-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 italic">{f.pain}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/80 text-sm leading-relaxed">{f.fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How a drop runs */}
      <section className="py-20 md:py-28 relative bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-xs uppercase tracking-widest mb-5">
              How a Sokoa drop runs
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              From restock photo to "shipped" in 4 days.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                step: "01",
                title: "T–4 days · Tease the heat",
                body: "Upload your restock pics, set your raffle window (we suggest 48h), and pick your KES price. Sokoa generates a public drop page with a countdown and a 'reserve your spot' button.",
              },
              {
                step: "02",
                title: "T–48h · Open the raffle",
                body: "Buyers pay KES 100 to reserve their size. They get a ticket number. Live counter shows how many entries per size. WhatsApp blast sent to your previous customers.",
              },
              {
                step: "03",
                title: "T–0 · Random draw",
                body: "At drop time, Sokoa runs the draw — provably random, sortable by size. Winners get an M-Pesa STK push for the full price. Losers get their KES 100 back in seconds.",
              },
              {
                step: "04",
                title: "T+72h · Ship & rate",
                body: "Buyers track shipping inside Sokoa. After delivery they leave you a verified review tied to their M-Pesa number. Future drops get higher trust scores.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex gap-5"
              >
                <div className="font-display font-extrabold text-3xl text-red-400 shrink-0">{step.step}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Anti-bot / resale protection deep dive */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest mb-5">
                Resale protection
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-6">
                Real fans first.{" "}
                <span className="text-red-400">Flippers blocked.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Every drop on Sokoa runs through four bot-and-flipper filters before checkout opens. You set the rules — we enforce them.
              </p>

              <ul className="space-y-4">
                {[
                  { icon: Lock, label: "Phone + M-Pesa name match", body: "The Safaricom name on the M-Pesa payment must match the verified profile name. No multi-account farms." },
                  { icon: Hash, label: "Per-buyer pair cap", body: "Default 1 pair per drop, configurable per buyer or VIP tier. Even if they win two raffle slots, only one converts." },
                  { icon: ScanLine, label: "Device fingerprint", body: "We block repeat IPs, emulators, and the common reseller checkout bots. No data sold or stored beyond the drop." },
                  { icon: Bell, label: "VIP early access", body: "Reward your loyal customers (verified by previous purchases) with a 30-min head start before the public raffle opens." },
                ].map((rule) => (
                  <li key={rule.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <rule.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{rule.label}</div>
                      <div className="text-sm text-white/60">{rule.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock raffle dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-widest">Live raffle</div>
                    <div className="font-display font-bold text-xl">AJ4 · Red Cement</div>
                  </div>
                  <div className="bg-red-500/15 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full border border-red-500/30">
                    DRAW IN 02:14:08
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { size: "EU 39", entries: 8, pairs: 1 },
                    { size: "EU 41", entries: 23, pairs: 2 },
                    { size: "EU 42", entries: 47, pairs: 3 },
                    { size: "EU 43", entries: 38, pairs: 3 },
                    { size: "EU 44", entries: 19, pairs: 2 },
                    { size: "EU 46", entries: 4, pairs: 1 },
                  ].map((row) => {
                    const odds = Math.min(100, Math.round((row.pairs / row.entries) * 100));
                    return (
                      <div key={row.size}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-semibold">{row.size}</span>
                          <span className="text-white/50 tabular-nums">
                            {row.entries} entries · {row.pairs} pair{row.pairs > 1 ? "s" : ""} · ~{odds}% odds
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-secondary rounded-full"
                            style={{ width: `${Math.min(100, (row.entries / 50) * 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/50">Reservations collected</div>
                    <div className="font-display font-bold text-2xl tabular-nums">KES 13,900</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/50">Expected payout</div>
                    <div className="font-display font-bold text-2xl text-red-400 tabular-nums">KES 222,000</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-xs uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              You don't pay until you sell.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-500/10 via-white/[0.03] to-secondary/10 border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display font-extrabold text-6xl text-white tabular-nums">KES 80</span>
              <span className="text-white/60 text-lg">/ pair sold</span>
            </div>
            <p className="text-white/70 mb-8">
              That's it. No drop fees, no monthly subscription, no per-raffle-entry charge. We take KES 80 from each successful sale, on top of Safaricom's standard M-Pesa fee.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                "Unlimited drops per month",
                "Unlimited raffle entries",
                "WhatsApp + SMS blasts included",
                "Bot & flipper protection",
                "Verified buyer reviews",
                "Drop analytics dashboard",
              ].map((perk) => (
                <div key={perk} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{perk}</span>
                </div>
              ))}
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Sample drop math</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-white/60">12 pairs × KES 18,500</span><span className="font-semibold tabular-nums">KES 222,000</span></div>
                <div className="flex justify-between"><span className="text-white/60">Sokoa fee (12 × KES 80)</span><span className="font-semibold tabular-nums text-red-400">– KES 960</span></div>
                <div className="flex justify-between"><span className="text-white/60">M-Pesa fee (Safaricom)</span><span className="font-semibold tabular-nums">– KES 660</span></div>
                <div className="border-t border-white/10 mt-2 pt-2 flex justify-between"><span className="font-bold">Lands in your Till</span><span className="font-display font-bold text-xl tabular-nums">KES 220,380</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { num: "1,420", label: "Pairs sold via Sokoa drops" },
              { num: "94%", label: "Drops sell out under 2 min" },
              { num: "0", label: "Disputed M-Pesa refunds last quarter" },
              { num: "47", label: "Verified Nairobi sneaker stores" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-extrabold text-4xl bg-gradient-to-br from-red-400 to-secondary bg-clip-text text-transparent tabular-nums">
                  {stat.num}
                </div>
                <div className="text-sm text-white/50 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-12 text-center">
              Questions sneakerheads ask.
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What stops scalpers from creating 10 fake accounts?",
                  a: "Every Sokoa account is tied to a real Safaricom number. Reservations, raffle entries, and payments all run against that number. Multi-accounting is technically possible but requires multiple SIM cards under different national IDs — way more friction than scalpers will tolerate for a 12-pair drop.",
                },
                {
                  q: "What if my drop doesn't sell out?",
                  a: "Unsold pairs roll over to a 'second-chance' list. Raffle losers get first dibs at the original price for 24 hours. After that the drop closes and you can repackage as a regular store listing.",
                },
                {
                  q: "Can I run drops for non-sneaker items? Hoodies, jerseys?",
                  a: "Yes. Anything sized and limited works — hoodies, vintage jerseys, custom apparel, even concert merch. We just default the language to sneakers because that's our biggest cohort.",
                },
                {
                  q: "How do refunds for raffle losers work?",
                  a: "The KES 100 reservation is held in M-Pesa escrow. The moment the draw runs, losing reservations are reversed automatically — buyers see the refund in under 60 seconds. Winners' KES 100 gets credited toward the full pair price.",
                },
                {
                  q: "Do I need a registered business?",
                  a: "No. A personal Safaricom Till or M-Pesa Paybill is enough to get paid. Once you cross KES 500k in monthly drops we'll nudge you toward registering, but it's never required.",
                },
              ].map((item, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                    <span className="font-semibold text-base md:text-lg">{item.q}</span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-red-500 to-secondary rounded-3xl p-10 md:p-16 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
            <div className="relative text-center">
              <Sparkles className="w-10 h-10 mx-auto mb-5 text-white/90" />
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-5">
                Got a restock pic on your camera roll?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
                Plan your next drop in 4 minutes. We'll have a public drop page, a countdown timer, and a verified raffle ready before you finish your tea.
              </p>
              <Link href="/signup?intent=sneakers">
                <Button className="h-14 px-8 rounded-full bg-black text-white hover:bg-black/80 font-bold text-base">
                  Start a drop free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-white/80 mt-4 flex items-center justify-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> 47 Nairobi stores already running drops on Sokoa
              </p>
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
