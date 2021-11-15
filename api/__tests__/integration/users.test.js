const APP = require('../../server');
const SUPERTEST = require('supertest');
const PG = require('../../config/postgress')
const REQUEST = SUPERTEST(APP);

/**
  * Some users that will be inserted into the DB.
  */
const user1 = {
  id: 1,
  name: 'Wouter',
  email: 'wouter.heirstrate@student.ehb.be',
  password: 'HeirstrateWouter12',
  consumed: 0,
  payed: 0,
  created_at: null,
  updated_at: null,
};

const user2 = {
  id: 2,
  name: 'Charel',
  email: 'Chareltje007@student.ehb.be',
  password: 'Chareltje007',
  consumed: 0,
  payed: 0,
  created_at: null,
  updated_at: null,
} 

const user3 = {
  id: 3,
  name: 'Geert',
  email: 'geert@mail.be',
  password: 'GeertIsDeBeste1',
}
 /** 
  * Add two users to the database everytime the test is ran, after clearing the
  * database of leftover users
  */
beforeAll(async () => {
  await PG('users').del();
  await PG('users').insert(user1);
  await PG('users').insert({
    id: 2,
    name: 'Charel',
    email: 'Chareltje007@student.ehb.be',
    password: 'Chareltje007',  
  });
});

describe('Endpoint "/"', () => {
  it('should reach GET / endpoint', (done) => {
    REQUEST
      .get('/')
      .expect(200)
      .end(() => {
        try {
          done();
        } catch(err) {
          done(err);
        }    
      });
  });
});

describe('Endpoint "/users"', () => {
  /**
   * -----------
   * --- GET ---
   * -----------
   */
  //#region 
  it('should reach GET /users endpoint', (done) => {
    REQUEST
      .get('/users')
      .expect(200)
      .end(() => {
        try {
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  it('should return exactly 2 users', (done) => {
    REQUEST
      .get('/users')
      .expect(200)
      .end((err, res) => {
        try{
          expect(res.body.length).toBe(2);
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  // The collumns 'consumed', 'payed', 'created_at' and 'updated_at' should
  // have been added by PostgreSQL.
  it('should return the correct users with added data', (done) => {
    REQUEST
      .get('/users')
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toEqual(user1);
          expect(res.body[1]).toEqual(user2);
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  //#endregion
  /**
   * -----------
   * -- POST ---
   * -----------
   */
  //#region 
  it('should reach POST /user endpoint', (done) => {
    REQUEST
      .post('/users')
      .expect(400)
      .end((err, res) => {
        try {
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  it('should add user', (done) => {
    REQUEST
      .post('/users')
      .send(user3)
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toHaveProperty('consumed');
          expect(res.body[0]).toHaveProperty('payed');
          expect(res.body[0]).toHaveProperty('created_at');
          expect(res.body[0]).toHaveProperty('updated_at');
          expect(res.body[0].name).toEqual("Geert");
          expect(res.body[0].email).toEqual("geert@mail.be");
          expect(res.body[0].password).toEqual("GeertIsDeBeste1");
          done();
        } catch(err) {
          done(err)
        }
      });
  });
  //#endregion
  /**
   * -----------
   * --- PUT ---
   * -----------
   */
  //#region 
  it('should reach PUT /user/1 endoint', (done) => {
    REQUEST
      .put('/users/1')
      .expect(401)
      .end((err, res) => {
        try {
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  //#endregion
  /**
   * -----------
   * - DELETE --
   * -----------
   */
  //#region
  it('should reach DELETE /user/700 endpoint', (done) => {
    REQUEST
      .delete('/users/700')
      .expect(401)
      .end((err, res) => {
        try {
          done();
        } catch(err) {
          done(err);
        }
      });
  });
  it('should delete /user/3 endpoint', (done) => {
    REQUEST
      .delete('/users/3')
      .expect(200)
      .end((err, res) => {
        try {
          PG('users').where('id', 3).then(data => {
            expect(data).toEqual([]);
            done()
          })
        } catch(err) {
          done(err);
        }
      });
  });
  //#endregion

});

/**
 * Delete the users-table after the test are ran.
 */
afterAll(async () => {
  try {
    PG.destroy();
  } catch (err) {
    console.log(err);
  }
});