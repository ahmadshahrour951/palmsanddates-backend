const db = require('../../db/models');

const checkSchoolExists = async (value, { req, location, path }) => {
  const school = await db.School.findByPk(value);
  return school !== undefined && school !== null;
};

module.exports = checkSchoolExists;
