'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  serie.init({
    name: DataTypes.STRING,
    seasons: DataTypes.INTEGER,
    episodes: DataTypes.INTEGER,
    rottenTomatoes: DataTypes.DECIMAL,
    summary: DataTypes.TEXT,
    cast: DataTypes.TEXT,
    img: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'serie',
    timestamps: false
  });
  return serie;
};