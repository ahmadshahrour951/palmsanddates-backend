const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { validate, createUser, getUsers } = userController;

router.post('/', validate('createUser'), createUser);
router.get('/', getUsers);

module.exports = router;
