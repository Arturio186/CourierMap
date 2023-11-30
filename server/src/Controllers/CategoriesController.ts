import { Request, Response, NextFunction } from "express";

import Category from "../Models/Category";

class CategoriesController {
    static async Create(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {name} = req.body;
        
            const category = await Category.Create(name);

            res.json({status: 200, message: {category_id: category.id}});
        }
        catch (error) {
            console.log(error);
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
}

export default CategoriesController;