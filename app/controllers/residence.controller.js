const { body } = require('express-validator');

const db = require('../models');

const residenceController = {
  validate,
  createResidence,
};

function validate(method) {
  switch (method) {
    case 'createResidence':
      return [
        body('name').exists().notEmpty().isString().trim(),
        body('latitude').exists().notEmpty().isFloat(),
        body('longitude').exists().notEmpty().isFloat(),
        body('state').exists().notEmpty().isString().trim(),
        body('city').exists().notEmpty().isString().trim(),
        body('street').exists().notEmpty().isString().trim(),
        body('postal_code').exists().notEmpty().isString().trim(),
      ];
  }
}

async function createResidence(req, res, next) {
  try {
    const newResidence = req.body;
    const createdResidence = await db.residences.create(newResidence);
    return res.status(201).json({
      message: 'Residence created successfully.',
      data: { id: createdResidence.id },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = residenceController;
