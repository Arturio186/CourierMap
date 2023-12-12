import { Router } from "express";
import OrdersController from "../Controllers/OrdersController";

const router = Router();

router.get('/', OrdersController.All);
router.post('/create', OrdersController.Store);

export default router;