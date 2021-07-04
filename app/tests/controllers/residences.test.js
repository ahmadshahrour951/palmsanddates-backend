const chai = require('chai');
const request = require('supertest');
const app = require('../../../server');

const { expect } = chai;

const residence1 = {
  id: 1,
  name: 'Nob Hill Guesthouse by FOUND',
  latitude: 37.79187911885349,
  longitude: -122.40843300211873,
  state: 'CA',
  city: 'San Francisco',
  street: '851 California St',
  postalCode: '94108',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};
const residence2 = {
  id: 2,
  name: 'Aida Plaza',
  latitude: 37.780255986301135,
  longitude: -122.41175376131187,
  state: 'CA',
  city: 'San Francisco',
  street: '1087 Market St',
  postalCode: '94103',
  createdAt: '1995-11-18T00:00:00.000Z',
  updatedAt: '1995-11-18T00:00:00.000Z',
};

describe('Fetch residences test', async () => {
  it('should show all residences', async () => {
    const { body, status } = await request(app).get('/residences');
    const { data } = body;
    const { residences } = data;

    expect(status).to.equal(200);
    expect(residences)
      .to.be.an('array')
      .to.include.deep.members([residence1, residence2]);
  });

  it('should show one specific residence', async () => {
    const { body, status } = await request(app).get('/residences/1');
    const { data } = body;
    const { residence } = data;

    expect(status).to.equal(200);
    expect(residence).to.be.an('object').to.eql(residence1);
  });
});
