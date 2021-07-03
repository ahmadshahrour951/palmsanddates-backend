const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

const event1 = {
  id: 1,
  name: 'Running',
  startTime: '2021-08-02T03:00:00.000Z',
  endTime: '2021-08-02T04:00:00.000Z',
  CreatorUserId: 1,
  ResidenceId: 1,
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};

describe('Fetch events test', async () => {
  it('should fetch all events', async () => {
    const { body, status } = await request(app).get('/events');
    const { data } = body;
    const { events } = data;

    expect(status).to.equal(200);
    expect(events).to.be.an('array').to.include.deep.members([event1]);
  });

  it('should show one specific event', async () => {
    const { body, status } = await request(app).get('/events/1');
    const { data } = body;
    const { event } = data;

    expect(status).to.equal(200);
    expect(event).to.be.an('object').to.eql(event1);
  });
});
