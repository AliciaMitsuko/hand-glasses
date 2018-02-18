const app = require('../../app');
const request = require('supertest');

describe('test danger controller', () => {
  test('bad get nearby request', () => {
    return request(app).get('/api/dangers').then((response) => {
      expect(response.status).toBe(400);
    });
  });
});
