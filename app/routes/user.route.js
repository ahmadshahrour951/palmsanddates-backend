const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { validate, createUser, getUsers, getUser, updateUser } = userController;

router.post('/', validate('createUser'), createUser);
router.get('/', getUsers);
router.get('/:id', getUser)
router.put('/:id', validate('updateUser'), updateUser)

module.exports = router;
