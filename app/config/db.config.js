////////////////////////////////////////////////////////////////////////////////////////
// Config options for database.
// One for production and one for dev.
// Without these you'll receive errors.
/////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  development: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    options: {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    },
  },
  production: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    options: {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    },
  },
};
