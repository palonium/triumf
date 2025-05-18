import { Request, Response } from 'express';
import { schedulesService } from '../services/schedulesService';

export const getSchedules = (req: Request, res: Response) => {
	res.json(schedulesService.getAll());
};

export const getScheduleById = (req: Request, res: Response) => {
	const s = schedulesService.getById(+req.params.id);
	if (!s) return res.status(404).json({ error: 'Not found' });
	res.json(s);
};

export const createSchedule = (req: Request, res: Response) => {
	const s = schedulesService.create(req.body);
	res.status(201).json(s);
};

export const updateSchedule = (req: Request, res: Response) => {
	const s = schedulesService.update(+req.params.id, req.body);
	if (!s) return res.status(404).json({ error: 'Not found' });
	res.json(s);
};

export const deleteSchedule = (req: Request, res: Response) => {
	if (!schedulesService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
	res.sendStatus(204);
};
