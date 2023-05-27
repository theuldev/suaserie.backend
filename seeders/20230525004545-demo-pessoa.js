'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('user', [
        {
          name: 'Ednaldo',
          lastname: 'Pereira',
          email:'ednaldopereira@hotmail.com',
          password: 'ednaldo321#'
        },
        {
          name: 'Luke',
          lastname: 'Skywalker',
          email:'lukethebest@hotmail.com',
          password: 'lukeone123'
        }
    ])
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('user', null, {});
  }
};
