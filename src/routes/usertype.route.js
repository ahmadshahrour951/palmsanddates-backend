const express = require('express');
const router = express.Router();

const { usertypeController } = require('../controllers/index.js');
const { validateRules } = require('../middlewares/validators/index.js');
const { validate, createUserType, getUserType, getUserTypes, updateUserType } =
  usertypeController;

router.post('/', validate('createUserType'), validateRules, createUserType);
router.get('/', getUserTypes);
router.get('/:id', getUserType);
router.put('/:id', validate('updateUserType'), validateRules, updateUserType);

module.exports = router;
