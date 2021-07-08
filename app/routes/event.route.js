const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const { validateRules } = require('../middlewares/validators');
const {
  validate,
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  joinEvent,
  leaveEvent,
  getJoinedUsers,
} = eventController;

router.post('/', validate('createEvent'), validateRules, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', validate('updateEvent'), validateRules, updateEvent);
router.post('/:id/join', validate('joinEvent'), validateRules, joinEvent);
router.post('/:id/leave', validate('leaveEvent'), validateRules, leaveEvent);

router.get(
  '/:id/users',
  validate('getJoinedUsers'),
  validateRules,
  getJoinedUsers
);

module.exports = router;
