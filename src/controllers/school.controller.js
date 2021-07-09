const { param, body, validationResult } = require('express-validator');

const db = require('../db/models');

const { checkSchoolExists } = require('../middlewares/validators');

const schoolController = {
  validate,
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  getEvents,
};

function validate(method) {
  switch (method) {
    case 'createSchool':
      return [body('name').exists().notEmpty().isString().trim()];
    case 'updateSchool':
      return [body('name').optional().isString().trim()];
    case 'getEvents':
      return [
        param('id').exists().bail().isInt().bail().custom(checkSchoolExists),
      ];
  }
}

async function createSchool(req, res, next) {
  try {
    const newSchool = req.body;
    const createdSchool = await db.School.create(newSchool);
    return res.status(201).json({
      message: 'School created successfully.',
      data: { id: createdSchool.id },
    });
  } catch (err) {
    next(err);
  }
}

async function getSchools(req, res, next) {
  try {
    const schools = await db.School.findAll();
    return res
      .status(200)
      .json({ message: 'Schools successfully fetched.', data: { schools } });
  } catch (err) {
    next(err);
  }
}

async function getSchool(req, res, next) {
  try {
    const school = await db.School.findByPk(req.params.id);
    if (!school) {
      const error = new Error('School not found.');
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: 'School successfully fetched.', data: { school } });
  } catch (err) {
    next(err);
  }
}

async function updateSchool(req, res, next) {
  try {
    const school = await db.School.findByPk(req.params.id);
    if (!school) {
      const error = new Error('School not found.');
      error.statusCode = 404;
      throw error;
    }
    await school.update(req.body);
    return res.status(204).json({ message: 'Successfully updated school.' });
  } catch (err) {
    next(err);
  }
}

async function getEvents(req, res, next) {
  try {
    const events = await req.School.getEvents();
    return res.status(200).json({
      message: 'Events successfully fetched.',
      data: {
        events,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = schoolController;
