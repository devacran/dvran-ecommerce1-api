const config = require('../config');

const {
  postgres: { host, port, user, password, db },
} = config;

const dbPass = encodeURIComponent(password);
const dbUser = encodeURIComponent(user);

const DB_URI = `postgres://${dbUser}:${dbPass}@${host}:${port}/${db}`;

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
