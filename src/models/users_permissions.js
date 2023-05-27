'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_permissions.init({
    user_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {
    sequelize,
    timestamps: false,
    modelName: 'users_permissions',
  });
  return users_permissions;
};