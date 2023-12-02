import { Request, Response, NextFunction } from "express";

import Product from "../Models/Product";

class ProductsController {
    static async Store(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {category_id, name, price} = req.body;
        
            const product = await Product.Create(category_id, name, price);

            res.json({status: 200, message: {createdProduct: product}});
        }
        catch (error) {
            console.log(error);
        } 
    }

    static async Update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, price } = req.body;

            const product = await Product.Update(Number(id), name, price);
            
            res.json({status: 200, message: {updatedProduct: product}});
        }
        catch (error) {
            console.log(error);
        }
    }

    static async Destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await Product.Delete(Number(id))

            res.json({status: 200, message: `Продукт с id ${id} успешно удален`});
        }
        catch (error) {
            console.log(error)
        }
    }

    static async GetProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { category_id } = req.params;

            const products = await Product.GetProductsByCategoryID(Number(category_id));

            res.json({status: 200, message: {products: products}});
        }
        catch (error) {
            console.log(error)
        }
    }

    
}

export default ProductsController;