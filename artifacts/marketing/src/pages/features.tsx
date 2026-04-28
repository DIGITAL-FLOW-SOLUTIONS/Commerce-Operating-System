import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Features() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Features | Sokoa" description="Deep dive into Sokoa's features: M-Pesa integration, custom domains, and more." />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-8">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-12">
          Everything you need to run a modern social commerce business in Africa. Built for speed, reliability, and conversion.
        </p>
        
        {/* Simple placeholder content to satisfy requirements */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Native M-Pesa Checkout</h3>
            <p className="text-muted-foreground">Direct STK push integration. Funds settle straight into your Till or Paybill number. No holding periods, no middleman fees.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Custom Domains</h3>
            <p className="text-muted-foreground">Look professional with your own .com or .co.ke domain. We handle the SSL certificates and hosting automatically.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TikTok Live Mode</h3>
            <p className="text-muted-foreground">A specialized pay-per-hour store designed for the speed of live selling. Frictionless checkout to capture impulse buyers.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Inventory Sync</h3>
            <p className="text-muted-foreground">Keep your stock accurate across all channels. When an item sells on the website, it's marked out of stock everywhere.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
