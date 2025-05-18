import { Request, Response } from 'express';
import { teamsService } from '../services/teamsService';

export const getTeams = (req: Request, res: Response) => {
	res.json(teamsService.getAll());
};

export const getTeamById = (req: Request, res: Response) => {
	const t = teamsService.getById(+req.params.id);
	if (!t) return res.status(404).json({ error: 'Not found' });
	res.json(t);
};

export const createTeam = (req: Request, res: Response) => {
	const t = teamsService.create(req.body);
	res.status(201).json(t);
};

export const updateTeam = (req: Request, res: Response) => {
	const t = teamsService.update(+req.params.id, req.body);
	if (!t) return res.status(404).json({ error: 'Not found' });
	res.json(t);
};

export const deleteTeam = (req: Request, res: Response) => {
	if (!teamsService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
	res.sendStatus(204);
};
