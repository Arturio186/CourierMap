import { Router } from "express";
import ProductsController from "../Controllers/ProductsController";

const router = Router();

router.post('/create', ProductsController.Store);
router.get('/:category_id', ProductsController.GetProducts);
router.delete('/delete/:id', ProductsController.Destroy)

export default router;