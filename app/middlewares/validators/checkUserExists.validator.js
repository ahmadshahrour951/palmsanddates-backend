const db = require('../../models');

const checkUserExists = async (value, { req, location, path }) => {
  const user = await db.users.findByPk(value);
  const isValid = user !== undefined && user !== null;

  if (!isValid) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  req.User = user;
  return isValid;
};

module.exports = checkUserExists;
