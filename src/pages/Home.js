import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";
import TrendingMovies from "../components/TrendingMovies";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const res = await searchMovies(query);
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
    setLoading(false);
  };

  return (
    <div>
    <SearchBar onSearch={handleSearch} />
    {loading ? <p>Loading...</p> : null}
    {movies.length > 0 ? (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    ) : (
      <TrendingMovies />
    )}
  </div>
  
  );
}
