'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [
      {
        id: 1,
        name: 'Running',
        start_time: new Date('2021-08-01 20:00:00'),
        end_time: new Date('2021-08-01 21:00:00'),
        creator_user_id: 1,
        residence_id: 1,
        created_at: new Date('1995-11-18'),
        updated_at: new Date('1995-11-18'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('events', null, {});
  },
};
