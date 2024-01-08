import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/SignIn&SignUp/RegistrationForm';
import LoginForm from './components/SignIn&SignUp/LoginForm';
import Notes from './components/NotesCrud/Notes';
import UpdateNote from './components/NotesCrud/UpdateNote';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/edit/:id" element={<UpdateNote />} />

      
      </Routes>
    </Router>
  );
};

export default App;
