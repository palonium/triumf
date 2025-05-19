import { db } from '../database';
import { Team } from '../models/team';

export class TeamsService {
    getAll(): Team[] {
        const teams = db.prepare('SELECT * FROM teams').all();
        return teams.map((t: any) => {
            const members = db
                .prepare('SELECT id FROM children WHERE teamId = ?')
                .all(t.id)
                .map((r: any) => r.id);
            return { id: t.id, name: t.name, members };
        });
    }

    getById(id: number): Team | undefined {
        const t = db.prepare('SELECT * FROM teams WHERE id = ?').get(id) as Team | undefined;
        if (!t) return undefined;
        const members = db
            .prepare('SELECT id FROM children WHERE teamId = ?')
            .all(id)
            .map((r: any) => r.id);
        return { id: t.id, name: t.name, members };
    }

    create(t: Omit<Team, 'id'>): Team {
        const info = db.prepare('INSERT INTO teams (name) VALUES (?)').run(t.name);
        const teamId = info.lastInsertRowid as number;
        for (const childId of t.members) {
            db.prepare('UPDATE children SET teamId = ? WHERE id = ?').run(teamId, childId);
        }
        return { id: teamId, ...t };
    }

    update(id: number, t: Partial<Omit<Team, 'id'>>): Team | null {
        const existing = this.getById(id);
        if (!existing) return null;
        const name = t.name ?? existing.name;
        db.prepare('UPDATE teams SET name = ? WHERE id = ?').run(name, id);
        if (t.members) {
            db.prepare('UPDATE children SET teamId = NULL WHERE teamId = ?').run(id);
            for (const childId of t.members) {
                db.prepare('UPDATE children SET teamId = ? WHERE id = ?').run(id, childId);
            }
        }
        return this.getById(id)!;
    }

    delete(id: number): boolean {
        return db.prepare('DELETE FROM teams WHERE id = ?').run(id).changes > 0;
    }
}

export const teamsService = new TeamsService();
