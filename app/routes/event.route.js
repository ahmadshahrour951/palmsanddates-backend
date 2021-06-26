const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const {
  validate,
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  joinEvent,
  leaveEvent,
} = eventController;

router.post('/', validate('createEvent'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', validate('updateEvent'), updateEvent);
router.post('/:id/join', validate('joinEvent'), joinEvent);
router.post('/:id/leave', validate('leaveEvent'), leaveEvent);

module.exports = router;
