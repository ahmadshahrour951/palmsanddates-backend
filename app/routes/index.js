const express = require('express');
const router = express.Router();

const schoolRoutes = require('./school.route');
const residenceRoutes = require('./residence.route');
const userRoutes = require('./user.route');
const userTypeRoutes = require('./userType.route');
const eventRoutes = require('./event.route');

/////////////////////////////////////////////////////////////////////////////////////////
// Root to redirect to '/games' until Landing Page creation
/////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'Hello, World!' });
});

router.use('/schools', schoolRoutes);
router.use('/residences', residenceRoutes);
router.use('/users', userRoutes);
router.use('/usertypes', userTypeRoutes);
router.use('/events', eventRoutes);

/////////////////////////////////////////////////////////////////////////////////////////
// Error page for error handling
/////////////////////////////////////////////////////////////////////////////////////////
router.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error' });
});

/////////////////////////////////////////////////////////////////////////////////////////
// If no explicit error and route requested not found
/////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
  return res.status(404).json({ message: 'API endpoint not found.' });
});

module.exports = router;
