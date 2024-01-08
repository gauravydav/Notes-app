import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Snackbar, CircularProgress } from '@mui/material';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/register', formData);
      setError('');
      setOpenSnackbar(true);

      setTimeout(() => {
        setLoading(false); 
        navigate('/login');
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' ,marginTop:"5rem"}}>
        <Typography variant="h5">Register Yourself</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegistration}
          style={{ margin: '20px 0' }}
          disabled={loading} 
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Registration successful. Redirecting to login..."
      />
    </Container>
  );
};

export default RegistrationForm;
