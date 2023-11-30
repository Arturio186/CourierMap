import { Router } from "express";
import CategoriesController from "../Controllers/CategoriesController";

const router = Router();

router.post('/create', CategoriesController.Create);
router.get('/', CategoriesController.GetCategories);

export default router;