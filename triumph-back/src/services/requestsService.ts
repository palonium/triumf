import { db } from '../database';
import { Request } from '../models/request';

export class RequestsService {
	getAll(): Request[] {
		return db.prepare('SELECT * FROM requests').all() as any;
	}
	getById(id: number): Request | undefined {
		return db.prepare('SELECT * FROM requests WHERE id = ?').get(id) as any;
	}
	delete(id: number): boolean {
		return db.prepare('DELETE FROM requests WHERE id = ?').run(id).changes > 0;
	}
}

export const requestsService = new RequestsService();
