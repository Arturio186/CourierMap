import { Request, Response, NextFunction } from "express";

import Product from "../Models/Product";

import CheckObjectProperties from "../Utilities/CheckObjectProperties";
import APIError from "../Errors/APIError";

class ProductsController {
    static async GetProductsByCategoryID(req: Request, res: Response, next: NextFunction) {
        try {
            if (!CheckObjectProperties(req.params, ['category_id'])) {
                return next(APIError.BadRequest('Not all data in the req.params'));
            }

            const { category_id } = req.params;

            const products = await Product.GetProductsByCategoryID(Number(category_id));

            res.json({status: 200, message: {products: products}});
        }
        catch (error) {
            next(error)
        }
    }

    static async Store(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (!CheckObjectProperties(req.body, ['category_id', 'name', 'price'])) {
                return next(APIError.BadRequest('Not all data in the req.body'));
            }

            const {category_id, name, price} = req.body;
        
            const product = await Product.Create(category_id, name, price);

            res.json({status: 200, message: {createdProduct: product}});
        }
        catch (error) {
            next(error);
        } 
    }

    static async Update(req: Request, res: Response, next: NextFunction) {
        try {
            if (!CheckObjectProperties(req.params, ['id'])) {
                return next(APIError.BadRequest('Not all data in the req.params'));
            }

            if (!CheckObjectProperties(req.body, ['name', 'price'])) {
                return next(APIError.BadRequest('Not all data in the req.body'));
            }

            const { id } = req.params;
            const { name, price } = req.body;

            const product = await Product.Update(Number(id), name, price);
            
            res.json({status: 200, message: {updatedProduct: product}});
        }
        catch (error) {
            next(error);
        }
    }

    static async Destroy(req: Request, res: Response, next: NextFunction) {
        try {
            if (!CheckObjectProperties(req.params, ['id'])) {
                return next(APIError.BadRequest('Not all data in the req.params'));
            }
            
            const { id } = req.params;

            await Product.Delete(Number(id))

            res.json({status: 200, message: `Продукт с id ${id} успешно удален`});
        }
        catch (error) {
            next(error)
        }
    }
}

export default ProductsController;