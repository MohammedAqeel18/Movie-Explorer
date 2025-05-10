import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import { Box, Typography, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCard";
import WhatshotIcon from "@mui/icons-material/Whatshot";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTrendingMovies();
        setMovies(res.data.results);
      } catch (err) {
        console.error("Failed to fetch trending movies", err);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={5}>
      <Box display="flex" alignItems="center" mb={2} gap={1}>
        <WhatshotIcon color="error" />
        <Typography variant="h5" fontWeight="bold">
          Trending This Week
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
}
