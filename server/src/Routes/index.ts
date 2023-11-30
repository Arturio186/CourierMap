import { Router } from "express";

import CreditionalsRouter from './CreditionalsRouter';
import ProductsRouter from './ProductsRouter';
import CategoriesRouter from './CategoriesRouter';

import AuthMiddleware from "../Middlewares/AuthMiddleware";

const router = Router();

router.use('/creditionals', CreditionalsRouter);
router.use('/products', AuthMiddleware, ProductsRouter)
router.use('/categories', AuthMiddleware, CategoriesRouter)

export default router;
