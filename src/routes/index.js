const express = require('express');
const router = express.Router();

const schoolRoutes = require('./school.route.js');
const residenceRoutes = require('./residence.route.js');
const userRoutes = require('./user.route.js');
const usertypeRoutes = require('./usertype.route.js');
const eventRoutes = require('./event.route.js');

router.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'Hello, World!' });
});

router.use('/schools', schoolRoutes);
router.use('/residences', residenceRoutes);
router.use('/users', userRoutes);
router.use('/usertypes', usertypeRoutes);
router.use('/events', eventRoutes);

/////////////////////////////////////////////////////////////////////////////////////////
// Error page for error handling
/////////////////////////////////////////////////////////////////////////////////////////
router.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error', data: error.data || null  });
});

/////////////////////////////////////////////////////////////////////////////////////////
// If no explicit error and route requested not found
/////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
  return res.status(404).json({ message: 'API endpoint not found.' });
});

module.exports = router;
