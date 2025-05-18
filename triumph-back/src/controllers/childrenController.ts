import { Request, Response } from 'express';
import { childrenService } from '../services/childrenService';

export const updateChildTeam = (req: Request, res: Response) => {
	const updated = childrenService.updateTeam(+req.params.id, req.body.team);
	if (!updated) return res.status(404).json({ error: 'Not found' });
	res.json(updated);
};

export const deleteChild = (req: Request, res: Response) => {
	if (!childrenService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
	res.sendStatus(204);
};
