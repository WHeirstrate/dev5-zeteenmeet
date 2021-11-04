const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public']
});

pg.schema.dropTableIfExists('users');

pg.schema.createTable('users', (tbl) => {
  tbl.increments('id').primary();
  tbl.string('name').notNullable();
  tbl.string('mail').notNullable();
  tbl.double('payed').notNullable().defaultTo(0.00);
  tbl.double('consumed').notNullable().defaultTo(0.00);
  tbl.timestamps();
});

pg.schema.createTable('organisations', (tbl) => {
  tbl.increments('id').primary();
  tbl.string('name').notNullable();
  tbl.double('rate').notNullable().defaultTo(0.50);
})

module.exports = pg;