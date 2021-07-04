'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {
    static associate(models) {
      Residence.hasMany(models.User);
      Residence.hasMany(models.Event);
    }
  }
  Residence.init(
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
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Residence',
      timestamps: true,
      underscored: true,
    }
  );
  return Residence;
};
