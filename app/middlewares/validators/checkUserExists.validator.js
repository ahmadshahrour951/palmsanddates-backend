const db = require('../../models');

const checkUserExists = async (value, { req, location, path })  => {
  const user = await db.users.findByPk(value);
  return user !== undefined && user !== null
};

module.exports = checkUserExists;
