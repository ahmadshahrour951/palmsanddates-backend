'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_types', [
      {
        id: 1,
        name: 'student',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 2,
        name: 'residential_assistant',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 3,
        name: 'residential_admin',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 4,
        name: 'super_admin',
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_types', null, {});
  },
};
