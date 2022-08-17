const config = require('../config');
const { Sequelize } = require('sequelize');
const setupModels = require('../db');

const {
  postgres: { host, port, user, password, db },
} = config;
const dbPass = encodeURIComponent(password);
const dbUser = encodeURIComponent(user);

const DB_URI = `postgres://${dbUser}:${dbPass}@${host}:${port}/${db}`;

const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: true,
});
setupModels(sequelize);
sequelize.sync();
module.exports = sequelize;
