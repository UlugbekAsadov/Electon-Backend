import { Router } from "express";
import { getAllProducts } from "../controllers";

const productRouter = new Router();

productRouter.get("/products/get-all", getAllProducts);

export { productRouter };
