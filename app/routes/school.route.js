const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');
const {
  validate,
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  getEvents,
} = schoolController;

router.post('/', validate('createSchool'), createSchool);
router.get('/', getSchools);
router.get('/:id', getSchool);
router.put('/:id', validate('updateSchool'), updateSchool);

router.get('/:id/events', validate('getEvents'), getEvents);

module.exports = router;
