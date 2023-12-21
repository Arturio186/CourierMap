import { Router } from "express";
import ProductsController from "../Controllers/ProductsController";

const router = Router();

router.get('/:category_id', ProductsController.GetProductsByCategoryID);
router.post('/create', ProductsController.Store);
router.post('/edit/:id', ProductsController.Update)
router.delete('/delete/:id', ProductsController.Destroy)

export default router;