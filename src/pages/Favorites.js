import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Box, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)", 
        px: 2,
        pt: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        <FavoriteIcon color="warning" sx={{ mr: 1 }} />
        You’ve saved {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            pb: 6, 
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 80, mb: 2, color: "gray" }} />
          <Typography variant="body1" color="text.secondary" mb={2}>
            You haven't added any favorites yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{ borderRadius: 3, px: 4 }}
          >
            Explore Movies
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 3,
            pb: 6, 
          }}
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
}
