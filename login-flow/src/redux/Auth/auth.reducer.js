import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,PROFILE_SUCCESS } from "./auth.type";

let token = localStorage.getItem("user");
const intialState = {
    user: {},
    isAuth: false,
    token: token,
    loading: false,
    error: false,
    errorMessage: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }

        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", JSON.stringify(payload?.token))
            return {
                ...state,
                isAuth: true,
                token: payload?.token,
                loading: false,
                error: false,
            }
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                token: payload?.token,
                user: payload?.user,
                loading: false,
                error: false,
            }
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }

        case LOGOUT: {
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
            }
        }
        default: {
            return state;
        }
    }
}