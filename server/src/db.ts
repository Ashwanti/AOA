import mysql from 'mysql2/promise';
import type { EventEmitter } from 'node:events';
import { config } from './config.js';

const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 5000,
});

// mysql2 pools emit background connection errors as 'error' events;
// without a listener, Node treats them as uncaught exceptions and crashes the process.
(pool as unknown as EventEmitter).on('error', (error: unknown) => {
  console.error('MySQL pool error', error);
});

export { pool };
