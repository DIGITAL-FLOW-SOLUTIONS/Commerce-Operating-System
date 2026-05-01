import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Search,
  Globe,
  ShoppingBag,
  Video,
  ExternalLink,
  MoreHorizontal,
  ChevronDown,
  Rocket,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, Store, StoreType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

const TYPE_LABELS: Record<StoreType, string> = {
  tiktok: "TikTok Live",
  boutique: "Boutique",
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
        <Button
          size="sm"
          variant="secondary"
          className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-black/80 text-foreground gap-1.5 text-xs font-semibold"
        >
          <ExternalLink className="h-3 w-3" /> Visit Store
        </Button>
      </div>
    </div>
  );
}

function PublishedCard({ store }: { store: Store }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-border/80 hover:shadow-md transition-all duration-200"
    >
      <StoreThumbnail store={store} className="aspect-[16/9]" />
      <div className="p-3.5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-card-foreground truncate leading-tight">{store.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Globe className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-[11px] text-muted-foreground truncate">
                {store.updatedAt ?? "Just published"}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={e => e.preventDefault()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <ExternalLink className="h-3.5 w-3.5 mr-2" /> Visit Store
              </DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>Edit Store</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">Unpublish</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            <Globe className="h-2.5 w-2.5" /> Published
          </span>
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {TYPE_LABELS[store.type]}
          </span>
        </div>
        {store.url && (
          <a
            href={`https://${store.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary hover:underline truncate"
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
            {store.url}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function PublishedRow({ store }: { store: Store }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 hover:border-border/80 hover:shadow-sm transition-all duration-200"
    >
      <StoreThumbnail store={store} className="h-14 w-24 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-card-foreground truncate">{store.name}</h3>
        {store.url && (
          <a
            href={`https://${store.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary hover:underline mt-0.5 truncate"
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
            {store.url}
          </a>
        )}
        <div className="flex items-center gap-1.5 mt-0.5">
          <Globe className="h-3 w-3 text-muted-foreground shrink-0" />
          <span className="text-[11px] text-muted-foreground">{store.updatedAt ?? "Just published"}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {TYPE_LABELS[store.type]}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={e => e.preventDefault()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>
              <ExternalLink className="h-3.5 w-3.5 mr-2" /> Visit Store
            </DropdownMenuItem>
            <DropdownMenuItem>View Analytics</DropdownMenuItem>
            <DropdownMenuItem>Edit Store</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">Unpublish</DropdownMenuItem>
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

export default function PublishedStores() {
  const { stores } = useData();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("any");
  const [view, setView] = useState<ViewMode>("grid");

  const publishedStores = useMemo(() => stores.filter(s => !!s.url), [stores]);

  const filtered = useMemo(() => {
    return publishedStores.filter(s => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "any" || s.type === typeFilter;
      return matchName && matchType;
    });
  }, [publishedStores, search, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
          <LayoutGrid className="h-6 w-6 text-muted-foreground" />
          Published Stores
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search published stores..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pl-9"
          />
        </div>
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
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Rocket className="h-8 w-8 text-primary/60" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No published stores yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search || typeFilter !== "any"
                ? "No stores match your search."
                : "Publish a store to see it here."}
            </p>
          </div>
          {!search && typeFilter === "any" && (
            <Link href="/stores">
              <Button size="sm" variant="outline" className="gap-1.5">
                <ShoppingBag className="h-4 w-4" /> View My Stores
              </Button>
            </Link>
          )}
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
                <PublishedCard key={store.id} store={store} />
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
                <PublishedRow key={store.id} store={store} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
