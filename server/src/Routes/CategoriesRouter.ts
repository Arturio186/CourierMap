import { Router } from "express";
import CategoriesController from "../Controllers/CategoriesController";

const router = Router();

router.get('/', CategoriesController.All);
router.get('/categoriesandproducts', CategoriesController.GetCategoriesWithProducts);
router.post('/create', CategoriesController.Store);
router.post('/edit/:id', CategoriesController.Update);
router.delete('/delete/:id', CategoriesController.Destroy);

export default router;