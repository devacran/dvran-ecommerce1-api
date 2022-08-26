const config = require('../config');

const {
  env,
  postgres: { host, port, user, password, db, prod_uri },
} = config;

const dbPass = encodeURIComponent(password);
const dbUser = encodeURIComponent(user);

const DB_URI =
  env === 'production'
    ? prod_uri
    : `postgres://${dbUser}:${dbPass}@${host}:${port}/${db}`;

module.exports = {
  development: {
    url: DB_URI,
    dialect: 'postgres',
  },
  production: {
    url: DB_URI,
    dialect: 'postgres',
  },
};
