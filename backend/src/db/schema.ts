import {pgTable, boolean, integer, timestamp, text, uuid, jsonb} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export type OrderStatus = "pending" | "paid" | "failed";
export type userRole = "customer" | "admin" | "support";
export type CheckoutSession = {
    productId: string;
    quantity: number;
    unitPriceCents: number;
}

export const users = pgTable("users", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    name: text("name").notNull(),
    displayName: text("display_name").notNull(),
    clerkUserId: text("clerk_user_id").notNull().unique(),
    email: text("email").notNull().unique(),
    role: text("role").$type<userRole>().notNull().default("customer"),
    createdAt: timestamp("created_at",{withTimezone: true}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at",{withTimezone: true}).notNull().defaultNow(),
}); 

export const products = pgTable("products", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull().default("general"),
    priceCents: integer("price_cents").notNull(),
    currency: text("currency").notNull().default("USD"),
    metadata: jsonb("metadata"),
    description: text("description").notNull().default(""),
    imagekitFileId: text("imagekit_file_id"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const checkoutSessions = pgTable("checkout_sessions", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade"}),
    polarCheckoutId: text("polar_checkout_id").notNull().unique(),
    lines:jsonb("lines").$type<CheckoutSession>().notNull(),
    totalcents: integer("total_cents").notNull(),
    currency: text("currency").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade"}),
    status: text("status").$type<OrderStatus>().notNull().default("pending"),
    polarCheckoutId: text("polar_checkout_id"),
    placeOrderId: text("place_order_id").unique(),
    totalcents: integer("total_cents").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),

});

export const orderItems = pgTable("order_items", {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull().default(1),
    unitPriceCents: integer("unit_price_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productRelations = relations(products, ({ many }) => ({
    orderItems: many(orderItems),
}));

export const usersRelations = relations(users, ({ many }) => ({
    orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
    user: one(users, { fields: [orders.userId], references: [users.id] }),
    orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
    product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));







