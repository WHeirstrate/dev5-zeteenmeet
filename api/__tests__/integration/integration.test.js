const APP = require('../../server');
const SUPERTEST = require('supertest');
const PG = require('../../config/postgress')
const REQUEST = SUPERTEST(APP);

// The users that will be inserted into the DB.
const user1 = {
  id: 1,
  name: 'Wouter',
  mail: 'wouter.heirstrate@student.ehb.be',
  password: 'HeirstrateWouter12',
  consumed: 0,
  payed: 0,
  created_at: null,
  updated_at: null,

};

const user2 = {
  id: 2,
  name: 'Charel',
  mail: 'Chareltje007@student.ehb.be',
  password: 'Chareltje007',
  consumed: 0,
  payed: 0,
  created_at: null,
  updated_at: null,
}

beforeAll(async () => {
  // Add two users to the database everytime the test is run
  await PG('users').insert({
    id: 1,
    name: 'Wouter',
    mail: 'wouter.heirstrate@student.ehb.be',
    password: 'HeirstrateWouter12',
  });
  await PG('users').insert({
    id: 2,
    name: 'Charel',
    mail: 'Chareltje007@student.ehb.be',
    password: 'Chareltje007',  
  });
});

describe('Endpoint "/"', () => {
  it('should GET / endpoint', (done) => {
    REQUEST.get('/').expect(200).end(() => {
      done();
    });
  });
});

describe('Endpoint "/users"', () => {
  it('should GET /users endpoint', (done) => {
    REQUEST.get('/users').expect(200).end(() => {
      done();
    });
  });
  it('should return exactly 2 users', (done) => {
    REQUEST.get('/users').expect(200).end((err, res) => {
      try{
        expect(res.body.length).toBe(2);
        done();
      } catch(err) {
        done(err);
      }
    });
  });
  it('should return the correct users with added data', (done) => {
    REQUEST.get('/users').expect(200).end((err, res) => {
      try {
        expect(res.body[0]).toEqual(user1);
        expect(res.body[1]).toEqual(user2);
        done();
      } catch(err) {
        done(err);
      }
    });
  });
});

afterAll(async () => {
  await PG('users').del();
})