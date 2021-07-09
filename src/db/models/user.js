'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserType, {
        foreignKey: {
          allowNull: false
        },
      });
      User.belongsTo(models.School);
      User.belongsTo(models.Residence);
      User.hasMany(models.Event, {
        as: 'CreatorUser',
        foreignKey: {
          name: 'CreatorUserId',
          allowNull: false,
        },
      });
      User.belongsToMany(models.Event, {
        through: 'user_events',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      timestamps: true,
    }
  );
  return User;
};
