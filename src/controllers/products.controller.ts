import { Request, Response } from "express";
import { Product } from "../data/mongo/models/productos.models";



export class ProductController {


    // ID
    constructor() {
    }

    // CRUD: CREATE - READ - UPDATE - DELETE


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
                count: products.length,
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

    // Delete Products
    deleteProduct = async (req: Request, res: Response) => {

        try {

            // Obtener el id del producto a eliminar
            const { id } = req.params;

            // Validar que el id sea un id de mongo valido mediante expresion regular
            this.validateMongoId(id, res );


            // Buscar el producto por id y eliminarlo
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: `Product with id ${id} does not exist`
                });
            }

            return res.json({
                ok: true,
                message: 'Product deleted successfully'
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                ok: false,
                message: 'Internal server error'
            });
        }

    }

    // Update Products
    updateProduct = async (req: Request, res: Response) => {

        try {

            // Obtener el id del producto a actualizar
            const { id } = req.params;

            // Validar que el id sea un id de mongo valido mediante expresion regular
            this.validateMongoId(id, res );

            // Obtener los datos a actualizar
            const { name, price, description } = req.body;


            /*
            if(name) {
                const productByName = await Product.findOne({ name });

                if (productByName) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Product already exists'
                    });
                }
            }
            */



            // Validar que el price no este vacio y sea un número
            if (price && isNaN(price)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Price must be a number'
                });
            }

            // Buscar el producto por id y actualizarlo
            const data = { name, price, description };

            const product = await Product.findByIdAndUpdate(
                id, 
                data,
                { new: true });

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: `Product with id ${id} does not exist`
                });
            }

            return res.json({
                ok: true,
                message: 'Product updated successfully',
                product
            });

        } catch (error: any) {
     
            if(error.codeName === 'DuplicateKey') {
                return res.status(400).json({
                    ok: false,
                    message: 'Product already exists with that name ' + error.keyValue.name
                });
            }


            return res.status(500).json({
                ok: false,
                message: 'Internal server error'
            });
        }

    }

    // Get Product by ID
    getProductById = async (req: Request, res: Response) => {

        try {

            // Obtener el id del producto
            const { id } = req.params;

            // Validar que el id sea un id de mongo valido mediante expresion regular
            this.validateMongoId(id, res );

            // Buscar el producto por id
            const product = await Product.findById(id);
            console.log(product);

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: `Product with id ${id} does not exist`
                });
            }

            return res.json({
                ok: true,
                product
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                ok: false,
                message: 'Internal server error'
            });
        }

    }



    validateMongoId = (id: string, res: Response) => { 
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                ok: false,
                message: 'id should be a valid mongo id'
            });
        }
    }

}