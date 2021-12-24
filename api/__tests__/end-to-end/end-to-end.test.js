const APP = require("../../server");
const SUPERTEST = require("supertest");
const PG = require("../../config/postgress");
const REQUEST = SUPERTEST(APP);

beforeAll(async () => {
  // Add one user and one organisation to the database everytime the test is run
  await PG("users").insert({
    name: "Billy Elliot",
    email: "billy.elliot@gmail.com",
    password: "Billy123",
  });
  await PG("organisations").insert({
    name: "Theater",
  });
});
describe("CRUD user", () => {
  //#region
  it("should GET all users", (done) => {
    REQUEST.get("/users")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toHaveProperty("name");
          expect(res.body[0]).toHaveProperty("email");
          expect(res.body[0]).toHaveProperty("password");
          expect(res.body[0]).toHaveProperty("payed");
          expect(res.body[0]).toHaveProperty("consumed");
          expect(res.body[0]).toHaveProperty("created_at");
          expect(res.body[0]).toHaveProperty("updated_at");
          expect(res.body[0]).toHaveProperty("uuid");
          expect(res.body[0].name).toEqual("Billy Elliot");
          expect(res.body[0].email).toEqual("billy.elliot@gmail.com");
          expect(res.body[0].password).toEqual("Billy123");
          expect(res.body[0].created_at).toEqual(null);
          expect(res.body[0].updated_at).toEqual(null);
          expect(res.body[0].consumed).toEqual(0);
          expect(res.body[0].payed).toEqual(0);
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should POST a new user", (done) => {
    REQUEST.post("/users")
      .send({
        id: 400,
        name: "Tom Dice",
        email: "meandmyguitar@hotmail.com",
        password: "meandmyguitar03",
      })
      .expect(200)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should PUT the new user's consumed and payed", (done) => {
    REQUEST.get("/users/400")
      .send({
        consumed: 300,
        payed: 496,
      })
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0].consumed).toEqual(300);
          expect(res.body[0].payed).toEqual(496);
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should DELETE the new organisation", (done) => {
    REQUEST.get("/users/400")
      .expect(200)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  //#endregion
});

describe("CRUD organisations", () => {
  //#region
  it("should GET all organisations", (done) => {
    REQUEST.get("/organisations")
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("name");
          expect(res.body[0]).toHaveProperty("rate");
          expect(res.body[0]).toEqual("Theater");
          expect(res.body[0]).toEqual(0.5);
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should POST a new organisation", (done) => {
    REQUEST.post("/organisations")
      .send({
        id: 400,
        name: "Windsor Castle",
        rate: "500",
      })
      .expect(200)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should PUT the new user's rate", (done) => {
    REQUEST.get("/organisations/400")
      .send({
        rate: 300,
      })
      .expect(200)
      .end((err, res) => {
        try {
          expect(res.body[0]).toHaveProperty("rate");
          expect(res.body[0]).toEqual(300);
          done();
        } catch (err) {
          done(err);
        }
      });
  });

  it("should DELETE the new organisation", (done) => {
    REQUEST.get("/organisations/400")
      .expect(200)
      .end((err, res) => {
        try {
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  //#endregion
});

afterAll(async () => {
  try {
    PG("users").select("*").del();
    PG("organisations").select("*").del();
    PG.destroy();
  } catch (err) {
    console.log(err);
  }
});
