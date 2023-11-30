import { Router } from "express";
import ProductsController from "../Controllers/ProductsController";

const router = Router();

router.post('/create', ProductsController.Create);
router.get('/:category_id', ProductsController.GetProducts);

export default router;