"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
class ProductRoutes {
    static get rotues() {
        const router = (0, express_1.Router)();
        const productController = new products_controller_1.ProductController();
        router.post("/products", productController.createProduct);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
