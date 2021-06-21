const { body } = require('express-validator');

const db = require('../models');

const userTypeController = {
  validate,
  createUserType,
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

module.exports = userTypeController;
