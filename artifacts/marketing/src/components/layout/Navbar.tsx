import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              S
            </div>
            Sokoa
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Features</Link>
            <Link href="/socials" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">FB & IG</Link>
            <Link href="/tiktok" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              TikTok Live
            </Link>
            <Link href="/sneakers" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Sneakers
            </Link>
            <Link href="/boutique" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Boutique</Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Pricing</Link>
            <Link href="/templates" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Templates</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Log in</Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6">
              Start Free
            </Button>
          </Link>
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white border-b shadow-lg flex flex-col p-4 gap-4"
          >
            <Link href="/features" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg">Features</Link>
            <Link href="/socials" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg">Facebook & Instagram</Link>
            <Link href="/tiktok" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg flex items-center gap-2">
              TikTok Live <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">New</span>
            </Link>
            <Link href="/sneakers" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg flex items-center gap-2">
              Sneakers <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Hype</span>
            </Link>
            <Link href="/boutique" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg">Boutique</Link>
            <Link href="/pricing" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg">Pricing</Link>
            <Link href="/templates" className="p-3 text-lg font-medium text-foreground border-b hover:bg-muted/50 rounded-lg">Templates</Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full justify-center h-12 rounded-full text-lg">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full justify-center h-12 bg-primary text-white rounded-full text-lg font-semibold">Start Free</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
