import { db } from '../database';
import { Address } from '../models/address';

export class AddressesService {
  getAll(): Address[] {
    return db.prepare('SELECT * FROM addresses').all() as any;
  }
  getById(id: number): Address | undefined {
    return db.prepare('SELECT * FROM addresses WHERE id = ?').get(id) as any;
  }
  create(a: Omit<Address, 'id'>): Address {
    const info = db.prepare(
      'INSERT INTO addresses (street, house, school) VALUES (?, ?, ?)'
    ).run(a.street, a.house, a.school);
    return { id: info.lastInsertRowid as number, ...a };
  }
  update(id: number, a: Omit<Address, 'id'>): Address | null {
    const existing = this.getById(id);
    if (!existing) return null;
    db.prepare(
      'UPDATE addresses SET street = ?, house = ?, school = ? WHERE id = ?'
    ).run(a.street, a.house, a.school, id);
    return { id, ...a };
  }
  delete(id: number): boolean {
    return db.prepare('DELETE FROM addresses WHERE id = ?').run(id).changes > 0;
  }
}

export const addressesService = new AddressesService();
