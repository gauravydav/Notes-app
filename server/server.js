const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { register, login } = require('./controllers/userController');
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('./controllers/noteController');
const { authenticateJWT } = require('./middleware/authMiddleware');
const mongoose = require('./db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', register);
app.post('/api/login', login);

app.use('/api/notes', authenticateJWT);
app.get('/api/notes', getNotes);
app.post('/api/notes', createNote);
app.get('/api/notes/:id', getNoteById);
app.put('/api/notes/:id', updateNote);
app.delete('/api/notes/:id', deleteNote);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
