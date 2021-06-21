////////////////////////////////////////////////////////////////////////////////////////
// Database Configuration
/////////////////////////////////////////////////////////////////////////////////////////
const dbConfig =
  process.env.NODE_ENV === 'production'
    ? require('../config/db.config.js').production
    : require('../config/db.config.js').development;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.db,
  dbConfig.user,
  dbConfig.password,
  dbConfig.options
);

/////////////////////////////////////////////////////////////////////////////////////////
// Models Object
/////////////////////////////////////////////////////////////////////////////////////////
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.userTypes = require('./userType.model')(sequelize, Sequelize);
db.schools = require('./school.model')(sequelize, Sequelize);
db.residences = require('./residence.model')(sequelize, Sequelize);


/////////////////////////////////////////////////////////////////////////////////////////
// Relationships
/////////////////////////////////////////////////////////////////////////////////////////
db.users.belongsTo(db.userTypes, {
  foreignKey: {
    allowNull: false
  }
});
db.userTypes.hasMany(db.users);

db.users.belongsTo(db.schools)
db.schools.hasMany(db.users)

db.users.belongsTo(db.residences);
db.residences.hasMany(db.users);

db.schools.belongsToMany(db.residences, {
  through: 'school_residences',
});

db.residences.belongsToMany(db.schools, {
  through: 'school_residences',
});


/////////////////////////////////////////////////////////////////////////////////////////
// Test database connection
/////////////////////////////////////////////////////////////////////////////////////////
db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;