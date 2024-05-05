import { Router } from "express";
import { ProductController } from "../controllers/products.controller";



export class ProductRoutes {



    static get rotues() : Router {

        const router = Router();
        const productController = new ProductController();
        router.post("/products", productController.createProduct );
        router.get("/products", productController.getProducts );



        return router;

    }
}