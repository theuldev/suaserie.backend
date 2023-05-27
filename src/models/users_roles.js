'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_roles.init({
    user_id: DataTypes.UUID,
    role_id: DataTypes.UUID
  }, {
    sequelize,
    timestamps: false,
    modelName: 'users_roles',
  });
  return users_roles;
};