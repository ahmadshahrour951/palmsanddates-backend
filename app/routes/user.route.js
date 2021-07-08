const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { validateRules } = require('../middlewares/validators');
const {
  validate,
  createUser,
  getUsers,
  getUser,
  updateUser,
  getCreatedEvents,
  getJoinedEvents,
} = userController;

router.post('/', validate('createUser'), validateRules, createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', validate('updateUser'), validateRules, updateUser);

router.get(
  '/:id/created-events',
  validate('getCreatedEvents'),
  validateRules,
  getCreatedEvents
);
router.get(
  '/:id/joined-events',
  validate('getJoinedEvents'),
  validateRules,
  getJoinedEvents
);

module.exports = router;
