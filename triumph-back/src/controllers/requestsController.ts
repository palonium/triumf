import { Request, Response } from 'express';
import { requestsService } from '../services/requestsService';

export const getRequests = (req: Request, res: Response) => {
    res.json(requestsService.getAll());
};

export const getRequestById = (req: Request, res: Response) => {
    const r = requestsService.getById(+req.params.id);
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json(r);
};

export const deleteRequest = (req: Request, res: Response) => {
    if (!requestsService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
    res.sendStatus(204);
};
