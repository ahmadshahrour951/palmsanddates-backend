'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate(models) {
      School.hasMany(models.User);
      School.hasMany(models.Event);
    }
  }
  School.init(
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
      modelName: 'School',
      timestamps: true,
      underscored: true,
    }
  );
  return School;
};
