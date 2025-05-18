import { Request, Response } from 'express';
import { bookingService } from '../services/bookingService';

export const createBooking = (req: Request, res: Response) => {
    try {
        const newReq = bookingService.create(req.body);
        res.status(201).json(newReq);
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Failed to create booking' });
    }
};
