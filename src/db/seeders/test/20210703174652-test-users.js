'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Ahmed',
        last_name: 'Shahrour',
        email: 'ahmed.shahrour@students.dominican.edu',
        user_type_id: 1,
        residence_id: 1,
        school_id: 1,
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
      {
        id: 2,
        first_name: 'Alisher',
        last_name: 'Begmatov',
        email: 'alisher.begmatov@students.dominican.edu',
        user_type_id: 1,
        residence_id: 1,
        school_id: 1,
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
