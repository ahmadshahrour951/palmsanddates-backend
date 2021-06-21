const express = require('express');
const router = express.Router();

const { userTypeController } = require('../controllers');
const { validate, createUserType } = userTypeController;

router.post('/', validate('createUserType'), createUserType);

module.exports = router;
