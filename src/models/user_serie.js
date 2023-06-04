'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_serie.init({
    user_id: DataTypes.UUID,
    serie_id: DataTypes.UUID
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user_serie',
  });
  return user_serie;
};