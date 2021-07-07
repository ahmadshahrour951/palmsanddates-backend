const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const {
  validate,
  createUser,
  getUsers,
  getUser,
  updateUser,
  getCreatedEvents,
} = userController;

router.post('/', validate('createUser'), createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', validate('updateUser'), updateUser);

router.get('/:id/created-events', validate('getCreatedEvents'), getCreatedEvents);


module.exports = router;
