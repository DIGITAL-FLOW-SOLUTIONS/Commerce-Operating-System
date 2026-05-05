import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export interface StoreThemeData {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: "plus_jakarta" | "outfit" | "inter" | "poppins";
  logoUrl?: string | null;
  bannerUrl?: string | null;
  bannerText?: string | null;
}

export const storesTable = pgTable("stores", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: text("tenant_id").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  type: text("type").notNull(), // tiktok | social | boutique
  status: text("status").notNull().default("draft"), // draft | active | paused | suspended
  domain: text("domain").notNull(),
  theme: jsonb("theme").$type<StoreThemeData>().notNull().default({
    primaryColor: "#10b981",
    accentColor: "#f97316",
    backgroundColor: "#ffffff",
    fontFamily: "plus_jakarta",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type StoreRow = typeof storesTable.$inferSelect;
export type InsertStore = typeof storesTable.$inferInsert;

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  priceKes: integer("price_kes").notNull(),
  originalPriceKes: integer("original_price_kes"),
  imageUrl: text("image_url"),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  category: text("category"),
  stock: integer("stock"),
  featured: boolean("featured").notNull().default(false),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ProductRow = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;

export interface OrderItemData {
  productId: string;
  productName: string;
  quantity: number;
  unitPriceKes: number;
  totalKes: number;
}

export interface DeliveryInfoData {
  country: string;
  county: string;
  town: string;
  email?: string | null;
  phone: string;
  notes?: string | null;
}

export const ordersTable = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id"),
  phone: text("phone").notNull(),
  items: jsonb("items").$type<OrderItemData[]>().notNull().default([]),
  totalKes: integer("total_kes").notNull(),
  status: text("status").notNull().default("pending"),
  paymentMethod: text("payment_method").notNull().default("mpesa"),
  delivery: jsonb("delivery").$type<DeliveryInfoData>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type OrderRow = typeof ordersTable.$inferSelect;
export type InsertOrder = typeof ordersTable.$inferInsert;

export const customersTable = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => storesTable.id, { onDelete: "cascade" }),
  phone: text("phone").notNull(),
  name: text("name"),
  email: text("email"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type CustomerRow = typeof customersTable.$inferSelect;
export type InsertCustomer = typeof customersTable.$inferInsert;
