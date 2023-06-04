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
      serie.belongsToMany(models.user,{
        through: 'user_serie_favorite',
        foreignKey: 'serieId',
        as: 'series_favorites'
      })

      serie.belongsToMany(models.user,{
        through: 'user_serie_watched',
        foreignKey: 'serieId',
        as: 'series_watched'
      })

      serie.belongsToMany(models.user,{
        through: 'user_serie_disliked',
        foreignKey: 'serieId',
        as: 'series_disliked'
      })

      serie.belongsToMany(models.user,{
        through: 'user_serie_desired',
        foreignKey: 'serieId',
        as: 'series_desired'
      })

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