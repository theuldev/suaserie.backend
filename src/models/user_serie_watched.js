'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_serie_watched extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_serie_watched.init({
    userId: DataTypes.UUID,
    serieId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'user_serie_watched',
    timestamps: false
  });
  return user_serie_watched;
};