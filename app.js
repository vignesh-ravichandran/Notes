const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/user', require('./routes/user'));
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;
// starting the server
app.listen(PORT, () => {
  console.log(`Server is being served at http://localhost:${PORT}`);
});
