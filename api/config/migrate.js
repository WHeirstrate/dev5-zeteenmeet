/**
 * Migrate (create) the required tables in the Postgres database. The created tables are
 * 'users' and 'orgaisations'.
 * 
 * They will not be seeded.
 * @param {*} pg - A postgres connection instance.
 */
async function createDbTables(pg) {
  console.log('migration started');
  try {
    await pg.schema.dropTableIfExists('users');
    await pg.schema.withSchema('public').createTable('users', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl.string('mail').notNullable();
      tbl.string('password').notNullable();
      tbl.double('payed').notNullable().defaultTo(0.00);
      tbl.double('consumed').notNullable().defaultTo(0.00);
      tbl.timestamps();
    });
    console.log('Created users table!');

    await pg.schema.dropTableIfExists('organisations');
    await pg.schema.withSchema('public').createTable('organisations', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl.double('rate').notNullable().defaultTo(0.50);
    });
    console.log('Created organisations table!');

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  createDbTables
}