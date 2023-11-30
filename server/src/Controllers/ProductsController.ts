import { Request, Response, NextFunction } from "express";

import Product from "../Models/Product";

class ProductsController {
    static async Create(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {category_id, name, price} = req.body;
        
            const product = await Product.Create(category_id, name, price);

            res.json({status: 200, message: {product_id: product.id}});
        }
        catch (error) {
            console.log(error);
        } 
    }

    static async GetProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { category_id } = req.params;
            console.log(req.params);

            const products = await Product.GetProductsByCategoryID(Number(category_id));

            res.json({status: 200, message: {products: products}});
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController;