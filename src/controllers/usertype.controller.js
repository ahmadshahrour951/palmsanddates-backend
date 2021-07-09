const { body } = require('express-validator');

const db = require('../db/models/index.js');

const userTypeController = {
  validate,
  createUserType,
  getUserTypes,
  getUserType,
  updateUserType,
};

function validate(method) {
  switch (method) {
    case 'createUserType':
      return [body('name').exists().notEmpty().isString().trim()];
    case 'updateUserType':
      return [body('name').optional().isString().trim()];
  }
}

async function createUserType(req, res, next) {
  try {
    const newUserType = req.body;
    const createdUserType = await db.UserType.create(newUserType);
    return res.status(201).json({
      message: 'User Type created successfully.',
      data: {
        id: createdUserType.id,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getUserTypes(req, res, next) {
  try {
    const userTypes = await db.UserType.findAll();
    return res.status(200).json({
      message: 'User types successfully fetched.',
      data: { userTypes },
    });
  } catch (err) {
    next(err);
  }
}

async function getUserType(req, res, next) {
  try {
    const userType = await db.UserType.findByPk(req.params.id);
    if (!userType) {
      const error = new Error('User type not found.');
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      message: 'User type successfully fetched.',
      data: { userType },
    });
  } catch (err) {
    next(err);
  }
}

async function updateUserType(req, res, next) {
  try {
    const userType = await db.UserType.findByPk(req.params.id);
    if (!userType) {
      const error = new Error('User type not found.');
      error.statusCode = 404;
      throw error;
    }

    await userType.update(req.body);
    return res.status(204).json({ message: 'Successfully updated user type.' });
  } catch (err) {
    next(err);
  }
}

module.exports = userTypeController;
