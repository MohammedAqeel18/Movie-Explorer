import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import TrendingMovies from "../components/TrendingMovies";
import { searchMovies, discoverMovies } from "../api/tmdb";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";

export default function Home({ clearSearch, setClearSearch }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const last = localStorage.getItem("lastSearch");
    if (last) {
      handleSearch(last, 1);
    }
  }, []);

  useEffect(() => {
    if (clearSearch) {
      setMovies([]);
      setSearchTerm("");
      setClearSearch(false);
    }
  }, [clearSearch, setClearSearch]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      handleFilter(1);
    }
  }, [filters]);

  const handleSearch = async (query, pageNumber = 1) => {
    setLoading(true);
    setSearchTerm(query);
    setPage(pageNumber);

    try {
      const res = await searchMovies(query, pageNumber);
      if (pageNumber === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }

      setHasMore(res.data.page < res.data.total_pages);
      localStorage.setItem("lastSearch", query);
      setError(null);
    } catch (error) {
      console.error("Search error:", error);
      setError("⚠️ Something went wrong while fetching movies. Please try again.");
    }

    setLoading(false);
  };

  const handleFilter = async (pageNumber = 1) => {
    setLoading(true);
    setPage(pageNumber);
    try {
      const res = await discoverMovies(filters, pageNumber);
      if (pageNumber === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
      setHasMore(res.data.page < res.data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Discover error:", error);
      setError("⚠️ Error filtering movies.");
    }
    setLoading(false);
  };

  const loadMore = () => {
    if (searchTerm) {
      handleSearch(searchTerm, page + 1);
    } else {
      handleFilter(page + 1);
    }
    setPage((prev) => prev + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button variant="contained">⭐ View Favorites</Button>
        </Link>
      </Box>

      <SearchBar onSearch={(query) => handleSearch(query, 1)} />
      <FilterBar filters={filters} setFilters={setFilters} />

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {loading && <Typography mt={2}>Loading...</Typography>}

      {searchTerm && movies.length === 0 && !loading ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="text.secondary">
            😕 No results found for "{searchTerm}"
          </Typography>
        </Box>
      ) : movies.length > 0 ? (
        <>
          <Box
            sx={{
              mt: 4,
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 3,
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>

          {hasMore && (
            <Box textAlign="center" mt={4}>
              <Button
                onClick={loadMore}
                disabled={loading}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 999,
                  textTransform: "none",
                  backgroundColor: "#4e73df",
                  color: "#fff",
                  boxShadow: "none",
                  '&:hover': {
                    backgroundColor: "#375ac3",
                  },
                }}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <TrendingMovies />
      )}
    </Container>
  );
}