import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  IconButton,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "./Header";

const NotesCard = ({ note, handleUpdateNote, handleDeleteNote, handleViewNote }) => {
  return (
    <Card
      style={{
        minHeight: "15rem",
        maxHeight: "15rem",
        minWidth: "15rem",
        maxWidth: "15rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent style={{ flex: 1, overflowY: "auto" }}>
        <Typography variant="h6" component="div" gutterBottom>
          {note.title}
        </Typography>
        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
          <Typography variant="body2" color="text.secondary">
            {note.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          aria-label="edit"
          onClick={() => handleUpdateNote(note._id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteNote(note._id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="view"
          onClick={() => handleViewNote(note)}
        >
          <VisibilityIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};


const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes", {
        headers: {
          Authorization: token,
        },
      });

      setNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error.message);
    }
  };

  const handleCreateNote = () => {
    setOpenDialog(true);
  };

  const handleViewNote = (note) => {
    setUpdatedNote(note);
    setViewDialog(true);
  };

  const handleCreateNoteSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/notes",
        { title: newNote.title, description: newNote.description },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchNotes();
      setNewNote({ title: "", description: "" });
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to create note:", error.message);
    }
  };

  const handleUpdateNote = (noteId) => {
    if (noteId) {
      setUpdateDialog(true);
      const selectedNote = notes.find((note) => note._id === noteId);
      setUpdatedNote(selectedNote || { title: "", description: "" });
    } else {
      console.error("Invalid noteId:", noteId);
    }
  };

  const handleUpdateNoteSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/notes/${updatedNote._id}`,
        { title: updatedNote.title, description: updatedNote.description },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchNotes();
      setUpdateDialog(false);
    } catch (error) {
      console.error("Failed to update note:", error.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${noteId}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
         <Header handleLogout={handleLogout} />
      <Container
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              Write all your notes here...
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateNote}
              style={{ marginBottom: "10px" }}
            >
              Create Note
            </Button>
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <DialogTitle>Create a New Note</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              style={{ marginBottom: "10px", width: "96%" }}
            />
            <TextareaAutosize
              minRows={3}
              fullWidth
              placeholder="Description"
              value={newNote.description}
              onChange={(e) =>
                setNewNote({ ...newNote, description: e.target.value })
              }
              style={{
                marginBottom: "20px",
                width: "90%",
                minHeight: "60px",
                padding: "8px",
                resize: "none",
              }}
            />
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateNoteSubmit}
              >
                Create Note
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog
          open={updateDialog}
          onClose={() => setUpdateDialog(false)}
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <DialogTitle>Update Note</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={updatedNote.title}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, title: e.target.value })
              }
              style={{ marginBottom: "10px", width: "96%" }}
            />
            <TextareaAutosize
              minRows={3}
              fullWidth
              placeholder="Description"
              value={updatedNote.description}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, description: e.target.value })
              }
              style={{
                marginBottom: "20px",
                width: "90%",
                minHeight: "60px",
                padding: "8px",
                resize: "none",
              }}
            />
          </DialogContent>
          <DialogActions
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Button onClick={() => setUpdateDialog(false)}>Cancel</Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateNoteSubmit}
              >
                Update Note
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog
          open={viewDialog}
          onClose={() => setViewDialog(false)}
          style={{ maxWidth: "1600px",minWidth:"1600px", margin: "auto" }}
        >
          <DialogTitle>View Note</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              {updatedNote.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {updatedNote.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid
              item
              key={note._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              style={{ margin: "2rem" }}
            >
              <NotesCard
                note={note}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
                handleViewNote={handleViewNote}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Notes;
