const express = require('express');
const router = express.Router();

const { residenceController } = require('../controllers');
const { validate, createResidence, getResidences, getResidence } =
  residenceController;

router.post('/', validate('createResidence'), createResidence);
router.get('/', getResidences);
router.get('/:id', getResidence);

module.exports = router;
