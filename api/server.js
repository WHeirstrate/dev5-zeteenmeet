const express = require('express');
const http = require('http');
const pg = require('../config/postgress')

const app = express();
http.Server(app);

app.get('/', (req, res) => {
  res.send('Hello world 2.0');
})

app.post('/user/add', (req, res) => {
  console.log(req);
  if (req.body.name && req.body.mail && req.body.password) {
    pg
      .insert({
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      })
      .into('users')
      .returning('id');
    res.sendStatus(200)
  } else {
    return res.sendStatus(401)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${process.env.PORT}`);
});