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

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
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
  {
    id: "n1",
    title: "New order received",
    description: "Order #1042 for KES 4,500 has been placed.",
    date: "10 mins ago",
    read: false,
  },
  {
    id: "n2",
    title: "Payout successful",
    description: "Your daily payout of KES 12,000 has been processed.",
    date: "2 hours ago",
    read: true,
  },
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
  payoutMethods: PayoutMethod[];
  addPayoutMethod: (method: Omit<PayoutMethod, "id">) => void;
  removePayoutMethod: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>("both");
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
    notifications: MOCK_NOTIFICATIONS,
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
