const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

const studentUserType = {
  id: 1,
  name: 'student',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const residentialAssistantUserType = {
  id: 2,
  name: 'residential_assistant',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const residentialAdminUserType = {
  id: 3,
  name: 'residential_admin',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const superAdminUserType = {
  id: 4,
  name: 'super_admin',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};

describe('Fetch usertypes test', async () => {
  it('should show all user types', async () => {
    const { body, status } = await request(app).get('/usertypes');
    const { data } = body;
    const { userTypes } = data;
    expect(status).to.equal(200);
    expect(userTypes)
      .to.be.an('array')
      .to.include.deep.members([
        studentUserType,
        residentialAssistantUserType,
        residentialAdminUserType,
        superAdminUserType,
      ]);
  });
});
