const express = require('express');
const router = express.Router();

const { residenceController } = require('../controllers');
const { validate, createResidence } = residenceController;

router.post('/', validate('createResidence'), createResidence);

module.exports = router;
