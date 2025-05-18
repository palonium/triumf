import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../database';

export function updateParentDetails(req: AuthRequest, res: Response) {
	const { name, surname, phone } = req.body;
	const fields: string[] = [];
	const values: any[] = [];
	if (name !== undefined) {
		fields.push('firstName = ?');
		values.push(name);
	}
	if (surname !== undefined) {
		fields.push('lastName = ?');
		values.push(surname);
	}
	if (phone !== undefined) {
		fields.push('phone = ?');
		values.push(phone);
	}
	if (!fields.length) {
		return res.status(400).json({ error: 'No data provided' });
	}
	values.push(req.userId);
	db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
	res.sendStatus(200);
}
