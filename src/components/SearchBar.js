import React, { useState } from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      gap={2}
      flexWrap="wrap"
      mt={3}
    >
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        variant="outlined"
        size="small"
        sx={{
          width: { xs: "100%", sm: "350px" },
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
          borderRadius: 1,
          boxShadow: theme.palette.mode === "dark"
            ? "0 0 0 1px #444"
            : "0 0 0 1px #ccc",
        }}
        InputProps={{
          sx: {
            fontSize: "0.95rem",
            px: 1,
          },
        }}
      />

      <Button
        variant="contained"
        type="submit"
        startIcon={<SearchIcon />}
        sx={{
          px: 3,
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Search
      </Button>
    </Box>
  );
}
