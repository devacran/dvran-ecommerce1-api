require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  DATABASE_URL,
  JWT_SECRET,
  PORT_SMTP,
  EMAIL_SMTP,
  PASSWORD_EMAIL_SMTP,
  SERVER_SMTP,
} = process.env;

const isProd = NODE_ENV === 'production';

const postgresProdConfig = {
  host: PGHOST,
  port: PGPORT,
  user: PGUSER,
  password: PGPASSWORD,
  db: PGDATABASE,
  prod_uri: DATABASE_URL,
};

const postgresDevConfig = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  db: POSTGRES_DB,
};

const smtp = {
  port: PORT_SMTP,
  user: EMAIL_SMTP,
  password: PASSWORD_EMAIL_SMTP,
  host: SERVER_SMTP,
};
const config = {
  env: NODE_ENV,
  port: PORT,
  postgres: isProd ? postgresProdConfig : postgresDevConfig,
  jwtSecret: JWT_SECRET,
  smtp,
  siteUrl: 'https://ecommerce.com', //TO DO****
};

module.exports = config;
