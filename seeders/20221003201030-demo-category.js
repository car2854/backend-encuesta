'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Astronomia'
      },
      {
        name: 'Tecnologia'
      },
      {
        name: 'Politica'
      },
      {
        name: 'Medicina'
      },
      {
        name: 'Ingenieria'
      },
      {
        name: 'Historia'
      },
      {
        name: 'Arte'
      },
      {
        name: 'Musica'
      },
      {
        name: 'Biologia'
      },
      {
        name: 'Filosofia'
      },
      {
        name: 'Creencias'
      },
      {
        name: 'Otros'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
