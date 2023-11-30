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
            const {category_id} = req.body;
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController;