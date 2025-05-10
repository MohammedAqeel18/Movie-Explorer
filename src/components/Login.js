import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            🎬 Movie Explorer
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Discover trending movies and save your favorites!
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              🚀 Enter
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
