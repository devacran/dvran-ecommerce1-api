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
} = process.env;

// const isDev = NODE_ENV === 'development';
const isProd = NODE_ENV === 'production';
// const isTest = NODE_ENV === 'test';

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
const config = {
  env: NODE_ENV,
  port: PORT,
  postgres: isProd ? postgresProdConfig : postgresDevConfig,
  jwtSecret: JWT_SECRET,
};

module.exports = config;
