const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

const school1 = {
  id: 1,
  name: 'Make School',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const school2 = {
  id: 2,
  name: 'Dominican University of California',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};

describe('Fetch schools test', async () => {
  it('should show all schools', async () => {
    const { body, status } = await request(app).get('/schools');
    const { data } = body;
    const { schools } = data;

    expect(status).to.equal(200);
    expect(schools)
      .to.be.an('array')
      .to.include.deep.members([school1, school2]);
  });

  it('should show one specific school', async () => {
    const { body, status } = await request(app).get('/schools/1');
    const { data } = body;
    const { school } = data;

    expect(status).to.equal(200);
    expect(school).to.be.an('object').to.eql(school1);
  });
});
