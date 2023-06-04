'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('series', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      name:{
        type: Sequelize.STRING
      },
      seasons: {
        type: Sequelize.INTEGER
      },
      episodes: {
        type: Sequelize.INTEGER
      },
      rottenTomatoes: {
        type: Sequelize.DECIMAL
      },
      summary: {
        type: Sequelize.TEXT
      },
      cast: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.BLOB
      }
    },{
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('series');
  }
};