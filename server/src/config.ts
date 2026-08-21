import 'dotenv/config';

function required(name: string, fallback?: string) {
  return process.env[name] ?? fallback ?? '';
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: required('CORS_ORIGIN', 'http://localhost:3000'),

  mysql: {
    host: required('MYSQL_HOST', 'localhost'),
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  notifyEmail: required('NOTIFY_EMAIL', 'gaikwadashwanti@gmail.com'),
};

export const isEmailConfigured = Boolean(
  config.smtp.host && config.smtp.user && config.smtp.password
);
