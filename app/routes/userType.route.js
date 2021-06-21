const express = require('express');
const router = express.Router();

const { userTypeController } = require('../controllers');
const { validate, createUserType, getUserTypes, updateUserType } =
  userTypeController;

router.post('/', validate('createUserType'), createUserType);
router.get('/', getUserTypes);
router.get('/:id', getUserType);

module.exports = router;
