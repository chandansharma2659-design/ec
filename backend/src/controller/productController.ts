import type { Request, Response, NextFunction } from "express";
import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

export async function listProducts(req: Request, res:Response, next: NextFunction) {
    try {
      const cat = typeof req.query.category === "string" ? req.query.category.trim() : "" ;
      const rows = await db
      .select()
      .from(products)
      .where(cat ? eq(products.category, cat) : undefined)
      .orderBy(desc(products.createdAt))
      res.json({ products: rows });
    } catch (e) {
        next(e);
    }
}

export async function getcategories(req: Request, res:Response, next: NextFunction) {
    try {
        const rows = await db
        .select()
        .from(products)
        .orderBy(products.category)
        res.json({ categories: rows.map(row => row.category) });
    } catch (e) {
        next(e);
    }
}

export async function getProductsByCategory(req: Request, res:Response , next: NextFunction) {
    try {
        const category = Array.isArray(req.params.category)
            ? req.params.category[0]
            : req.params.category;
        const [row] = await db
        .select()
        .from(products)
        .where(eq(products.category, category))
        res.json({ products: row }); 
    } catch (e) {
        next(e);
    }
}

