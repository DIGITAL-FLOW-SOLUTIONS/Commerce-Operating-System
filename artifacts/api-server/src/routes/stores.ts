import { Router } from "express";
import { db } from "@workspace/db";
import {
  storesTable,
  productsTable,
  ordersTable,
  customersTable,
} from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import {
  CreateStoreBody,
  UpdateStoreBody,
  GetStoreParams,
  UpdateStoreParams,
  ListStoresQueryParams,
  ListProductsParams,
  ListProductsQueryParams,
  CreateProductParams,
  CreateProductBody,
  GetProductParams,
  ListOrdersParams,
  ListOrdersQueryParams,
  CreateOrderParams,
  CreateOrderBody,
  GetOrderParams,
  SubmitDeliveryInfoParams,
  SubmitDeliveryInfoBody,
  LookupCustomerParams,
  LookupCustomerBody,
  GetCustomerParams,
  UpdateCustomerParams,
  UpdateCustomerBody,
} from "@workspace/api-zod";

const router = Router();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function notFound(res: any, entity: string) {
  return res.status(404).json({ error: `${entity} not found` });
}

async function getStoreCounts(storeId: string) {
  const [productCount, orderCount] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(productsTable)
      .where(eq(productsTable.storeId, storeId)),
    db
      .select({ count: sql<number>`count(*)` })
      .from(ordersTable)
      .where(eq(ordersTable.storeId, storeId)),
  ]);
  return {
    productCount: Number(productCount[0]?.count ?? 0),
    orderCount: Number(orderCount[0]?.count ?? 0),
  };
}

function formatStore(store: any, counts: { productCount: number; orderCount: number }) {
  return {
    id: store.id,
    tenantId: store.tenantId,
    name: store.name,
    slug: store.slug,
    type: store.type,
    status: store.status,
    domain: store.domain,
    theme: store.theme,
    productCount: counts.productCount,
    orderCount: counts.orderCount,
    createdAt: store.createdAt,
    updatedAt: store.updatedAt,
  };
}

// ─── Stores ─────────────────────────────────────────────────────────────────
router.get("/stores", async (req, res) => {
  try {
    const query = ListStoresQueryParams.safeParse(req.query);
    const tenantId = query.success ? query.data.tenantId : undefined;

    const rows = tenantId
      ? await db.select().from(storesTable).where(eq(storesTable.tenantId, tenantId))
      : await db.select().from(storesTable);

    const results = await Promise.all(
      rows.map(async (store) => {
        const counts = await getStoreCounts(store.id);
        return formatStore(store, counts);
      })
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to list stores" });
  }
});

router.post("/stores", async (req, res) => {
  try {
    const body = CreateStoreBody.parse(req.body);
    const slug = slugify(body.name);
    const [store] = await db
      .insert(storesTable)
      .values({
        tenantId: body.tenantId,
        name: body.name,
        slug,
        type: body.type,
        status: "draft",
        domain: `/stores`,
        theme: body.theme ?? {
          primaryColor: "#10b981",
          accentColor: "#f97316",
          backgroundColor: "#ffffff",
          fontFamily: "plus_jakarta" as const,
        },
      })
      .returning();

    // Set domain after we have the ID
    await db
      .update(storesTable)
      .set({ domain: `/stores/${store.type}/${store.id}` })
      .where(eq(storesTable.id, store.id));

    const updated = await db.select().from(storesTable).where(eq(storesTable.id, store.id));
    res.status(201).json(formatStore(updated[0], { productCount: 0, orderCount: 0 }));
  } catch (err) {
    res.status(400).json({ error: "Invalid store data" });
  }
});

router.get("/stores/:storeId", async (req, res) => {
  try {
    GetStoreParams.parse(req.params);
    const { storeId } = req.params;
    const [store] = await db.select().from(storesTable).where(eq(storesTable.id, storeId));
    if (!store) return notFound(res, "Store");
    const counts = await getStoreCounts(storeId);
    res.json(formatStore(store, counts));
  } catch {
    res.status(500).json({ error: "Failed to get store" });
  }
});

router.patch("/stores/:storeId", async (req, res) => {
  try {
    UpdateStoreParams.parse(req.params);
    const { storeId } = req.params;
    const body = UpdateStoreBody.parse(req.body);

    await db
      .update(storesTable)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(storesTable.id, storeId));

    const [store] = await db.select().from(storesTable).where(eq(storesTable.id, storeId));
    if (!store) return notFound(res, "Store");
    const counts = await getStoreCounts(storeId);
    res.json(formatStore(store, counts));
  } catch {
    res.status(500).json({ error: "Failed to update store" });
  }
});

// ─── Products ────────────────────────────────────────────────────────────────
router.get("/stores/:storeId/products", async (req, res) => {
  try {
    ListProductsParams.parse(req.params);
    const queryParsed = ListProductsQueryParams.safeParse(req.query);
    const { storeId } = req.params;
    const category = queryParsed.success ? queryParsed.data.category : undefined;

    const rows = category
      ? await db
          .select()
          .from(productsTable)
          .where(and(eq(productsTable.storeId, storeId), eq(productsTable.category, category)))
      : await db.select().from(productsTable).where(eq(productsTable.storeId, storeId));

    res.json(
      rows.map((p) => ({
        id: p.id,
        storeId: p.storeId,
        name: p.name,
        description: p.description,
        priceKes: p.priceKes,
        originalPriceKes: p.originalPriceKes,
        imageUrl: p.imageUrl,
        images: p.images ?? [],
        category: p.category,
        stock: p.stock,
        featured: p.featured,
        active: p.active,
        createdAt: p.createdAt,
      }))
    );
  } catch {
    res.status(500).json({ error: "Failed to list products" });
  }
});

router.post("/stores/:storeId/products", async (req, res) => {
  try {
    CreateProductParams.parse(req.params);
    const { storeId } = req.params;
    const body = CreateProductBody.parse(req.body);

    const [product] = await db
      .insert(productsTable)
      .values({
        storeId,
        name: body.name,
        description: body.description,
        priceKes: Math.round(body.priceKes),
        originalPriceKes: body.originalPriceKes ? Math.round(body.originalPriceKes) : null,
        imageUrl: body.imageUrl,
        images: body.images ?? [],
        category: body.category,
        stock: body.stock,
        featured: body.featured ?? false,
        active: true,
      })
      .returning();

    res.status(201).json({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      description: product.description,
      priceKes: product.priceKes,
      originalPriceKes: product.originalPriceKes,
      imageUrl: product.imageUrl,
      images: product.images ?? [],
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      active: product.active,
      createdAt: product.createdAt,
    });
  } catch {
    res.status(400).json({ error: "Invalid product data" });
  }
});

router.get("/stores/:storeId/products/:productId", async (req, res) => {
  try {
    GetProductParams.parse(req.params);
    const { storeId, productId } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(and(eq(productsTable.id, productId), eq(productsTable.storeId, storeId)));
    if (!product) return notFound(res, "Product");

    res.json({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      description: product.description,
      priceKes: product.priceKes,
      originalPriceKes: product.originalPriceKes,
      imageUrl: product.imageUrl,
      images: product.images ?? [],
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      active: product.active,
      createdAt: product.createdAt,
    });
  } catch {
    res.status(500).json({ error: "Failed to get product" });
  }
});

// ─── Orders ──────────────────────────────────────────────────────────────────
router.get("/stores/:storeId/orders", async (req, res) => {
  try {
    ListOrdersParams.parse(req.params);
    const queryParsed = ListOrdersQueryParams.safeParse(req.query);
    const { storeId } = req.params;
    const phone = queryParsed.success ? queryParsed.data.phone : undefined;

    const rows = phone
      ? await db
          .select()
          .from(ordersTable)
          .where(and(eq(ordersTable.storeId, storeId), eq(ordersTable.phone, phone)))
      : await db.select().from(ordersTable).where(eq(ordersTable.storeId, storeId));

    res.json(
      rows.map((o) => ({
        id: o.id,
        storeId: o.storeId,
        customerId: o.customerId,
        phone: o.phone,
        items: o.items ?? [],
        totalKes: o.totalKes,
        status: o.status,
        paymentMethod: o.paymentMethod,
        delivery: o.delivery,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      }))
    );
  } catch {
    res.status(500).json({ error: "Failed to list orders" });
  }
});

router.post("/stores/:storeId/orders", async (req, res) => {
  try {
    CreateOrderParams.parse(req.params);
    const { storeId } = req.params;
    const body = CreateOrderBody.parse(req.body);

    // Resolve products and compute totals
    const productIds = body.items.map((i) => i.productId);
    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.storeId, storeId));

    const productMap = new Map(products.map((p) => [p.id, p]));
    const orderItems = body.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPriceKes: product.priceKes,
        totalKes: product.priceKes * item.quantity,
      };
    });

    const totalKes = orderItems.reduce((sum, i) => sum + i.totalKes, 0);

    // Look up or create customer
    let customerId: string | undefined;
    const [existingCustomer] = await db
      .select()
      .from(customersTable)
      .where(and(eq(customersTable.storeId, storeId), eq(customersTable.phone, body.phone)));

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const [newCustomer] = await db
        .insert(customersTable)
        .values({ storeId, phone: body.phone })
        .returning();
      customerId = newCustomer.id;
    }

    const [order] = await db
      .insert(ordersTable)
      .values({
        storeId,
        customerId,
        phone: body.phone,
        items: orderItems,
        totalKes,
        status: "pending",
        paymentMethod: body.paymentMethod ?? "mpesa",
      })
      .returning();

    res.status(201).json({
      id: order.id,
      storeId: order.storeId,
      customerId: order.customerId,
      phone: order.phone,
      items: order.items,
      totalKes: order.totalKes,
      status: order.status,
      paymentMethod: order.paymentMethod,
      delivery: order.delivery,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? "Invalid order data" });
  }
});

router.get("/stores/:storeId/orders/:orderId", async (req, res) => {
  try {
    GetOrderParams.parse(req.params);
    const { storeId, orderId } = req.params;
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(and(eq(ordersTable.id, orderId), eq(ordersTable.storeId, storeId)));
    if (!order) return notFound(res, "Order");

    res.json({
      id: order.id,
      storeId: order.storeId,
      customerId: order.customerId,
      phone: order.phone,
      items: order.items,
      totalKes: order.totalKes,
      status: order.status,
      paymentMethod: order.paymentMethod,
      delivery: order.delivery,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  } catch {
    res.status(500).json({ error: "Failed to get order" });
  }
});

router.post("/stores/:storeId/orders/:orderId/delivery", async (req, res) => {
  try {
    SubmitDeliveryInfoParams.parse(req.params);
    const { storeId, orderId } = req.params;
    const body = SubmitDeliveryInfoBody.parse(req.body);

    await db
      .update(ordersTable)
      .set({ delivery: body, status: "paid", updatedAt: new Date() })
      .where(and(eq(ordersTable.id, orderId), eq(ordersTable.storeId, storeId)));

    const [order] = await db
      .select()
      .from(ordersTable)
      .where(and(eq(ordersTable.id, orderId), eq(ordersTable.storeId, storeId)));
    if (!order) return notFound(res, "Order");

    res.json({
      id: order.id,
      storeId: order.storeId,
      customerId: order.customerId,
      phone: order.phone,
      items: order.items,
      totalKes: order.totalKes,
      status: order.status,
      paymentMethod: order.paymentMethod,
      delivery: order.delivery,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  } catch {
    res.status(400).json({ error: "Invalid delivery info" });
  }
});

// ─── Customers ───────────────────────────────────────────────────────────────
async function getCustomerOrderStats(storeId: string, customerId: string) {
  const orders = await db
    .select()
    .from(ordersTable)
    .where(and(eq(ordersTable.storeId, storeId), eq(ordersTable.customerId, customerId)));
  return {
    orderCount: orders.length,
    totalSpentKes: orders
      .filter((o) => o.status === "paid" || o.status === "delivered")
      .reduce((sum, o) => sum + o.totalKes, 0),
  };
}

function formatCustomer(customer: any, stats: { orderCount: number; totalSpentKes: number }) {
  return {
    id: customer.id,
    storeId: customer.storeId,
    phone: customer.phone,
    name: customer.name,
    email: customer.email,
    hasPassword: !!customer.passwordHash,
    orderCount: stats.orderCount,
    totalSpentKes: stats.totalSpentKes,
    createdAt: customer.createdAt,
  };
}

router.post("/stores/:storeId/customers/lookup", async (req, res) => {
  try {
    LookupCustomerParams.parse(req.params);
    const { storeId } = req.params;
    const body = LookupCustomerBody.parse(req.body);

    let [customer] = await db
      .select()
      .from(customersTable)
      .where(and(eq(customersTable.storeId, storeId), eq(customersTable.phone, body.phone)));

    if (!customer) {
      const [newCustomer] = await db
        .insert(customersTable)
        .values({ storeId, phone: body.phone })
        .returning();
      customer = newCustomer;
    }

    const stats = await getCustomerOrderStats(storeId, customer.id);
    res.json(formatCustomer(customer, stats));
  } catch {
    res.status(400).json({ error: "Invalid lookup data" });
  }
});

router.get("/stores/:storeId/customers/:customerId", async (req, res) => {
  try {
    GetCustomerParams.parse(req.params);
    const { storeId, customerId } = req.params;
    const [customer] = await db
      .select()
      .from(customersTable)
      .where(and(eq(customersTable.id, customerId), eq(customersTable.storeId, storeId)));
    if (!customer) return notFound(res, "Customer");

    const stats = await getCustomerOrderStats(storeId, customerId);
    res.json(formatCustomer(customer, stats));
  } catch {
    res.status(500).json({ error: "Failed to get customer" });
  }
});

router.patch("/stores/:storeId/customers/:customerId", async (req, res) => {
  try {
    UpdateCustomerParams.parse(req.params);
    const { storeId, customerId } = req.params;
    const body = UpdateCustomerBody.parse(req.body);

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.password) {
      // Simple hash using base64 (production would use bcrypt)
      updateData.passwordHash = Buffer.from(body.password).toString("base64");
    }

    await db
      .update(customersTable)
      .set(updateData)
      .where(and(eq(customersTable.id, customerId), eq(customersTable.storeId, storeId)));

    const [customer] = await db
      .select()
      .from(customersTable)
      .where(and(eq(customersTable.id, customerId), eq(customersTable.storeId, storeId)));
    if (!customer) return notFound(res, "Customer");

    const stats = await getCustomerOrderStats(storeId, customerId);
    res.json(formatCustomer(customer, stats));
  } catch {
    res.status(400).json({ error: "Invalid customer data" });
  }
});

export default router;
