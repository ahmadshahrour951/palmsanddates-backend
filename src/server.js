if (process.env.NODE_ENV !== 'production') require('dotenv-safe').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./db/models');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;
const app = express();

/// ////////////////////////////////////////////////
// Register middleware
/// ///////////////////////////////////////////////
app.use(express.json());
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(helmet());
app.use(cors());

/// ////////////////////////////////////////////////
// Register all routes
/// ////////////////////////////////////////////////
app.use('/', routes);

/// ////////////////////////////////////////////////
// Start Database & Server
/// ////////////////////////////////////////////////
const testDbConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

const serverListen = async () => {
  try {
    await app.listen(PORT);
    console.log('Server listening on Port', PORT);
  } catch (err) {
    console.error('Error in server setup', err);
  }
};

const initServer = async () => {
  await testDbConnection();
  await serverListen();
};

initServer();

module.exports = app;
