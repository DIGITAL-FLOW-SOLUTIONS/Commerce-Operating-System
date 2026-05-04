import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiveActivityTicker } from "@/components/LiveActivityTicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCreateLead, useListRecentLeads, useGetPlatformStats, useListShowcaseStores, useListTestimonials, getGetPlatformStatsQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Store, ShoppingBag, CreditCard, Play, CheckCircle2, TrendingUp, Facebook, Instagram, MessageCircle } from "lucide-react";
import { formatKES } from "@/lib/format";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [, setLocation] = useLocation();
  const [inputValue, setInputValue] = useState("");
  
  const createLead = useCreateLead();
  const { data: stats } = useGetPlatformStats({ query: { queryKey: getGetPlatformStatsQueryKey() } });
  const { data: recentLeads } = useListRecentLeads();
  const { data: showcase } = useListShowcaseStores();
  const { data: testimonials } = useListTestimonials();

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({ title: "Please enter a link or business name", variant: "destructive" });
      return;
    }
    
    let intentType: "scrape_facebook" | "scrape_instagram" | "explore" = "explore";
    const lowerInput = inputValue.toLowerCase();
    if (lowerInput.includes("facebook.com") || lowerInput.includes("fb.me")) intentType = "scrape_facebook";
    else if (lowerInput.includes("instagram.com") || lowerInput.includes("ig.me")) intentType = "scrape_instagram";

    createLead.mutate({
      data: {
        inputValue,
        source: "homepage_hero",
        intentType
      }
    }, {
      onSuccess: (data) => {
        localStorage.setItem("sokoa_session_token", data.sessionToken);
        window.location.href = `/build/?input=${encodeURIComponent(inputValue)}`;
      },
      onError: () => {
        window.location.href = `/build/?input=${encodeURIComponent(inputValue)}`;
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Sokoa | The OS for African Social Commerce" description="Turn your Facebook Page, Instagram, or TikTok into a fully functional online store with instant M-Pesa payouts." />
      <Navbar />
      <LiveActivityTicker />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 rounded-br-[100px] md:rounded-br-[200px]" />
        
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now supporting instant M-Pesa Till payouts
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Your social hustle,<br />now a <span className="text-primary">real business.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Drop your Facebook Page, Instagram, or business name below. We'll build you a beautiful online store with M-Pesa checkout in literally seconds.
            </p>

            <form onSubmit={handleHeroSubmit} className="relative flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
              <div className="relative flex-1">
                <Input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter FB/IG link or business name..." 
                  className="h-14 pl-4 pr-12 rounded-full border-2 border-primary/20 focus-visible:ring-primary text-base shadow-lg shadow-primary/5"
                  disabled={createLead.isPending}
                />
              </div>
              <Button 
                type="submit" 
                disabled={createLead.isPending}
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] shrink-0"
              >
                {createLead.isPending ? "Generating..." : "Generate Store"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground font-medium">Free account. No credit card required.</p>

            {/* Stats row */}
            {stats && (
              <div className="mt-12 flex items-center justify-center gap-8 border-t pt-8 max-w-xl mx-auto">
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">{stats.activeMerchants.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Sellers</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">{formatKES(stats.gmvProcessedKes)}</div>
                  <div className="text-sm text-muted-foreground font-medium">GMV Processed</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Live Activity Feed */}
      {recentLeads && recentLeads.length > 0 && (
        <div className="bg-foreground py-4 overflow-hidden border-y border-white/10">
          <div className="flex gap-8 whitespace-nowrap animate-in slide-in-from-right-full duration-1000">
            {/* Double the array for seamless marquee if needed, or just map */}
            {[...recentLeads, ...recentLeads].map((lead, i) => (
              <div key={`${lead.id}-${i}`} className="flex items-center gap-3 text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-medium">{lead.displayName}</span>
                <span className="text-white/50">from {lead.city}</span>
                <span className="text-white/50 italic text-sm">just joined</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">Everything you need, nothing you don't.</h2>
            <p className="text-lg text-muted-foreground">Stop juggling WhatsApp messages, M-Pesa screenshots, and Instagram DMs. Sokoa brings it all into one powerful dashboard.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted rounded-3xl p-8 hover:bg-muted/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm mb-6">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">Instant Storefront</h3>
              <p className="text-muted-foreground leading-relaxed">Your products, categories, and branding imported directly from your social profiles. Custom domain included.</p>
            </div>
            
            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 hover:bg-primary/10 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm mb-6">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">Native M-Pesa</h3>
              <p className="text-muted-foreground leading-relaxed">Zero manual reconciliation. Customers pay via STK push, and funds go directly to your Till or Paybill instantly.</p>
            </div>

            <div className="bg-muted rounded-3xl p-8 hover:bg-muted/80 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm mb-6">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">Inventory Sync</h3>
              <p className="text-muted-foreground leading-relaxed">Sell on TikTok, Facebook, and your site simultaneously without overselling. Stock updates in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook & Instagram Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
                <span className="flex items-center -space-x-1">
                  <Instagram className="w-4 h-4" />
                  <Facebook className="w-4 h-4" />
                </span>
                Built for Facebook & Instagram sellers
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
                Your DMs are not a checkout.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Sokoa reads your existing posts, captions, and prices on Facebook and Instagram and turns them into a real online store — with M-Pesa checkout, real inventory, and zero "How much sis?" replies.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  { icon: ShoppingBag, text: "Auto-import posts, carousels, Highlights and Page Albums" },
                  { icon: MessageCircle, text: "Smart DM replies that drop a one-tap M-Pesa checkout link" },
                  { icon: CreditCard, text: "Funds land in your Till instantly — no screenshots, no chasing" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-foreground/80 font-medium pt-1.5">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link href="/socials">
                <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-full font-bold text-lg">
                  See how FB & IG stores work <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative w-full max-w-[480px] mx-auto">
                {/* Main image */}
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white relative">
                  <img
                    src="/images/socials-fbig.png"
                    alt="Kenyan boutique seller managing her Instagram shop"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Instagram product card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -left-4 md:-left-12 bg-white rounded-2xl p-3 shadow-xl border border-border/50 w-[210px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold">@amani.beads</div>
                      <div className="text-[10px] text-muted-foreground font-medium">Instagram synced</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="aspect-square rounded bg-gradient-to-br from-amber-200 to-orange-300" />
                    <div className="aspect-square rounded bg-gradient-to-br from-emerald-200 to-primary/40" />
                    <div className="aspect-square rounded bg-gradient-to-br from-rose-200 to-pink-300" />
                    <div className="aspect-square rounded bg-gradient-to-br from-violet-200 to-purple-300" />
                    <div className="aspect-square rounded bg-gradient-to-br from-sky-200 to-blue-300" />
                    <div className="aspect-square rounded bg-gradient-to-br from-yellow-200 to-amber-300" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-2 text-center">42 products imported</div>
                </motion.div>

                {/* Floating Facebook order card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-4 md:-right-10 bg-white rounded-2xl p-4 shadow-xl border border-border/50 w-[240px]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">New order from Page</div>
                      <div className="text-[10px] text-muted-foreground font-medium">via Shop Now button</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="text-xs text-muted-foreground font-medium">M-Pesa Till • now</div>
                    <div className="font-bold text-base text-primary">+KES 2,800</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Section Highlight */}
      <section className="py-24 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[9/16] w-full max-w-[320px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-secondary/20 border-8 border-white/10 relative">
                <img src="/images/tiktok-live.png" alt="TikTok Live selling" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6 pt-20">
                  <div className="bg-white text-black p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        💄
                      </div>
                      <div>
                        <div className="font-bold text-sm">Fenty Gloss Bomb</div>
                        <div className="text-xs text-muted-foreground">KES 3,500</div>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full">Buy Now</Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20">
                <Play className="w-4 h-4 fill-current" /> Built for TikTok Live
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Turn viewers into buyers instantly.</h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Drop your Sokoa store link in your TikTok bio or stream chat. Viewers can browse your live inventory, checkout with M-Pesa, and complete the purchase without ever leaving the TikTok app browser.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Pay-per-hour pricing for live sessions', 'Instant checkout link dropping', 'Real-time stock alerts for scarcity'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/tiktok">
                <Button className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 rounded-full font-bold text-lg">
                  Explore Live Features <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase / Templates */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">See what others are building</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">From sneaker drops to handmade fashion, Sokoa powers Nairobi's most vibrant digital storefronts.</p>
            </div>
            <Link href="/templates">
              <Button variant="outline" className="rounded-full">View all stores</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcase?.slice(0, 3).map((store, i) => (
              <div key={store.id} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-muted relative">
                  <img src={`/images/store-${i + 1}.png`} alt={store.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="bg-white text-black hover:bg-gray-100 rounded-full font-bold">Visit Store</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground">{store.name}</h3>
                    <p className="text-muted-foreground text-sm">{store.category} • {store.city}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                    {store.coverEmoji}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Trusted by real hustlers</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials?.map((t) => (
              <div key={t.id} className="bg-muted/50 p-8 rounded-3xl border border-border/50">
                <div className="flex text-secondary mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <TrendingUp key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-8 font-medium leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl font-display">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
