import { Router } from "express";
import CreditionalsController from "../Controllers/CreditionalsController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const router = Router();

router.post('/registartion', CreditionalsController.Registartion);
router.post('/authorization', CreditionalsController.Authorization);
router.get('/authentication', AuthMiddleware, CreditionalsController.Authentication);

export default router;
