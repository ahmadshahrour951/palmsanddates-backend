const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');
const { validateRules } = require('../middlewares/validators');
const {
  validate,
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  getEvents,
} = schoolController;

router.post('/', validate('createSchool'), validateRules, createSchool);
router.get('/', getSchools);
router.get('/:id', getSchool);
router.put('/:id', validate('updateSchool'), validateRules, updateSchool);

router.get('/:id/events', validate('getEvents'), validateRules, getEvents);

module.exports = router;
