const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const { validate, createEvent, getEvents, getEvent, updateEvent, joinEvent } =
  eventController;

router.post('/', validate('createEvent'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', validate('updateEvent'), updateEvent);
router.post('/:id/join', validate('joinEvent'), joinEvent);

module.exports = router;
