require('dotenv').config();
const path = require('path');
module.exports = {
  "development": {
    "storage": path.join(__dirname, '..', 'database', 'db_soseries', 'development.sqlite'),
    "dialect": "sqlite",
    "logging": true
  },
  "test": {
    "storage": path.join(__dirname, '..', 'database', 'db_soseries', 'development.sqlite'),
    "dialect": "sqlite",
    "logging": true
  },
  "production":{
    "storage": path.join(__dirname, '..', 'database', 'db_soseries', 'development.sqlite'),
    "dialect": "sqlite",
    "logging": true
  }
};
