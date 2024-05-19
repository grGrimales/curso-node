import { Router } from "express";
import { ProductController } from "../controllers/products.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";



export class ProductRoutes {



    static get rotues(): Router {

        const router = Router();
        const productController = new ProductController();

        router.post("/products", [AuthMiddleware.validateToken], productController.createProduct);
        router.get("/products",[AuthMiddleware.validateToken], productController.getProducts);
        router.delete("/products/:id", [AuthMiddleware.validateToken], productController.deleteProduct);
        router.put("/products/:id", [AuthMiddleware.validateToken], productController.updateProduct);
        router.get("/products/:id",[AuthMiddleware.validateToken],productController.getProductById);




        return router;

    }
}