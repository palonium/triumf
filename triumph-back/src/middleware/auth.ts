import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthRequest extends Request {
    userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = payload.userId;
        next();
    } catch (e) {
        console.error(e)
        return res.status(401).json({ error: 'Invalid token' });
    }
}
