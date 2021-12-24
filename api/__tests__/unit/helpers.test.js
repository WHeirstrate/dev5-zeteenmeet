const HELPERS = require("../../helpers/helper");

const body1 = {
  name: "TestUser",
  email: "test@mail.be",
  password: "test",
};

describe("Check ADD user request body", () => {
  it("should check the request name", (done) => {
    expect(HELPERS.checkName(body1.name)).toBeTruthy();
    expect(HELPERS.checkName("")).toBeFalsy();
    expect(HELPERS.checkName()).toBeFalsy();
    done();
  });
  it("should check the request email", (done) => {
    expect(HELPERS.checkEmail(body1.email)).toBeTruthy();
    expect(HELPERS.checkEmail("testmail.be")).toBeFalsy();
    expect(HELPERS.checkEmail("test@mailbe")).toBeFalsy();
    expect(HELPERS.checkEmail("testmail")).toBeFalsy();
    expect(HELPERS.checkEmail()).toBeFalsy();
    done();
  });
  it("should check the request password", (done) => {
    expect(HELPERS.checkPassword(body1.password)).toBeTruthy();
    expect(HELPERS.checkPassword("")).toBeFalsy();
    expect(HELPERS.checkPassword()).toBeFalsy();
    done();
  });
  it("should check the request body", (done) => {
    expect(HELPERS.checkAddUserBody(body1)).toBeTruthy();
    expect(HELPERS.checkAddUserBody(undefined)).toBeFalsy();
    expect(HELPERS.checkAddUserBody()).toBeFalsy();
    done();
  });
});
