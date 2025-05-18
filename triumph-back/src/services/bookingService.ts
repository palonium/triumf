import { db } from '../database';
import { Request as BookingRequest } from '../models/request';

export class BookingService {
  create(r: Omit<BookingRequest, 'id'>): BookingRequest {
    const info = db
      .prepare(
        `INSERT INTO requests (firstName, lastName, phone, branch)
         VALUES (?, ?, ?, ?)`
      )
      .run(r.name, r.surname, r.phone, r.branch);
    return { id: info.lastInsertRowid as number, ...r };
  }
}

export const bookingService = new BookingService();
