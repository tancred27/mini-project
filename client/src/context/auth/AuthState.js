import { useReducer } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

const config = {
    headers: {
        "Content-Type":
        "application/json"
    }
};

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load user:
    const loadUser = async(type) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`/api/${type}`);
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch(error) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register user:
    const register = async(formData, type) => {
        try {
            const res = await axios.post(`/api/auth/${type}/register`, formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            loadUser(type);
        } catch(error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    // Login user:
    const login = async(formData, type) => {
        try {
            const res = await axios.post(`/api/auth/${type}/login`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser(type);
        } catch(error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    // Logout:
    const logout = async() => {
        dispatch({ type: LOGOUT });
    };

    // Clear errors:
    const clearErrors = async() => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                loadUser,
                clearErrors,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
