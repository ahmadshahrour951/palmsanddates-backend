'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('schools', [
      {
        id: 1,
        name: 'Make School',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 2,
        name: 'Dominican University of California',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 3,
        name: 'University of San Francisco',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 4,
        name: 'San Francisco State University',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 5,
        name: 'Academy of Art University',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 6,
        name: 'City College of San Francisco',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('schools', null, {});
  },
};
