/**
 * Migrate (create) the required tables in the Postgres database. The created tables are
 * 'users' and 'orgaisations'.
 * 
 * They will not be seeded.
 * @param {*} PG - A postgres connection instance.
 */
async function createDbTables(PG) {
  //console.log('migration started');
  try {
    PG.schema.hasTable('users').then(async exists => {
      if (!exists) {
        return await PG.schema.withSchema('public').createTable('users', (tbl) => {
          tbl.increments('id').primary();
          tbl.string('name').notNullable().unique({
            indexName:'user_unique_name',
            deferrable:'immediate'
          });
          tbl.string('email').unique().notNullable().unique({
            indexName:'user_unique_email',
            deferrable:'immediate'
          });
          tbl.string('password').notNullable();
          tbl.double('payed').notNullable().defaultTo(0.00);
          tbl.double('consumed').notNullable().defaultTo(0.00);
          tbl.timestamps();
        });
      }
    });
    //console.log('Created users table!');
    PG.schema.hasTable('organisations').then(async exists => {
      if (!exists) {
        return await PG.schema.withSchema('public').createTable('organisations', (tbl) => {
          tbl.increments('id').primary();
          tbl.string('name').notNullable().unique({
            indexName:'organisation_unique_email',
            deferrable:'immediate'
          });
          tbl.double('rate').notNullable().defaultTo(0.50);
        });
      }
    })
    //console.log('Created organisations table!');

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  createDbTables
}