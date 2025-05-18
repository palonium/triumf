import { Router } from 'express';
import {
  updateChildTeam, deleteChild
} from '../controllers/childrenController';

const router = Router();
router.patch('/:id', updateChildTeam as any);
router.delete('/:id', deleteChild as any);
export default router;
