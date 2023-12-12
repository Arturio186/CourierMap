import { Router } from "express";
import CategoriesController from "../Controllers/CategoriesController";

const router = Router();

router.post('/create', CategoriesController.Store);
router.post('/edit/:id', CategoriesController.Update);
router.delete('/delete/:id', CategoriesController.Destroy);
router.get('/', CategoriesController.GetCategories);
router.get('/categoriesandproducts', CategoriesController.GetCategoriesWithProducts);

export default router;