"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productos_models_1 = require("../data/mongo/models/productos.models");
class ProductController {
    // ID
    constructor() {
        // Create Products
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, description } = req.body;
                const producto = new productos_models_1.Product({
                    name,
                    price,
                    description,
                });
                yield producto.save();
                return res.json({
                    ok: true,
                    message: 'Producto creado correctamente',
                    producto
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor'
                });
            }
        });
    }
}
exports.ProductController = ProductController;
