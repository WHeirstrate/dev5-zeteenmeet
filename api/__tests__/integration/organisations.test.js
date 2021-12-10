const APP = require("../../server");
const SUPERTEST = require("supertest");
const PG = require("../../config/postgress");
const REQUEST = SUPERTEST(APP);

const organisation1 = {
  id: 1,
  name: "EHB",
  rate: 0.67,
};

const organisation2 = {
  id: 2,
  name: "Scouts",
  rate: 0.5,
};
beforeAll(async () => {
  // Add one organisationn to the database everytime the test is run
  await PG("organisations").insert(organisation1);
  await PG("organisations").insert({
    id: 2,
    name: "Scouts",
  });
});
describe('Endpoint "/organisations"', () => {
  //-----------
  //--- GET ---
  //-----------
  it("should reach GET /users endpoint", (done) => {
    REQUEST.get("/organisations")
      .expect(200)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  it("should return exactly 2 organisations", (done) => {
    REQUEST.get("/organisations")
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
  // The collumn ID should have been added by PostgreSQL.
  it("should return the correct organisations with added data", (done) => {
    REQUEST.get("/organisations")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toEqual(organisation1);
          expect(res.body[1]).toMatchObject({ rate: 0.5 });
          expect(res.body[1]).toEqual(organisation2);
          done();
        } catch (err) {
          done(err);
        }
      });
  });
});

afterAll(async () => {
  await PG("organisations").del();
});
