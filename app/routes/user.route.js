const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { validate, createUser, getUsers, getUser } = userController;

router.post('/', validate('createUser'), createUser);
router.get('/', getUsers);
router.get('/:id', getUser)

module.exports = router;
