import { Router } from 'express';
import { updateChildDetails } from '../controllers/childDetailsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.put('/child/details', authMiddleware as any, updateChildDetails as any);
export default router;
