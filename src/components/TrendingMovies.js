import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";

export default function TrendingMovies() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrendingMovies();
        setTrending(res.data.results);
      } catch (err) {
        console.error("Failed to fetch trending movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <p>Loading trending movies...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🔥 Trending This Week</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {trending.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
