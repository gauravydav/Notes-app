const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { register, login } = require('./controllers/userController');
const mongoose = require('./db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', register);
app.post('/api/login', login);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
