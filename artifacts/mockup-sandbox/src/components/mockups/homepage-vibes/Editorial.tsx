import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Play } from "lucide-react";

// Mock Data
const stats = { activeMerchants: 12483, gmvProcessedKes: 184200000 };
const recentLeads = [
  { id: 1, displayName: "Wanjiru", city: "Nairobi" },
  { id: 2, displayName: "Akinyi", city: "Mombasa" },
  { id: 3, displayName: "Fatuma", city: "Kisumu" },
  { id: 4, displayName: "Nekesa", city: "Nakuru" },
  { id: 5, displayName: "Muthoni", city: "Eldoret" },
  { id: 6, displayName: "Achieng", city: "Thika" },
  { id: 7, displayName: "Njeri", city: "Malindi" },
  { id: 8, displayName: "Wawira", city: "Kitale" },
];
const showcase = [
  { id: 1, name: "Amani Beads", category: "Jewelry", city: "Nairobi", coverEmoji: "✨" },
  { id: 2, name: "Kijani Studio", category: "Fashion", city: "Mombasa", coverEmoji: "🌿" },
  { id: 3, name: "Lulu Essentials", category: "Beauty", city: "Kisumu", coverEmoji: "💄" },
];
const testimonials = [
  { id: 1, name: "Joy Nduta", role: "Owner", city: "Nairobi", quote: "A masterpiece of simplicity. My Instagram boutique became a structured business overnight." },
  { id: 2, name: "Sarah Omondi", role: "Founder", city: "Mombasa", quote: "The elegance of the storefront reflects the quality of our garments. Payments are seamless." },
  { id: 3, name: "Mercy Wanjiku", role: "Creator", city: "Nakuru", quote: "Finally, a platform that honors the craft. Sokoa transformed how I engage with my clientele." },
];

const formatKES = (n: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n);

// Inline Components
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F1EA]/90 backdrop-blur-sm border-b border-[rgba(26,24,22,0.08)] py-4">
      <div className="max-w-6xl mx-auto px-8 lg:px-12 flex items-center justify-between">
        <a href="#" className="font-['Fraunces'] font-semibold text-2xl text-[#1A1816] tracking-tight">
          Sokoa<span className="text-[#B8946A]">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">Features</a>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">FB & IG</a>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">TikTok Live</a>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">Boutique</a>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors hidden sm:block">Log in</a>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#F5F1EA] bg-[#1A1816] hover:bg-[#1A1816]/90 px-6 py-3 rounded-sm transition-colors">
            Begin
          </a>
        </div>
      </div>
    </header>
  );
}

function LiveActivityTicker() {
  return (
    <div className="bg-[#1A1816] text-[#F5F1EA] py-2 text-center text-xs tracking-wider font-['Fraunces'] italic border-b border-[rgba(245,241,234,0.1)]">
      Wanjiru in Nairobi just composed a storefront — {formatKES(4200)} processed today
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1A1816] text-[#F5F1EA] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <a href="#" className="font-['Fraunces'] font-semibold text-3xl tracking-tight mb-6 block">
              Sokoa<span className="text-[#B8946A]">.</span>
            </a>
            <p className="text-[#F5F1EA]/60 max-w-sm text-sm leading-relaxed font-light">
              The quiet luxury operating system for African commerce. Refined for the boutique that started in a DM.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-[#B8946A] mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[#F5F1EA]/70">
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Boutique</a></li>
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Templates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-[#B8946A] mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-[#F5F1EA]/70">
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#F5F1EA] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#F5F1EA]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F5F1EA]/40 tracking-wider">
          <p>© {new Date().getFullYear()} Sokoa. All rights reserved.</p>
          <p>Composed in Nairobi.</p>
        </div>
      </div>
    </footer>
  );
}

export function Editorial() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F1EA] text-[#1A1816] font-['Inter'] selection:bg-[#B8946A]/30">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500&display=swap');
      `}} />
      
      <LiveActivityTicker />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-32 max-w-6xl mx-auto px-8 lg:px-12 relative">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
          <div className="lg:w-[60%] pt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FBF8F3] border border-[rgba(26,24,22,0.08)] rounded-sm text-[#2D4A3A] text-xs uppercase tracking-widest font-medium mb-12">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A3A]"></span>
              Supporting instant M-Pesa Till
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-['Fraunces'] text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8 text-[#1A1816]"
            >
              Your hustle, <br/><i className="font-light text-[#B8946A]">honored</i> as a business.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-[#1A1816]/70 max-w-lg mb-12 leading-relaxed font-light"
            >
              Provide your Facebook Page, Instagram handle, or business name below. We shall compose a refined online storefront with M-Pesa checkout, gracefully and instantly.
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-0 max-w-lg mb-6 border-b border-[#1A1816] pb-2"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter FB/IG link or business name" 
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-[#1A1816]/30 py-3"
              />
              <button 
                type="submit" 
                className="text-xs uppercase tracking-widest font-medium text-[#1A1816] hover:text-[#B8946A] transition-colors py-3 flex items-center gap-2"
              >
                Compose Storefront <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
            <p className="text-[10px] uppercase tracking-widest text-[#1A1816]/40 mb-16">Complimentary 14-day curation period.</p>

            <div className="flex items-center gap-16 border-t border-[rgba(26,24,22,0.08)] pt-8">
              <div>
                <div className="font-['Fraunces'] text-3xl text-[#1A1816] mb-1">{stats.activeMerchants.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#1A1816]/60">Curated Sellers</div>
              </div>
              <div>
                <div className="font-['Fraunces'] text-3xl text-[#1A1816] mb-1">{formatKES(stats.gmvProcessedKes)}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#1A1816]/60">Volume Transacted</div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:w-[35%] w-full max-w-sm mx-auto"
          >
            <div className="p-3 bg-[#FBF8F3] border border-[rgba(26,24,22,0.08)] shadow-[0_2px_10px_rgba(26,24,22,0.03)]">
              <img src="/__mockup/images/hero.png" alt="Boutique owner" className="w-full aspect-[3/4] object-cover grayscale-[20%] contrast-125" />
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
              <p className="font-['Fraunces'] italic text-sm text-[#1A1816]/70">Wanjiru, Nairobi — boutique owner since 2019</p>
              <p className="text-[10px] uppercase tracking-widest text-[#B8946A] mt-2">Payment Received: +KES 4,500</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-[#1A1816] py-6 overflow-hidden border-y border-[rgba(245,241,234,0.1)]">
        <div className="flex gap-16 whitespace-nowrap opacity-70">
          {[...recentLeads, ...recentLeads].map((lead, i) => (
            <div key={`${lead.id}-${i}`} className="flex items-center gap-4 text-[#F5F1EA] text-xs uppercase tracking-widest">
              <span className="w-1 h-1 bg-[#B8946A] rounded-full"></span>
              <span>{lead.displayName}</span>
              <span className="opacity-50">from {lead.city}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-[#FBF8F3] border-b border-[rgba(26,24,22,0.08)]">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#1A1816] mb-20 max-w-2xl leading-tight">
            A refined collection of essentials, absent of clutter.
          </h2>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="border-t border-[#1A1816] pt-6">
              <div className="font-['Fraunces'] text-xl text-[#B8946A] mb-4 italic">01</div>
              <h3 className="font-['Fraunces'] text-2xl text-[#1A1816] mb-4">Curated Storefront</h3>
              <p className="text-sm text-[#1A1816]/70 leading-relaxed font-light">
                Your collections, elegantly imported from social profiles. A custom domain ensures your brand's prestige remains uncompromised.
              </p>
            </div>
            
            <div className="border-t border-[#1A1816] pt-6">
              <div className="font-['Fraunces'] text-xl text-[#B8946A] mb-4 italic">02</div>
              <h3 className="font-['Fraunces'] text-2xl text-[#1A1816] mb-4">Native M-Pesa</h3>
              <p className="text-sm text-[#1A1816]/70 leading-relaxed font-light">
                Seamless reconciliation. Patrons transact via STK push, directly depositing into your Till or Paybill with absolute grace.
              </p>
            </div>

            <div className="border-t border-[#1A1816] pt-6">
              <div className="font-['Fraunces'] text-xl text-[#B8946A] mb-4 italic">03</div>
              <h3 className="font-['Fraunces'] text-2xl text-[#1A1816] mb-4">Harmonized Inventory</h3>
              <p className="text-sm text-[#1A1816]/70 leading-relaxed font-light">
                Synchronized commerce across TikTok, Facebook, and your boutique. Stock levels reflect reality, invariably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FB/IG Split */}
      <section className="py-32 max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="p-4 bg-[#FBF8F3] border border-[rgba(26,24,22,0.08)]">
              <img src="/__mockup/images/socials-fbig.png" alt="Social Seller" className="w-full aspect-[4/5] object-cover grayscale-[30%]" />
              <div className="mt-4 flex items-center justify-between border-t border-[rgba(26,24,22,0.08)] pt-4">
                <span className="font-['Fraunces'] italic text-sm text-[#1A1816]/70">Instagram & Facebook</span>
                <span className="text-[10px] uppercase tracking-widest text-[#1A1816]/50">Synced</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#1A1816] mb-8 leading-tight">
              Direct messages are an introduction, not a checkout.
            </h2>
            <p className="text-base text-[#1A1816]/70 mb-12 leading-relaxed font-light max-w-md">
              Sokoa interprets your existing posts and dialogues, elevating them into a formal online boutique. Complete with M-Pesa processing and catalog management, sans the casual back-and-forth.
            </p>

            <ul className="space-y-6 mb-16">
              {[
                "Automatic curation of posts, carousels, and albums.",
                "Discreet DM replies offering a singular checkout link.",
                "Funds remitted directly to your Till, honoring your time."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#B8946A] mt-2 shrink-0"></div>
                  <span className="text-sm text-[#1A1816]/80 font-light">{text}</span>
                </li>
              ))}
            </ul>

            <a href="#" className="inline-flex items-center gap-3 font-['Fraunces'] text-lg italic text-[#1A1816] hover:text-[#B8946A] transition-colors border-b border-[#1A1816] hover:border-[#B8946A] pb-1">
              Observe the integration <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TikTok Dark Section */}
      <section className="bg-[#1A1816] text-[#F5F1EA] py-32">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#F5F1EA]/20 text-[#F5F1EA]/70 text-xs uppercase tracking-widest font-medium mb-10">
              <Play className="w-3 h-3" /> Crafted for Live Showcases
            </div>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-8 leading-tight">
              Convert the audience to clientele, instantaneously.
            </h2>
            <p className="text-base text-[#F5F1EA]/60 mb-12 leading-relaxed font-light max-w-md">
              Place your Sokoa link within your biography or stream. Patrons peruse your active collection and acquire pieces via M-Pesa, retaining their presence within the broadcast.
            </p>
            <a href="#" className="inline-flex items-center gap-3 font-['Fraunces'] text-lg italic text-[#F5F1EA] hover:text-[#B8946A] transition-colors border-b border-[#F5F1EA] hover:border-[#B8946A] pb-1">
              Explore Live capabilities <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="relative flex justify-center">
            <div className="bg-[#FBF8F3] p-4 pb-12 w-full max-w-sm relative">
              <img src="/__mockup/images/tiktok-live.png" alt="Live showcase" className="w-full aspect-[9/16] object-cover grayscale-[10%]" />
              <div className="absolute top-8 left-8 border border-[#F5F1EA] bg-[#1A1816]/50 backdrop-blur-sm text-[#F5F1EA] px-2 py-1 text-[10px] uppercase tracking-widest font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Broadcasting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-32 max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[rgba(26,24,22,0.08)] pb-8">
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl text-[#1A1816]">The Gallery.</h2>
          <a href="#" className="text-xs uppercase tracking-widest font-medium text-[#1A1816]/70 hover:text-[#1A1816] transition-colors">
            View Archives
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {showcase.map((store, i) => (
            <div key={store.id} className="group cursor-pointer">
              <div className="aspect-[3/4] mb-4 overflow-hidden bg-[#FBF8F3] border border-[rgba(26,24,22,0.08)] p-2">
                <img src={`/__mockup/images/store-${i + 1}.png`} alt={store.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%]" />
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-['Fraunces'] text-xl text-[#1A1816] mb-1">{store.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-[#1A1816]/50">{store.category} · {store.city}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-medium text-[#B8946A]">
                  Visit
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#FBF8F3] border-t border-[rgba(26,24,22,0.08)]">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="font-['Fraunces'] text-3xl text-[#1A1816]">Selected praise.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {testimonials.map((t) => (
              <div key={t.id} className="flex flex-col">
                <div className="font-['Fraunces'] text-4xl text-[#B8946A] mb-6 leading-none">"</div>
                <p className="font-['Fraunces'] text-xl text-[#1A1816] mb-8 leading-snug flex-1">
                  {t.quote}
                </p>
                <div className="border-t border-[rgba(26,24,22,0.08)] pt-4">
                  <div className="text-xs uppercase tracking-widest font-medium text-[#1A1816]">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#1A1816]/50 mt-1">{t.role}, {t.city}</div>
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

export default Editorial;