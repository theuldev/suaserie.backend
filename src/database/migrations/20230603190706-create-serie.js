'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
      },
      summary: {
        type: Sequelize.TEXT
      },
      cast: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.BLOB
      },
      releaseYear:{
        type: Sequelize.INTEGER
      }
    },{
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('series');
  }
};