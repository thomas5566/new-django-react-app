import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, UPDATE_MOVIE, GET_PTTCOMMENTS, GET_IMAGELISTS } from "./MoviesTypes";

export const getMovies = () => dispatch => {
    axios
        .get("/api/movie/movies/")
        .then(response => {
            dispatch({
                type: GET_MOVIES,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error)
        });
};

export const getPttcomments = () => dispatch => {
    axios
        .get("/api/movie/pttcomments/")
        .then(response => {
            dispatch({
                type: GET_PTTCOMMENTS,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error)
        });
};

export const getImagelists = () => dispatch => {
    axios
        .get("/api/movie/slidermovieimage/")
        .then(response => {
            dispatch({
                type: GET_IMAGELISTS,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error)
        });
};

export const addMovie = movie => dispatch => {
    axios
        .post("/api/movie/movies/", movie)
        .then(response => {
            dispatch({
                type: ADD_MOVIE,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const deleteMovie = id => dispatch => {
    axios
        .delete(`/api/movie/movies/${id}/`)
        .then(response => {
            dispatch({
                type: DELETE_MOVIE,
                payload: id
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const updateMovie = (id, movie) => dispatch => {
    axios
        .patch(`/api/movie/movies/${id}/`, movie)
        .then(response => {
            dispatch({
                type: UPDATE_MOVIE,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};
