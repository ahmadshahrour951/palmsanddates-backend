const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { validate, createUser } = userController;

router.post('/', validate('createUser'), createUser);

module.exports = router;
