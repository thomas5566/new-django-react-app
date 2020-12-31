import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
} from "./SignupTypes";

const initialState = {
    useremailError: "",
    passwordError: "",
    usernameError: "",
    isSubimtted: false
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_SUBMITTED:
            return {
                useremailError: "",
                passwordError: "",
                usernameError: "",
                isSubimtted: true
            };
        case CREATE_USER_ERROR:
            const errorState = {
                useremailError: "",
                passwordError: "",
                usernameError: "",
                isSubimtted: false
            };
            if (action.errorData.hasOwnProperty("useremail")) {
                errorState.useremailError = action.errorData["useremail"];
            }
            if (action.errorData.hasOwnProperty("password")) {
                errorState.passwordError = action.errorData["password"];
            }
            if (action.errorData.hasOwnProperty("username")) {
                errorState.passwordError = action.errorData["username"];
            }
            return errorState;
        case CREATE_USER_SUCCESS:
            return {
                useremailError: "",
                passwordError: "",
                usernameError: "",
                isSubimtted: false
            };
        default:
            return state;
    }
}