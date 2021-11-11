const express = require('express');
const pg = require('../config/postgress')
const PORT = 5000 || env.process.PORT;

const app = express();

// -----------------
// -- MIDDLEWARE ---
// -----------------

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// -----------------
// ---- ROUTES -----
// -----------------

/**
 * The main route of the API, this will be linked with the documentation
 * once the app is in a further developed stadium. For now, this just
 * returns a sole sentence.
 */
app.get('/', (req, res) => {
  res.send('Welcome, RESTful api is running');
})

/**
 * Fetch all users from the 'users' table.
 */

app.get('/users', (res, req) => {
  pg.select()
    .from('users')
    .then(data => res.json(data));
})

/**
 * Fetch all organisations from the 'organisations' table.
 */

app.get('/organisations', (res, req) => {
  pg.select()
    .from('organisations')
    .then(data => res.json(data));
})

/**
 * Login with a certain user. The email must be given, as well as the password.
 * In a later stadium, the password will have to be decrypted first.
 * 
 * @param mail - The mail of the user that wants to be logged in.
 * @param password - The password that will be compared with the one fetched
 * (and later descrypted) from the database.
 */

app.post('/users/login', (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const pass = pg.where({mail: req.body.mail}).select('password');
      if (pass == req.body.password) {
        res.sendStatus(200);
      }
    } catch(err) {
      console.log(err)
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

/**
 * Add a new user to the 'users' table. Every request should contain certain
 * params, and some are optional that default to null.
 * 
 * @param name - The name of the new user that will be added
 * @param email - The email of the new user that will be added. There should
 * be a validity check added in future development.
 * @param password - The user's password. This will have to be parsed in
 * future development.
 * @param payed - (optional) The amount (in euro's) the user has payed in total,
 * combining all it's organisations.
 * @param consumed - (optional) The amount (in euro's) the user has consumed in
 * total, combining all it's organisations.
 */

app.post('/users/add', async (req, res) => {
  console.log('\n', req.body, '\n');
  if (req.body.name && req.body.mail && req.body.password) {
    pg('users')
      .insert({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      })
      .returning('*')
      .then(user => {
        res.json(user);
      });
  } else {
    return res.sendStatus(401);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});