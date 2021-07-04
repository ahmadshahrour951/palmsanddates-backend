const db = require('../../db/models');

const checkResidenceExists = async (value, { req, location, path }) => {
  const residence = await db.Residence.findByPk(value);
  return residence !== undefined && residence !== null;
};

module.exports = checkResidenceExists;
