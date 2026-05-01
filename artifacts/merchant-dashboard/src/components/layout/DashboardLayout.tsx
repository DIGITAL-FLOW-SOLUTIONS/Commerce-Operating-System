import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useData } from "@/lib/mock-data";
import { SokoaLogo } from "@/components/SokoaLogo";
import {
  LayoutDashboard,
  Store,
  Globe,
  CreditCard,
  Sparkles,
  BarChart,
  Bell,
  Settings,
  Menu,
  Search,
  X,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Plus,
  Smartphone,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUpgradeModal } from "@/contexts/upgrade-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";

export const NAVIGATION = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My Stores", href: "/stores", icon: Store },
  { name: "Published Stores", href: "/published", icon: Globe },
  { name: "Payouts", href: "/payouts", icon: CreditCard },
  { name: "Subscriptions", href: "/subscriptions", icon: Sparkles },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

function SidebarHeader() {
  const { user } = useData();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
      {/* Avatar + profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer flex items-center w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notifications" className="cursor-pointer flex items-center w-full">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="cursor-pointer flex items-center w-full">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search icon */}
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}

const PLAN_STORE_LIMIT = 3;
const PLAN_PUBLISHED_LIMIT = 3;

function PlanWidget() {
  const { stores } = useData();
  const { openUpgradeModal } = useUpgradeModal();
  const createdCount = stores.length;
  const publishedCount = stores.filter((s: { status: string }) => s.status === "published" || s.status === "live").length;
  const createdPct = Math.min(100, (createdCount / PLAN_STORE_LIMIT) * 100);
  const publishedPct = Math.min(100, (publishedCount / PLAN_PUBLISHED_LIMIT) * 100);

  return (
    <div className="space-y-3 text-sidebar-foreground">
      {/* Plan title */}
      <p className="text-xs font-semibold text-sidebar-foreground">Your Starter Plan</p>

      {/* Free Stores */}
      <div className="space-y-1.5">
        <div className="flex items-start gap-2.5">
          <Store className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium leading-tight">Free Stores</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{createdCount}/{PLAN_STORE_LIMIT} created</p>
          </div>
          <div className="h-1.5 w-10 rounded-full bg-sidebar-border overflow-hidden self-center shrink-0">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${createdPct}%` }} />
          </div>
        </div>
      </div>

      {/* Published Stores */}
      <div className="space-y-1.5">
        <div className="flex items-start gap-2.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium leading-tight">Published Stores</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{publishedCount}/{PLAN_PUBLISHED_LIMIT} published</p>
          </div>
          <div className="h-1.5 w-10 rounded-full bg-sidebar-border overflow-hidden self-center shrink-0">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${publishedPct}%` }} />
          </div>
        </div>
      </div>

      {/* Upgrade button */}
      <Button
        size="sm"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5"
        onClick={openUpgradeModal}
      >
        <Zap className="h-3.5 w-3.5 fill-current" />
        Upgrade to Sokoa Pro
      </Button>

      {/* Install link only */}
      <div className="flex items-center justify-center text-[11px] text-muted-foreground">
        <Link href="/install" className="flex items-center gap-1 hover:text-foreground transition-colors">
          Install Sokoa on
          <Smartphone className="h-3 w-3 mx-0.5" />
        </Link>
      </div>
    </div>
  );
}

function SidebarContent() {
  const [location] = useLocation();
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-full flex-col gap-2 bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <SidebarHeader />
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-4 text-sm font-medium">
          {/* Quick-create actions */}
          <div className="gradient-border-wrap">
            <Link
              href="/tiktok-live"
              className="flex items-center gap-3 rounded-[7px] bg-sidebar px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span className="flex-1 leading-tight">TikTok Live Selling</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                new
              </span>
            </Link>
          </div>
          <Link
            href="/pre-order"
            className="flex items-center gap-3 rounded-lg border border-sidebar-border px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:bg-primary/5 mb-2"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="flex-1 leading-tight">Create Pre-order Store</span>
          </Link>
          {NAVIGATION.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href} className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" 
                  : "text-muted-foreground"
              )}>
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.name === "Notifications" && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 mt-auto space-y-3">
        {/* Plan widget */}
        <PlanWidget />
      </div>
    </div>
  );
}

function Topbar() {
  const { user, notifications } = useData();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="md:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <Link href="/" className="md:hidden flex items-center" aria-label="Sokoa home">
        <SokoaLogo variant="horizontal" theme={resolvedTheme === "dark" ? "dark" : "light"} height={26} />
      </Link>

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <div className="flex-1 md:flex-initial w-full max-w-sm ml-auto md:ml-0 hidden sm:flex">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="relative rounded-full" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            )}
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="cursor-pointer flex items-center w-full">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help" className="cursor-pointer flex items-center w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function DesktopLogo() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="hidden md:flex items-start justify-end mb-6">
      <Link href="/" aria-label="Sokoa home">
        <SokoaLogo
          variant="horizontal"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          height={30}
        />
      </Link>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      <aside className="hidden w-64 flex-col md:flex fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>
      <div className="flex flex-col sm:gap-4 md:pl-64 flex-1">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <DesktopLogo />
          {children}
        </main>
      </div>
    </div>
  );
}
