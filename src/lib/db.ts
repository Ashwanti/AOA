import mysql from 'mysql2/promise';
import type { EventEmitter } from 'events';

declare global {
  var _aoaPool: mysql.Pool | undefined;
}

export function getPool() {
  if (!global._aoaPool) {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST ?? 'localhost',
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 5000,
    });
    // mysql2 pools emit background connection errors as 'error' events;
    // without a listener, Node treats them as uncaught exceptions and crashes the request.
    // (mysql2's promise Pool type omits 'error' from its `on()` overloads even though
    // the object is an EventEmitter at runtime, hence the cast.)
    (pool as unknown as EventEmitter).on('error', (error: unknown) => {
      console.error('MySQL pool error', error);
    });
    global._aoaPool = pool;
  }
  return global._aoaPool;
}
