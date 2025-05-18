import { Router } from 'express';
import {
  getRequests, getRequestById, deleteRequest
} from '../controllers/requestsController';

const router = Router();
router.get('/', getRequests);
router.get('/:id', getRequestById as any);
router.delete('/:id', deleteRequest as any);
export default router;
