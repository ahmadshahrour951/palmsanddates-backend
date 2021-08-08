const express = require('express');
const { validateRules } = require('../middlewares/validators');
const { userController } = require('../controllers');

const router = express.Router();

const {
  validate,
  createUser,
  getUsers,
  getUser,
  updateUser,
  getCreatedEvents,
  getJoinedEvents,
  uploadProfileImg,
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

router.put('/:id/profile-img', uploadProfileImg);

module.exports = router;
