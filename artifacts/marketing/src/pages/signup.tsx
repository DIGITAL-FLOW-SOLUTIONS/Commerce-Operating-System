import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Signup() {
  const [hasLead, setHasLead] = useState(false);
  
  useEffect(() => {
    // Check if we captured a lead from the marketing flow
    if (localStorage.getItem("sokoa_session_token")) {
      setHasLead(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <SEO title="Create your Sokoa account" description="Start selling in minutes." />
      
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 justify-center relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto mt-12">
          {hasLead && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-primary mb-1">Your store is ready to be claimed!</p>
                <p className="text-xs text-primary/80">Create an account below to securely attach the store we just generated for you.</p>
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start your 14-day free trial. No credit card required.</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">First Name</label>
                <Input type="text" placeholder="Aisha" className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Last Name</label>
                <Input type="text" placeholder="M." className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <Input type="email" placeholder="you@example.com" className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
            </div>
            
            <Button className="w-full h-12 mt-6 font-bold text-base bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">
              Create Account
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 bg-foreground p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center text-white max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-8">
             <div>
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold text-xl mb-2 font-display">Launch Instantly</h3>
              <p className="text-white/60 text-sm leading-relaxed">No developers needed. Your site goes live the moment you sign up.</p>
             </div>
             <div>
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-bold text-xl mb-2 font-display">Native M-Pesa</h3>
              <p className="text-white/60 text-sm leading-relaxed">Connect your Till or Paybill and start receiving funds directly.</p>
             </div>
             <div>
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold text-xl mb-2 font-display">Mobile First</h3>
              <p className="text-white/60 text-sm leading-relaxed">Manage your entire business from your phone browser. No app required.</p>
             </div>
             <div>
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-bold text-xl mb-2 font-display">Custom Domain</h3>
              <p className="text-white/60 text-sm leading-relaxed">Look professional with your own .com or .co.ke domain.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
