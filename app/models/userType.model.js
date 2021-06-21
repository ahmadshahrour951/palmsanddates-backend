module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define(
    'userType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  return UserType;
};
