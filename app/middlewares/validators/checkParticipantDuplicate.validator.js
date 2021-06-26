const db = require('../../models');

const checkParticipantDuplicate = async (value, { req, location, path }) => {
  const event = req.Event;
  const participants = await event.getUsers();

  let isValid = true;

  for (let participant of participants) {
    if (participant.id == req.User.id) isValid = false;
  }

  if (!isValid) {
    const error = new Error('User is already a participant of the event.');
    throw error;
  }

  return isValid;
};

module.exports = checkParticipantDuplicate;
