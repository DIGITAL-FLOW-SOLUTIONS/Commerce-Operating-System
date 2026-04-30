import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Package,
  Globe,
  Smartphone,
  BellRing,
  Settings,
  CheckCircle2,
  Sparkles,
  Boxes,
  Receipt,
  Users,
  FileText,
  TrendingUp,
  Zap,
  Quote,
  X,
  Minus,
  Instagram,
  Facebook,
  Store,
  MessageCircle,
} from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";

export default function Boutique() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Boutique Management | Sokoa"
        description="The professional dashboard for serious African merchants. Manage inventory, orders, payouts, and team — across every channel — from one mobile-first store."
      />
      <Navbar />
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute top-32 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" /> For Serious Merchants
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                Stop running your business on <span className="text-primary">WhatsApp DMs.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">Sokoa Boutique is the professional-grade management surface for your growing Boutique. Track inventory, analyze sales, and process orders from a beautiful, mobile-first dashboard.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                    Start 14-day trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="h-14 px-8 rounded-full font-bold text-base bg-white">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4 pl-4">
                No credit card required. Cancel anytime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border bg-muted">
                <img src="/images/boutique.png" alt="Sokoa Boutique Dashboard" className="w-full h-full object-cover" />
              </div>

              {/* Floating revenue card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Revenue Today</div>
                    <div className="text-xl font-bold text-foreground">KES 45,200</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating low-stock alert */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-border/50 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/15 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">3 left · Emerald Wrap</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Synced across 4 channels</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Feature grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              The toolkit
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              Everything a modern boutique needs.
            </h2>
            <p className="text-lg text-muted-foreground">Every tool a Nairobi boutique, a Kisumu reseller, or a Mombasa boutique owner has been hacking together in WhatsApp, Excel, and DMs — finally in one place.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Custom Domains", desc: "Connect your own .com or .co.ke domain to build brand authority." },
              { icon: Package, title: "Multi-channel Inventory", desc: "Sync stock across your website, TikTok, and physical store automatically." },
              { icon: Smartphone, title: "Mobile Dashboard", desc: "Manage everything from your phone. No laptop required." },
              { icon: BellRing, title: "Order Notifications", desc: "Get instant alerts for new orders and M-Pesa payments." },
              { icon: BarChart3, title: "Deep Analytics", desc: "Know your best-selling products and most valuable customers." },
              { icon: Settings, title: "Custom Themes", desc: "Match your storefront to your brand with premium templates." },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Build in 3 minutes. Sell to millions. */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
              <Zap className="w-4 h-4" /> The promise
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-foreground tracking-tight leading-[1.05]">
              Build in 3 minutes.
              <br />
              <span className="text-primary">Sell to millions.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Spinning up a real, payment-ready store should take less time than queuing for a matatu. Reaching every buyer in your city should not take a marketing degree.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Build in 3 minutes */}
            <div className="bg-gradient-to-br from-primary/5 via-white to-primary/5 rounded-3xl p-8 md:p-10 border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-display font-extrabold text-xl">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">Build in</div>
                  <div className="text-2xl font-display font-bold text-foreground">3 minutes</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                We did the math. The average new merchant goes from sign-up to first live storefront in under 180 seconds.
              </p>

              <ul className="space-y-4">
                {[
                  { time: "0:00 – 0:30", body: "Sign up with your phone number. Pick a store name and Sokoa reserves your free sokoa.shop subdomain." },
                  { time: "0:30 – 2:00", body: "Drop your Instagram handle or Facebook Page. Sokoa imports your photos, captions, and prices automatically." },
                  { time: "2:00 – 3:00", body: "Paste your M-Pesa Till or Paybill, pick a theme colour, and tap Publish. You're live." },
                ].map((item) => (
                  <li key={item.time} className="flex items-start gap-4">
                    <div className="text-xs font-mono font-bold text-primary bg-primary/10 rounded-full px-3 py-1 shrink-0 mt-0.5">
                      {item.time}
                    </div>
                    <span className="text-foreground/80 text-sm leading-relaxed">{item.body}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-primary/15 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-display font-extrabold text-foreground">12,400+</div>
                  <div className="text-xs text-muted-foreground font-medium">Stores built on Sokoa this year</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Sell to millions */}
            <div className="bg-gradient-to-br from-secondary/5 via-white to-secondary/5 rounded-3xl p-8 md:p-10 border border-secondary/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-secondary">Sell to</div>
                  <div className="text-2xl font-display font-bold text-foreground">Millions of buyers</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                One Sokoa store, six surfaces. Your products show up wherever your buyers already scroll, swipe, or search.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Store, label: "sokoa.shop store", reach: "Your storefront" },
                  { icon: Instagram, label: "Instagram bio link", reach: "2.4M users in Kenya" },
                  { icon: Facebook, label: "Facebook Page", reach: "12M users in Kenya" },
                  { icon: SiTiktok, label: "TikTok Live link", reach: "10.5M users in Kenya" },
                  { icon: SiWhatsapp, label: "WhatsApp catalogue", reach: "21M users in Kenya" },
                  { icon: MessageCircle, label: "DM auto-reply links", reach: "Every buyer who asks" },
                ].map((channel) => (
                  <div
                    key={channel.label}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 border border-border/40"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <channel.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-foreground truncate">{channel.label}</div>
                      <div className="text-[11px] text-muted-foreground font-medium truncate">{channel.reach}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-secondary/15 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-display font-extrabold text-foreground">~58M</div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Combined reach across the surfaces Sokoa publishes to
                  </div>
                </div>
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard tour */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white max-w-[440px] mx-auto bg-muted">
                <img
                  src="/images/boutique.png"
                  alt="Sokoa Boutique dashboard on a phone"
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-border/50 max-w-[220px]"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Top product · today
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Emerald wrap</div>
                    <div className="text-xs text-muted-foreground font-medium">17 sold</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-2 md:-right-8 bg-white text-foreground rounded-2xl p-4 shadow-2xl w-[260px] border border-border/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">M-Pesa reconciled</div>
                    <div className="text-[10px] text-muted-foreground font-medium">42 of 42 orders matched</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div className="text-xs text-muted-foreground font-medium">Net to Till · today</div>
                  <div className="font-bold text-base text-primary">KES 45,200</div>
                </div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                The dashboard
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">Run the whole boutique from your front pocket.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Everything that used to live in three notebooks, two WhatsApp groups, and one very chaotic Excel sheet — now sits on a single screen, designed for thumbs and matatu lighting.
              </p>

              <ul className="space-y-5 mb-10">
                {[
                  { title: "Live revenue", body: "Every M-Pesa payment lands as a notification, then rolls up into today / week / month with one swipe." },
                  { title: "Stock at a glance", body: "Red, amber, green dots tell you what's selling, what's slow, and what to restock before the weekend." },
                  { title: "Repeat-buyer signals", body: "See which customers have bought 3+ times — perfect for a quick WhatsApp 'asante, here's a code'." },
                  { title: "One-tap reconciliation", body: "Sokoa matches every M-Pesa receipt to the right order. No more guessing whose payment is whose." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-foreground font-display mb-1">{item.title}</div>
                      <div className="text-muted-foreground text-sm leading-relaxed">{item.body}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link href="/features">
                <Button variant="outline" className="rounded-full h-12 px-6 font-bold bg-white">
                  See every dashboard feature <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Operational scenarios */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              Run your back office like a pro.
            </h2>
            <p className="text-lg text-muted-foreground">
              We built Boutique around the days that actually happen in a Kenyan shop. Restock day. Drop day. Cashbook day. KRA day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Boxes,
                title: "Restock Wednesdays",
                body: "Bulk-edit prices, scan in stock from Gikomba, and push the new quantities to all your channels in one tap.",
              },
              {
                icon: Sparkles,
                title: "Drop Fridays",
                body: "Schedule a product drop with a countdown timer. Buyers join a waitlist; the store opens automatically at the time you set.",
              },
              {
                icon: Users,
                title: "Team & roles",
                body: "Add a delivery rider, an in-store assistant, and your accountant. Each one sees only what they need — no more.",
              },
              {
                icon: FileText,
                title: "KRA-ready reports",
                body: "Monthly sales, M-Pesa reconciliation, and VAT-ready exports — formatted for your tax filing without a spreadsheet in sight.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-muted/40 rounded-3xl p-7 border border-border/40 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-display">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Comparison table */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
              The honest comparison.
            </h2>
            <p className="text-muted-foreground text-lg">
              We're not the only way to run a shop in Kenya. We're just the one built for how you actually sell.
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="min-w-[680px] bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-muted/50 border-b border-border/50">
                <div className="p-5 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  What you need
                </div>
                <div className="p-5 text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Sokoa</div>
                  <div className="font-display font-bold text-foreground">Boutique</div>
                </div>
                <div className="p-5 text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">The classic</div>
                  <div className="font-display font-bold text-foreground">WhatsApp DMs</div>
                </div>
                <div className="p-5 text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">The expensive one</div>
                  <div className="font-display font-bold text-foreground">Shopify</div>
                </div>
              </div>

              {[
                { feat: "M-Pesa Till checkout out of the box", sokoa: true, dm: false, shopify: "addon" },
                { feat: "Multi-channel inventory sync", sokoa: true, dm: false, shopify: "addon" },
                { feat: "Mobile-first dashboard", sokoa: true, dm: true, shopify: false },
                { feat: "KRA-ready monthly reports", sokoa: true, dm: false, shopify: false },
                { feat: "Auto reconcile M-Pesa receipts", sokoa: true, dm: false, shopify: false },
                { feat: "Live shopping & drop-day tools", sokoa: true, dm: false, shopify: false },
                { feat: "Setup time", sokoa: "3 min", dm: "0 min", shopify: "Days" },
                { feat: "Monthly cost (starter)", sokoa: "KES 0", dm: "KES 0", shopify: "USD 39+" },
              ].map((row, i) => (
                <div
                  key={row.feat}
                  className={`grid grid-cols-4 ${i !== 7 ? "border-b border-border/40" : ""}`}
                >
                  <div className="p-5 text-sm font-medium text-foreground">{row.feat}</div>
                  <div className="p-5 text-center bg-primary/5">
                    {typeof row.sokoa === "boolean" ? (
                      row.sokoa ? (
                        <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span className="font-bold text-primary text-sm">{row.sokoa}</span>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    {typeof row.dm === "boolean" ? (
                      row.dm ? (
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground/60 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium text-muted-foreground text-sm">{row.dm}</span>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    {typeof row.shopify === "boolean" ? (
                      row.shopify ? (
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground/60 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      )
                    ) : row.shopify === "addon" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Minus className="w-3 h-3" /> paid add-on
                      </span>
                    ) : (
                      <span className="font-medium text-muted-foreground text-sm">{row.shopify}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-primary/40 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-4xl font-display font-bold leading-tight tracking-tight mb-10">
              I used to spend my Sunday evenings counting money against a notebook and arguing with M-Pesa receipts. Now Boutique does it before I even close the shop.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-xl">
                W
              </div>
              <div className="text-left">
                <div className="font-bold font-display">Wanjiku Kamau</div>
                <div className="text-sm text-white/60 font-medium">Owner, Nyota Boutique · Westlands, Nairobi</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10 max-w-3xl mx-auto">
              {[
                { stat: "4.2x", label: "Average order growth in 90 days" },
                { stat: "11 hrs", label: "Saved per week on admin" },
                { stat: "100%", label: "Of M-Pesa receipts auto-matched" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-display font-extrabold text-primary mb-1">
                    {s.stat}
                  </div>
                  <div className="text-xs md:text-sm text-white/60 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Quick answers, before you ask
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "Do I need a laptop to run Boutique?",
                a: "No. Everything works from your phone — adding products, fulfilling orders, exporting reports. We tested it on a Tecno Spark.",
              },
              {
                q: "Can I keep selling on WhatsApp too?",
                a: "Absolutely. Sokoa generates per-product checkout links you can paste into any WhatsApp chat. Stock and orders all sync back.",
              },
              {
                q: "What about my existing customers?",
                a: "Import them from a CSV or your phone contacts. Their order history, addresses, and notes all live in one customer profile.",
              },
              {
                q: "Will Sokoa hold my money?",
                a: "Never. M-Pesa payments land directly in your Till or Paybill. We only ever charge our subscription — and you can cancel any time.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-muted/40 rounded-2xl p-6 border border-border/40">
                <h3 className="font-bold text-foreground mb-2 font-display">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                Your shop deserves a real back office.
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                14 days of Boutique on us. No card up front. Bring your handle, your Till, and one product — we'll do the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-full font-bold text-lg">
                    Start 14-day trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="h-14 px-8 rounded-full font-bold text-base bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                    See pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
