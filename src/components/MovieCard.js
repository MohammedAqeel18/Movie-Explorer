import React from "react";

export default function MovieCard({ movie }) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div style={{ margin: "10px", width: "200px" }}>
      <img src={imgUrl} alt={movie.title} width="100%" />
      <h4>{movie.title}</h4>
      <p>{movie.release_date?.split("-")[0]} | ⭐ {movie.vote_average}</p>
    </div>
  );
}
