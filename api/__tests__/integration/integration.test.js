const app = require('../../server');
const supertest = require('supertest');
const PG = require('../../config/postgress')
const request = supertest(app);

describe('TESTING', () => {
  it('GET / endpoint', (done) => {
    request.get('/').expect(200).end(() => done());
  });
  it('GET /users endpoint', (done) => {
    request.get('/users').expect(200).then(() => {
      done();
    });
  });
});