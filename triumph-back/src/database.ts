import Database from 'better-sqlite3';
export const db = new Database('data.db');
db.exec('PRAGMA foreign_keys = ON;');
