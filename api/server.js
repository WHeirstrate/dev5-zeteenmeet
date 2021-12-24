const EXPRESS = require("express");
//const { checkAddUserBody } = require('./config/helpers/helper');
//const PG = require('./config/postgress')
const USERROUTER = require("./routes/user.routes");
const ORGANISATIONROUTER = require("./routes/organisation.routes");

const APP = EXPRESS();

// -----------------
// -- MIDDLEWARE ---
// -----------------

APP.use(
  EXPRESS.urlencoded({
    extended: true,
  })
);
APP.use(EXPRESS.json());

// -----------------
// ---- ROUTES -----
// -----------------

/**
 * GET
 *
 * The main route of the API, this will be linked with the documentation
 * once the APP is in a further developed stadium. For now, this just
 * returns a sole sentence.
 */
APP.get("/", (req, res) => res.send("Welcome, RESTful api is running"));

APP.use("/users", USERROUTER);

// -----------------
// - ORGANISATIONS -
// -----------------

APP.use("/organisations", ORGANISATIONROUTER);

module.exports = APP;
