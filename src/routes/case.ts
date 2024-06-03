import { Router } from 'express';
import { CasesController } from '../controllers/case.controller';

const router = Router();

router.get('/by-city', CasesController.getCasesByCity);

export default router;
