'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.UUID,
        references:{
          model: 'roles',
          key: 'id'
        },
        onDelete:'CASCADE',
        onupdate: 'CASCADE'
      },
      permission_id: {
        type: Sequelize.UUID,
        references:{
          model: 'permissions',
          key: 'id'
        },
        onDelete:'CASCADE',
        onupdate: 'CASCADE'
      }
    },{
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_permissions');
  }
};