import React, { useState } from "react";
import { useData, Store, StoreType, AppState, Template } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  CirclePlay, 
  ExternalLink, 
  Plus, 
  ShoppingBag, 
  Store as StoreIcon,
  TrendingUp,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
}

function PrimaryStoreCard({ type, store, onAction }: { type: StoreType, store?: Store, onAction: () => void }) {
  const isTiktok = type === "tiktok";
  const Icon = isTiktok ? Video : ShoppingBag;
  const title = isTiktok ? "TikTok Live Store" : "Boutique Storefront";
  
  if (!store) {
    return (
      <Card className="flex flex-col h-full overflow-hidden border-dashed bg-muted/30">
        <CardHeader>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            {isTiktok 
              ? "Sell directly during your TikTok live streams with seamless checkout." 
              : "A full-featured online store for your entire catalog and brand."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1" />
        <CardFooter>
          <Button onClick={onAction} className="w-full sm:w-auto" variant="secondary">
            <Plus className="mr-2 h-4 w-4" /> Create {isTiktok ? "Live Store" : "Boutique"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "flex flex-col h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-md",
      isTiktok && store.activeSession ? "border-primary shadow-sm shadow-primary/20" : ""
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{store.name}</CardTitle>
              <CardDescription className="text-xs">{title}</CardDescription>
            </div>
          </div>
          {isTiktok && store.activeSession ? (
            <Badge variant="default" className="bg-destructive text-destructive-foreground hover:bg-destructive animate-pulse">
              <CirclePlay className="mr-1.5 h-3 w-3" /> Live Now
            </Badge>
          ) : (
            <Badge variant="outline" className={cn(
              store.status === "active" ? "text-primary border-primary/20 bg-primary/5" : "text-muted-foreground"
            )}>
              {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Revenue Today</p>
            <p className="text-2xl font-display font-semibold text-foreground">
              {formatCurrency(store.revenueToday || 0)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {isTiktok ? "Total Revenue" : "Total Orders"}
            </p>
            <p className="text-2xl font-display font-semibold text-muted-foreground">
              {isTiktok 
                ? formatCurrency(store.totalRevenue || 0) 
                : store.ordersCount?.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex items-center justify-between border-t bg-muted/20">
        <div className="text-sm text-muted-foreground truncate max-w-[200px] flex items-center">
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          {store.url || "No domain set"}
        </div>
        <Button onClick={onAction} size="sm" variant="ghost" className="font-semibold text-primary hover:text-primary hover:bg-primary/10">
          Manage <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function SmallStoreCard({ store }: { store: Store }) {
  const isTiktok = store.type === "tiktok";
  const Icon = isTiktok ? Video : ShoppingBag;

  return (
    <Card className="flex flex-col min-w-[280px] w-full md:w-auto overflow-hidden hover:border-primary/50 transition-colors">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold truncate">{store.name}</h4>
            <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-5">
              {store.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{isTiktok ? "TikTok Live" : "Boutique"}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{formatCurrency(store.revenueToday || 0)} <span className="text-muted-foreground font-normal text-xs ml-1">today</span></span>
            <Button size="sm" variant="link" className="h-auto p-0 text-primary">Open</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-all hover:shadow-md h-full flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img 
          src={template.imageUrl} 
          alt={template.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <Button variant="default" className="w-full shadow-lg" size="sm">
            Use Template
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold truncate">{template.name}</h3>
          <Badge variant="outline" className="text-[10px] bg-background">
            {template.theme}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {template.type === "tiktok" ? "Optimized for Live Commerce" : "Full Catalog Boutique"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { user, appState, setAppState, stores, templates, payoutMethods } = useData();
  const hasNoPayoutMethods = payoutMethods.length === 0;

  const tiktokStore = stores.find(s => s.type === "tiktok");
  const boutiqueStore = stores.find(s => s.type === "boutique");

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground mt-1">Merchant Workspace</p>
        </div>
        
        {/* Demo State Switcher */}
        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">Demo State</span>
          <Select value={appState} onValueChange={(v) => setAppState(v as AppState)}>
            <SelectTrigger className="w-[140px] h-8 text-xs font-medium border-0 bg-background shadow-sm">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="both">Both Stores</SelectItem>
              <SelectItem value="tiktok_only">TikTok Only</SelectItem>
              <SelectItem value="boutique_only">Boutique Only</SelectItem>
              <SelectItem value="none">No Stores</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasNoPayoutMethods && (
        <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Action Required</AlertTitle>
          <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
            <span>Add a payout method to start receiving funds and publish your stores.</span>
            <Button size="sm" variant="outline" className="border-destructive/30 hover:bg-destructive hover:text-destructive-foreground" asChild>
              <Link href="/payouts">Setup Payouts</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Primary Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="h-full"
        >
          <PrimaryStoreCard 
            type="tiktok" 
            store={tiktokStore} 
            onAction={() => console.log('manage tiktok')} 
          />
        </motion.div>
        
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="h-full"
        >
          <PrimaryStoreCard 
            type="boutique" 
            store={boutiqueStore} 
            onAction={() => console.log('manage boutique')} 
          />
        </motion.div>
      </div>

      {/* My Stores Section (Hidden if none) */}
      <AnimatePresence>
        {stores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold tracking-tight">Active Stores</h2>
              <Button variant="link" className="text-primary pr-0" asChild>
                <Link href="/stores">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:px-0 md:mx-0 snap-x">
              {stores.map((store, i) => (
                <div key={store.id} className="snap-start shrink-0">
                  <SmallStoreCard store={store} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Templates */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-display font-semibold tracking-tight">Store Templates</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">Start selling faster with premium themes.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates">View Gallery</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="h-full"
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
