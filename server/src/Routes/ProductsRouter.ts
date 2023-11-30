import { Router } from "express";
import ProductsController from "../Controllers/ProductsController";

const router = Router();

router.post('/create', ProductsController.Create);

export default router;