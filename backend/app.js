const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());

/*
app.post('/cone', function (req, res) {
  console.log("fhfhhfhf")
  res.send('рез');
});
*/

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
