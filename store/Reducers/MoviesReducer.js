import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Movies: [],
  TrendingMovies: [],
  MovieDetails: {},
  errors: [],
  page: 1,
};

export const MoviesReducer = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    saveMovies: (state, action) => {
      state.Movies = action.payload;
    },
    saveTrendingMovies: (state, action) => {
      state.TrendingMovies = action.payload;
    },
    saveMovieDetails: (state, action) => {
      state.MovieDetails = action.payload;
    },
    adderrors: (state, action) => {
      state.errors.push(action.payload);
    },
    removeerrors: (state, action) => {
      state.errors = [];
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  saveMovies,
  saveTrendingMovies,
  saveMovieDetails,
  adderrors,
  removeerrors,
  RemoveMovies,
  changePage,
} = MoviesReducer.actions;

export default MoviesReducer.reducer;
