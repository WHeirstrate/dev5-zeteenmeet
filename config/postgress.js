const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

pg.schema.dropTableIfExists('users');

async () => {
  try {
    await db.schema.dropTableIfExists('users');
    await db.schema.withSchema('public').createTable('users', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl.string('mail').notNullable();
      tbl.double('payed').notNullable().defaultTo(0.00);
      tbl.double('consumed').notNullable().defaultTo(0.00);
      tbl.timestamps();
    });
    console.log('Created users table!');
    await db.schema.withSchema('public').createTable('organisations', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl.double('rate').notNullable().defaultTo(0.50);
    });
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = pg;