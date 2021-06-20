const { body } = require('express-validator');

const db = require('../models');

const userController = {
  validate,
  createUser,
};

function validate(method) {
  switch (method) {
    case 'createUser':
      return [
        body('email').exists().notEmpty().isString().trim().isEmail(),
        body('firstName').exists().notEmpty().isString().trim(),
        body('lastName').exists().notEmpty().isString().trim(),
        body('residenceId').optional().isInt(),
        body('schoolId').optional().isInt(),
      ];
  }
}

async function createUser(req, res, next) {
  try {
    const newUser = req.body;

    if (req.body.residenceId) {
      const residence = await db.residences.findByPk(req.body.residenceId);
      if (!residence) {
        const error = new Error('Residence Id provided was not found.');
        error.statusCode = 404;
        throw error;
      }
    }

    if (req.body.schoolId) {
      const school = await db.schools.findByPk(req.body.schoolId);
      if (!school) {
        const error = new Error('School Id provided was not found.');
        error.statusCode = 404;
        throw error;
      }
    }

    const createdUser = await db.users.create(newUser);
    return res.status(201).json({
      message: 'User created successfully.',
      data: { id: createdUser.id },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = userController;
