import { Router } from "express";
import { ProductController } from "../controllers/products.controller";



export class ProductRoutes {



    static get rotues() : Router {

        const router = Router();
        const productController = new ProductController();
        router.post("/products", productController.createProduct );
        router.get("/products", productController.getProducts );
        router.delete("/products/:id", productController.deleteProduct );
        router.put("/products/:id", productController.updateProduct );
        router.get("/products/:id", productController.getProductById );




        return router;

    }
}