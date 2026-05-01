export type TimeRange = "7d" | "30d" | "90d";

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface StorePerformance {
  storeId: string;
  storeName: string;
  type: "boutique" | "tiktok";
  revenue: number;
  orders: number;
  customers: number;
  growth: number;
  color: string;
}

export interface TopProduct {
  rank: number;
  name: string;
  storeName: string;
  unitsSold: number;
  revenue: number;
  category: string;
  trend: "up" | "down" | "flat";
  trendPct: number;
}

export interface CityData {
  city: string;
  county: string;
  orders: number;
  revenue: number;
  pct: number;
}

export interface TopCustomer {
  name: string;
  orders: number;
  totalSpend: number;
  lastOrder: string;
  avatarColor: string;
}

const makeRevenueSeries = (days: number, base: number, variance: number, trend: number): RevenuePoint[] => {
  const out: RevenuePoint[] = [];
  const now = new Date(2026, 4, 1);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = days <= 7
      ? d.toLocaleDateString("en-US", { weekday: "short" })
      : days <= 30
      ? `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}`
      : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const noise = (Math.sin(i * 2.1 + 0.7) * variance + Math.cos(i * 0.9) * variance * 0.5);
    const trendFactor = base + trend * (days - i);
    const revenue = Math.max(0, Math.round(trendFactor + noise));
    out.push({ date: label, revenue, orders: Math.round(revenue / 590 + Math.random() * 3) });
  }
  return out;
};

export const REVENUE_SERIES: Record<TimeRange, RevenuePoint[]> = {
  "7d":  makeRevenueSeries(7,  7800, 2200, 120),
  "30d": makeRevenueSeries(30, 6400, 2800, 55),
  "90d": makeRevenueSeries(90, 5200, 3200, 28),
};

export const STORE_PERFORMANCE: StorePerformance[] = [
  { storeId: "s2", storeName: "Aisha's Collection",   type: "boutique", revenue: 142000, orders: 412, customers: 198, growth: 18.4, color: "#10b981" },
  { storeId: "s3", storeName: "Aisha Electronics Hub", type: "boutique", revenue: 89400,  orders: 214, customers: 103, growth: 7.2,  color: "#6366f1" },
  { storeId: "s1", storeName: "Aisha Sunday Live",    type: "tiktok",   revenue: 56200,  orders: 187, customers: 91,  growth: 31.6, color: "#f59e0b" },
  { storeId: "s4", storeName: "Shoes & Bags Boutique", type: "boutique", revenue: 38700,  orders: 102, customers: 74,  growth: -4.1, color: "#ef4444" },
  { storeId: "s5", storeName: "Aisha Live Deals",     type: "tiktok",   revenue: 21900,  orders: 71,  customers: 52,  growth: 22.3, color: "#ec4899" },
  { storeId: "s6", storeName: "Aisha Weekend Live",   type: "tiktok",   revenue: 9800,   orders: 29,  customers: 24,  growth: 0,    color: "#8b5cf6" },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { rank: 1, name: "Ankara Wrap Dress",       storeName: "Aisha's Collection",    unitsSold: 48, revenue: 43200, category: "Dresses",     trend: "up",   trendPct: 24 },
  { rank: 2, name: "Beaded Necklace Set",     storeName: "Aisha's Collection",    unitsSold: 41, revenue: 18450, category: "Accessories",  trend: "up",   trendPct: 12 },
  { rank: 3, name: "iPhone 15 Clear Case",    storeName: "Aisha Electronics Hub", unitsSold: 38, revenue: 7600,  category: "Accessories",  trend: "flat", trendPct: 0  },
  { rank: 4, name: "Linen Kaftan",            storeName: "Aisha's Collection",    unitsSold: 29, revenue: 26100, category: "Kaftans",      trend: "down", trendPct: -8 },
  { rank: 5, name: "Wireless Earbuds Pro",    storeName: "Aisha Electronics Hub", unitsSold: 27, revenue: 24300, category: "Audio",        trend: "up",   trendPct: 33 },
  { rank: 6, name: "Kitenge Blazer",          storeName: "Aisha's Collection",    unitsSold: 21, revenue: 31500, category: "Blazers",      trend: "up",   trendPct: 9  },
  { rank: 7, name: "Leather Tote Bag",        storeName: "Shoes & Bags Boutique", unitsSold: 18, revenue: 27000, category: "Bags",         trend: "down", trendPct: -15 },
  { rank: 8, name: "USB-C Hub 7-in-1",        storeName: "Aisha Electronics Hub", unitsSold: 16, revenue: 19200, category: "Gadgets",      trend: "up",   trendPct: 41 },
];

export const CITY_DATA: CityData[] = [
  { city: "Nairobi",   county: "Nairobi",  orders: 614, revenue: 198700, pct: 58 },
  { city: "Mombasa",   county: "Mombasa",  orders: 142, revenue: 47200,  pct: 14 },
  { city: "Kisumu",    county: "Kisumu",   orders: 87,  revenue: 28400,  pct: 8  },
  { city: "Nakuru",    county: "Nakuru",   orders: 63,  revenue: 19600,  pct: 6  },
  { city: "Eldoret",   county: "Uasin Gishu", orders: 51, revenue: 15300, pct: 5 },
  { city: "Thika",     county: "Kiambu",   orders: 38,  revenue: 11200,  pct: 4  },
  { city: "Other",     county: "",         orders: 55,  revenue: 17600,  pct: 5  },
];

export const TOP_CUSTOMERS: TopCustomer[] = [
  { name: "Wanjiku Kamau",  orders: 12, totalSpend: 28400, lastOrder: "Today",      avatarColor: "bg-emerald-500" },
  { name: "Amina Hassan",   orders: 9,  totalSpend: 21600, lastOrder: "3 days ago", avatarColor: "bg-violet-500"  },
  { name: "Grace Odhiambo", orders: 8,  totalSpend: 18900, lastOrder: "1 day ago",  avatarColor: "bg-amber-500"   },
  { name: "Joyce Njoroge",  orders: 7,  totalSpend: 15200, lastOrder: "Today",      avatarColor: "bg-blue-500"    },
  { name: "Sharon Otieno",  orders: 6,  totalSpend: 12400, lastOrder: "5 days ago", avatarColor: "bg-pink-500"    },
  { name: "Njeri Mwangi",   orders: 5,  totalSpend: 9800,  lastOrder: "1 week ago", avatarColor: "bg-orange-500"  },
];

export const SUMMARY_TOTALS = {
  revenue:   357000,
  revGrowth: 14.2,
  orders:    1015,
  ordGrowth: 9.7,
  customers: 542,
  cusGrowth: 21.4,
  avgOrder:  351,
  aovGrowth: 4.1,
};
