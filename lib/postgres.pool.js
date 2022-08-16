const { Pool } = require('pg');
const config = require('../config');
const {
  postgres: { host, port, user, password, db },
} = config;
const dbPass = encodeURIComponent(password);
const dbUser = encodeURIComponent(user);

const DB_URI = `postgres://${dbUser}:${dbPass}@${host}:${port}/${db}`;
const pool = new Pool({ connectionString: DB_URI });

module.exports = pool;
