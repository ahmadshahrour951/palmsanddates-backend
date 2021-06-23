const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const { validate, createEvent, getEvents, getEvent, updateEvent } =
  eventController;

router.post('/', validate('createEvent'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', validate('updateEvent'), updateEvent);

module.exports = router;
