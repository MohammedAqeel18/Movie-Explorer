import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = (query, page = 1) =>
  tmdb.get("/search/movie", {
    params: { query, page },
  });

export const discoverMovies = (filters, page = 1) =>
  tmdb.get("/discover/movie", {
    params: {
      ...filters,
      page,
      sort_by: "popularity.desc",
    },
  });

export const getGenres = () => tmdb.get("/genre/movie/list");

export const getTrendingMovies = () => tmdb.get("/trending/movie/week");

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: "videos,credits",
    },
  });

export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`);
