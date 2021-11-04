const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public']
});

pg.schema.dropTableIfExists('users');

pg.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('mail').notNullable();
  table.double('payed').notNullable().defaultTo(0.00);
  table.double('consumed').notNullable().defaultTo(0.00);
  table.timestamps();
});

module.exports = pg;