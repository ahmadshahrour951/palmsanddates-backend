const checkParticipantExists= async (value, { req, location, path }) => {
  const event = req.Event;
  const participants = await event.getUsers();

  let isValid = false;

  for (let participant of participants) {
    if (participant.id === req.User.id) isValid = true;
  }

  if (!isValid) {
    const error = new Error('User is already a participant of the event.');
    throw error;
  }

  return isValid;
};

module.exports = checkParticipantExists;
