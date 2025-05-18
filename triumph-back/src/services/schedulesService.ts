import { db } from '../database';
import { Schedule } from '../models/schedule';

export class SchedulesService {
    getAll(): Schedule[] {
        return db.prepare('SELECT * FROM schedules').all() as any;
    }
    getById(id: number): Schedule | undefined {
        return db.prepare('SELECT * FROM schedules WHERE id = ?').get(id) as any;
    }
    create(s: Omit<Schedule, 'id'>): Schedule {
        const info = db.prepare(
            'INSERT INTO schedules (teamId, day, time, addressId) VALUES (?, ?, ?, ?)'
        ).run(s.teamId, s.day, s.time, s.addressId);
        return { id: info.lastInsertRowid as number, ...s };
    }
    update(id: number, s: Partial<Omit<Schedule, 'id'>>): Schedule | null {
        const existing = this.getById(id);
        if (!existing) return null;
        const updated = { ...existing, ...s };
        db.prepare(
            'UPDATE schedules SET teamId = ?, day = ?, time = ?, addressId = ? WHERE id = ?'
        ).run(updated.teamId, updated.day, updated.time, updated.addressId, id);
        return updated;
    }
    delete(id: number): boolean {
        return db.prepare('DELETE FROM schedules WHERE id = ?').run(id).changes > 0;
    }
}

export const schedulesService = new SchedulesService();
