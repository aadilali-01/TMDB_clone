import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "./Reducers/MoviesReducer"
import TvShowsReducer from "./Reducers/TvShowsReducer";

export const store = configureStore({
    reducer:{
        MoviesReducer,
        TvShowsReducer
    }
})