import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,PROFILE_SUCCESS } from "./auth.type";

// Base URL for API requests
const BaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Action to register a user
export const RegisterUser = async (userData) => {
    try {
        const response = await fetch(`${BaseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const LoginUser = async (userData) => {
    try {
        const response = await fetch(`${BaseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Action to get OTP
export const GetOtp = async (creds) => {
    try {
        const response = await fetch(`${BaseUrl}/user/getotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Action to resend OTP
export const ResendOtp = async (creds) => {
    try {
        const response = await fetch(`${BaseUrl}/user/resendotp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Action to fetch user details
export const singleuser = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      let res = await fetch(`${BaseUrl}/user/singleuser`, {
        method: 'GET',
        headers: {
          'token': token
        }
      })
      let data = await res.json();
  
      if (data?.user) {
        dispatch({ type: PROFILE_SUCCESS, payload: data })
        return data.user;
      }
      dispatch({ type: LOGOUT });
      return data
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT });
      return error
    }
  }

// Example of a potential future action
export const Logout = () => {
    return {
        type: LOGOUT
    };
};
