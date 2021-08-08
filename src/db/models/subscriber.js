const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {}
  }
  Subscriber.init(
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
    },
    {
      sequelize,
      modelName: 'Subscriber',
      underscored: true,
      timestamps: true,
    }
  );
  return Subscriber;
};
