import { db } from '../database';
import { Child } from '../models/child';

export class ChildrenService {
	updateTeam(childId: number, teamId: number): Child | null {
		const existing = db.prepare('SELECT * FROM children WHERE id = ?').get(childId) as Child;
		if (!existing) return null;
		db.prepare('UPDATE children SET teamId = ? WHERE id = ?').run(teamId, childId);
		return { ...existing };
	}
	delete(childId: number): boolean {
		return db.prepare('DELETE FROM children WHERE id = ?').run(childId).changes > 0;
	}
}

export const childrenService = new ChildrenService();
