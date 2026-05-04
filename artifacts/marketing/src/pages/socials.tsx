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
  Facebook,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Image as ImageIcon,
  Tag,
  Wallet,
  Layers,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

type Platform = "facebook" | "instagram";

export default function Socials() {
  const [, setLocation] = useLocation();
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [handle, setHandle] = useState("");
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) {
      toast({ title: "Add your handle or page link first", variant: "destructive" });
      return;
    }

    createLead.mutate(
      {
        data: {
          inputValue: handle,
          source: "socials_page",
          intentType: platform === "facebook" ? "scrape_facebook" : "scrape_instagram",
        },
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("sokoa_session_token", data.sessionToken);
          window.location.href = `/build/?input=${encodeURIComponent(handle)}`;
        },
        onError: () => {
          window.location.href = `/build/?input=${encodeURIComponent(handle)}`;
        },
      }
    );
  };

  const placeholder =
    platform === "facebook"
      ? "facebook.com/your-page"
      : "@your_instagram_handle";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Facebook & Instagram Stores for African Sellers | Sokoa"
        description="Turn your Facebook Page or Instagram profile into a real online store with M-Pesa checkout. We pull your products, your photos, and your bio — and you go live in minutes."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-32 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Built for Facebook & Instagram sellers
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.05] tracking-tight mb-6">
                Your DMs are not a <span className="text-primary">checkout.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Stop chasing screenshots and "Mum I sent" replies. Sokoa pulls your existing posts, captions, and prices from Facebook or Instagram and turns them into a real store with M-Pesa checkout.
              </p>

              {/* Platform tab switch */}
              <div className="inline-flex p-1 bg-muted rounded-full mb-5">
                <button
                  type="button"
                  onClick={() => setPlatform("instagram")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    platform === "instagram"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("facebook")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    platform === "facebook"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row gap-3 max-w-xl"
              >
                <div className="relative flex-1">
                  <Input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder={placeholder}
                    className="h-14 pl-4 pr-4 rounded-full border-2 border-primary/20 focus-visible:ring-primary text-base shadow-lg shadow-primary/5"
                    disabled={createLead.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createLead.isPending}
                  className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] shrink-0"
                >
                  {createLead.isPending ? "Pulling your shop..." : "Build my store"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground font-medium mt-4 pl-4">
                Free to set up. We never post on your behalf.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-[460px] mx-auto"
            >
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl relative border-8 border-white">
                <img
                  src="/images/socials-hero.png"
                  alt="Instagram shop flat lay"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-foreground">@amani.beads</div>
                      <div className="text-xs text-muted-foreground font-medium">42 products synced • 6 collections</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">Order from IG bio</div>
                        <div className="text-xs text-muted-foreground font-medium">M-Pesa Till • 2 min ago</div>
                      </div>
                    </div>
                    <div className="font-bold text-lg text-primary">+KES 2,800</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we pull from your profile */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
              We read your profile the way a real shopper does.
            </h2>
            <p className="text-lg text-muted-foreground">
              Point Sokoa at your handle. We organise everything you've already posted into a clean, scrollable storefront — without you re-typing a single price.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ImageIcon,
                title: "Product photos",
                body: "Every clean post becomes a product card. Carousels become galleries. Reels stay as previews.",
              },
              {
                icon: Tag,
                title: "Captions & prices",
                body: "We detect 'KES 1,500', 'Ksh 2k', and 'price in DM'. We turn each into a structured product.",
              },
              {
                icon: Layers,
                title: "Highlights & albums",
                body: "Instagram Highlights and Facebook Albums become collections — Bridal, New In, Restocked.",
              },
              {
                icon: Heart,
                title: "Bio, brand, contacts",
                body: "Profile picture, brand colour, location, phone, WhatsApp — all imported into your storefront.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-muted/50 rounded-3xl p-7 border border-border/40 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm mb-5">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-display">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-step flow */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
              How it works
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">
              From Instagram bio to first M-Pesa receipt in under 5 minutes.
            </h2>
            <p className="text-muted-foreground text-lg">
              You don't need a developer, a designer, or a Shopify subscription. You need a phone, your handle, and your Till number.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                step: "01",
                title: "Drop your handle or page link",
                body: "@your_handle, facebook.com/your-page, or even just your business name. We'll find you.",
              },
              {
                step: "02",
                title: "Sokoa imports your shop",
                body: "We sweep your last 90 days of posts, group products into collections, and pull through your brand colour and bio.",
              },
              {
                step: "03",
                title: "Review and tweak",
                body: "Edit titles, fix any prices we couldn't read, and pick which posts are products vs. lifestyle. Drag and drop only.",
              },
              {
                step: "04",
                title: "Add your Till and go live",
                body: "Paste your M-Pesa Till or Paybill, drop your new sokoa.shop link in your Instagram bio or Facebook button — done.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex gap-6"
              >
                <div className="text-4xl font-display font-extrabold text-primary/30 leading-none">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-display">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-side: Instagram vs Facebook nuance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Two platforms, one storefront.
            </h2>
            <p className="text-muted-foreground text-lg">
              Sokoa speaks the language of each platform — because selling on Instagram is not the same job as selling on Facebook.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instagram card */}
            <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 border border-orange-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white mb-6">
                <Instagram className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">For Instagram sellers</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Built for boutique owners, jewellery makers, beauty brands, and lifestyle creators turning grids into income.
              </p>
              <ul className="space-y-3">
                {[
                  "Link-in-bio storefront that matches your feed aesthetic",
                  "Highlights become collections (Bridal, New In, Restocked)",
                  "Carousel posts auto-split into product galleries",
                  "Reply to a story with 'BUY' to send a checkout link in DM",
                  "Inventory locks once stock hits zero — no awkward 'soldout sis'",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facebook card */}
            <div className="rounded-3xl p-8 md:p-10 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-blue-100">
              <div className="w-14 h-14 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white mb-6">
                <Facebook className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">For Facebook sellers</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Built for Page owners running Marketplace listings, group drops, and community-driven sales across Kenya.
              </p>
              <ul className="space-y-3">
                {[
                  "Imports your Page Albums as product collections",
                  "Replace the 'Send Message' CTA with 'Shop Now → sokoa.shop'",
                  "Group post drops auto-publish a checkout link in the comments",
                  "Marketplace listings can mirror straight to your Sokoa store",
                  "Buyers in Mombasa, Kisumu, Eldoret pay via M-Pesa — no calls",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DM-to-checkout */}
      <section className="py-24 bg-foreground text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent opacity-50" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20">
                <MessageCircle className="w-4 h-4" /> DM-to-checkout
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Every "How much?" becomes a sale.
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                When a customer slides into your DMs asking for a price, Sokoa's smart reply drops a one-tap M-Pesa checkout link for that exact product — generated from the post they're already looking at.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Auto-detect product from the message thread",
                  "One tap → STK push → confirmation back to the chat",
                  "Works on Instagram DMs and Facebook Page Inbox",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/features">
                <Button className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-full font-bold text-lg">
                  See all features <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 max-w-md mx-auto backdrop-blur-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-sm">@mumbi.styles</div>
                    <div className="text-xs text-white/50">Active now</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 max-w-[80%] text-sm">
                    Hi sis, how much for the green dress in your last post?
                  </div>
                  <div className="bg-primary rounded-2xl rounded-tr-sm p-3 max-w-[80%] ml-auto text-sm font-medium">
                    KES 3,200, available in S/M/L. Tap below to pay & I'll ship today
                  </div>
                  <div className="bg-white text-foreground rounded-2xl p-4 ml-auto max-w-[85%] shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold">Emerald Wrap Dress</div>
                        <div className="text-xs text-muted-foreground">KES 3,200 • Free Nairobi delivery</div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 font-bold text-sm">
                      Pay with M-Pesa
                    </Button>
                  </div>
                  <div className="bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold rounded-full px-3 py-1.5 w-fit ml-auto">
                    Paid · KES 3,200 · 0712****89
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-ish quick answers */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Quick answers, before you ask
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "Will Sokoa post on my behalf?",
                a: "Never. We only read your public posts to build your store. You stay in control of your feed.",
              },
              {
                q: "Do I need a Facebook Business account?",
                a: "No. A normal Page works. For Instagram, a Creator or Business profile makes the import richer, but personal works too.",
              },
              {
                q: "What if my prices are in the captions only?",
                a: "We read 'KES', 'Ksh', '/=' and 'k' notation. For anything we miss, you'll see it flagged for a 1-tap fix.",
              },
              {
                q: "How do payouts work?",
                a: "Buyers pay via M-Pesa STK push. Funds land directly in your Till or Paybill — Sokoa never holds your money.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 border border-border/50">
                <h3 className="font-bold text-foreground mb-2 font-display">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                Your next sale shouldn't need a phone call.
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Connect your Facebook Page or Instagram profile and have a working M-Pesa storefront before your next break.
              </p>
              <Link href="/signup">
                <Button className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-full font-bold text-lg">
                  Start free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
