import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export async function register(req: Request, res: Response) {
    try {
        const { phone, password } = req.body;
        const data = await authService.register(phone, password);
        res.status(201).json(data);
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: 'Registration failed' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { phone, password } = req.body;
        const data = await authService.login(phone, password);
        res.json(data);
    } catch (e) {
        console.error(e)
        res.status(401).json({ error: 'Invalid phone or password' });
    }
}

export async function getAccount(req: AuthRequest, res: Response) {
    try {
        const user = await authService.getAccount(req.userId!);
        res.json(user);
    } catch (e) {
        console.error(e)
        res.status(404).json({ error: 'User not found' });
    }
}

export async function changePassword(req: AuthRequest, res: Response) {
    try {
        const { oldPassword, newPassword } = req.body;
        await authService.changePassword(req.userId!, oldPassword, newPassword);
        res.sendStatus(200);
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: (e as Error).message });
    }
}
