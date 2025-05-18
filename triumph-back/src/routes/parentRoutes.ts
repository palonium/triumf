import { Router } from 'express';
import { updateParentDetails } from '../controllers/parentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.put('/parent/details', authMiddleware as any, updateParentDetails as any);
export default router;
