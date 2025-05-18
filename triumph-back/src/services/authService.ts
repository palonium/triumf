import { db } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT_ROUNDS = 10;

export class AuthService {
    async register(phone: string, password: string): Promise<{ token: string; role: string }> {
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const info = db.prepare(
            'INSERT INTO users (firstName, lastName, phone, password) VALUES (?, ?, ?, ?)'
        ).run('', '', phone, hash);
        const userId = info.lastInsertRowid as number;
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
        return { token, role: 'user' };
    }

    async login(phone: string, password: string): Promise<{ token: string; role: string }> {
        const user = db.prepare('SELECT id, password, role FROM users WHERE phone = ?').get(phone) as any;
        if (!user) throw new Error('Invalid credentials');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials');
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        return { token, role: user.role };
    }

    async getAccount(userId: number): Promise<{ parent: any; children: any[] }> {
        const user = db.prepare('SELECT id, firstName AS name, lastName AS surname, phone FROM users WHERE id = ?').get(userId);
        if (!user) throw new Error('User not found');
    
        let children = [];
    
        const childRows = db.prepare(`SELECT id, firstName AS name, lastName AS surname, birthDate, team FROM children WHERE userId = ?`).all(userId) as any[];
        for (const childRow of childRows) {
            let schedule = null;
            let address = null;
    
            if (childRow.team) {
                const scheduleRow = db.prepare('SELECT day, time, addressId FROM schedules WHERE teamId = ?').get(childRow.team) as any;
                if (scheduleRow) {
                    schedule = scheduleRow;
    
                    const addressRow = db.prepare('SELECT street, house, school FROM addresses WHERE id = ?').get(schedule.addressId);
                    if (addressRow) {
                        address = addressRow;
                        delete schedule.addressId;
                        schedule.address = address;
                    }
                }
            }
    
            childRow.schedule = schedule;
            children.push(childRow);
        }
    
        return { parent: user, children };
    }
    
    

    async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = db.prepare('SELECT password FROM users WHERE id = ?').get(userId) as any;
        if (!user) throw new Error('User not found');
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) throw new Error('Old password incorrect');
        const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, userId);
    }
}

export const authService = new AuthService();
