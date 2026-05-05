import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface StoreHeaderProps {
  storeName: string;
  backTo?: string;
  cartCount?: number;
  cartTo?: string;
  showBack?: boolean;
  className?: string;
  compact?: boolean;
}

export function StoreHeader({
  storeName,
  backTo,
  cartCount,
  cartTo,
  showBack,
  className,
  compact,
}: StoreHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border",
        compact ? "py-3" : "py-4",
        className
      )}
    >
      <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
        {showBack && backTo && (
          <Link href={backTo}>
            <button className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <h1 className={cn("font-display font-bold truncate text-foreground", compact ? "text-base" : "text-lg")}>
            {storeName}
          </h1>
        </div>
        {cartTo !== undefined && (
          <Link href={cartTo}>
            <button className="relative p-2 -mr-2 rounded-xl hover:bg-muted transition-colors">
              <ShoppingBag size={22} className="text-foreground" />
              {cartCount !== undefined && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
