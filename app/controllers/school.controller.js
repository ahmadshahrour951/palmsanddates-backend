const { body } = require('express-validator');

const db = require('../models');

const schoolController = {
  validate,
  createSchool,
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

module.exports = schoolController;
