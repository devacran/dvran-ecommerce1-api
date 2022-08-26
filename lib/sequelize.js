const config = require('../config');
const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');

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

const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

module.exports = sequelize;
