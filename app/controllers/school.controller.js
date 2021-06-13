const { body } = require('express-validator');

const db = require('../models');

const schoolController = {
  validate,
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
};

function validate(method) {
  switch (method) {
    case 'createSchool':
      return [body('name').exists().notEmpty().isString().trim()];
    case 'updateSchool':
      return [body('name').optional().isString().trim()];
  }
}

async function createSchool(req, res, next) {
  try {
    const newSchool = req.body;
    const createdSchool = await db.schools.create(newSchool);
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
    const schools = await db.schools.findAll();
    return res
      .status(200)
      .json({ message: 'Schools successfully fetched.', data: { schools } });
  } catch (err) {
    next(err);
  }
}

async function getSchool(req, res, next) {
  try {
    const school = await db.schools.findByPk(req.params.id);
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
    const school = await db.schools.findByPk(req.params.id);
    if (!school) {
      const error = new Error('School not found.');
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = schoolController;
