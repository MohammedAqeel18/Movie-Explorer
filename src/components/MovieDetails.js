import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getMovieDetails, getMovieVideos } from "../api/tmdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await getMovieDetails(id);
        setMovie(movieRes.data);

        const videoRes = await getMovieVideos(id);
        const trailerVideo = videoRes.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailerVideo?.key || null);
      } catch (error) {
        console.error("Failed to fetch movie or trailer", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        Movie not found.
      </Typography>
    );
  }

  const posterUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://via.placeholder.com/1200x600?text=No+Backdrop";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.3) 50%)",
          }}
        />

        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            📅 {movie.release_date} &nbsp;&nbsp; ⏱ {movie.runtime} min &nbsp;&nbsp; ⭐{" "}
            {movie.vote_average}
          </Typography>

          {trailer && (
            <Button
              variant="contained"
              color="error"
              startIcon={<PlayArrowIcon />}
              onClick={() => setTrailerOpen(true)}
              sx={{ mt: 2, px: 4, borderRadius: 999 }}
            >
              Watch Trailer
            </Button>
          )}
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h5" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {movie.overview || "No description available."}
        </Typography>
      </Container>

      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Box>
      </Dialog>
    </>
  );
}
