const Note = require('../models/note');

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.user._id });
    res.json(notes);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNote = await Note.create({ title, description, user: req.user.user._id });
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    handleServerError(res, error);
  }
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId, user: req.user.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user.user._id },
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: req.user.user._id });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
