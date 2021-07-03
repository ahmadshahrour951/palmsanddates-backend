////////////////////////////////////////////////////////////////////////////////////////
// Config options for database.
/////////////////////////////////////////////////////////////////////////////////////////
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: 'palmsanddates_development',
    host: DB_HOST,
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: 'palmsanddates_test',
    host: DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: 'palmsanddates_production',
    host: DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};
