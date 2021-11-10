const express = require('express');
const pg = require('../config/postgress')

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

app.get('/', (req, res) => {
  pg.select().from('users')
    .then((res) => {
      res.json(res);
    });
})

app.post('/login', (req, res) => {
  if (req.body.name && req.body.password) {
    const pass = pg.where({name: req.body.name}).select('password');
    if (pass == req.body.password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/user/add', async (req, res) => {
  console.log('\n', req.body.name, req.body.mail, req.body.password, '\n');
  if (req.body.name && req.body.mail && req.body.password) {
    pg('users')
      .insert({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      })
      .returning('*')
      .then(user => {
        res.json(user)
      });
  } else {
    return res.sendStatus(401);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${process.env.PORT}`);
});