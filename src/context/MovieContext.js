// src/context/MovieContext.js
import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((m) => m.id !== id));
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};
