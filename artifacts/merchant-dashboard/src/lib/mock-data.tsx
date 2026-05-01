import React, { createContext, useContext, useState, ReactNode } from "react";

export type StoreType = "tiktok" | "boutique";
export type StoreStatus = "active" | "draft" | "expired";

export interface Store {
  id: string;
  name: string;
  type: StoreType;
  status: StoreStatus;
  revenueToday?: number;
  totalRevenue?: number;
  ordersCount?: number;
  url?: string;
  activeSession?: boolean;
  thumbnailUrl?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface PayoutMethod {
  id: string;
  type: "till" | "paybill" | "bank";
  details: string;
  isDefault: boolean;
}

export interface Template {
  id: string;
  name: string;
  type: StoreType;
  imageUrl: string;
  theme: string;
}

export type NotificationCategory = "order" | "stock" | "payout" | "message" | "system";

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  category: NotificationCategory;
  storeId?: string;
  storeName?: string;
  amount?: number;
}

export const CURRENT_USER: User = {
  id: "u1",
  name: "Aisha",
  email: "aisha@example.com",
};

const ASSET = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "t1",
    name: "Live Commerce Pro",
    type: "tiktok",
    imageUrl: ASSET("templates/tiktok-live.png"),
    theme: "Dark",
  },
  {
    id: "t2",
    name: "Elegant Boutique",
    type: "boutique",
    imageUrl: ASSET("templates/boutique.png"),
    theme: "Light",
  },
  {
    id: "t3",
    name: "Tech Hub",
    type: "boutique",
    imageUrl: ASSET("templates/electronics.png"),
    theme: "Dark",
  },
  {
    id: "t4",
    name: "Streetwear Drop",
    type: "boutique",
    imageUrl: ASSET("templates/fashion.png"),
    theme: "Vibrant",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1",  category: "order",   title: "New order received",        description: "Wanjiku Kamau placed order #1042 for 3 items.",      date: "Just now",        read: false, storeId: "s2", storeName: "Aisha's Collection",  amount: 7600  },
  { id: "n2",  category: "order",   title: "New order received",        description: "Joyce Njoroge placed order #1033 for 2 items.",      date: "8 mins ago",      read: false, storeId: "s2", storeName: "Aisha's Collection",  amount: 4300  },
  { id: "n3",  category: "stock",   title: "Low stock alert",           description: "Beaded Necklace Set is down to 3 units online.",     date: "32 mins ago",     read: false, storeId: "s2", storeName: "Aisha's Collection"               },
  { id: "n4",  category: "order",   title: "Order delivered",           description: "Order #1039 for Grace Odhiambo marked as delivered.", date: "1 hour ago",     read: false, storeId: "s2", storeName: "Aisha's Collection",  amount: 2600  },
  { id: "n5",  category: "payout",  title: "Payout processed",          description: "KES 8,200 sent to your M-Pesa Till · 987654.",       date: "Today, 6:00 AM",  read: true,  storeId: "s2", storeName: "Aisha's Collection",  amount: 8200  },
  { id: "n6",  category: "stock",   title: "Out of stock",              description: "Linen Kaftan is out of stock online. Restock soon.", date: "Yesterday",       read: true,  storeId: "s2", storeName: "Aisha's Collection"               },
  { id: "n7",  category: "order",   title: "Order cancelled",           description: "Sharon Otieno cancelled order #1037. KES 1,800 refunded.", date: "3 days ago", read: true, storeId: "s2", storeName: "Aisha's Collection",  amount: 1800  },
  { id: "n8",  category: "payout",  title: "Payout processed",          description: "KES 12,000 sent to your Equity Bank ····4821.",     date: "3 days ago",      read: true,  storeId: "s2", storeName: "Aisha's Collection",  amount: 12000 },
  { id: "n9",  category: "message", title: "Customer message",          description: "Amina Hassan: \"Do you have the dress in size 14?\"", date: "4 days ago",     read: true,  storeId: "s2", storeName: "Aisha's Collection"               },
  { id: "n10", category: "order",   title: "New order received",        description: "Amina Hassan placed order #1041 for 1 item.",        date: "4 days ago",      read: true,  storeId: "s2", storeName: "Aisha's Collection",  amount: 3200  },
  { id: "n11", category: "system",  title: "Store published",           description: "Aisha Weekend Live is now live at aisha-weekend.sokoa.shop.", date: "5 days ago", read: true, storeId: "s6", storeName: "Aisha Weekend Live"              },
  { id: "n12", category: "stock",   title: "Physical stock synced",     description: "Inventory updated from physical shop — 6 products refreshed.", date: "6 days ago", read: true, storeId: "s2", storeName: "Aisha's Collection"           },
  { id: "n13", category: "message", title: "Customer message",          description: "Njeri Mwangi: \"When will you restock the kaftan?\"", date: "1 week ago",     read: true,  storeId: "s2", storeName: "Aisha's Collection"               },
  { id: "n14", category: "payout",  title: "Payout processed",          description: "KES 38,400 sent to your M-Pesa Till · 987654.",     date: "1 week ago",      read: true,  storeId: "s2", storeName: "Aisha's Collection",  amount: 38400 },
  { id: "n15", category: "system",  title: "Subscription renewed",      description: "Your Sokoa Starter Plan renewed successfully.",      date: "2 weeks ago",     read: true                                                                    },
];

export type AppState = "both" | "tiktok_only" | "boutique_only" | "none";

const STORES_BOTH: Store[] = [
  {
    id: "s1",
    name: "Aisha's Live Drop",
    type: "tiktok",
    status: "active",
    revenueToday: 15400,
    totalRevenue: 245000,
    activeSession: true,
    url: "aisha-live.sokoa.shop",
    thumbnailUrl: ASSET("templates/tiktok-live.png"),
    updatedAt: "20 hours ago",
  },
  {
    id: "s2",
    name: "Aisha's Collection",
    type: "boutique",
    status: "active",
    revenueToday: 8200,
    ordersCount: 412,
    url: "aishacollection.sokoa.shop",
    thumbnailUrl: ASSET("templates/boutique.png"),
    updatedAt: "2 days ago",
  },
  {
    id: "s3",
    name: "Aisha's Clearance",
    type: "boutique",
    status: "draft",
    revenueToday: 0,
    ordersCount: 0,
    thumbnailUrl: ASSET("templates/fashion.png"),
    updatedAt: "5 months ago",
  },
  {
    id: "s4",
    name: "Nairobi Beads",
    type: "boutique",
    status: "active",
    revenueToday: 3200,
    ordersCount: 87,
    url: "nairobibeads.sokoa.shop",
    thumbnailUrl: ASSET("templates/electronics.png"),
    updatedAt: "2 weeks ago",
  },
  {
    id: "s5",
    name: "Kenyanz Clothing",
    type: "boutique",
    status: "draft",
    revenueToday: 0,
    ordersCount: 0,
    updatedAt: "2 months ago",
  },
  {
    id: "s6",
    name: "Aisha Weekend Live",
    type: "tiktok",
    status: "active",
    revenueToday: 6800,
    totalRevenue: 54000,
    url: "aisha-weekend.sokoa.shop",
    thumbnailUrl: ASSET("templates/tiktok-live.png"),
    updatedAt: "2 days ago",
  },
];

interface DataContextType {
  user: User;
  appState: AppState;
  setAppState: (state: AppState) => void;
  stores: Store[];
  templates: Template[];
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  payoutMethods: PayoutMethod[];
  addPayoutMethod: (method: Omit<PayoutMethod, "id">) => void;
  removePayoutMethod: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>("both");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);

  let stores: Store[] = [];
  if (appState === "both") stores = STORES_BOTH;
  else if (appState === "tiktok_only") stores = STORES_BOTH.filter(s => s.type === "tiktok");
  else if (appState === "boutique_only") stores = STORES_BOTH.filter(s => s.type === "boutique");

  const value = {
    user: CURRENT_USER,
    appState,
    setAppState,
    stores,
    templates: MOCK_TEMPLATES,
    notifications,
    markAsRead: (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    },
    markAllAsRead: () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    },
    payoutMethods,
    addPayoutMethod: (method: Omit<PayoutMethod, "id">) => {
      setPayoutMethods(prev => [...prev, { ...method, id: Math.random().toString(36).substr(2, 9) }]);
    },
    removePayoutMethod: (id: string) => {
      setPayoutMethods(prev => prev.filter(p => p.id !== id));
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
