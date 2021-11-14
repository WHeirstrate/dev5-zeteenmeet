const migrate = require('./migrate')
const seed = require('./seed');
const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://test:test@localhost:5432/database',
  searchPath: ['knex', 'public'],
});

(async () => {
  await migrate.createDbTables(pg);
  await seed.seedDatabase(pg);
})();

module.exports = pg;