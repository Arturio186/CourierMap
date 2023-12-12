import { Request, Response, NextFunction } from "express";

import Category from "../Models/Category";

class CategoriesController {
    static async Store(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {name} = req.body;
        
            const category = await Category.Create(name);

            res.json({status: 200, message: {createdCategory: category}});
        }
        catch (error) {
            console.log(error);
        } 
    }

    static async Update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.Update(Number(id), name);
            
            res.json({status: 200, message: {updatedCategory: category}});
        }
        catch (error) {
            console.log(error);
        }
    }

    static async Destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await Category.Delete(Number(id))

            res.json({status: 200, message: `Категория с id ${id} успешно удалена`});
        }
        catch (error) {
            console.log(error)
        }
    }

    static async GetCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.GetCategories();

            res.json({status: 200, message: {categories: categories}});
        }
        catch (error) {
            console.log(error)
        }
    }

    static async GetCategoriesWithProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.GetCategoriesWithProducts();

            res.json({status: 200, message: {categories: categories}});
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default CategoriesController;