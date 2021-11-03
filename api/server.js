const express = require('express');
const http = require('http');
const { knex } = require('knex');

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public']
});
const app = express();
http.Server(app);

// -------------------
// --- POSTGRESSQL ----
// -------------------

knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.string('name');
  table.double('payed');
  table.double('consumed').defaultTo(0.00);
  table.timestamps();
});

const newUserId = knex.insert({name: 'Sniikers', payed: 20.80}).into('users').returning('id');
console.log(newUserId);

// -------------------
// ------- API -------
// -------------------

app.get('/', (req, res) => {
  res.send('Hello world');

})

app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});