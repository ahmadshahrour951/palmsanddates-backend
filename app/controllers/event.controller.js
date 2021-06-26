const { param, body, validationResult } = require('express-validator');

const {
  checkUserExists,
  checkEndTime,
  checkEventExists,
  checkParticipantDuplicate,
} = require('../middlewares/validators');
const db = require('../models');

const eventController = {
  validate,
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  joinEvent,
};

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
    case 'updateEvent':
      return [
        param('id').exists().isInt().custom(checkEventExists),
        body('name').optional().isString().trim(),
        body('startTime').optional().isISO8601().toDate().isAfter(),
        body('endTime')
          .optional()
          .isISO8601()
          .toDate()
          .isAfter()
          .custom(checkEndTime)
          .withMessage('startTime must be before endTime.'),
        body('creatorUserId')
          .optional()
          .notEmpty()
          .isInt()
          .custom(checkUserExists)
          .withMessage('User creator not found.'),
      ];
    case 'joinEvent':
      return [
        body('userId').exists().notEmpty().isInt().custom(checkUserExists),
        param('id')
          .exists()
          .notEmpty()
          .isInt()
          .custom(checkEventExists)
          .bail()
          .custom(checkParticipantDuplicate),
      ];
  }
}

async function createEvent(req, res, next) {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
      const error = new Error(`Errors in request input.`);
      error.statusCode = 500;
      error.data = { errors: result.errors };
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

async function getEvents(req, res, next) {
  try {
    const events = await db.events.findAll();
    return res
      .status(200)
      .json({ message: 'Residences successfully fetched.', data: { events } });
  } catch (err) {
    next(err);
  }
}

async function getEvent(req, res, next) {
  try {
    const event = await db.events.findByPk(req.params.id);
    if (!event) {
      const error = new Error('Event not found.');
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: 'Event successfully fetched.', data: { event } });
  } catch (err) {
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
      const error = new Error(`Errors in request input.`);
      error.statusCode = 500;
      error.data = { errors: result.errors };
      throw error;
    }

    await req.Event.update(req.body);
    return res.status(204).json({ message: 'Successfully updated event.' });
  } catch (err) {
    next(err);
  }
}

async function joinEvent(req, res, next) {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
      const error = new Error(`Errors in request input.`);
      error.statusCode = 500;
      error.data = { errors: result.errors };
      throw error;
    }

    await req.Event.addUser(req.User);

    return res
      .status(201)
      .json({ message: 'User successfully added to event.', data: {} });
  } catch (err) {
    next(err);
  }
}

module.exports = eventController;
