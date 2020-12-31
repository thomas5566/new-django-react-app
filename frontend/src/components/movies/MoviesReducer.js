import { GET_MOVIES, ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE } from "./MoviesTypes";

const initialState = {
    movies: []
};

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            };
        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload]
            };
        case DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter((item, index) => item.id !== action.payload)
            };
        case UPDATE_MOVIE:
            const updatedMovies = state.movies.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload };
                }
                return item;
            });
            return {
                ...state,
                movies : updatedMovies
            }
        default:
            return state;
    }
};