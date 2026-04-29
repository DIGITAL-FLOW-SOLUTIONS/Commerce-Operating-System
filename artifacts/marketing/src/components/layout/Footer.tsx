import { Link } from "wouter";
import { SokoaLogo } from "@/components/SokoaLogo";
import { Facebook, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4" aria-label="Sokoa home">
              <SokoaLogo variant="horizontal" theme="dark" height={36} />
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              The store, payments, and live-selling stack for African social sellers. Built for the hustle.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/sokoa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sokoa on Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/sokoa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sokoa on Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@sokoa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sokoa on TikTok"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:scale-105 transition-all"
              >
                <SiTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/tiktok" className="hover:text-white transition-colors">TikTok Live</Link></li>
              <li><Link href="/boutique" className="hover:text-white transition-colors">Boutique</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Sokoa Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Built with 💚 in Nairobi
          </div>
        </div>
      </div>
    </footer>
  );
}
