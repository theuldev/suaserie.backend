'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.roles,{
        foreignKey: 'roleId',
        as: 'user_role'
      })

      user.belongsToMany(models.serie,{
        foreignKey: 'userId',
        through: 'user_serie_favorites',
        as: 'favoritesList'  
      })

      user.belongsToMany(models.serie,{
        foreignKey: 'userId',
        through: 'user_serie_disliked',
        as: 'dislikedList'  
      })

      user.belongsToMany(models.serie,{
        foreignKey: 'userId',
        through: 'user_serie_watched',
        as: 'watchedList'  
      })

      user.belongsToMany(models.serie,{
        foreignKey: 'userId',
        through: 'user_serie_desired',
        as: 'desiredList'  
      })

    }
  }
  user.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.BLOB,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });
  return user;
};