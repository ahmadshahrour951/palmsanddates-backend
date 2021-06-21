const { body } = require('express-validator');

const db = require('../models');

const userController = {
  validate,
  createUser,
  getUsers,
  getUser,
  updateUser,
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
    case 'updateUser':
      return [
        body('email').optional().isString().trim().isEmail(),
        body('firstName').optional().notEmpty().isString().trim(),
        body('lastName').optional().notEmpty().isString().trim(),
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

    const userType = await db.userTypes.findByPk(req.body.userTypeId)
    if (!userType) {
      const error = new Error('User Type Id provided was not found.')
      error.statusCode = 404;
      throw error;
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

async function getUsers(req, res, next) {
  try {
    const users = await db.users.findAll();
    return res.status(200).json({
      message: 'Users successfully fetched.',
      data: { users },
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await db.users.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: 'User successfully fetched.', data: { user } });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await db.users.findByPk(req.params.id);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    await user.update(req.body);
    return res.status(204).json({ message: 'Successfully updated user.' });
  } catch (err) {
    next(err);
  }
}

module.exports = userController;
