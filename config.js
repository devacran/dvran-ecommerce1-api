require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

// const isDev = NODE_ENV === 'development';
// const isProd = NODE_ENV === 'production';
// const isTest = NODE_ENV === 'test';

const config = {
  env: NODE_ENV,
  port: PORT,
  postgres: {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    db: POSTGRES_DB,
  },
};

module.exports = config;
