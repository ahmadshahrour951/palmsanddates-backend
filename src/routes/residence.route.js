const express = require('express');
const router = express.Router();

const { residenceController } = require('../controllers/index.js');
const { validateRules } = require('../middlewares/validators/index.js');
const {
  validate,
  createResidence,
  getResidences,
  getResidence,
  updateResidence,
  getEvents,
} = residenceController;

router.post('/', validate('createResidence'), validateRules, createResidence);
router.get('/', getResidences);
router.get('/:id', getResidence);
router.put('/:id', validate('updateResidence'), validateRules, updateResidence);

router.get('/:id/events', validate('getEvents'), validateRules, getEvents);

module.exports = router;
