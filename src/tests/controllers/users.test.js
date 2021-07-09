const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

const user1 = {
  id: 1,
  firstName: 'Ahmed',
  lastName: 'Shahrour',
  email: 'ahmed.shahrour@students.dominican.edu',
  UserTypeId: 1,
  ResidenceId: 1,
  SchoolId: 1,
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const user2 = {
  id: 2,
  firstName: 'Alisher',
  lastName: 'Begmatov',
  email: 'alisher.begmatov@students.dominican.edu',
  UserTypeId: 1,
  ResidenceId: 1,
  SchoolId: 1,
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};

describe('Fetch users test', async () => {
  it('should show all users', async () => {
    const { body, status } = await request(app).get('/users');
    const { data } = body;
    const { users } = data;

    expect(status).to.equal(200);
    expect(users).to.be.an('array').to.include.deep.members([user1, user2]);
  });

  it('should show one specific user', async () => {
    const { body, status } = await request(app).get('/users/1');
    const { data } = body;
    const { user } = data;

    expect(status).to.equal(200);
    expect(user).to.be.an('object').to.eql(user1);
  });
});
