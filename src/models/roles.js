'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsToMany(models.user,{
        through: models.users_roles,
        as: 'role_user',
        foreignKey: 'role_id'
      })
      roles.belongsToMany(models.permissions,{
        through: models.roles_permissions,
        as:'role_permission',
        foreignKey:'role_id'
      })
    }
  }
  roles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'roles',
  });
  return roles;
};