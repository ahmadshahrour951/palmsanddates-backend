const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers')

router.post('/', schoolController.createSchool);

module.exports = router;
