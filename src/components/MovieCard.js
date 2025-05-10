import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";

export default function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const [snackOpen, setSnackOpen] = useState(false);
  const [actionType, setActionType] = useState(""); 
  const navigate = useNavigate();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
      setActionType("remove");
    } else {
      addFavorite(movie);
      setActionType("add");
    }
    setSnackOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 180,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box onClick={scrollToTop} sx={{ cursor: "pointer" }}>
          <CardMedia
            component="img"
            image={imgUrl}
            alt={movie.title}
            sx={{
              height: 270,
              objectFit: "cover",
              width: "100%",
            }}
          />
          <CardContent sx={{ px: 1.5, pt: 1.5, pb: 0 }}>
            <Typography variant="subtitle2" noWrap fontWeight="bold">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date?.split("-")[0]} • ⭐ {movie.vote_average}
            </Typography>
          </CardContent>
        </Box>

        <CardActions sx={{ px: 1.5, pb: 1.5, pt: 1 }}>
          <Button
            size="small"
            variant={isFavorite ? "text" : "outlined"}
            color={isFavorite ? "secondary" : "primary"}
            onClick={handleFavorite}
            fullWidth
            sx={{ fontSize: "0.8rem" }}
          >
            {isFavorite ? "❌ Remove" : "❤️ Favorite"}
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={actionType === "add" ? "success" : "info"}
          sx={{ width: "100%" }}
        >
          {actionType === "add"
            ? "Added to Favorites!"
            : "Removed from Favorites"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
