const db = require('../../models');

const checkSchoolExists = async (value, { req, location, path }) => {
  const school = await db.schools.findByPk(value);
  return school !== undefined && school !== null;
};

module.exports = checkSchoolExists;
