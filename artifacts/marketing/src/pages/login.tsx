import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-background">
      <SEO title="Log in to Sokoa" description="Access your Sokoa dashboard." />
      
      {/* Left side form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 justify-center relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-2xl mb-8 shadow-lg shadow-primary/20">
            S
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Log in to manage your boutique.</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <Input type="email" placeholder="you@example.com" className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold">Password</label>
                <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot?</a>
              </div>
              <Input type="password" placeholder="••••••••" className="h-12 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:border-primary" />
            </div>
            
            <Button className="w-full h-12 mt-4 font-bold text-base bg-foreground text-white hover:bg-foreground/90 rounded-xl">
              Log in
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right side visual */}
      <div className="hidden lg:block w-1/2 bg-primary p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/boutique.png')] opacity-30 mix-blend-multiply bg-cover bg-center" />
        <div className="relative z-10 h-full flex flex-col justify-end text-white max-w-lg">
          <h2 className="text-4xl font-display font-bold mb-4 leading-tight">"Sokoa saved me 2 hours a day of answering DMs."</h2>
          <p className="text-xl text-white/80 font-medium mb-8">— Aisha, Nairobi</p>
        </div>
      </div>
    </div>
  );
}
