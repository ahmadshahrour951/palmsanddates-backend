const express = require('express');
const router = express.Router();

const { residenceController } = require('../controllers');
const { validate, createResidence, getResidences } = residenceController;

router.post('/', validate('createResidence'), createResidence);
router.get('/', getResidences);

module.exports = router;
