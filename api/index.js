require('dotenv').config();
const app = require('./server');
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});

module.exports = app;