const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const { validate, createEvent, getEvents, getEvent } = eventController;

router.post('/', validate('createEvent'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent)

module.exports = router;
