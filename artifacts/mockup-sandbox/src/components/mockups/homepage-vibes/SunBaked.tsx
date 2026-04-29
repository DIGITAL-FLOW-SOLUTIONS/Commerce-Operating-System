import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShoppingBag, 
  CreditCard, 
  Menu, 
  X, 
  Play, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Leaf, 
  Store
} from "lucide-react";

// --- MOCK DATA ---
const stats = { activeMerchants: 12483, gmvProcessedKes: 184200000 };
const recentLeads = [
  { id: 1, displayName: "Wanjiru", city: "Nairobi" },
  { id: 2, displayName: "Akinyi", city: "Mombasa" },
  { id: 3, displayName: "Nekesa", city: "Kisumu" },
  { id: 4, displayName: "Njeri", city: "Nakuru" },
  { id: 5, displayName: "Mwende", city: "Eldoret" },
  { id: 6, displayName: "Achieng", city: "Thika" },
  { id: 7, displayName: "Muthoni", city: "Malindi" },
  { id: 8, displayName: "Kemunto", city: "Kitale" },
];
const showcase = [
  { id: 1, name: "Amani Beads", category: "Jewelry", city: "Nairobi", coverEmoji: "📿" },
  { id: 2, name: "Kijani Plants", category: "Home & Garden", city: "Mombasa", coverEmoji: "🌿" },
  { id: 3, name: "Zuri Threads", category: "Fashion", city: "Kisumu", coverEmoji: "👗" },
];
const testimonials = [
  { id: 1, name: "Joy Nduta", role: "Owner, Joy's Closet", city: "Nairobi", quote: "I used to spend hours replying to DMs with prices and till numbers. Now, I just wake up to M-Pesa messages. Sokoa has been a blessing for my business." },
  { id: 2, name: "Fatuma Ali", role: "Creator", city: "Mombasa", quote: "My TikTok lives are finally making sense. No more 'DM to order', just click the link in bio. My sales doubled in the first month." },
  { id: 3, name: "Sarah W.", role: "Boutique Owner", city: "Nakuru", quote: "It literally took me 30 seconds to get my store up. All my Instagram posts just appeared there, ready to be bought. Amazing." },
];

const formatKES = (n: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(n);

// --- INLINE COMPONENTS ---
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5E6D3]/90 backdrop-blur-md border-b border-[#2A1F17]/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#D4A04C] flex items-center justify-center text-[#2A1F17] transform transition-transform group-hover:rotate-12">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="font-['DM_Sans'] font-extrabold text-2xl text-[#2A1F17] relative">
            Sokoa
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#C2452D]" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 0" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "FB & IG", "TikTok Live", "Boutique", "Pricing", "Templates"].map(item => (
            <a key={item} href="#" className="font-['DM_Sans'] font-medium text-[#2A1F17]/80 hover:text-[#2D5A3F] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2D5A3F] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="font-['DM_Sans'] font-medium text-[#2A1F17]/80 hover:text-[#C2452D] transition-colors">Log in</a>
          <button className="bg-[#C2452D] hover:bg-[#A33823] text-[#FBF6EE] font-['DM_Sans'] font-bold py-2.5 px-6 rounded-full shadow-[0_4px_14px_rgba(194,69,45,0.25)] transition-transform hover:-translate-y-0.5">
            Start Free
          </button>
        </div>

        <button className="md:hidden text-[#2A1F17]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#FBF6EE] border-b border-[#2A1F17]/10 p-4 flex flex-col gap-4 shadow-xl">
          {["Features", "FB & IG", "TikTok Live", "Boutique", "Pricing", "Templates"].map(item => (
            <a key={item} href="#" className="font-['DM_Sans'] font-medium text-[#2A1F17] p-2 border-b border-[#2A1F17]/5">{item}</a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <a href="#" className="font-['DM_Sans'] font-medium text-[#2A1F17] p-2 text-center">Log in</a>
            <button className="bg-[#C2452D] text-[#FBF6EE] font-['DM_Sans'] font-bold py-3 rounded-full">Start Free</button>
          </div>
        </div>
      )}
    </header>
  );
}

function LiveActivityTicker() {
  return (
    <div className="bg-[#EAD3B8] border-b border-[#2A1F17]/10 py-2.5 overflow-hidden flex items-center">
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
        {[...recentLeads, ...recentLeads, ...recentLeads].map((lead, i) => (
          <div key={`${lead.id}-${i}`} className="flex items-center gap-2 font-['DM_Sans'] text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2452D] animate-pulse"></span>
            <span className="font-bold text-[#2A1F17]">{lead.displayName}</span>
            <span className="text-[#2A1F17]/60">in {lead.city}</span>
            <span className="text-[#2D5A3F] italic font-['Instrument_Serif']">just joined</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1F3D2A] text-[#FBF6EE] py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-1/2">
        <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F5E6D3"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-full bg-[#D4A04C] flex items-center justify-center text-[#2A1F17]">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-['DM_Sans'] font-extrabold text-2xl text-[#FBF6EE]">Sokoa</span>
            </a>
            <p className="text-[#FBF6EE]/70 font-['DM_Sans'] text-lg max-w-sm leading-relaxed mb-8">
              The multi-surface commerce operating system for African social-commerce sellers. Built for the hustle, with love.
            </p>
          </div>
          
          <div>
            <h4 className="font-['DM_Sans'] font-bold text-lg mb-6 text-[#D4A04C]">Product</h4>
            <ul className="flex flex-col gap-4 font-['DM_Sans'] text-[#FBF6EE]/80">
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">TikTok Live</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Boutique</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['DM_Sans'] font-bold text-lg mb-6 text-[#D4A04C]">Resources</h4>
            <ul className="flex flex-col gap-4 font-['DM_Sans'] text-[#FBF6EE]/80">
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-['DM_Sans'] font-bold text-lg mb-6 text-[#D4A04C]">Legal</h4>
            <ul className="flex flex-col gap-4 font-['DM_Sans'] text-[#FBF6EE]/80">
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D4A04C] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#FBF6EE]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['DM_Sans'] text-[#FBF6EE]/50">© {new Date().getFullYear()} Sokoa. All rights reserved.</p>
          <div className="font-['Instrument_Serif'] text-xl text-[#D4A04C] italic">
            Built with 💚 in Nairobi
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- MAIN PAGE COMPONENT ---
export function SunBaked() {
  const [inputValue, setInputValue] = useState("");

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .blob-shape {
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        }
      `}</style>
      
      <div className="min-h-screen bg-[#F5E6D3] text-[#2A1F17] font-['DM_Sans'] overflow-x-hidden">
        <Navbar />
        <LiveActivityTicker />

        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
          {/* Organic background shapes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EAD3B8] blob-shape opacity-60 -translate-y-1/4 translate-x-1/4 -z-10 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A04C]/20 blob-shape opacity-60 translate-y-1/4 -translate-x-1/4 -z-10 mix-blend-multiply"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAD3B8] text-[#2D5A3F] font-bold text-sm mb-8 border border-[#2A1F17]/5 shadow-sm">
                  <Leaf className="w-4 h-4" />
                  Now with instant M-Pesa Till payouts
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#2A1F17]">
                  From DM to dukawala — in <span className="relative inline-block">
                    <span className="relative z-10 font-['Instrument_Serif'] italic font-normal text-[#C2452D]">30 seconds.</span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#D4A04C] -z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-xl text-[#2A1F17]/70 mb-10 leading-relaxed max-w-lg">
                  Drop your Facebook Page, Instagram, or business name below. We'll set you up sawa-sawa with M-Pesa, no stress.
                </p>

                <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter FB/IG link or business name..." 
                      className="w-full h-16 pl-6 pr-4 rounded-full bg-[#FBF6EE] border-2 border-[#EAD3B8] focus:border-[#D4A04C] focus:outline-none focus:ring-4 focus:ring-[#D4A04C]/20 text-lg shadow-inner text-[#2A1F17] placeholder:text-[#2A1F17]/40 transition-all"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="h-16 px-8 rounded-full bg-[#C2452D] hover:bg-[#A33823] text-[#FBF6EE] font-bold text-lg shadow-[0_8px_24px_rgba(194,69,45,0.3)] transition-all hover:-translate-y-1 shrink-0 flex items-center justify-center"
                  >
                    Karibu, let's build it
                  </button>
                </form>
                <p className="text-sm text-[#2A1F17]/50 font-medium pl-6">No credit card required. 14-day free trial.</p>

                {/* Stats */}
                <div className="mt-14 flex items-center gap-10 pt-8 border-t-2 border-dashed border-[#EAD3B8]">
                  <div>
                    <div className="text-3xl font-extrabold text-[#2D5A3F] font-['DM_Sans'] tabular-nums mb-1">{stats.activeMerchants.toLocaleString()}</div>
                    <div className="text-sm font-bold text-[#2A1F17]/60 uppercase tracking-widest">Active Sellers</div>
                  </div>
                  <div className="w-1 h-12 bg-[#EAD3B8] rounded-full"></div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#2D5A3F] font-['DM_Sans'] tabular-nums mb-1">{formatKES(stats.gmvProcessedKes)}</div>
                    <div className="text-sm font-bold text-[#2A1F17]/60 uppercase tracking-widest">GMV Processed</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="relative lg:ml-auto w-full max-w-[460px] mx-auto z-10"
              >
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(42,31,23,0.15)] border-[12px] border-[#FBF6EE] bg-[#EAD3B8]">
                  <img 
                    src="/__mockup/images/hero.png" 
                    alt="Kenyan boutique owner" 
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                    style={{ filter: 'contrast(1.1) saturate(1.1) sepia(1.2)' }}
                  />
                </div>
                
                {/* Floating Card */}
                <motion.div 
                  className="absolute -bottom-6 -left-8 md:-left-12 bg-[#FBF6EE] rounded-[2rem] p-5 shadow-[0_15px_35px_rgba(42,31,23,0.12)] border border-[#EAD3B8] w-[300px] animate-float"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#2D5A3F]/10 flex items-center justify-center shrink-0">
                      <Leaf className="w-6 h-6 text-[#2D5A3F]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2A1F17] text-lg leading-tight mb-1">Just landed in your Till</div>
                      <div className="text-[#2D5A3F] font-extrabold text-xl tabular-nums">+KES 4,500</div>
                      <div className="text-xs font-bold text-[#2A1F17]/40 uppercase tracking-wider mt-2">M-Pesa • Just now</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER (Wavy) */}
        <div className="w-full overflow-hidden leading-none bg-[#F5E6D3]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FBF6EE"></path>
          </svg>
        </div>

        {/* FEATURES GRID */}
        <section className="py-20 md:py-32 bg-[#FBF6EE]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 relative">
              {/* Hand-drawn scribble accent */}
              <svg className="absolute -top-10 -left-10 w-24 h-24 text-[#D4A04C] opacity-50 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M10,50 Q30,10 50,50 T90,50" />
                <path d="M20,60 Q40,20 60,60 T100,60" />
              </svg>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A1F17] mb-6 leading-tight">
                Everything you need,<br />
                <span className="font-['Instrument_Serif'] italic font-normal text-[#2D5A3F]">nothing you don't.</span>
              </h2>
              <p className="text-xl text-[#2A1F17]/70 leading-relaxed">Stop juggling WhatsApp messages, M-Pesa screenshots, and Instagram DMs. Sokoa brings it all into one warm, friendly home.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Store, 
                  color: "#C2452D", 
                  title: "Instant Storefront", 
                  desc: "Your products and branding imported directly from your social profiles. A beautiful shop in seconds.",
                  badge: "Automatic"
                },
                { 
                  icon: CreditCard, 
                  color: "#2D5A3F", 
                  title: "Native M-Pesa", 
                  desc: "Zero manual checks. Customers pay via STK push, and funds go directly to your Till instantly.",
                  badge: "Seamless"
                },
                { 
                  icon: ShoppingBag, 
                  color: "#D4A04C", 
                  title: "Inventory Sync", 
                  desc: "Sell on TikTok, Facebook, and your site at the same time. Stock updates magically.",
                  badge: "Always updated"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-[#F5E6D3] rounded-[2.5rem] p-10 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 blob-shape -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" style={{ backgroundColor: feature.color, opacity: 0.1 }}></div>
                  
                  <div className="mb-6 inline-flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A3F]">{feature.badge}</span>
                  </div>
                  
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-[1.2rem] bg-[#FBF6EE] shadow-sm flex items-center justify-center relative z-10 border border-[#EAD3B8]">
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    {/* Hand-drawn circle accent behind icon */}
                    <svg className="absolute -top-2 -left-2 w-20 h-20 -z-0 opacity-50" viewBox="0 0 100 100" fill="none" stroke={feature.color} strokeWidth="2">
                      <path d="M50,10 A40,40 0 1,1 49,10" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-[#2A1F17] mb-4 relative inline-block">
                    {feature.title}
                    <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#D4A04C] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 0" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </h3>
                  <p className="text-lg text-[#2A1F17]/70 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KENTE DIVIDER STRIP */}
        <div className="h-4 w-full flex bg-[#F5E6D3]">
          <div className="flex-1 bg-[#C2452D]"></div>
          <div className="flex-1 bg-[#D4A04C]"></div>
          <div className="flex-1 bg-[#2D5A3F]"></div>
          <div className="flex-1 bg-[#C2452D]"></div>
          <div className="flex-1 bg-[#D4A04C]"></div>
          <div className="flex-1 bg-[#2D5A3F]"></div>
        </div>

        {/* FACEBOOK & IG SECTION */}
        <section className="py-24 md:py-32 bg-[#F5E6D3] relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-[1rem] bg-[#EAD3B8] border border-[#C2452D]/20 mb-8 shadow-[4px_4px_0_rgba(194,69,45,0.1)]">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#E07A3E] flex items-center justify-center text-white"><Instagram className="w-4 h-4" /></div>
                    <div className="w-8 h-8 rounded-full bg-[#C2452D] flex items-center justify-center text-white"><Facebook className="w-4 h-4" /></div>
                  </div>
                  <span className="font-bold text-[#C2452D] text-sm">For Facebook & Instagram</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A1F17] mb-6 leading-tight">
                  Your DMs are not a checkout.
                </h2>
                <p className="text-xl text-[#2A1F17]/75 mb-10 leading-relaxed">
                  Sokoa reads your existing posts, captions, and prices and turns them into a real shop. Stop replying "check DM for price" and start receiving payment notifications.
                </p>

                <ul className="space-y-6 mb-12">
                  {[
                    "Auto-import posts, carousels, and Page Albums",
                    "Smart DM replies with a one-tap checkout link",
                    "Funds land in your Till instantly — no chasing screenshots",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#D4A04C] flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-[#2A1F17]" />
                      </div>
                      <span className="text-[#2A1F17] text-lg font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="bg-[#C2452D] hover:bg-[#A33823] text-[#FBF6EE] font-bold text-lg py-4 px-8 rounded-full shadow-[0_8px_24px_rgba(194,69,45,0.25)] transition-all hover:-translate-y-1 inline-flex items-center gap-3 group">
                  See how it works
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="relative">
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-[#E07A3E] rounded-[3rem] transform translate-x-4 translate-y-4 opacity-30"></div>
                <div className="absolute inset-0 border-4 border-[#2D5A3F] rounded-[3rem] transform -translate-x-2 -translate-y-2 pointer-events-none z-20 opacity-20"></div>

                <div className="aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-[#EAD3B8]">
                  <img
                    src="/__mockup/images/socials-fbig.png"
                    alt="Selling on Instagram"
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  />
                  
                  {/* Floating IG Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-8 left-4 md:-left-8 bg-[#FBF6EE] rounded-3xl p-4 shadow-xl border border-[#EAD3B8] w-[220px]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E07A3E] flex items-center justify-center text-white">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2A1F17]">@amani.beads</div>
                        <div className="text-xs text-[#2D5A3F] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Synced
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square rounded-lg bg-[#EAD3B8]" />
                      ))}
                    </div>
                  </motion.div>

                  {/* Floating FB Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-8 right-4 md:-right-8 bg-[#FBF6EE] rounded-3xl p-5 shadow-xl border border-[#EAD3B8] w-[260px]"
                  >
                    <div className="flex items-center gap-3 mb-4 border-b border-[#EAD3B8] pb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#2A1F17] flex items-center justify-center text-white">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2A1F17]">Page Order</div>
                        <div className="text-xs text-[#2A1F17]/60">via Shop Now</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs font-bold text-[#2A1F17]/50 uppercase tracking-widest">Paid</div>
                      <div className="font-extrabold text-xl text-[#2D5A3F]">+KES 2,800</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIKTOK SECTION */}
        <section className="py-24 md:py-32 bg-[#1F3D2A] text-[#FBF6EE] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2D5A3F] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-last lg:order-first">
                {/* Mustard backdrop shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#D4A04C] rounded-full opacity-20 blur-xl"></div>
                
                <div className="aspect-[9/16] w-full max-w-[340px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[12px] border-[#2D5A3F] relative bg-[#1F3D2A]">
                  <img src="/__mockup/images/tiktok-live.png" alt="TikTok Live" className="w-full h-full object-cover opacity-80" />
                  
                  <div className="absolute top-6 left-6 bg-[#C2452D] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-[#FBF6EE] text-[#2A1F17] p-4 rounded-2xl flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#EAD3B8] rounded-xl flex items-center justify-center text-xl">
                          💄
                        </div>
                        <div>
                          <div className="font-bold text-sm">Fenty Gloss</div>
                          <div className="text-sm font-extrabold text-[#C2452D]">KES 3,500</div>
                        </div>
                      </div>
                      <button className="bg-[#2A1F17] text-[#FBF6EE] px-4 py-2 rounded-xl text-sm font-bold">Buy</button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[1rem] bg-[#2D5A3F] border border-[#FBF6EE]/10 mb-8 font-bold text-sm text-[#D4A04C]">
                  <Play className="w-4 h-4 fill-current" /> Built for TikTok Live
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#FBF6EE]">
                  Turn viewers into buyers <span className="font-['Instrument_Serif'] italic font-normal text-[#D4A04C]">instantly.</span>
                </h2>
                <p className="text-xl text-[#FBF6EE]/80 mb-10 leading-relaxed">
                  Drop your store link in chat. Viewers can browse your live inventory and checkout with M-Pesa without ever leaving the TikTok app.
                </p>
                
                <ul className="space-y-6 mb-12">
                  {['Pay-per-hour pricing for live sessions', 'Instant checkout link dropping', 'Real-time stock alerts for scarcity'].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-[#D4A04C] shrink-0 mt-0.5" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="bg-[#D4A04C] hover:bg-[#C18E3B] text-[#2A1F17] font-bold text-lg py-4 px-8 rounded-full shadow-lg transition-all hover:-translate-y-1">
                  Explore Live Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SHOWCASE GRID */}
        <section className="py-24 md:py-32 bg-[#EAD3B8]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A1F17] mb-4">See what neighbors are building.</h2>
                <p className="text-xl text-[#2A1F17]/70 leading-relaxed">From handmade fashion to urban thrift, Sokoa powers Nairobi's most vibrant storefronts.</p>
              </div>
              <button className="text-[#2D5A3F] font-bold text-lg border-b-2 border-[#2D5A3F] pb-1 hover:text-[#1F3D2A] hover:border-[#1F3D2A] transition-colors shrink-0">
                View all stores →
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {showcase.map((store, i) => (
                <div key={store.id} className="group cursor-pointer">
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 bg-[#F5E6D3] relative shadow-[0_10px_30px_rgba(42,31,23,0.08)] border-8 border-[#FBF6EE]">
                    <img src={`/__mockup/images/store-${i + 1}.png`} alt={store.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 bg-[#FBF6EE] rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                      <Leaf className="w-3.5 h-3.5 text-[#2D5A3F]" />
                      <span className="text-[10px] font-bold text-[#2D5A3F] uppercase tracking-widest">Powered by Sokoa</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between px-2">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#2A1F17] mb-1">{store.name}</h3>
                      <p className="text-[#2A1F17]/60 font-medium">{store.category} • {store.city}</p>
                      
                      {/* Hand-drawn stars */}
                      <div className="flex gap-1 mt-3 text-[#D4A04C]">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[#FBF6EE] shadow-sm flex items-center justify-center text-3xl border border-[#2A1F17]/5 rotate-3 group-hover:-rotate-3 transition-transform">
                      {store.coverEmoji}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 md:py-32 bg-[#FBF6EE] relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#2A1F17] mb-20">
              Word on the <span className="font-['Instrument_Serif'] italic font-normal text-[#C2452D]">street.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#F5E6D3] rounded-[2.5rem] p-10 relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.5),0_10px_30px_rgba(42,31,23,0.05)]">
                  <div className="absolute -top-6 left-10 font-['Instrument_Serif'] text-[100px] leading-none text-[#E07A3E] opacity-50 font-normal">"</div>
                  
                  <p className="text-lg text-[#2A1F17]/80 leading-relaxed mb-10 relative z-10 font-medium">
                    {t.quote}
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-[#2A1F17]/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-[#EAD3B8] border-2 border-[#FBF6EE] overflow-hidden">
                      <img src={`/__mockup/images/store-${t.id}.png`} alt={t.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div>
                      <div className="font-bold text-[#2A1F17]">{t.name}</div>
                      <div className="text-sm font-medium text-[#D4A04C]">{t.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default SunBaked;