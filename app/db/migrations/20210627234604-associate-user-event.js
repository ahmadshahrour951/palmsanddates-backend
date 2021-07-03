'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user_events',
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        event_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        underscored: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_events');
  },
};
