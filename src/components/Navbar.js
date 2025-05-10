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
import { useThemeMode } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar({ onLogout, onHomeClick }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleTheme, mode } = useThemeMode();

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
<AppBar position="sticky" sx={{ backgroundColor: "#000", color: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    
        <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={handleHomeClick}>
          <MovieIcon sx={{ mr: 1, color: "red" }} />
          <Typography
  variant="h6"
  fontWeight="bold"
  sx={{ color: "inherit" }}
>
  Movies Explorer
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

  
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
