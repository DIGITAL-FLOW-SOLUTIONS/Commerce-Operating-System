import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { useCreateLead } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";
import { Play, Clock, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TikTok() {
  const [, setLocation] = useLocation();
  const [handle, setHandle] = useState("");
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    createLead.mutate({
      data: {
        inputValue: handle,
        source: "tiktok_page",
        intentType: "tiktok_live"
      }
    }, {
      onSuccess: (data) => {
        localStorage.setItem("sokoa_session_token", data.sessionToken);
        setLocation("/signup?intent=tiktok");
      },
      onError: () => {
        setLocation("/signup?intent=tiktok");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title="TikTok Live Selling for African Merchants | Sokoa" description="Turn viewers into buyers instantly with pay-per-hour stores designed specifically for TikTok Live." />
      
      {/* Dark mode specific navbar for this page */}
      <div className="dark">
        <Navbar />
      </div>

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
                    onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                    placeholder="your_tiktok_handle" 
                    className="h-14 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-secondary text-base"
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
                        <div className="font-bold text-sm text-primary">🛍️ Store is Live!</div>
                        <div className="text-xs font-bold text-black/50">Pin to top</div>
                      </div>
                      <p className="text-sm font-medium mb-3">Buy today's featured products directly via M-Pesa. Tap the link below!</p>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 font-bold">
                        sokoa.shop/live/amani
                      </Button>
                    </div>

                    {/* Chat simulation */}
                    <div className="space-y-2 max-h-32 overflow-hidden mask-image-bottom">
                      <div className="text-sm"><span className="font-bold opacity-70">mumbi:</span> is the red available?</div>
                      <div className="text-sm"><span className="font-bold opacity-70">wanjiku99:</span> buying right now!!</div>
                      <div className="text-sm text-secondary font-bold">🎉 wanjiku99 just bought!</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

      <div className="dark">
        <Footer />
      </div>
    </div>
  );
}
