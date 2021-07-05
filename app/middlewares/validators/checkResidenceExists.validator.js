const db = require('../../db/models');

const checkResidenceExists = async (value, { req, location, path }) => {
  const residence = await db.Residence.findByPk(value);
  const isValid = residence !== undefined && residence !== null;

  if (!isValid) {
    const error = new Error('Residence not found');
    error.statusCode = 404;
    throw error;
  }

  req.Residence = residence;
  return isValid;
};

module.exports = checkResidenceExists;
