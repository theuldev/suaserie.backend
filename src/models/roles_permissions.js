'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles_permissions.init({
    role_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {
    sequelize,
    timestamps: false,
    modelName: 'roles_permissions',
  });
  return roles_permissions;
};