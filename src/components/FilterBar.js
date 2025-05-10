import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";
import { getGenres } from "../api/tmdb";

export default function FilterBar({ filters, setFilters }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenres();
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={3}
      mt={4}
      px={2}
    >
      <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.with_genres || ""}
          onChange={(e) => handleChange("with_genres", e.target.value)}
          label="Genre"
        >
          <MenuItem value="">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={filters.primary_release_year || ""}
          onChange={(e) => handleChange("primary_release_year", e.target.value)}
          label="Year"
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" gutterBottom>
          Min Rating: {filters["vote_average.gte"] || 0}
        </Typography>
        <Slider
          value={filters["vote_average.gte"] || 0}
          onChange={(_, newValue) =>
            handleChange("vote_average.gte", newValue)
          }
          step={1}
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
