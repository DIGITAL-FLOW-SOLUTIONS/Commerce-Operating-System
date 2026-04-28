import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Package, Globe, Smartphone, BellRing, Settings } from "lucide-react";

export default function Boutique() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Boutique Management | Sokoa" description="The professional dashboard for serious African merchants to manage inventory, orders, and analytics." />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                For Serious Merchants
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
                Stop running your business on WhatsApp DMs.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Sokoa Boutique is the professional-grade management surface for your growing store. Track inventory, analyze sales, and process orders from a beautiful, mobile-first dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base">
                    Start 14-day trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="h-14 px-8 rounded-full font-bold text-base bg-white">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border bg-muted">
                <img src="/images/boutique.png" alt="Sokoa Boutique Dashboard" className="w-full h-full object-cover" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border/50 animate-in slide-in-from-bottom-10 delay-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Revenue Today</div>
                    <div className="text-xl font-bold text-foreground">KES 45,200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 tracking-tight">Everything a modern boutique needs.</h2>
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
                <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
