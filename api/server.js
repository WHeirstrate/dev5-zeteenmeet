const EXPRESS = require('express');
const PG = require('./config/postgress')

const APP = EXPRESS();

// -----------------
// -- MIDDLEWARE ---
// -----------------

APP.use(EXPRESS.urlencoded({
  extended: true
}));
APP.use(EXPRESS.json());

// -----------------
// ---- ROUTES -----
// -----------------

/**
 * GET
 * 
 * The main route of the API, this will be linked with the documentation
 * once the APP is in a further developed stadium. For now, this just
 * returns a sole sentence.
 */
APP.get('/', (req, res) => {
  return res.status(200).send('Welcome, RESTful api is running');
})

// -----------------
// ----- USERS -----
// -----------------

/**
 * GET
 * 
 * Fetch all users from the 'users' table.
 * @returns {Object} - A JSON-object with all users will be returned.
 */
APP.get('/users', (req, res) => {
  PG.select()
    .from('users')
    .then(data => {
      return res.status(200).json(data);
    });
});

/**
 * POST
 * 
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
APP.post('/users', async (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    PG('users')
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .returning('*')
    .then(data => {
      return res.status(200).send(data);
    });
  } else {
    return res.status(401).send('Invalid data');
  }
});

/**
 * POST
 * 
 * Login with a certain user. The email must be given, as well as the password.
 * In a later stadium, the password will have to be decrypted first.
 * 
 * @param email - The email of the user that wants to be logged in.
 * @param password - The password that will be compared with the one fetched
 * (and later descrypted) from the database.
 * @returns {StatusCode} - 200 when user is correctly logged in, 401 when the
 * wrong credentials were used and 400 when the request doesn't contain at least
 * an email and a password.
 */
APP.post('/users/login', (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      PG('users').where({email: req.body.email}).returning('*').then(data => {
        if (!data.length)
          return res.status(400).send('User does not exist');

        const user = data[0];
        if (user.password == req.body.password) 
          return res.status(200).send('User logged in!');
        return res.status(401).send("Wrong crendentials");
      });
    } catch(err) {
      return res.status(401).send('Email is incorrect');
    }
  } else {
    return res.status(401).send('Invalid data');
  }
});

/**
 * PUT
 * 
 * Update a user by id (passed in the uri) with the parameters that get passed
 * in the body. 
 * @param payed - The amount the user has spent in total.
 * @param consumed - The amount the user has consumed in total.
 * @returns {Object} - The user that was updated. If the user was unable to be 
 * updated, a status 401 is returned. if the wrong params were passed, a status
 * 400 will be returned.
 */
APP.put('/users/:id', (req, res) => {
  if(req.body.payed && req.body.consumed) {
    try {
      PG('users')
        .where('id', req.params.id)
        .update({
          payed: req.body.payed,
          consumed: req.body.consumed
        })
        .returning('*')
        .then(data => {
          return res.status(200).json(data);
        });
    } catch(err) {
      return res.status(401).send('There is no user with this id');
    }
  } else {
    return res.status(400).send('Invalid data');
  }
});

/**
 * DELETE
 * 
 * Delete a user with the specified id (in the uri).
 * @param id - must be added in the request uri
 * @returns {StatusCode} - 200 when the user has succesfully been removed, 400 when
 * the user could not be deleted.
 */
APP.delete('/users/:id', (req, res) => {
  try {
    PG('users')
      .where('id', req.params.id)
      .del()
      .then(() => {
        return res.status(200).send('User deleted succesfully');
      });
  } catch(err) {
    return res.status(400).send('There is no user with this id');
  }
});

// -----------------
// - ORGANISATIONS -
// -----------------

/**
 * GET
 * 
 * Fetch all organisations from the 'organisations' table.
 * @returns {Object} - A JSON-object with all organisations will be returned.
 */
APP.get('/organisations', (req, res) => {
  PG.select()
    .from('organisations')
    .then(data => {
      return res.status(200).json(data);
    });
});

module.exports = APP;