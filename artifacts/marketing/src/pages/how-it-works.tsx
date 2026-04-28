import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="How it Works | Sokoa" description="Learn how to launch your Sokoa store in minutes." />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-8 text-center">How It Works</h1>
        
        <div className="space-y-12 mt-16 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
          
          {[
            { step: "01", title: "Connect your social presence", desc: "Paste your Instagram, Facebook, or TikTok link. We'll automatically pull in your brand assets." },
            { step: "02", title: "Add your M-Pesa details", desc: "Enter your Till or Paybill number. No complex verification required." },
            { step: "03", title: "Add products", desc: "Upload photos, set prices in KES, and manage inventory right from your phone." },
            { step: "04", title: "Start selling", desc: "Share your custom link. Customers buy instantly via M-Pesa STK push. Money goes directly to you." }
          ].map((item, i) => (
            <div key={i} className="flex gap-8 relative">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white font-bold font-display flex items-center justify-center text-xl shrink-0 z-10 hidden md:flex">
                {item.step}
              </div>
              <div className="bg-card p-8 rounded-3xl border shadow-sm flex-1">
                <div className="text-primary font-bold text-sm mb-2 md:hidden">STEP {item.step}</div>
                <h3 className="text-2xl font-bold font-display mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
