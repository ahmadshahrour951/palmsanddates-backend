'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    static associate(models) {
      UserType.hasMany(models.User);
    }
  }
  UserType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserType',
      timestamps: true,
      underscored: true,
    }
  );
  return UserType;
};
