'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('residences', [
     {
       id: 1,
       name: 'Nob Hill Guesthouse by FOUND',
       latitude: 37.79187911885349,
       longitude: -122.40843300211873,
       state: 'CA',
       city: 'San Francisco',
       street: '851 California St',
       postal_code: '94108',
       created_at: new Date('1995-11-18'),
       updated_at: new Date('1995-11-18'),
     },
     {
       id: 2,
       name: 'Aida Plaza',
       latitude: 37.780255986301135,
       longitude: -122.41175376131187,
       state: 'CA',
       city: 'San Francisco',
       street: '1087 Market St',
       postal_code: '94103',
       created_at: new Date('1995-11-18'),
       updated_at: new Date('1995-11-18'),
     },
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('residences', null, {});
  }
};
