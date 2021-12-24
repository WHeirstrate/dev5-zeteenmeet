/**
 * Migrate (create) the required tables in the Postgres database. The created tables are
 * 'users' and 'orgaisations'.
 *
 * They will not be seeded.
 * @param {*} PG - A postgres connection instance.
 */
async function createDbTables(PG) {
  try {
    PG.schema.hasTable("users").then(async (exists) => {
      if (!exists) {
        return await PG.schema
          .withSchema("public")
          .createTable("users", (tbl) => {
            tbl.increments("id").primary();
            tbl
              .uuid("uuid")
              .defaultTo(PG.raw("gen_random_uuid()"))
              .notNullable();
            //.references("id")
            //.inTable("organisations")
            //.onDelete("RESTRICT");
            tbl.string("name").notNullable();
            tbl.string("email").unique().notNullable();
            tbl.string("password").notNullable();
            tbl.double("payed").notNullable().defaultTo(0.0);
            tbl.double("consumed").notNullable().defaultTo(0.0);
            tbl.timestamps();
          });
      }
    });
    PG.schema.hasTable("organisations").then(async (exists) => {
      if (!exists) {
        return await PG.schema
          .withSchema("public")
          .createTable("organisations", (tbl) => {
            tbl.increments("id").primary();
            tbl.string("name").notNullable();
            tbl.double("rate").notNullable().defaultTo(0.5);
          });
      }
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  createDbTables,
};
