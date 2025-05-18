import { Request, Response } from 'express';
import { usersService } from '../services/usersService';

export const getUsers = (req: Request, res: Response) => {
	res.json(usersService.getAll());
};

export const getUserById = (req: Request, res: Response) => {
	const u = usersService.getById(+req.params.id);
	if (!u) return res.status(404).json({ error: 'Not found' });
	res.json(u);
};

export const deleteUser = (req: Request, res: Response) => {
	if (!usersService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
	res.sendStatus(204);
};
