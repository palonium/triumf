import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../database';

export function updateChildDetails(req: AuthRequest, res: Response) {
  const { name, surname, birthDate } = req.body;
  if (!name || !surname || !birthDate) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const childId = req.body.id;

  if (childId) {
    const existing = db
      .prepare('SELECT * FROM children WHERE id = ? AND userId = ?')
      .get(childId, req.userId);
    console.log({ childId })
    if (existing) {
      db.prepare(
        'UPDATE children SET firstName = ?, lastName = ?, birthDate = ? WHERE id = ?'
      ).run(name, surname, birthDate, childId);
      const updated = db
        .prepare('SELECT * FROM children WHERE id = ?')
        .get(childId);
      return res.json(updated);
    }
  }

  const info = db
    .prepare(
      'INSERT INTO children (userId, firstName, lastName, birthDate, teamId) VALUES (?, ?, ?, ?, ?)'
    )
    .run(req.userId, name, surname, birthDate, '');
  const newChild = db
    .prepare('SELECT * FROM children WHERE id = ?')
    .get(info.lastInsertRowid);
  return res.status(201).json(newChild);
}
