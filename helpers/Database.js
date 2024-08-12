const dbConfig = require('../config/DbConfig');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    connectTimeout: 10000
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    evict: 10000
  },
  retry: {
    max: 3
  },
  logging: console.log,
}
);


module.exports = { sequelize };
