import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useCreateLead } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    createLead.mutate({
      data: {
        inputValue: email,
        source: "footer", // Using footer as source since "contact" isn't in the enum for source
        intentType: "contact"
      }
    }, {
      onSuccess: () => {
        toast({ title: "Message sent! We'll be in touch soon." });
        setEmail("");
        setMessage("");
      },
      onError: () => {
        toast({ title: "Failed to send message.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Contact Us | Sokoa" description="Get in touch with the Sokoa team." />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-4 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4 text-center">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-10 text-lg">Have a question? We'd love to hear from you.</p>
        
        <div className="bg-card p-8 rounded-3xl border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required
                className="h-12 bg-muted/50 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Message</label>
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?" 
                rows={5}
                required
                className="resize-none bg-muted/50 border-border"
              />
            </div>
            <Button type="submit" disabled={createLead.isPending} className="w-full h-12 font-bold text-base bg-primary text-white">
              {createLead.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
