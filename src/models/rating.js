'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rating.belongsTo(models.user,{
        foreignKey: 'userId'
      });

      rating.belongsTo(models.serie,{
        foreignKey: 'serieId'
      })
    }
  }
  rating.init({
    rating: DataTypes.INTEGER,
    userId: DataTypes.UUID,
    serieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rating',
    timestamps: false
  });
  return rating;
};