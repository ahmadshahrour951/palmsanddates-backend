const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');
const { validate, createSchool, getSchools } = schoolController;

router.post('/', validate('createSchool'), createSchool);
router.get('/', getSchools);

module.exports = router;
