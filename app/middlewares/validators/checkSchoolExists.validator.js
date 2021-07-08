const db = require('../../db/models');

const checkSchoolExists = async (value, { req, location, path }) => {
  const school = await db.School.findByPk(value);
  const isValid = school !== undefined && school !== null;

  if (!isValid) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  req.School = school;
  return isValid;
};

module.exports = checkSchoolExists;
