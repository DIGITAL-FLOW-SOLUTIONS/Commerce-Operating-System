import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, AlertTriangle, Wallet, MessageSquare, Zap,
  CheckCheck, Check, Package, Bell, BellOff, ChevronRight,
  CheckCircle2, XCircle, TrendingUp, Star, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData, Notification, NotificationCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type FilterTab = "all" | NotificationCategory;

const CATEGORY_CONFIG: Record<NotificationCategory, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}> = {
  order:   { label: "Orders",   icon: ShoppingBag,    color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-500/10"    },
  stock:   { label: "Stock",    icon: AlertTriangle,  color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-500/10"  },
  payout:  { label: "Payouts",  icon: Wallet,         color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  message: { label: "Messages", icon: MessageSquare,  color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
  system:  { label: "System",   icon: Zap,            color: "text-primary",                         bg: "bg-primary/10"    },
};

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all",     label: "All" },
  { id: "order",   label: "Orders" },
  { id: "stock",   label: "Stock" },
  { id: "payout",  label: "Payouts" },
  { id: "message", label: "Messages" },
  { id: "system",  label: "System" },
];

function groupByDate(notifications: Notification[]): { label: string; items: Notification[] }[] {
  const groups: { label: string; items: Notification[] }[] = [];

  const today: Notification[]     = [];
  const yesterday: Notification[] = [];
  const thisWeek: Notification[]  = [];
  const earlier: Notification[]   = [];

  for (const n of notifications) {
    const d = n.date.toLowerCase();
    if (d.includes("just now") || d.includes("min") || d.includes("hour") || d.includes("today") || d === "just now") {
      today.push(n);
    } else if (d.includes("yesterday")) {
      yesterday.push(n);
    } else if (d.includes("day") && !d.includes("week")) {
      thisWeek.push(n);
    } else {
      earlier.push(n);
    }
  }

  if (today.length)     groups.push({ label: "Today",     items: today });
  if (yesterday.length) groups.push({ label: "Yesterday", items: yesterday });
  if (thisWeek.length)  groups.push({ label: "This Week", items: thisWeek });
  if (earlier.length)   groups.push({ label: "Earlier",   items: earlier });

  return groups;
}

function NotificationCard({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) {
  const cfg = CATEGORY_CONFIG[notification.category];
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "group relative flex items-start gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-200",
        notification.read
          ? "border-border bg-card hover:bg-muted/30"
          : "border-primary/20 bg-primary/[0.03] dark:bg-primary/[0.06]"
      )}
    >
      {!notification.read && (
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
      )}

      <div className={cn("rounded-xl p-2.5 shrink-0 mt-0.5", cfg.bg)}>
        <Icon className={cn("h-4 w-4", cfg.color)} />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm leading-snug", notification.read ? "text-foreground" : "font-semibold text-foreground")}>
            {notification.title}
          </p>
          <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
            {notification.date}
          </span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {notification.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap pt-0.5">
          {notification.storeName && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Package className="h-2.5 w-2.5" />
              {notification.storeName}
            </span>
          )}
          {notification.amount && (
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              notification.category === "order" && notification.title.toLowerCase().includes("cancel")
                ? "bg-destructive/10 text-destructive"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}>
              KES {notification.amount.toLocaleString()}
            </span>
          )}
          {notification.storeId && (
            <Link href={`/stores/${notification.storeId}`}>
              <button className="inline-flex items-center gap-1 rounded-full text-[10px] font-medium text-primary hover:underline transition-colors">
                View store <ChevronRight className="h-2.5 w-2.5" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {!notification.read && (
        <button
          onClick={() => onMarkRead(notification.id)}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
          title="Mark as read"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );
}

function EmptyState({ filter }: { filter: FilterTab }) {
  const messages: Record<FilterTab, { icon: React.ComponentType<{ className?: string }>; title: string; sub: string }> = {
    all:     { icon: Bell,          title: "You're all caught up",         sub: "No new notifications right now."              },
    order:   { icon: ShoppingBag,   title: "No order notifications",       sub: "New orders will appear here."                 },
    stock:   { icon: AlertTriangle, title: "All stock levels are healthy", sub: "Low stock alerts will appear here."           },
    payout:  { icon: Wallet,        title: "No payout notifications",      sub: "Processed payouts will appear here."          },
    message: { icon: MessageSquare, title: "No customer messages",         sub: "Messages from customers appear here."         },
    system:  { icon: Zap,           title: "No system updates",            sub: "Platform announcements appear here."          },
  };

  const { icon: Icon, title, sub } = messages[filter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-4 text-center"
    >
      <div className="rounded-full bg-muted p-5">
        <Icon className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useData();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter(n => n.category === activeTab);
  }, [notifications, activeTab]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  const filteredUnread = useMemo(() => filtered.filter(n => !n.read).length, [filtered]);
  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  const getCategoryUnread = (cat: FilterTab) => {
    if (cat === "all") return unreadCount;
    return notifications.filter(n => n.category === cat && !n.read).length;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Bell className="h-6 w-6 text-muted-foreground" />
            Notifications
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-primary text-[11px] font-bold text-primary-foreground px-1.5">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-px border-b border-border">
        {TABS.map(tab => {
          const count = getCategoryUnread(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors shrink-0",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {tab.label}
              {count > 0 && (
                <span className="inline-flex items-center justify-center h-4 min-w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground px-1">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState filter={activeTab} />
      ) : (
        <div className="space-y-6">
          {filteredUnread > 0 && filteredUnread < filtered.length && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {filteredUnread} unread
              </span>
              <div className="flex-1 h-px bg-primary/20" />
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:underline font-medium"
              >
                Mark all read
              </button>
            </div>
          )}

          <AnimatePresence>
            {grouped.map(group => (
              <div key={group.label} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  {group.label}
                </p>
                <div className="space-y-2">
                  <AnimatePresence>
                    {group.items.map(notification => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkRead={markAsRead}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
