const APP = require("../../server");
const SUPERTEST = require("supertest");
const PG = require("../../config/postgress");
const REQUEST = SUPERTEST(APP);

/**
 * Some users that will be inserted into the DB.
 */
const user1 = {
  name: "Wouter",
  email: "wouter.heirstrate@student.ehb.be",
  password: "HeirstrateWouter12",
  consumed: 5,
  payed: 12,
  created_at: null,
  updated_at: null,
};

const user2 = {
  name: "Charel",
  email: "Chareltje007@student.ehb.be",
  password: "Chareltje007",
  consumed: 0,
  payed: 0,
  created_at: null,
  updated_at: null,
};

const user3 = {
  name: "Geert",
  email: "geert@mail.be",
  password: "GeertIsDeBeste1",
};

/**
 * Add two users to the database everytime the test is ran, after clearing the
 * database of leftover users
 */
beforeAll(async () => {
  await PG("users").del();
  await PG("users").insert(user1);
  await PG("users").insert({
    name: "Charel",
    email: "Chareltje007@student.ehb.be",
    password: "Chareltje007",
  });
});

describe('Endpoint "/"', () => {
  it("should reach GET / endpoint", (done) => {
    REQUEST.get("/")
      .expect(200)
      .end(() => {
        try {
          done();
        } catch (err) {
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
  it("should reach GET /users endpoint", (done) => {
    REQUEST.get("/users")
      .expect(200)
      .end(() => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should return exactly 2 users", (done) => {
    REQUEST.get("/users")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body.length).toBe(2);
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should return the correct users with correct properties", (done) => {
    REQUEST.get("/users")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0] && res.body[1]).toHaveProperty("id");
          expect(res.body[0] && res.body[1]).toHaveProperty("name");
          expect(res.body[0] && res.body[1]).toHaveProperty("email");
          expect(res.body[0] && res.body[1]).toHaveProperty("password");
          expect(res.body[0] && res.body[1]).toHaveProperty("consumed");
          expect(res.body[0] && res.body[1]).toHaveProperty("payed");
          expect(res.body[0] && res.body[1]).toHaveProperty("created_at");
          expect(res.body[0] && res.body[1]).toHaveProperty("updated_at");
          expect(res.body[0] && res.body[1]).toHaveProperty("uuid");

          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should return the correct users with correct data", (done) => {
    REQUEST.get("/users")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0].name).toEqual("Wouter");
          expect(res.body[0].email).toEqual("wouter.heirstrate@student.ehb.be");
          expect(res.body[0].password).toEqual("HeirstrateWouter12");
          expect(res.body[0].consumed).toEqual(5);
          expect(res.body[0].payed).toEqual(12);

          expect(res.body[1].name).toEqual(user2.name);
          expect(res.body[1].email).toEqual(user2.email);
          expect(res.body[1].password).toEqual(user2.password);
          expect(res.body[1].consumed).toEqual(user2.consumed);
          expect(res.body[1].payed).toEqual(user2.payed);

          done();
        } catch (err) {
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
  it("should reach POST /users endpoint", (done) => {
    REQUEST.post("/users")
      .expect(400)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  it("should add user", (done) => {
    REQUEST.post("/users")
      .send(user3)
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toHaveProperty("consumed");
          expect(res.body[0]).toHaveProperty("payed");
          expect(res.body[0]).toHaveProperty("created_at");
          expect(res.body[0]).toHaveProperty("updated_at");
          expect(res.body[0].name).toEqual("Geert");
          expect(res.body[0].email).toEqual("geert@mail.be");
          expect(res.body[0].password).toEqual("GeertIsDeBeste1");
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  //#endregion
});

describe('Endpoint "/users/:id"', () => {
  /**
   * -----------
   * --- PUT ---
   * -----------
   */
  //#region
  it("should reach PUT /user/1 endoint", (done) => {
    REQUEST.put("/users/1")
      .expect(401)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
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
  it("should reach DELETE /user/700 endpoint", (done) => {
    REQUEST.delete("/users/700")
      .expect(401)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  it("should delete /user/3 endpoint", (done) => {
    REQUEST.delete("/users/3")
      .expect(200)
      .end((err, res) => {
        try {
          PG("users")
            .where("id", 3)
            .then((data) => {
              expect(data).toEqual([]);
              done();
            });
        } catch (err) {
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
    PG("users").select("*").del();
    PG.destroy();
  } catch (err) {
    console.log(err);
  }
});
