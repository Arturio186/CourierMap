import { Router } from "express";
import CreditionalsRouter from './CreditionalsRouter';

const router = Router();

router.use('/creditionals', CreditionalsRouter);

export default router;
