require('dotenv').config();
const APP = require('./server');
const PORT = process.env.PORT || 3000;

APP.listen(process.env.PORT, () => {
  console.log(`server listening at: http://localhost:${PORT}`);
});