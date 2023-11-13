import { Router } from "express";
import CreditionalsController from "../Controllers/CreditionalsController";

const router = Router();

router.post('/registartion', CreditionalsController.Registartion);
router.post('/authorization', CreditionalsController.Authorization);
router.get('/authentication', CreditionalsController.Authentication);

export default router;
