const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  return res.status(201).json({ message: 'Hello, World!' });
});

module.exports = router;
