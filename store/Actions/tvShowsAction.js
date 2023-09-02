import axios from "axios";
import { saveTvShows, saveTvShowsDetails } from "../Reducers/TvShowsReducer";
import { adderrors } from "../Reducers/MoviesReducer";

export const getAsyncTvShows = (click) => async(dispatch,getState) => {
    try {
        const {page} = getState().MoviesReducer
        const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${click}?api_key=2a325f825de42d66968dbc58f1703c53&page=${page}`)
        dispatch(saveTvShows(data.results))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}

export const asyncGetTvShowsDetails = (tvShowId) => async(dispatch,getState) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=2a325f825de42d66968dbc58f1703c53`)
        dispatch(saveTvShowsDetails(data))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}