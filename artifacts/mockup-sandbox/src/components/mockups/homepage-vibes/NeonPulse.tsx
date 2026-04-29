import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Store, ShoppingBag, CreditCard, Play, 
  CheckCircle2, TrendingUp, Facebook, Instagram, 
  MessageCircle, Activity, Zap, Shield, Menu, X, Users,
  Terminal, Server, BatteryCharging
} from "lucide-react";

// --- MOCK DATA ---
const stats = { activeMerchants: 14203, gmvProcessedKes: 248200000 };

const recentLeads = [
  { id: 1, displayName: "Wanjiru", city: "Nairobi", action: "just joined", amount: null },
  { id: 2, displayName: "TechHub KE", city: "Mombasa", action: "just joined", amount: null },
  { id: 3, displayName: "Kicks.co", city: "Kisumu", action: "just joined", amount: null },
  { id: 4, displayName: "Mama's Kitchen", city: "Nakuru", action: "just joined", amount: null },
  { id: 5, displayName: "Amani Beads", city: "Eldoret", action: "just joined", amount: null },
  { id: 6, displayName: "Urban Wear", city: "Nairobi", action: "just joined", amount: null },
  { id: 7, displayName: "Glow Beauty", city: "Mombasa", action: "just joined", amount: null },
  { id: 8, displayName: "Sneakerhead", city: "Nairobi", action: "just joined", amount: null },
];

const recentTransactions = [
  { id: 1, text: "Till Payment", amount: 4500 },
  { id: 2, text: "Paybill Checkout", amount: 12000 },
  { id: 3, text: "Till Payment", amount: 850 },
  { id: 4, text: "Till Payment", amount: 3200 },
  { id: 5, text: "Paybill Checkout", amount: 15400 },
  { id: 6, text: "Till Payment", amount: 2100 },
  { id: 7, text: "Till Payment", amount: 6700 },
  { id: 8, text: "Paybill Checkout", amount: 9800 },
];

const showcase = [
  { id: 1, name: "Sneaker Drop KE", category: "Footwear", city: "Nairobi", coverEmoji: "👟" },
  { id: 2, name: "Amani Beads", category: "Jewelry", city: "Mombasa", coverEmoji: "✨" },
  { id: 3, name: "Urban Threads", category: "Fashion", city: "Nakuru", coverEmoji: "👗" }
];

const testimonials = [
  { id: 1, name: "Sarah M.", role: "Boutique Owner", city: "Nairobi", quote: "My DMs used to be a mess. Now I just drop a link and wake up to M-Pesa notifications.", gmv: "2.4M" },
  { id: 2, name: "David K.", role: "Sneaker Reseller", city: "Mombasa", quote: "The TikTok Live integration is crazy. We sold out our latest drop in 14 minutes.", gmv: "4.1M" },
  { id: 3, name: "Joy N.", role: "Beauty Creator", city: "Kisumu", quote: "I don't even have a website anymore. Sokoa handles everything straight from my IG page.", gmv: "1.8M" }
];

const formatKES = (n: number) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n);
};

// --- COMPONENTS ---

function SystemBar() {
  const [kes, setKes] = useState(248200000);
  const [active, setActive] = useState(14203);

  useEffect(() => {
    const interval = setInterval(() => {
      setKes(prev => prev + Math.floor(Math.random() * 10000));
      if (Math.random() > 0.7) setActive(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 bg-[#07060D] border-b border-[#FF2E92]/20 flex items-center justify-between px-4 font-mono text-[10px] sm:text-xs text-[#00F0FF] z-50 relative">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[#C6FF00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
          SYS_ONLINE
        </span>
        <span className="hidden sm:inline opacity-60">|</span>
        <span className="hidden sm:flex items-center gap-1 opacity-80 text-[#F5F2FF]">
          <Activity className="w-3 h-3" /> US-EAST-1
        </span>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="flex items-center gap-2">
          <span className="opacity-50 text-[#F5F2FF]">MERCHANTS:</span> 
          <span className="text-[#F5F2FF]">{active.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="opacity-50 text-[#F5F2FF]">LIVE_GMV:</span> 
          <span className="text-[#FF2E92] drop-shadow-[0_0_8px_rgba(255,46,146,0.5)]">
            {formatKES(kes)}
          </span>
        </span>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#07060D]/80 backdrop-blur-xl border-b border-[#1A1235]">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="font-display font-bold text-2xl tracking-tighter text-[#F5F2FF] flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8">
               <div className="absolute inset-0 bg-[#FF2E92] rounded rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-20 blur-md"></div>
               <div className="relative w-4 h-4 bg-gradient-to-br from-[#FF2E92] to-[#00F0FF] rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
            </div>
            Sok<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E92] to-[#00F0FF]">o</span>a
          </a>

          <nav className="hidden md:flex items-center gap-6 font-display text-sm font-medium">
            <a href="#" className="text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Features</a>
            <a href="#" className="text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">FB & IG</a>
            <a href="#" className="text-[#F5F2FF] hover:text-[#00F0FF] transition-colors flex items-center gap-1.5 group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E92] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E92]"></span>
              </span>
              TikTok Live
            </a>
            <a href="#" className="text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Boutique</a>
            <a href="#" className="text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Pricing</a>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4 font-display">
          <a href="#" className="text-sm font-medium text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Log in</a>
          <a href="#" className="relative group">
            <div className="absolute inset-0 bg-[#C6FF00] opacity-20 blur-md group-hover:opacity-40 transition-opacity rounded-full"></div>
            <button className="relative h-10 px-6 rounded-full bg-[#C6FF00] text-[#07060D] font-bold text-sm tracking-wide hover:scale-105 transition-transform flex items-center gap-2">
              START FREE
              <span className="w-1.5 h-1.5 rounded-full bg-[#07060D] animate-pulse"></span>
            </button>
          </a>
        </div>

        <button className="md:hidden text-[#F5F2FF]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#1A1235] bg-[#07060D] font-display"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <a href="#" className="text-[#F5F2FF] text-lg">Features</a>
              <a href="#" className="text-[#F5F2FF] text-lg">FB & IG</a>
              <a href="#" className="text-[#FF2E92] text-lg flex items-center gap-2">TikTok Live <span className="w-2 h-2 rounded-full bg-[#FF2E92] animate-pulse" /></a>
              <a href="#" className="text-[#F5F2FF] text-lg">Pricing</a>
              <div className="h-px bg-[#1A1235] my-2" />
              <a href="#" className="text-[#8B7FB0] text-lg">Log in</a>
              <button className="h-12 w-full rounded-full bg-[#C6FF00] text-[#07060D] font-bold text-lg mt-2">
                START FREE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Marquee() {
  return (
    <div className="bg-[#07060D] border-y border-[#1A1235] relative overflow-hidden font-mono text-sm py-3">
      {/* Right to Left */}
      <div className="flex gap-8 whitespace-nowrap animate-[marquee-right_20s_linear_infinite] opacity-80 mb-2">
        {[...recentLeads, ...recentLeads].map((lead, i) => (
          <div key={`l-${i}`} className="flex items-center gap-3 text-[#F5F2FF]">
            <span className="text-[#FF2E92]">►</span>
            <span className="font-medium">{lead.displayName}</span>
            <span className="text-[#8B7FB0]">{lead.city}</span>
            <span className="text-[#00F0FF]">{lead.action}</span>
          </div>
        ))}
      </div>
      {/* Left to Right */}
      <div className="flex gap-8 whitespace-nowrap animate-[marquee-left_15s_linear_infinite] opacity-80">
        {[...recentTransactions, ...recentTransactions].map((tx, i) => (
          <div key={`t-${i}`} className="flex items-center gap-3 text-[#F5F2FF]">
            <span className="text-[#C6FF00]">+$</span>
            <span className="text-[#C6FF00] font-bold">{formatKES(tx.amount)}</span>
            <span className="text-[#8B7FB0]">{tx.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-30"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, #07060D 0deg, #110B23 90deg, #FF2E92 180deg, #00F0FF 270deg, #07060D 360deg)",
            filter: "blur(120px)"
          }}
        />
        <div className="absolute inset-0 bg-[#07060D]/80 backdrop-blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#110B23] border border-[#1A1235] text-[#F5F2FF] font-mono text-xs font-bold tracking-wide mb-8 shadow-[0_0_15px_rgba(198,255,0,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF00]"></span>
                </span>
                LIVE • M-Pesa Till payouts in 4.2s avg
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-black text-[#F5F2FF] leading-[1.05] tracking-tighter mb-6">
                Sell live.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E92] to-[#00F0FF]">
                  Get paid live.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#8B7FB0] font-display mb-10 max-w-xl">
                Your DMs print KES. We made it official. Drop your link, spin up a store, and route payments straight to Till in seconds.
              </p>

              <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-4 max-w-xl mb-12 bg-[#110B23]/50 p-2 rounded-2xl border border-[#1A1235] backdrop-blur-md">
                <div className="relative flex-1">
                  <div className="absolute inset-0 bg-[#00F0FF] opacity-0 focus-within:opacity-20 blur-xl transition-opacity rounded-xl" />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter FB/IG link or @username..." 
                    className="relative w-full h-14 px-4 bg-[#07060D] border border-[#1A1235] rounded-xl focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] outline-none text-[#F5F2FF] font-display placeholder:text-[#8B7FB0]/50 transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  className="relative h-14 px-8 rounded-xl bg-[#C6FF00] hover:bg-[#D4FF33] text-[#07060D] font-bold font-display text-base shadow-[0_0_20px_rgba(198,255,0,0.3)] hover:shadow-[0_0_30px_rgba(198,255,0,0.5)] transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  Spin up store
                  <Zap className="w-4 h-4 fill-current" />
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-8 font-mono">
                <div>
                  <div className="text-2xl font-bold text-[#F5F2FF]">{stats.activeMerchants.toLocaleString()}</div>
                  <div className="text-[10px] text-[#8B7FB0] uppercase tracking-widest mt-1">Active Tills</div>
                </div>
                <div className="w-px h-8 bg-[#1A1235]"></div>
                <div>
                  <div className="text-2xl font-bold text-[#00F0FF]">{formatKES(stats.gmvProcessedKes)}</div>
                  <div className="text-[10px] text-[#8B7FB0] uppercase tracking-widest mt-1">Vol_24H</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative mt-12 lg:mt-0 perspective-1000">
            <motion.div 
              initial={{ rotateY: 15, rotateX: 5, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-[#1A1235] bg-[#110B23] shadow-[0_0_50px_rgba(255,46,146,0.15)] transform-style-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent z-10" />
              <img 
                src="/__mockup/images/hero.png" 
                alt="Kenyan boutique owner" 
                className="w-full aspect-[4/5] object-cover opacity-80"
              />

              {/* Stacked Cards */}
              <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col gap-2">
                {[
                  { amount: 4500, delay: 0.8, op: 1, y: 0, scale: 1 },
                  { amount: 2800, delay: 1.0, op: 0.6, y: -8, scale: 0.95 },
                  { amount: 1250, delay: 1.2, op: 0.3, y: -16, scale: 0.9 },
                ].map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: card.y, opacity: card.op, scale: card.scale }}
                    transition={{ delay: card.delay, duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 bg-[#110B23]/90 backdrop-blur-xl rounded-xl p-3 border border-[#1A1235] flex items-center justify-between"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#C6FF00]/10 flex items-center justify-center text-[#C6FF00]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F5F2FF] font-display">Till Payment</div>
                        <div className="text-[10px] text-[#8B7FB0] font-mono">TID_{Math.floor(Math.random() * 100000)}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#C6FF00]">
                      +{formatKES(card.amount)}
                    </div>
                  </motion.div>
                ))}
                <div className="h-[60px]" /> {/* Spacer for absolute cards */}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      num: "01",
      icon: Store,
      title: "Instant Sync",
      desc: "One click imports your entire IG grid into a categorized storefront.",
      stat: "SYNC: < 2.4s",
      color: "from-[#FF2E92]/20 to-transparent",
      border: "border-[#FF2E92]/30",
      glow: "shadow-[0_0_30px_rgba(255,46,146,0.1)]"
    },
    {
      num: "02",
      icon: CreditCard,
      title: "Native M-Pesa",
      desc: "STK push direct to your Till. Zero manual reconciliation needed.",
      stat: "STATUS: ACTIVE",
      color: "from-[#C6FF00]/20 to-transparent",
      border: "border-[#C6FF00]/30",
      glow: "shadow-[0_0_30px_rgba(198,255,0,0.1)]"
    },
    {
      num: "03",
      icon: Layers,
      title: "Cross-platform",
      desc: "Sell on IG, FB, and TikTok simultaneously. Inventory stays locked.",
      stat: "UPTIME: 99.99%",
      color: "from-[#00F0FF]/20 to-transparent",
      border: "border-[#00F0FF]/30",
      glow: "shadow-[0_0_30px_rgba(0,240,255,0.1)]"
    }
  ];

  return (
    <section className="py-24 bg-[#07060D] border-t border-[#1A1235] relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl bg-[#110B23] border ${f.border} ${f.glow} overflow-hidden group`}
            >
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${f.color} opacity-50`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#07060D] border border-[#1A1235] flex items-center justify-center text-[#F5F2FF]">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-4xl font-black text-[#1A1235] group-hover:text-[#F5F2FF]/10 transition-colors">
                    {f.num}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold font-display text-[#F5F2FF] mb-3">{f.title}</h3>
                <p className="text-[#8B7FB0] font-display leading-relaxed mb-8">{f.desc}</p>
                
                <div className="font-mono text-[10px] tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 inline-block px-2 py-1 rounded">
                  {f.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="py-32 bg-[#07060D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF2E92]/5 via-[#07060D] to-[#07060D]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF2E92]/10 border border-[#FF2E92]/20 text-[#FF2E92] font-mono text-xs font-bold mb-6">
              <Shield className="w-3 h-3" /> SECURE CHECKOUT
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#F5F2FF] mb-6 tracking-tight leading-tight">
              Stop quoting prices <br/>in the comments.
            </h2>
            
            <p className="text-lg text-[#8B7FB0] font-display mb-8">
              Auto-reply to "how much" with a direct payment link. Convert high-intent scrollers before they keep scrolling.
            </p>

            <div className="space-y-4 font-display mb-10">
              {[
                "Auto-sync IG grid to storefront",
                "Smart DM auto-responders",
                "Abandon cart recovery via DM"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#110B23] border border-[#1A1235] p-3 rounded-lg">
                  <div className="w-8 h-8 rounded bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[#F5F2FF] text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
            
            <button className="h-14 px-8 rounded-xl bg-[#F5F2FF] text-[#07060D] font-bold font-display text-base hover:bg-white transition-colors">
              Connect FB & IG
            </button>
          </div>

          <div className="relative aspect-square max-w-[500px] mx-auto w-full">
            <div className="absolute inset-0 bg-[#110B23] rounded-full blur-[100px] opacity-50" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[580px] bg-[#07060D] rounded-[40px] border-[6px] border-[#1A1235] overflow-hidden shadow-[0_0_50px_rgba(255,46,146,0.2)]">
              <img src="/__mockup/images/socials-fbig.png" className="w-full h-full object-cover opacity-80" alt="IG store" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-[#110B23]/90 backdrop-blur border border-[#FF2E92]/50 rounded-xl p-3">
                  <div className="text-[10px] font-mono text-[#8B7FB0] mb-2">AUTO_REPLY_SENT</div>
                  <div className="bg-[#07060D] rounded p-2 text-xs text-[#F5F2FF] font-display border border-[#1A1235]">
                    Hi! That dress is KES 4,500. Tap here to pay via M-Pesa and we'll deliver tomorrow: 
                    <span className="text-[#00F0FF] block mt-1">sok.oa/dress-44</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TiktokLive() {
  return (
    <section className="py-32 bg-[#07060D] relative overflow-hidden border-t border-[#1A1235]">
      {/* Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(255,46,146,0.15)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-last lg:order-first relative flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-4 border-[#1A1235] shadow-[0_0_80px_rgba(255,46,146,0.3)] overflow-hidden">
              <img src="/__mockup/images/tiktok-live.png" className="w-full h-full object-cover opacity-90" alt="Live" />
              
              {/* Overlays */}
              <div className="absolute top-6 left-4 bg-[#FF2E92] text-white font-mono text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
              </div>
              <div className="absolute top-6 right-4 bg-black/50 backdrop-blur rounded px-2 py-1 text-white font-mono text-[10px]">
                👁 4.2K
              </div>

              {/* Fake Chat */}
              <div className="absolute bottom-24 left-4 right-16 flex flex-col gap-2 mask-image: linear-gradient(to top, black, transparent)">
                <div className="bg-black/40 backdrop-blur rounded p-1.5 text-[10px] text-white"><span className="text-[#00F0FF] font-bold">user123:</span> Need this!</div>
                <div className="bg-black/40 backdrop-blur rounded p-1.5 text-[10px] text-white"><span className="text-[#C6FF00] font-bold">sarah:</span> How much?</div>
                <div className="bg-[#FF2E92]/80 backdrop-blur rounded p-1.5 text-[10px] text-white font-bold border border-[#FF2E92]">Pinned: Link in bio to buy 🛍️</div>
              </div>

              {/* Purchase popups */}
              <motion.div 
                animate={{ y: [-10, -50], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute top-1/3 left-4 bg-[#C6FF00] text-black font-mono text-[10px] font-bold px-2 py-1 rounded shadow-lg"
              >
                +KES 3,500
              </motion.div>

              <motion.div 
                animate={{ y: [-10, -50], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
                className="absolute top-1/2 right-4 bg-[#00F0FF] text-black font-mono text-[10px] font-bold px-2 py-1 rounded shadow-lg"
              >
                +KES 1,200
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl font-display font-black text-[#F5F2FF] mb-6 tracking-tighter uppercase">
              Hype.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF00] to-[#00F0FF]">Checkout.</span><br/>
              Next.
            </h2>
            
            <p className="text-xl text-[#8B7FB0] font-display mb-10 leading-relaxed">
              The ultimate weapon for TikTok Live. Flash sales, limited drops, and instant checkout without viewers leaving the app.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#110B23] p-4 rounded-xl border border-[#1A1235]">
                <div className="text-3xl font-mono font-bold text-[#FF2E92] mb-1">14s</div>
                <div className="text-[10px] font-mono text-[#8B7FB0]">AVG CHECKOUT TIME</div>
              </div>
              <div className="bg-[#110B23] p-4 rounded-xl border border-[#1A1235]">
                <div className="text-3xl font-mono font-bold text-[#C6FF00] mb-1">3.2x</div>
                <div className="text-[10px] font-mono text-[#8B7FB0]">CONVERSION LIFT</div>
              </div>
            </div>

            <button className="h-14 px-8 rounded-xl bg-[#FF2E92] text-[#F5F2FF] font-bold font-display text-base shadow-[0_0_30px_rgba(255,46,146,0.4)] hover:shadow-[0_0_40px_rgba(255,46,146,0.6)] transition-all">
              Launch Live Mode →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="py-24 bg-[#07060D] border-t border-[#1A1235]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#F5F2FF] tracking-tighter uppercase mb-2">Live Nodes</h2>
            <p className="text-[#8B7FB0] font-display">Top volume merchants on the network right now.</p>
          </div>
          <a href="#" className="font-mono text-sm text-[#00F0FF] hover:text-[#F5F2FF] transition-colors">
            [ VIEW_ALL ]
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {showcase.map((store, i) => (
            <div key={store.id} className="group cursor-pointer bg-[#110B23] rounded-2xl border border-[#1A1235] overflow-hidden hover:border-[#00F0FF]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all p-2">
              <div className="aspect-video rounded-xl overflow-hidden relative bg-[#07060D] mb-4">
                <img src={`/__mockup/images/store-${i + 1}.png`} alt={store.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-2 left-2 bg-[#07060D]/80 backdrop-blur rounded px-2 py-1 text-[10px] font-mono text-[#C6FF00] border border-[#C6FF00]/30">
                  VOL: {Math.floor(Math.random() * 90 + 10)}K/HR
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-[#F5F2FF] text-lg">{store.name}</h3>
                  <div className="font-mono text-[10px] text-[#8B7FB0] mt-1">{store.category} // {store.city.toUpperCase()}</div>
                </div>
                <div className="text-2xl">{store.coverEmoji}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#07060D] pt-20 pb-10 border-t border-[#1A1235] font-mono">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="text-3xl font-display font-black tracking-tighter text-[#F5F2FF] mb-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FF2E92] rounded-sm rotate-45" />
              Sokoa
            </div>
            <div className="text-xs text-[#8B7FB0]">SOCIAL COMMERCE OS v2.4</div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#110B23] border border-[#C6FF00]/30 rounded text-[#C6FF00] text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" />
            STATUS: ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[11px] mb-16">
          <div className="space-y-3">
            <div className="text-[#F5F2FF] font-bold mb-4 border-b border-[#1A1235] pb-2">SYSTEM</div>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#00F0FF] transition-colors">Features</a>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#00F0FF] transition-colors">Pricing</a>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#00F0FF] transition-colors">API Docs</a>
          </div>
          <div className="space-y-3">
            <div className="text-[#F5F2FF] font-bold mb-4 border-b border-[#1A1235] pb-2">CHANNELS</div>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#FF2E92] transition-colors">Instagram</a>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#FF2E92] transition-colors">TikTok Live</a>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#FF2E92] transition-colors">Facebook</a>
          </div>
          <div className="space-y-3">
            <div className="text-[#F5F2FF] font-bold mb-4 border-b border-[#1A1235] pb-2">LEGAL</div>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Terms</a>
            <a href="#" className="block text-[#8B7FB0] hover:text-[#F5F2FF] transition-colors">Privacy</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1A1235] text-[10px] text-[#8B7FB0]">
          <div>© {new Date().getFullYear()} SOKOA_INC.</div>
          <div>BUILT IN NBO // {new Date().getTime()}</div>
        </div>
      </div>
    </footer>
  );
}

// A simple local component to represent lucide-react missing Layers
function Layers(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}

export function NeonPulse() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07060D] text-[#F5F2FF] selection:bg-[#FF2E92] selection:text-white">
      <style dangerouslySetInlineStyle={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}} />
      
      <SystemBar />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <SocialSection />
      <TiktokLive />
      <Showcase />
      <Footer />
    </div>
  );
}

export default NeonPulse;
