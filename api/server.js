const express = require('express');
const pg = require('./config/postgress')


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

// -----------------
// ----- USERS -----
// -----------------

/**
 * Fetch all users from the 'users' table.
 * @returns {Object} - A JSON-object with all users will be returned.
 */
app.get('/users', (req, res) => {
  pg.select()
    .from('users')
    .then(data => res.status(200).json(data));
})

/**
 * Login with a certain user. The email must be given, as well as the password.
 * In a later stadium, the password will have to be decrypted first.
 * 
 * @param mail - The mail of the user that wants to be logged in.
 * @param password - The password that will be compared with the one fetched
 * (and later descrypted) from the database.
 * @returns {StatusCode} - 200 when user is correctly logged in, 401 when the
 * wrong credentials were used and 400 when the request doesn't contain at least
 * an email and a password.
 */
app.post('/users/login', (req, res) => {
  if (req.body.mail && req.body.password) {
    try {
      const pass = pg.where({mail: req.body.mail}).returning('password');
      if (pass == req.body.password) {
        res.sendStatus(200);
      } else {
        throw new Error('Wrong credentials!');
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
 * Update a user by id (passed in the uri) with the parameters that get passed
 * in the body. 
 * @param payed - The amount the user has spent in total.
 * @param consumed - The amount the user has consumed in total.
 * @returns {Object} - The user that was updated. If the user was unable to be 
 * updated, a status 401 is returned. if the wrong params were passed, a status
 * 400 will be returned.
 */
app.put('/users/:id', (req, res) => {
  if(req.body.payed && req.body.consumed) {
    try {
      pg('users')
        .where('id', req.params.id)
        .update({
          payed: req.body.payed,
          consumed: req.body.consumed
        })
        .returning()
        .then(data => res.json(data));
    } catch(err) {
      console.log(err)
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400).json(req.body);
  }
});

/**
 * Delete a user with the specified id (in the uri).
 * @param id - must be added in the request uri
 * @returns {StatusCode} - 200 when the user has succesfully been removed, 400 when
 * the user could not be deleted.
 */

app.delete('/users/:id', (req, res) => {
  try {
    pg('users')
      .where('id', req.params.id)
      .del()
      .then(()=> res.sendStatus(200));
  } catch(err) {
    console.log(err);
    res.send(400);
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
 * @returns {Object} - The user that has been added. If this was unsuccesful, a 
 * statuscode 401 will be returned.
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

// -----------------
// - ORGANISATIONS -
// -----------------

/**
 * Fetch all organisations from the 'organisations' table.
 * @returns {Object} - A JSON-object with all organisations will be returned.
 */
app.get('/organisations', (req, res) => {
  pg.select()
    .from('organisations')
    .then(data => res.json(data));
})

module.exports = app;