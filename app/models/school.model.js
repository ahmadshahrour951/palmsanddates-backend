module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    'school',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  return School;
}