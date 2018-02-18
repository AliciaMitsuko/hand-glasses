const app = require('../../app');
const request = require('supertest');
const service = require('../../services/dangers.service');

describe('test danger controller error', () => {
  test('bad get nearby request', () => {
    return request(app).get('/api/dangers').then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('test danger controller success', () => {
  beforeAll(() => {
    service.geoLocateDangers = function(){ };
  });

  test('good get nearby request', () => {
    return request(app).get('/api/dangers?lat=0&long=0&distance=1').then((response) => {
      expect(response.status).toBe(200);
    });
  });



});
