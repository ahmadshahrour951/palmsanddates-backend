const { body } = require('express-validator');

const db = require('../models');

const userTypeController = {
  validate,
  createUserType,
  getUserTypes,
};

function validate(method) {
  switch (method) {
    case 'createUserType':
      return [body('name').exists().notEmpty().isString().trim()];
  }
}

async function createUserType(req, res, next) {
  try {
    const newUserType = req.body;
    const createdUserType = await db.userTypes.create(newUserType);
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
    const userTypes = db.userTypes.findAll();
    return res.status(200).json({
      message: 'User types successfully fetched.',
      data: { userTypes },
    });
  } catch (err) {
    next(err);
  }
}
module.exports = userTypeController;
