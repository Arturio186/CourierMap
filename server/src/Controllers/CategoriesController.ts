import { Request, Response, NextFunction } from "express";

import APIError from "../Errors/APIError";

import Category from "../Models/Category";

import CheckObjectProperties from "../Utilities/CheckObjectProperties";

class CategoriesController {
    static async Store(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (!CheckObjectProperties(req.body, ['name']))
                return next(APIError.BadRequest('Not all data in the body'));

            const { name } = req.body;
        
            const category = await Category.Create(name);

            res.json({status: 200, message: {createdCategory: category}});
        }
        catch (error) {
            next(error);
        } 
    }

    static async Update(req: Request, res: Response, next: NextFunction) {
        try {
            if (!CheckObjectProperties(req.body, ['name']))
                return next(APIError.BadRequest('Not all data in the body'));

            if (!CheckObjectProperties(req.params, ['id']))
                return next(APIError.BadRequest('Not all data in the params'));

            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.Update(Number(id), name);
            
            res.json({status: 200, message: {updatedCategory: category}});
        }
        catch (error) {
            next(error)
        }
    }

    static async Destroy(req: Request, res: Response, next: NextFunction) {
        try {
            if (!CheckObjectProperties(req.params, ['id']))
                return next(APIError.BadRequest('Not all data in the params'));

            const { id } = req.params;

            await Category.Delete(Number(id))

            res.json({status: 200, message: `Категория с id ${id} успешно удалена`});
        }
        catch (error) {
            next(error)
        }
    }

    static async All(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.GetCategories();

            res.json({status: 200, message: {categories: categories}});
        }
        catch (error) {
            next(error)
        }
    }

    static async GetCategoriesWithProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.GetCategoriesWithProducts();

            res.json({status: 200, message: {categories: categories}});
        }
        catch (error) {
            next(error)
        }
    }
}

export default CategoriesController;