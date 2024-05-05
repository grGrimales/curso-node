import { Request, Response } from "express";
import { Product } from "../data/mongo/models/productos.models";



export class ProductController {


    // ID
    constructor() {
    }


    // Create Products
    createProduct = async (req: Request, res: Response) => {


        try {

            const { name, price, description } = req.body;

            // Validar que el price no este vacio y sea un número
            if (!price || isNaN(price)) {
                return res.status(400).json({
                    ok: false,
                    message: 'price is required and must be a number'
                });
            }

            // Validar que el nombre no este vacio
            if (!name) {
                return res.status(400).json({
                    ok: false,
                    message: 'name is required'
                });
            }

            // Validar que la description no este vacia
            if (!description) {
                return res.status(400).json({
                    ok: false,
                    message: 'description is required'
                });
            }



            // Validar que no exista un producto con el mismo nombre
            const productFromDB = await Product.findOne({ name });

            if (productFromDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Product already exists'   
                });
            }

    
            const producto = new Product({
                name,
                price,
                description,    
            });
    
            await producto.save();
    
            return res.json(
                {
                    ok: true,
                    message: 'Producto creado correctamente',
                    producto
                }
            );
            
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
        }

    }

    // Get Products
    getProducts = async (req: Request, res: Response) => {

        try {

            const products = await Product.find();

            return res.json({
                ok: true,
                products
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                ok: false,
                message: 'Error interno del servidor'
            });
        }

    }

}