const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

describe('Fetch Events', async () => {
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

describe('Create Events', async () => {
  const successEvent = {
    id: 2,
    name: 'Pancakes and Eggs',
    startTime: new Date('2021-08-01 11:00:00'),
    endTime: new Date('2021-08-01 13:00:00'),
    CreatorUserId: 1,
    ResidenceId: 1,
  };

  const failEvent1 = {
    id: 3,
    name: 'Pancakes and Eggs',
    startTime: new Date('2021-08-01 13:00:00'),
    endTime: new Date('2021-08-01 11:00:00'),
    CreatorUserId: 1,
    ResidenceId: 1,
    createdAt: new Date('1995-11-18'),
    updatedAt: new Date('1995-11-18'),
  };

  const failEvent2 = {
    name: 'Pancakes and Eggs',
    startTime: new Date('2021-08-01 11:00:00'),
    endTime: new Date('2021-08-01 13:00:00'),
    ResidenceId: 1,
    createdAt: new Date('1995-11-18'),
    updatedAt: new Date('1995-11-18'),
  };

  const failEvent3 = {
    name: 'Pancakes and Eggs',
    startTime: new Date('2021-08-01 11:00:00'),
    endTime: new Date('2021-08-01 13:00:00'),
    CreatorUserId: 1,
    createdAt: new Date('1995-11-18'),
    updatedAt: new Date('1995-11-18'),
  };

  const failEvent4 = {
    name: 'Pancakes and Eggs',
    endTime: new Date('2021-08-01 13:00:00'),
    CreatorUserId: 1,
    ResidenceId: 1,
    createdAt: new Date('1995-11-18'),
    updatedAt: new Date('1995-11-18'),
  };

  it('should successfully create an event', async () => {
    const { body, status } = await request(app)
      .post('/events')
      .send(successEvent);
    const { message, data } = body;
    const { id } = data;

    expect(status).to.equal(201);
    expect(message).to.be.a('string').to.equal('Event successfully created.');
    expect(id).to.be.a('number').to.equal(2);
  });

  it('should fail to create an event - No startTime', async () => {
    const { body, status } = await request(app)
      .post('/events')
      .send(failEvent4);
    const { data } = body;
    const { errors } = data;

    expect(status).to.equal(500);
    expect(errors)
      .to.be.an('array')
      .to.include.deep.members([
        {
          msg: 'startTime must be provided.',
          param: 'startTime',
          location: 'body',
        },
      ]);
  });

  it('should fail to create an event - startTime after endTime', async () => {
    const { body, status } = await request(app)
      .post('/events')
      .send(failEvent1);
    const { data } = body;
    const { errors } = data;

    expect(status).to.equal(500);
    expect(errors)
      .to.be.an('array')
      .to.include.deep.members([
        {
          value: '2021-08-01T18:00:00.000Z',
          msg: 'startTime must be before endTime.',
          param: 'endTime',
          location: 'body',
        },
      ]);
  });

  it('should fail to create an event - No creator', async () => {
    const { body, status } = await request(app)
      .post('/events')
      .send(failEvent2);
    const { data } = body;
    const { errors } = data;

    expect(status).to.equal(500);
    expect(errors)
      .to.be.an('array')
      .to.include.deep.members([
        {
          msg: 'CreatorUserId must be provided.',
          param: 'CreatorUserId',
          location: 'body',
        },
      ]);
  });

  it('should fail to create an event - No residence', async () => {
    const { body, status } = await request(app)
      .post('/events')
      .send(failEvent3);
    const { data } = body;
    const { errors } = data;

    expect(status).to.equal(500);
    expect(errors)
      .to.be.an('array')
      .to.include.deep.members([
        {
          msg: 'ResidenceId must be provided.',
          param: 'ResidenceId',
          location: 'body',
        },
      ]);
  });
});
