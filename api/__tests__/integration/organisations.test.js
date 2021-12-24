const APP = require("../../server");
const SUPERTEST = require("supertest");
const PG = require("../../config/postgress");
const REQUEST = SUPERTEST(APP);

const organisation1 = {
  name: "Erasmus",
  rate: 0.67,
};

const organisation2 = {
  name: "Scoutte",
  rate: 0.5,
};

beforeAll(async () => {
  // Add one organisationn to the database everytime the test is run
  await PG("organisations").insert(organisation1);
  await PG("organisations").insert({
    name: "Scoutte",
  });
});
describe('Endpoint "/organisations"', () => {
  //-----------
  //--- GET ---
  //-----------
  //#region
  it("should reach /organisations endpoint", (done) => {
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

  it("should return the correct organisations with correct properties", (done) => {
    REQUEST.get("/organisations")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0] && res.body[1]).toHaveProperty("id");
          expect(res.body[0] && res.body[1]).toHaveProperty("name");
          expect(res.body[0] && res.body[1]).toHaveProperty("rate");
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should return the correct organisations with correct properties", (done) => {
    REQUEST.get("/organisations")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0].name).toEqual("EHB");
          expect(res.body[0].rate).toEqual(0.67);

          expect(res.body[1].name).toEqual(organisation2.name);
          expect(res.body[1].rate).toEqual(organisation2.rate);
          done();
        } catch (err) {
          done(err);
        }
      });
  });
});

afterAll(async () => {
  try {
    PG("organisations").select("*").del();
    PG.destroy();
  } catch (err) {
    console.log(err);
  }
});
