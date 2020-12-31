import axios from "axios";
import { push } from "connected-react-router";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError} from "../../utils/Utils";
import { toast } from "react-toastify";

// userData is the JSON object with username and password.
export const login = (userData, redirectTo) => dispatch => {
    axios
        .post("/api/user/login/", userData)        // post to login REST API
        .then(response => {
            const { key } = response.data;  // get "key" from backend token variable
            setAxiosAuthToken(key);         // set token in axios header
            dispatch(setToken(key));        // set token in reducer
            dispatch(getCurrentUser(redirectTo));  // dispatch request to get user details
        })
        .catch(error => {
            dispatch(unsetCurrentUser()); // reset the state
            toastOnError(error);          // raise toast error
        });
};

// GET user details from /api/user/me/ endpoint.
export const getCurrentUser = redirectTo => dispatch => {
    axios
        .get("/api/user/me/")
        .then(response => {
            const user = {
                username: response.data.username,
                email: response.data.email
            };
            dispatch(setCurrentUser(user, redirectTo));
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};

export const setCurrentUser = (user, redirectTo) => dispatch => {
    // localStorage: saves the token
    // if we want to refresh the website but don’t want to force the user to login again to be authenticated.
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    });

    console.log("set user" + redirectTo);
    // If the variable redirectTo is not empty, then a routing to its URL is dispatched
    if (redirectTo !== "") {
        dispatch(push(redirectTo));
    }
};

// set token in request header
export const setToken = token => dispatch => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};

// login error
// removes the token in the axios configuration
export const unsetCurrentUser = () => dispatch => {
    setAxiosAuthToken("");
    // clears the localStorage data and auth state.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
        type: UNSET_CURRENT_USER
    });
};

// send POST request to /api/v1/token/logout/ endpoint.
export const logout = () => dispatch => {
    axios
        .post("/api/user/logout/")
        .then(response => {
            // clears user data and token in the loclStorage and the auth store
            dispatch(unsetCurrentUser());
            // redirects the view to / URL (which in our case will display Home component).
            dispatch(push("/"));
            toast.success("Logout successful.");
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};