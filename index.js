var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  addressSchema: () => addressSchema,
  blogPosts: () => blogPosts,
  cartItems: () => cartItems,
  carts: () => carts,
  contactMessages: () => contactMessages,
  customBrushRequests: () => customBrushRequests,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertCartItemSchema: () => insertCartItemSchema,
  insertCartSchema: () => insertCartSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertCustomBrushRequestSchema: () => insertCustomBrushRequestSchema,
  insertOrderItemSchema: () => insertOrderItemSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertProductReviewSchema: () => insertProductReviewSchema,
  insertProductSchema: () => insertProductSchema,
  insertSubscriberSchema: () => insertSubscriberSchema,
  insertUserSchema: () => insertUserSchema,
  orderItems: () => orderItems,
  orders: () => orders,
  productReviews: () => productReviews,
  products: () => products,
  subscribers: () => subscribers,
  users: () => users
});
import { pgTable, text, serial, integer, real, boolean, timestamp, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: boolean("is_admin").default(false),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  stripeCustomerId: text("stripe_customer_id"),
  phone: text("phone")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  isAdmin: true
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  inStock: boolean("in_stock").default(true),
  bristleColors: jsonb("bristle_colors").notNull(),
  handleDesigns: jsonb("handle_designs"),
  forKids: boolean("for_kids").default(false)
});
var insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  featured: true,
  inStock: true,
  bristleColors: true,
  handleDesigns: true,
  forKids: true
});
var carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertCartSchema = createInsertSchema(carts).pick({
  userId: true,
  sessionId: true
});
var cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").references(() => carts.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  selectedBristleColor: text("selected_bristle_color"),
  selectedHandleDesign: text("selected_handle_design"),
  customEngraving: text("custom_engraving")
});
var insertCartItemSchema = createInsertSchema(cartItems).pick({
  cartId: true,
  productId: true,
  quantity: true,
  selectedBristleColor: true,
  selectedHandleDesign: true,
  customEngraving: true
});
var orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id"),
  status: text("status").notNull().default("pending"),
  total: real("total").notNull(),
  shippingAddress: jsonb("shipping_address").notNull(),
  billingAddress: jsonb("billing_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  paymentMethod: text("payment_method"),
  paymentId: text("payment_id"),
  trackingNumber: text("tracking_number"),
  shippingCarrier: text("shipping_carrier"),
  estimatedDelivery: date("estimated_delivery"),
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at")
});
var insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  sessionId: true,
  status: true,
  total: true,
  shippingAddress: true,
  billingAddress: true
});
var orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  productName: text("product_name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  selectedBristleColor: text("selected_bristle_color"),
  selectedHandleDesign: text("selected_handle_design"),
  customEngraving: text("custom_engraving")
});
var insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  productName: true,
  price: true,
  quantity: true,
  selectedBristleColor: true,
  selectedHandleDesign: true,
  customEngraving: true
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow()
});
var insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  excerpt: true,
  imageUrl: true,
  category: true,
  author: true,
  publishedAt: true
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var productReviews = pgTable("product_reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  userId: integer("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  review: text("review"),
  title: text("title"),
  userName: text("user_name").notNull(),
  isVerifiedPurchase: boolean("is_verified_purchase").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  isApproved: boolean("is_approved").default(false)
});
var insertProductReviewSchema = createInsertSchema(productReviews).pick({
  productId: true,
  userId: true,
  rating: true,
  review: true,
  title: true,
  userName: true,
  isVerifiedPurchase: true
});
var customBrushRequests = pgTable("custom_brush_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertCustomBrushRequestSchema = createInsertSchema(customBrushRequests).pick({
  userId: true,
  name: true,
  email: true,
  description: true,
  imageUrl: true
});
var subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});
var insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true
});
var addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required")
});

// server/db.ts
import dotenv from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
dotenv.config({
  path: "C:\\Users\\Ali Akbar\\Downloads\\EcoBristleBrush (1)\\EcoBristleBrush\\.env"
});
console.log("Loaded DB URL:", process.env.DATABASE_URL);
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import * as bcrypt from "bcryptjs";
var PostgresSessionStore = connectPg(session);
var DatabaseStorage = class {
  sessionStore;
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async createUser(insertUser) {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return user;
  }
  async updateUserResetToken(userId, token, expiry) {
    const [user] = await db.update(users).set({
      resetToken: token,
      resetTokenExpiry: expiry
    }).where(eq(users.id, userId)).returning();
    return user || void 0;
  }
  async getUserByResetToken(token) {
    const now = /* @__PURE__ */ new Date();
    const [user] = await db.select().from(users).where(eq(users.resetToken, token));
    if (user && user.resetTokenExpiry && user.resetTokenExpiry > now) {
      return user;
    }
    return void 0;
  }
  async updateUserPassword(userId, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.update(users).set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }).where(eq(users.id, userId)).returning();
    return user || void 0;
  }
  async updateUserStripeInfo(userId, stripeCustomerId) {
    const [user] = await db.update(users).set({ stripeCustomerId }).where(eq(users.id, userId)).returning();
    return user || void 0;
  }
  async getUsers() {
    return await db.select().from(users);
  }
  async updateUserProfile(userId, userData) {
    const { password, ...updateData } = userData;
    const [user] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning();
    return user || void 0;
  }
  // Product operations
  async getProducts() {
    return await db.select().from(products);
  }
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || void 0;
  }
  async getProductsByCategory(category) {
    return await db.select().from(products).where(eq(products.category, category));
  }
  async getFeaturedProducts() {
    return await db.select().from(products).where(eq(products.featured, true));
  }
  async createProduct(insertProduct) {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  async updateProduct(id, product) {
    const [updatedProduct] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updatedProduct || void 0;
  }
  async deleteProduct(id) {
    const product = await this.getProduct(id);
    if (!product) return false;
    await db.delete(products).where(eq(products.id, id));
    return true;
  }
  // Cart operations
  async getCartBySessionId(sessionId) {
    const [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId));
    return cart || void 0;
  }
  async createCart(insertCart) {
    const [cart] = await db.insert(carts).values({
      ...insertCart,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return cart;
  }
  // Cart Item operations
  async getCartItems(cartId) {
    return await db.select().from(cartItems).where(eq(cartItems.cartId, cartId));
  }
  async getCartItem(id) {
    const [cartItem] = await db.select().from(cartItems).where(eq(cartItems.id, id));
    return cartItem || void 0;
  }
  async createCartItem(insertCartItem) {
    const [cartItem] = await db.insert(cartItems).values({
      ...insertCartItem,
      quantity: insertCartItem.quantity || 1
    }).returning();
    return cartItem;
  }
  async updateCartItem(id, cartItem) {
    const [updatedCartItem] = await db.update(cartItems).set(cartItem).where(eq(cartItems.id, id)).returning();
    return updatedCartItem || void 0;
  }
  async deleteCartItem(id) {
    const cartItem = await this.getCartItem(id);
    if (!cartItem) return false;
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return true;
  }
  // Order operations
  async getOrders() {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  async getOrder(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || void 0;
  }
  async getOrdersByUserId(userId) {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }
  async getOrdersBySessionId(sessionId) {
    return await db.select().from(orders).where(eq(orders.sessionId, sessionId)).orderBy(desc(orders.createdAt));
  }
  async createOrder(insertOrder) {
    const [order] = await db.insert(orders).values({
      ...insertOrder,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return order;
  }
  async updateOrderStatus(id, status) {
    const [updatedOrder] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return updatedOrder || void 0;
  }
  async updateOrderTracking(id, trackingInfo) {
    const [updatedOrder] = await db.update(orders).set({
      trackingNumber: trackingInfo.trackingNumber,
      shippingCarrier: trackingInfo.shippingCarrier,
      // Use format that matches schema types
      estimatedDelivery: trackingInfo.estimatedDelivery.toISOString().split("T")[0],
      // Just the date part "YYYY-MM-DD"
      shippedAt: trackingInfo.shippedAt,
      // Keep as native Date for timestamp
      status: "shipped"
    }).where(eq(orders.id, id)).returning();
    return updatedOrder || void 0;
  }
  async markOrderDelivered(id) {
    const now = /* @__PURE__ */ new Date();
    const [updatedOrder] = await db.update(orders).set({
      status: "delivered",
      deliveredAt: now
      // Native Date for timestamp
    }).where(eq(orders.id, id)).returning();
    return updatedOrder || void 0;
  }
  // Order Item operations
  async getOrderItems(orderId) {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  async createOrderItem(insertOrderItem) {
    const [orderItem] = await db.insert(orderItems).values(insertOrderItem).returning();
    return orderItem;
  }
  // Blog Post operations
  async getBlogPosts() {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }
  async getBlogPost(id) {
    const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return blogPost || void 0;
  }
  async getBlogPostsByCategory(category) {
    return await db.select().from(blogPosts).where(eq(blogPosts.category, category)).orderBy(desc(blogPosts.publishedAt));
  }
  async createBlogPost(insertBlogPost) {
    const [blogPost] = await db.insert(blogPosts).values({
      ...insertBlogPost,
      publishedAt: insertBlogPost.publishedAt || /* @__PURE__ */ new Date()
    }).returning();
    return blogPost;
  }
  async updateBlogPost(id, blogPost) {
    const [updatedBlogPost] = await db.update(blogPosts).set(blogPost).where(eq(blogPosts.id, id)).returning();
    return updatedBlogPost || void 0;
  }
  async deleteBlogPost(id) {
    const blogPost = await this.getBlogPost(id);
    if (!blogPost) return false;
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }
  // Contact Form operations
  async createContactMessage(insertContactMessage) {
    const [contactMessage] = await db.insert(contactMessages).values({
      ...insertContactMessage,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return contactMessage;
  }
  async getContactMessages() {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  // Product Reviews operations
  async getProductReviews(productId) {
    return await db.select().from(productReviews).where(
      and(
        eq(productReviews.productId, productId),
        eq(productReviews.isApproved, true)
      )
    ).orderBy(desc(productReviews.createdAt));
  }
  async getAllProductReviews() {
    return await db.select().from(productReviews).orderBy(desc(productReviews.createdAt));
  }
  async createProductReview(insertProductReview) {
    const [productReview] = await db.insert(productReviews).values({
      ...insertProductReview,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return productReview;
  }
  async approveProductReview(id) {
    const [productReview] = await db.update(productReviews).set({ isApproved: true }).where(eq(productReviews.id, id)).returning();
    return productReview || void 0;
  }
  async deleteProductReview(id) {
    const [review] = await db.select().from(productReviews).where(eq(productReviews.id, id));
    if (!review) return false;
    await db.delete(productReviews).where(eq(productReviews.id, id));
    return true;
  }
  // Custom Brush Requests operations
  async getCustomBrushRequests() {
    return await db.select().from(customBrushRequests).orderBy(desc(customBrushRequests.createdAt));
  }
  async getCustomBrushRequestsByUser(userId) {
    return await db.select().from(customBrushRequests).where(eq(customBrushRequests.userId, userId)).orderBy(desc(customBrushRequests.createdAt));
  }
  async createCustomBrushRequest(insertCustomBrushRequest) {
    const [customBrushRequest] = await db.insert(customBrushRequests).values({
      ...insertCustomBrushRequest,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    return customBrushRequest;
  }
  async updateCustomBrushRequestStatus(id, status) {
    const [customBrushRequest] = await db.update(customBrushRequests).set({ status }).where(eq(customBrushRequests.id, id)).returning();
    return customBrushRequest || void 0;
  }
  // Newsletter Subscriber operations
  async createSubscriber(insertSubscriber) {
    const [subscriber] = await db.insert(subscribers).values({
      ...insertSubscriber,
      subscribedAt: /* @__PURE__ */ new Date()
    }).returning();
    return subscriber;
  }
  async getSubscribers() {
    return await db.select().from(subscribers);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { randomUUID } from "crypto";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import * as bcrypt2 from "bcryptjs";
import * as crypto from "crypto";
import session2 from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  app2.use((err, req, res, next) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      res.status(400).json({ error: validationError.message });
    } else {
      next(err);
    }
  });
  const getOrCreateCart = async (req, res) => {
    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1e3
        // 7 days
      });
    }
    let cart = await storage.getCartBySessionId(sessionId);
    if (!cart) {
      cart = await storage.createCart({
        sessionId,
        userId: null
      });
    }
    return cart;
  };
  app2.get("/api/products", async (req, res) => {
    const products2 = await storage.getProducts();
    res.json(products2);
  });
  app2.get("/api/products/featured", async (req, res) => {
    const products2 = await storage.getFeaturedProducts();
    res.json(products2);
  });
  app2.get("/api/products/category/:category", async (req, res) => {
    const { category } = req.params;
    const products2 = await storage.getProductsByCategory(category);
    res.json(products2);
  });
  app2.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteProduct(id);
    if (!success) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  });
  app2.get("/api/cart", async (req, res) => {
    const cart = await getOrCreateCart(req, res);
    const cartItems2 = await storage.getCartItems(cart.id);
    const cartItemsWithDetails = await Promise.all(
      cartItems2.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        return {
          ...item,
          product
        };
      })
    );
    res.json({
      id: cart.id,
      items: cartItemsWithDetails
    });
  });
  app2.post("/api/cart/items", async (req, res) => {
    try {
      const cart = await getOrCreateCart(req, res);
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        cartId: cart.id
      });
      const product = await storage.getProduct(cartItemData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const existingCartItems = await storage.getCartItems(cart.id);
      const existingItem = existingCartItems.find(
        (item) => item.productId === cartItemData.productId && item.selectedBristleColor === cartItemData.selectedBristleColor && item.selectedHandleDesign === cartItemData.selectedHandleDesign && item.customEngraving === cartItemData.customEngraving
      );
      if (existingItem) {
        const updatedItem = await storage.updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + (cartItemData.quantity || 1)
        });
        return res.json(updatedItem);
      }
      const cartItem = await storage.createCartItem(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.put("/api/cart/items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cartItemData = insertCartItemSchema.partial().parse(req.body);
      const cartItem = await storage.updateCartItem(id, cartItemData);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.delete("/api/cart/items/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteCartItem(id);
    if (!success) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(204).send();
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const cart = await getOrCreateCart(req, res);
      const cartItems2 = await storage.getCartItems(cart.id);
      if (cartItems2.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      const { shippingAddress, billingAddress } = req.body;
      addressSchema.parse(shippingAddress);
      addressSchema.parse(billingAddress);
      let total = 0;
      for (const item of cartItems2) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({
            message: `Product with id ${item.productId} not found`
          });
        }
        total += product.price * item.quantity;
      }
      const orderData = insertOrderSchema.parse({
        sessionId: cart.sessionId,
        userId: cart.userId,
        status: "pending",
        total,
        shippingAddress,
        billingAddress
      });
      const order = await storage.createOrder(orderData);
      for (const item of cartItems2) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;
        await storage.createOrderItem({
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          selectedBristleColor: item.selectedBristleColor,
          selectedHandleDesign: item.selectedHandleDesign,
          customEngraving: item.customEngraving
        });
      }
      for (const item of cartItems2) {
        await storage.deleteCartItem(item.id);
      }
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.get("/api/orders", async (req, res) => {
    const orders2 = await storage.getOrders();
    res.json(orders2);
  });
  app2.get("/api/orders/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const order = await storage.getOrder(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const orderItems2 = await storage.getOrderItems(order.id);
    res.json({
      ...order,
      items: orderItems2
    });
  });
  app2.put("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || !["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      throw error;
    }
  });
  app2.get("/api/blog-posts", async (req, res) => {
    const blogPosts2 = await storage.getBlogPosts();
    res.json(blogPosts2);
  });
  app2.get("/api/blog-posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const blogPost = await storage.getBlogPost(id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blogPost);
  });
  app2.get("/api/blog-posts/category/:category", async (req, res) => {
    const { category } = req.params;
    const blogPosts2 = await storage.getBlogPostsByCategory(category);
    res.json(blogPosts2);
  });
  app2.post("/api/blog-posts", async (req, res) => {
    try {
      const blogPostData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(blogPostData);
      res.status(201).json(blogPost);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.put("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blogPostData = insertBlogPostSchema.partial().parse(req.body);
      const blogPost = await storage.updateBlogPost(id, blogPostData);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.delete("/api/blog-posts/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteBlogPost(id);
    if (!success) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(204).send();
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactMessageData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(contactMessageData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.get("/api/contact", async (req, res) => {
    const contactMessages2 = await storage.getContactMessages();
    res.json(contactMessages2);
  });
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.get("/api/subscribers", async (req, res) => {
    const subscribers2 = await storage.getSubscribers();
    res.json(subscribers2);
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (!user.isAdmin) {
        return res.status(403).json({ message: "You do not have admin privileges" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      throw error;
    }
  });
  const sessionSecret = process.env.SESSION_SECRET || "your-secret-key";
  app2.use(session2({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1e3 * 60 * 60 * 24 * 7
      // 1 week
    }
  }));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isValid = await bcrypt2.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  };
  app2.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const user = await storage.createUser(userData);
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login error after registration" });
        }
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }
      req.login(user, (err2) => {
        if (err2) {
          return next(err2);
        }
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout error" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
  app2.post("/api/reset-password/request", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.json({ message: "If your email is registered, you will receive a password reset link" });
      }
      const token = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = /* @__PURE__ */ new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 1);
      await storage.updateUserResetToken(user.id, token, tokenExpiry);
      console.log(`Password reset token for ${email}: ${token}`);
      res.json({ message: "If your email is registered, you will receive a password reset link" });
    } catch (error) {
      throw error;
    }
  });
  app2.post("/api/reset-password/reset", async (req, res) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ message: "Token and password are required" });
      }
      const user = await storage.getUserByResetToken(token);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      await storage.updateUserPassword(user.id, password);
      res.json({ message: "Password has been reset successfully" });
    } catch (error) {
      throw error;
    }
  });
  app2.put("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const userData = insertUserSchema.partial().omit({ password: true }).parse(req.body);
      if (userData.email) {
        const existingUser = await storage.getUserByEmail(userData.email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
      const updatedUser = await storage.updateUserProfile(userId, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      throw error;
    }
  });
  app2.put("/api/user/password", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isValid = await bcrypt2.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      await storage.updateUserPassword(userId, newPassword);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      throw error;
    }
  });
  app2.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const users2 = await storage.getUsers();
      const usersWithoutPasswords = users2.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json(usersWithoutPasswords);
    } catch (error) {
      throw error;
    }
  });
  const createDefaultAdmin = async () => {
    const existingAdmin = await storage.getUserByUsername("admin");
    if (!existingAdmin) {
      await storage.createUser({
        username: "admin",
        password: "admin123",
        // Will be hashed in the createUser method
        email: "admin@eco-bristle.com",
        firstName: "Admin",
        lastName: "User",
        isAdmin: true
      });
    }
  };
  createDefaultAdmin();
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "localhost", () => {
    log(`\u2705 Server running at http://localhost:${port}`);
  });
})();
