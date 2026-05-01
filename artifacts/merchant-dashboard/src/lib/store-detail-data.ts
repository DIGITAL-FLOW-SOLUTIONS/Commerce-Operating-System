export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface StoreProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  onlineStock: number;
  physicalStock: number;
  soldCount: number;
  imageGradient: string;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
  source: "online" | "physical";
}

export interface StoreCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  totalSpend: number;
  ordersCount: number;
  lastPurchase: string;
  isRepeat: boolean;
}

export interface RevenuePoint {
  date: string;
  online: number;
  physical: number;
}

export interface StoreDetailData {
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
    avgOrderValue: number;
    growth: number;
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
    delivered: number;
  };
  customers: {
    total: number;
    newThisMonth: number;
    returning: number;
  };
  revenueChart: RevenuePoint[];
  topProducts: { name: string; sold: number; revenue: number }[];
  products: StoreProduct[];
  recentOrders: StoreOrder[];
  allOrders: StoreOrder[];
  allCustomers: StoreCustomer[];
}

function genRevenue(): RevenuePoint[] {
  const points: RevenuePoint[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
    points.push({
      date: label,
      online: Math.floor(3000 + Math.random() * 14000),
      physical: Math.floor(1000 + Math.random() * 7000),
    });
  }
  return points;
}

const PRODUCTS_S2: StoreProduct[] = [
  { id: "p1", name: "Ankara Wrap Dress", sku: "AWD-001", category: "Dresses", price: 3200, onlineStock: 14, physicalStock: 8, soldCount: 87, imageGradient: "from-orange-400 to-red-500" },
  { id: "p2", name: "Beaded Necklace Set", sku: "BNS-002", category: "Accessories", price: 1800, onlineStock: 3, physicalStock: 5, soldCount: 64, imageGradient: "from-amber-400 to-yellow-500" },
  { id: "p3", name: "Linen Kaftan", sku: "LK-003", category: "Tops", price: 2600, onlineStock: 0, physicalStock: 2, soldCount: 52, imageGradient: "from-teal-400 to-emerald-500" },
  { id: "p4", name: "Wax Print Tote Bag", sku: "WTB-004", category: "Bags", price: 1400, onlineStock: 22, physicalStock: 12, soldCount: 41, imageGradient: "from-violet-400 to-purple-500" },
  { id: "p5", name: "Leather Sandals", sku: "LS-005", category: "Footwear", price: 2900, onlineStock: 7, physicalStock: 4, soldCount: 38, imageGradient: "from-brown-400 to-orange-600" },
  { id: "p6", name: "Tie-Dye Maxi Skirt", sku: "TDM-006", category: "Bottoms", price: 2100, onlineStock: 11, physicalStock: 0, soldCount: 33, imageGradient: "from-pink-400 to-fuchsia-500" },
  { id: "p7", name: "Handwoven Basket", sku: "HWB-007", category: "Home", price: 1200, onlineStock: 2, physicalStock: 6, soldCount: 28, imageGradient: "from-lime-400 to-green-500" },
  { id: "p8", name: "Kikoy Beach Wrap", sku: "KBW-008", category: "Beachwear", price: 900, onlineStock: 18, physicalStock: 10, soldCount: 22, imageGradient: "from-sky-400 to-blue-500" },
];

const ORDERS_S2: StoreOrder[] = [
  { id: "o1", orderNumber: "#1042", customerName: "Wanjiku Kamau", customerEmail: "wanjiku@email.com", items: 3, total: 7600, status: "delivered", date: "Today, 10:24 AM", source: "online" },
  { id: "o2", orderNumber: "#1041", customerName: "Amina Hassan", customerEmail: "amina@email.com", items: 1, total: 3200, status: "shipped", date: "Yesterday, 3:15 PM", source: "online" },
  { id: "o3", orderNumber: "#1040", customerName: "Njeri Mwangi", customerEmail: "njeri@email.com", items: 2, total: 4700, status: "processing", date: "Yesterday, 11:00 AM", source: "online" },
  { id: "o4", orderNumber: "#1039", customerName: "Grace Odhiambo", customerEmail: "grace@email.com", items: 1, total: 2600, status: "delivered", date: "2 days ago", source: "physical" },
  { id: "o5", orderNumber: "#1038", customerName: "Fatuma Ali", customerEmail: "fatuma@email.com", items: 4, total: 9100, status: "delivered", date: "2 days ago", source: "online" },
  { id: "o6", orderNumber: "#1037", customerName: "Sharon Otieno", customerEmail: "sharon@email.com", items: 1, total: 1800, status: "cancelled", date: "3 days ago", source: "online" },
  { id: "o7", orderNumber: "#1036", customerName: "Diana Kimani", customerEmail: "diana@email.com", items: 2, total: 5000, status: "delivered", date: "4 days ago", source: "physical" },
  { id: "o8", orderNumber: "#1035", customerName: "Cynthia Achieng", customerEmail: "cynthia@email.com", items: 1, total: 2900, status: "delivered", date: "5 days ago", source: "online" },
  { id: "o9", orderNumber: "#1034", customerName: "Mercy Waweru", customerEmail: "mercy@email.com", items: 3, total: 6200, status: "delivered", date: "6 days ago", source: "online" },
  { id: "o10", orderNumber: "#1033", customerName: "Joyce Njoroge", customerEmail: "joyce@email.com", items: 2, total: 4300, status: "pending", date: "Today, 8:05 AM", source: "online" },
];

const CUSTOMERS_S2: StoreCustomer[] = [
  { id: "c1", name: "Wanjiku Kamau", email: "wanjiku@email.com", phone: "+254 712 345 678", location: "Nairobi, Kenya", totalSpend: 24600, ordersCount: 8, lastPurchase: "Today", isRepeat: true },
  { id: "c2", name: "Amina Hassan", email: "amina@email.com", phone: "+254 733 456 789", location: "Mombasa, Kenya", totalSpend: 18200, ordersCount: 6, lastPurchase: "Yesterday", isRepeat: true },
  { id: "c3", name: "Njeri Mwangi", email: "njeri@email.com", location: "Nairobi, Kenya", totalSpend: 14700, ordersCount: 5, lastPurchase: "Yesterday", isRepeat: true },
  { id: "c4", name: "Grace Odhiambo", email: "grace@email.com", phone: "+254 722 567 890", location: "Kisumu, Kenya", totalSpend: 9800, ordersCount: 3, lastPurchase: "2 days ago", isRepeat: true },
  { id: "c5", name: "Fatuma Ali", email: "fatuma@email.com", location: "Mombasa, Kenya", totalSpend: 9100, ordersCount: 1, lastPurchase: "2 days ago", isRepeat: false },
  { id: "c6", name: "Diana Kimani", email: "diana@email.com", phone: "+254 700 678 901", location: "Nairobi, Kenya", totalSpend: 7400, ordersCount: 2, lastPurchase: "4 days ago", isRepeat: true },
  { id: "c7", name: "Cynthia Achieng", email: "cynthia@email.com", location: "Eldoret, Kenya", totalSpend: 5800, ordersCount: 2, lastPurchase: "5 days ago", isRepeat: true },
  { id: "c8", name: "Mercy Waweru", email: "mercy@email.com", phone: "+254 711 789 012", location: "Thika, Kenya", totalSpend: 6200, ordersCount: 1, lastPurchase: "6 days ago", isRepeat: false },
  { id: "c9", name: "Joyce Njoroge", email: "joyce@email.com", location: "Nairobi, Kenya", totalSpend: 4300, ordersCount: 1, lastPurchase: "Today", isRepeat: false },
  { id: "c10", name: "Sharon Otieno", email: "sharon@email.com", location: "Nakuru, Kenya", totalSpend: 1800, ordersCount: 1, lastPurchase: "3 days ago", isRepeat: false },
];

const REVENUE_CHART = genRevenue();

export const STORE_DETAIL_DATA: Record<string, StoreDetailData> = {
  s2: {
    revenue: { today: 8200, thisWeek: 38400, thisMonth: 142000, total: 245000, avgOrderValue: 595, growth: 12.4 },
    orders: { total: 412, pending: 2, processing: 1, delivered: 409 },
    customers: { total: 198, newThisMonth: 34, returning: 164 },
    revenueChart: REVENUE_CHART,
    topProducts: [
      { name: "Ankara Wrap Dress", sold: 87, revenue: 278400 },
      { name: "Beaded Necklace Set", sold: 64, revenue: 115200 },
      { name: "Linen Kaftan", sold: 52, revenue: 135200 },
      { name: "Wax Print Tote Bag", sold: 41, revenue: 57400 },
      { name: "Leather Sandals", sold: 38, revenue: 110200 },
    ],
    products: PRODUCTS_S2,
    recentOrders: ORDERS_S2.slice(0, 5),
    allOrders: ORDERS_S2,
    allCustomers: CUSTOMERS_S2,
  },
};

export function getStoreDetail(storeId: string): StoreDetailData {
  if (STORE_DETAIL_DATA[storeId]) return STORE_DETAIL_DATA[storeId];
  const chart = genRevenue();
  return {
    revenue: { today: 0, thisWeek: 0, thisMonth: 0, total: 0, avgOrderValue: 0, growth: 0 },
    orders: { total: 0, pending: 0, processing: 0, delivered: 0 },
    customers: { total: 0, newThisMonth: 0, returning: 0 },
    revenueChart: chart,
    topProducts: [],
    products: [],
    recentOrders: [],
    allOrders: [],
    allCustomers: [],
  };
}
