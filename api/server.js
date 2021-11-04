const express = require('express');
const pg = require('../config/postgress')
const parser = require('body-parser')

const app = express();

// -----------------
// -- MIDDLEWARE ---
// -----------------

app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());

// -----------------
// ---- ROUTES -----
// -----------------

app.get('/', (req, res) => {
  res.send('Hello world 2.0');
})

app.post('/user/add', (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.mail && req.body.password) {
    pg
      .insert({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      })
      .into('users')
      .returning('id');
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${process.env.PORT}`);
});