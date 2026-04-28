import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Help() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Help & FAQ | Sokoa" description="Frequently asked questions and support for Sokoa merchants." />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4 text-center">Help Center & FAQ</h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">Everything you need to know about selling on Sokoa.</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold">How do M-Pesa payouts work?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              When a customer buys from your store, they receive an STK push on their phone. The funds are sent directly to the Till or Paybill number you configured. Sokoa does not hold your funds.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-bold">Do you charge transaction fees?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No. We do not take a cut of your sales. You only pay the standard Safaricom M-Pesa transaction charges, plus your flat Sokoa subscription fee (or hourly fee for TikTok Live).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold">Can I use my own domain name?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Yes! All Boutique tier plans include the ability to connect a custom .com or .co.ke domain to your store.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold">How does the TikTok Live pricing work?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Instead of paying a monthly fee, you can activate your store just for the hours you are live streaming on TikTok. You are billed KES 50 per hour while the store is active, and it costs nothing when turned off.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <Footer />
    </div>
  );
}
