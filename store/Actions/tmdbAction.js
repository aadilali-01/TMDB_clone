import axios from "axios";
import { saveMovies,saveTrendingMovies,saveMovieDetails,adderrors,changePage } from "../Reducers/MoviesReducer";

export const asyncGetMovies = (accordingToClick) => async (dispatch,getState) => {
    try {
        const {page} =  getState().MoviesReducer
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${accordingToClick}?api_key=2a325f825de42d66968dbc58f1703c53&page=${page}`)
        dispatch(saveMovies(data.results))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}

export const asyncGetTrendingMovies = () => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=2a325f825de42d66968dbc58f1703c53`)
        dispatch(saveTrendingMovies(data.results))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}

export const asyncGetMoviesDetails = (movieId) => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=2a325f825de42d66968dbc58f1703c53&append_to_response=videos`)
        dispatch(saveMovieDetails(data))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}


