const express = require('express');
const router = express.Router();

const { userTypeController } = require('../controllers');
const { validate, createUserType, getUserType, getUserTypes, updateUserType } =
  userTypeController;

router.post('/', validate('createUserType'), createUserType);
router.get('/', getUserTypes);
router.get('/:id', getUserType);
router.put('/:id', validate('updateUserType'), updateUserType);

module.exports = router;
