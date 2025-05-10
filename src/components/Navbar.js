import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import MovieIcon from "@mui/icons-material/Movie";

export default function Navbar({ onLogout, onHomeClick }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleHomeClick = () => {
    onHomeClick();         
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#141414" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    
        <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={handleHomeClick}>
          <MovieIcon sx={{ mr: 1, color: "red" }} />
          <Typography variant="h6" fontWeight="bold" color="white">
            Movie Explorer
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={handleHomeClick}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/favorites"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Favorites
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
