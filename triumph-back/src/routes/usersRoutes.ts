import { Router } from 'express';
import {
  getUsers, getUserById, deleteUser
} from '../controllers/usersController';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUserById as any);
router.delete('/:id', deleteUser as any);
export default router;
