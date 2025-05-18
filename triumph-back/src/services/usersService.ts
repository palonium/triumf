import { db } from '../database';
import { User } from '../models/user';
import { Child } from '../models/child';

export class UsersService {
	getAll(): User[] {
		const users = db.prepare('SELECT * FROM users').all();
		return users.map((u: any) => {
			const children = db
				.prepare('SELECT * FROM children WHERE userId = ?')
				.all(u.id);
			return { ...u, children };
		});
	}
	getById(id: number): User | undefined {
		const u = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
		if (!u) return undefined;
		const children = db.prepare('SELECT * FROM children WHERE userId = ?').all(id) as Child[];
		return { ...u, children };
	}
	delete(id: number): boolean {
		return db.prepare('DELETE FROM users WHERE id = ?').run(id).changes > 0;
	}
}

export const usersService = new UsersService();
