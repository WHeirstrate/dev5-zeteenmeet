require("dotenv").config();
const MIGRATE = require("./migrate");
const SEED = require("./seed");
const PG = require("knex")({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : "postgres://test:test@localhost:5432/database",
  searchPath: ["knex", "public"],
});

(async () => {
  await MIGRATE.createDbTables(PG);
  //await SEED.seedDatabase(pg);
})();

module.exports = PG;
