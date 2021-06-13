const { body } = require('express-validator');

const db = require('../models');

const schoolController = {
  validate,
  createSchool,
  getSchools,
  getSchool,
};

function validate(method) {
  switch (method) {
    case 'createSchool':
      return [body('name').exists().notEmpty().isString().trim()];
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
  } catch (error) {
    next(error);
  }
}

async function getSchools(req, res, next) {
  try {
    const schools = await db.schools.findAll();
    return res
      .status(200)
      .json({ message: 'Schools successfully fetched.', data: { schools } });
  } catch (error) {
    next(error);
  }
}

async function getSchool(req, res, next) {
  try {
    const school = await db.schools.findByPk(req.params.id);
    return res
      .status(200)
      .json({ message: 'School successfully fetched.', data: { school } });
  } catch (error) {
    next(error);
  }
}

module.exports = schoolController;
