'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'user_type_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'user_types',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('users', 'school_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'schools',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('users', 'residence_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'residences',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('events', 'creator_user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('events', 'residence_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'residences',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('events', 'school_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'schools',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'user_type_id');
    await queryInterface.removeColumn('users', 'school_id');
    await queryInterface.removeColumn('users', 'residence_id');
    await queryInterface.removeColumn('events', 'creator_user_id');
    await queryInterface.removeColumn('events', 'residence_id');
  },
};
