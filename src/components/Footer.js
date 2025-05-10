import React from "react";
import { Box, Typography, Link, IconButton, useTheme } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MovieIcon from "@mui/icons-material/Movie";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        textAlign: "center",
        backgroundColor: "#141414", 
        color: "#bbb",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
        <MovieIcon sx={{ color: "#e50914" }} />
        <Typography variant="h6" fontWeight="bold" color="#fff">
          Movie Explorer
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mb={1}>
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener"
          sx={{ color: "#bbb" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener"
          sx={{ color: "#bbb" }}
        >
          <TwitterIcon />
        </IconButton>
      </Box>

      <Typography variant="caption" color="inherit">
        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </Typography>
    </Box>
  );
}
