const express = require('express');
const bodyParser = require('body-parser');
const counter = require('./controllers/counter');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/counter', counter);

app.use(function(error, req, res, next) {
  res.status(500).json({ message: error.message });
});

app.listen(3000, () => console.log('listening on port 3000'));
