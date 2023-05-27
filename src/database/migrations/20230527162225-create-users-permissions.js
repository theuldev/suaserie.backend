'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID,
        references:{
          model: 'users',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      permission_id: {
        type: Sequelize.UUID,
        references:{
          model: 'permissions',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },{
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_permissions');
  }
};