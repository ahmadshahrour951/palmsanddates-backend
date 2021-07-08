'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Residence);
      Event.belongsTo(models.School);
      Event.belongsTo(models.User, {
        as: 'CreatorUser',
        foreignKey: {
          name: 'CreatorUserId',
          allowNull: false,
        },
      });
      Event.belongsToMany(models.User, {
        through: 'user_events',
      });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
      timestamps: true,
      underscored: true, 
    }
  );
  return Event;
};
