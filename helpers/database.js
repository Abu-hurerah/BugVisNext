const dbConfig = require('../config/dbconfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        dialectOptions: {
            connectTimeout: 10000 // This is in milliseconds
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
            evict: 10000 // Automatically remove idle connections after 10 seconds
        },
        retry: {
            max: 3 // Set max number of retries on new connection
        },
        logging: console.log, // Enable logging; can be set to false if not needed
    }
);


module.exports = {
    sequelize,
};
