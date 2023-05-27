const Sequelize = require('sequelize');
const configDB = require('../config/database');

const connection = new Sequelize(
    configDB[process.env.NODE_ENV || 'development']
  );

module.exports = connection;