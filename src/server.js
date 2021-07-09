if (process.env.NODE_ENV !== 'production') require('dotenv-safe').config();
const express = require('express');
const logger = require('morgan');

const db = require('./db/models/index.js');
const routes = require('./routes/index.js');

const PORT = process.env.PORT || 8000;
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////
// Register middleware
/////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));

/////////////////////////////////////////////////////////////////////////////////////////
// Register all routes
/////////////////////////////////////////////////////////////////////////////////////////
app.use('/', routes);

/////////////////////////////////////////////////////////////////////////////////////////
// Start Database & Server
/////////////////////////////////////////////////////////////////////////////////////////
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
