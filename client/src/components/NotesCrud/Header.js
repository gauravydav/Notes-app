import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" style={{ color: "#2196F3" }}>
          Notes
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
