import { Router } from "express";
import CreditionalsRouter from './CreditionalsRouter';

const router = Router();

router.use(CreditionalsRouter);

export default router;
