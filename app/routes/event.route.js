const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const { validate, createEvent, getEvents } = eventController;

router.post('/', validate('createEvent'), createEvent);
router.get('/', getEvents);

module.exports = router;
