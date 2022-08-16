const { Client } = require('pg');
const config = require('./config');
const {
  postgres: { host, port, user, password, db },
} = config;
const dbPass = encodeURIComponent(password);
const dbUser = encodeURIComponent(user);

const DB_URI = `postgres://${dbUser}:${dbPass}@${host}:${port}/${db}`;

async function getConnection() {
  const client = new Client({
    connectionString: DB_URI,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
