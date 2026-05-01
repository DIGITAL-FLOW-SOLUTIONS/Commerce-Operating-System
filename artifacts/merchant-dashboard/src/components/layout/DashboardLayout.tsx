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
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

function SidebarContent() {
  const [location] = useLocation();
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-full flex-col gap-2 bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <SidebarHeader />
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-4 text-sm font-medium">
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
      <div className="p-4 mt-auto">
        <div className="rounded-xl bg-sidebar-accent p-4">
          <div className="text-sm font-semibold mb-1 text-sidebar-accent-foreground">Need help?</div>
          <div className="text-xs text-muted-foreground mb-3">Check our docs or contact support.</div>
          <Button variant="outline" size="sm" className="w-full bg-transparent border-sidebar-border" asChild>
            <Link href="/help">Help Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Topbar() {
  const { user, notifications } = useData();
  const { theme, setTheme } = useTheme();
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
        <SokoaLogo variant="horizontal" theme="light" height={26} />
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
    <div className="hidden md:flex items-start mb-6">
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
