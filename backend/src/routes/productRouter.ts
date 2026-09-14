import { Router } from "express";
import { getcategories, getProductsByCategory, listProducts } from "../controller/productController";

const router = Router();

router.get("/", listProducts);
router.get("/categories",getcategories);
router.get("/categories/:category", getProductsByCategory);

export default router;
