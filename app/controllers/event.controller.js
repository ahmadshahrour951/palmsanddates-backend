const { body, validationResult } = require('express-validator');

const { checkUserExists, checkEndTime } = require('../middlewares/validators');
const db = require('../models');

const eventController = { validate, createEvent };

function validate(method) {
  switch (method) {
    case 'createEvent':
      return [
        body('name').exists().notEmpty().isString().trim(),
        body('startTime').exists().isISO8601().toDate().isAfter(),
        body('endTime')
          .optional()
          .isISO8601()
          .toDate()
          .isAfter()
          .custom(checkEndTime)
          .withMessage('startTime must be before endTime.'),
        body('creatorUserId')
          .exists()
          .notEmpty()
          .isInt()
          .custom(checkUserExists)
          .withMessage('User creator not found.'),
      ];
  }
}

async function createEvent(req, res, next) {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
      const error = new Error(
        `Errors in request body.`
      );
      error.statusCode = 500;
      error.data = result.errors;
      throw error;
    }

    const newEvent = req.body;
    const createdEvent = await db.events.create(newEvent);
    return res.status(201).json({
      message: 'Event successfully created.',
      data: {
        id: createdEvent.id,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = eventController;
