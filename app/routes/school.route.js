const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');
const { validate, createSchool, getSchools, getSchool } = schoolController;

router.post('/', validate('createSchool'), createSchool);
router.get('/', getSchools);
router.get('/:id', getSchool);

module.exports = router;
