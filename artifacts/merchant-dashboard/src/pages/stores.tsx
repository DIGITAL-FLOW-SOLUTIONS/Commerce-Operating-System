import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Search,
  Plus,
  Globe,
  Lock,
  ShoppingBag,
  Video,
  ExternalLink,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, Store, StoreStatus, StoreType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

const STATUS_LABELS: Record<StoreStatus, string> = {
  active: "Active",
  draft: "Draft",
  expired: "Expired",
};

const TYPE_LABELS: Record<StoreType, string> = {
  tiktok: "TikTok Live",
  boutique: "Boutique",
};

const STATUS_COLORS: Record<StoreStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  draft: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
};

function StoreThumbnail({ store, className }: { store: Store; className?: string }) {
  const gradients: Record<StoreType, string> = {
    tiktok: "from-rose-950 via-pink-900 to-violet-900",
    boutique: "from-indigo-950 via-violet-900 to-purple-900",
  };

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {store.thumbnailUrl ? (
        <img
          src={store.thumbnailUrl}
          alt={store.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn("h-full w-full bg-gradient-to-br flex items-center justify-center", gradients[store.type])}>
          {store.type === "tiktok" ? (
            <Video className="h-10 w-10 text-white/30" />
          ) : (
            <ShoppingBag className="h-10 w-10 text-white/30" />
          )}
        </div>
      )}
      {store.activeSession && (
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-white uppercase tracking-wide">Live</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="sm" variant="secondary" className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-black/80 text-foreground gap-1.5 text-xs font-semibold">
          <ExternalLink className="h-3 w-3" /> Open Store
        </Button>
      </div>
    </div>
  );
}

function StoreCard({ store }: { store: Store }) {
  const [, navigate] = useLocation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/stores/${store.id}`)}
      className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-border/80 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <StoreThumbnail store={store} className="aspect-[16/9]" />
      <div className="p-3.5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-card-foreground truncate leading-tight">{store.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              {store.url ? (
                <Globe className="h-3 w-3 text-muted-foreground shrink-0" />
              ) : (
                <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
              )}
              <span className="text-[11px] text-muted-foreground truncate">
                {store.updatedAt ? `${store.updatedAt}` : "Just created"}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={e => { e.stopPropagation(); navigate(`/stores/${store.id}`); }}>View Analytics</DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()}>Edit Store</DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()}>Duplicate</DropdownMenuItem>
              <DropdownMenuItem onClick={e => e.stopPropagation()} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", STATUS_COLORS[store.status])}>
            {STATUS_LABELS[store.status]}
          </span>
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {TYPE_LABELS[store.type]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StoreRow({ store }: { store: Store }) {
  const [, navigate] = useLocation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={() => navigate(`/stores/${store.id}`)}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 hover:border-border/80 hover:shadow-sm transition-all duration-200 cursor-pointer"
    >
      <StoreThumbnail store={store} className="h-14 w-24 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-card-foreground truncate">{store.name}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          {store.url ? (
            <Globe className="h-3 w-3 text-muted-foreground shrink-0" />
          ) : (
            <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
          )}
          <span className="text-[11px] text-muted-foreground truncate">
            {store.updatedAt ?? "Just created"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", STATUS_COLORS[store.status])}>
          {STATUS_LABELS[store.status]}
        </span>
        <span className="hidden sm:inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {TYPE_LABELS[store.type]}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={e => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={e => { e.stopPropagation(); navigate(`/stores/${store.id}`); }}>View Analytics</DropdownMenuItem>
            <DropdownMenuItem onClick={e => e.stopPropagation()}>Edit Store</DropdownMenuItem>
            <DropdownMenuItem onClick={e => e.stopPropagation()}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem onClick={e => e.stopPropagation()} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

function FilterButton({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  const selected = options.find(o => o.value === value);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-9 text-sm font-normal">
          {selected?.label ?? label}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {options.map(o => (
          <DropdownMenuItem
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(value === o.value && "font-semibold")}
          >
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function MyStores() {
  const { stores } = useData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("any");
  const [typeFilter, setTypeFilter] = useState("any");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return stores.filter(s => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "any" || s.status === statusFilter;
      const matchType = typeFilter === "any" || s.type === typeFilter;
      return matchName && matchStatus && matchType;
    });
  }, [stores, search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
          <LayoutGrid className="h-6 w-6 text-muted-foreground" />
          My Stores
        </h1>
        <Link href="/tiktok-live">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Create Store
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search stores..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pl-9"
          />
        </div>
        <FilterButton
          label="Any status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "Any status", value: "any" },
            { label: "Active", value: "active" },
            { label: "Draft", value: "draft" },
            { label: "Expired", value: "expired" },
          ]}
        />
        <FilterButton
          label="Any type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { label: "Any type", value: "any" },
            { label: "TikTok Live", value: "tiktok" },
            { label: "Boutique", value: "boutique" },
          ]}
        />
        <div className="flex items-center rounded-md border border-input overflow-hidden ml-auto">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "flex h-9 w-9 items-center justify-center transition-colors",
              view === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex h-9 w-9 items-center justify-center transition-colors border-l border-input",
              view === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center space-y-3">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-muted-foreground">No stores found</p>
            <p className="text-sm text-muted-foreground/60 mt-0.5">Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2"
            >
              {filtered.map(store => (
                <StoreRow key={store.id} store={store} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
