const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');
const { validate, createSchool } = schoolController;

router.post('/', validate('createSchool'), createSchool);

module.exports = router;
