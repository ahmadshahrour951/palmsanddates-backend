const express = require('express');
const router = express.Router();

const { residenceController } = require('../controllers');
const {
  validate,
  createResidence,
  getResidences,
  getResidence,
  updateResidence,
} = residenceController;

router.post('/', validate('createResidence'), createResidence);
router.get('/', getResidences);
router.get('/:id', getResidence);
router.put('/:id', validate('updateResidence'), updateResidence)

module.exports = router;
