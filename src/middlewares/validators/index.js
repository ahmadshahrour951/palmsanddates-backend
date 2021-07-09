const checkUserExists = require('./checkUserExists.validator');
const checkSchoolExists = require('./checkSchoolExists.validator');
const checkEventExists = require('./checkEventExists.validator');
const checkEndTime = require('./checkEndTime.validator');
const checkParticipantDuplicate = require('./checkParticipantDuplicate.validator');
const checkParticipantExists = require('./checkParticipantExists.validator');
const checkResidenceExists = require('./checkResidenceExists.validator');
const validateRules = require('./validateRules');

module.exports = {
  checkUserExists,
  checkSchoolExists,
  checkEndTime,
  checkEventExists,
  checkParticipantDuplicate,
  checkParticipantExists,
  checkResidenceExists,
  validateRules,
};
