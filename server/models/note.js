
const mongoose = require('mongoose');

const Note = mongoose.model('Note', {
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = Note;
