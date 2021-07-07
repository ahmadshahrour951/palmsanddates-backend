const { param, body, validationResult } = require('express-validator');

const db = require('../db/models');
const { checkUserExists } = require('../middlewares/validators');

const userController = {
  validate,
  createUser,
  getUsers,
  getUser,
  updateUser,
  getCreatedEvents,
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
    case 'getCreatedEvents':
      return [
        param('id')
          .exists()
          .bail()
          .isInt()
          .bail()
          .custom(checkUserExists)
          .bail(),
      ];
  }
}

async function createUser(req, res, next) {
  try {
    const newUser = req.body;

    if (req.body.ResidenceId) {
      const residence = await db.Residence.findByPk(req.body.ResidenceId);
      if (!residence) {
        const error = new Error('Residence Id provided was not found.');
        error.statusCode = 404;
        throw error;
      }
    }

    if (req.body.SchoolId) {
      const school = await db.School.findByPk(req.body.SchoolId);
      if (!school) {
        const error = new Error('School Id provided was not found.');
        error.statusCode = 404;
        throw error;
      }
    }

    const userType = await db.UserType.findByPk(req.body.UserTypeId);
    if (!userType) {
      const error = new Error('User Type Id provided was not found.');
      error.statusCode = 404;
      throw error;
    }

    const createdUser = await db.User.create(newUser);
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
    const users = await db.User.findAll();
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
    const user = await db.User.findByPk(req.params.id);
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
    const user = await db.User.findByPk(req.params.id);
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

async function getCreatedEvents(req, res, next) {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
      const error = new Error(`Errors in request input.`);
      error.statusCode = 500;
      error.data = { errors: result.errors };
      throw error;
    }
    const events = await req.User.getCreatorUser();

    return res.json({
      message: 'Created events successfully fetched.',
      data: { events },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = userController;
