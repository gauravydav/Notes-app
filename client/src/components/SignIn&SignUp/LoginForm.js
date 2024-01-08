import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("Sending login request with:", { email, password });

      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      console.log("Response:", response);

      if (response.data && response.data.token) {
        setError("Login successful");
        setOpenSnackbar(true);

        localStorage.setItem("token", response.data.token);

        navigate("/notes");
      } else {
        setError("Invalid email or password");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);

      setError("An error occurred while logging in");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Login here...</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error}
          />
        </CardContent>

        <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
          Not registered?{" "}
          <Button component={RouterLink} to="/" color="primary">
            Register here
          </Button>
        </Typography>
      </Card>
    </Container>
  );
};

export default LoginForm;
