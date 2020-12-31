import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { moviesReducer } from "./components/movies/MoviesReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    movies: moviesReducer
  });

  export default createRootReducer;