import { Request, Response } from 'express';
import { addressesService } from '../services/addressesService';

export const getAddresses = (req: Request, res: Response) => {
	res.json(addressesService.getAll());
};

export const getAddressById = (req: Request, res: Response) => {
	const a = addressesService.getById(+req.params.id);
	if (!a) return res.status(404).json({ error: 'Not found' });
	res.json(a);
};

export const createAddress = (req: Request, res: Response) => {
	const a = addressesService.create(req.body);
	res.status(201).json(a);
};

export const updateAddress = (req: Request, res: Response) => {
	const a = addressesService.update(+req.params.id, req.body);
	if (!a) return res.status(404).json({ error: 'Not found' });
	res.json(a);
};

export const deleteAddress = (req: Request, res: Response) => {
	if (!addressesService.delete(+req.params.id)) return res.status(404).json({ error: 'Not found' });
	res.sendStatus(204);
};
