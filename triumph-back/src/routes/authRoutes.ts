import { Router } from 'express';
import {
	register,
	login,
	getAccount,
	changePassword
} from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/account', authMiddleware as any, getAccount);
router.post('/change-password', authMiddleware as any, changePassword);
export default router;
