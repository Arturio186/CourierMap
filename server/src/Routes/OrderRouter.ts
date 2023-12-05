import { Router } from "express";
import OrdersController from "../Controllers/OrdersController";

const router = Router();

router.get('/', OrdersController.All);

export default router;