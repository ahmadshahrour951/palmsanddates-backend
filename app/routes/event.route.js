const express = require('express');
const router = express.Router();

const { eventController } = require('../controllers');
const {
  validate,
  createEvent,
} = eventController;

router.post('/', validate('createEvent'), createEvent)

module.exports = router;