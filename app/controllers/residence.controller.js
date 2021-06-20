const { body } = require('express-validator');

const db = require('../models');

const residenceController = {
  validate,
  createResidence,
  getResidences,
  getResidence,
  updateResidence,
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
        body('postalCode').exists().notEmpty().isString().trim(),
      ];
    case 'updateResidence':
      return [
        body('name').optional().notEmpty().isString().trim(),
        body('latitude').optional().notEmpty().isFloat(),
        body('longitude').optional().notEmpty().isFloat(),
        body('state').optional().notEmpty().isString().trim(),
        body('city').optional().notEmpty().isString().trim(),
        body('street').optional().notEmpty().isString().trim(),
        body('postalCode').optional().notEmpty().isString().trim(),
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

async function getResidences(req, res, next) {
  try {
    const residences = await db.residences.findAll();
    return res.status(200).json({
      message: 'Residences successfully fetched.',
      data: { residences },
    });
  } catch (err) {
    next(err);
  }
}

async function getResidence(req, res, next) {
  try {
    const residence = await db.residences.findByPk(req.params.id);
    if (!residence) {
      const error = new Error('Residence not found.');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: 'Residence successfully fetched.',
      data: { residence },
    });
  } catch (err) {
    next(err);
  }
}

async function updateResidence(req, res, next) {
  try {
    const residence = await db.residences.findByPk(req.params.id);
    if (!residence) {
      const error = new Error('Residence not found.');
      error.statusCode = 404;
      throw error;
    }
    await residence.update(req.body);
    return res.status(204).json({ message: 'Successfully updated residence.' });
  } catch (err) {
    next(err);
  }
}

module.exports = residenceController;
