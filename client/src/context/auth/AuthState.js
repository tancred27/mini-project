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
    CLEAR_ERRORS,
    UPDATE_PROFILE,
    UPDATE_FAIL
} from "../types";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const AuthState = (props) => {
    const initialState = {
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null,
        type: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async(type) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`/api/${type}`);
            dispatch({ 
                type: USER_LOADED,
                payload: res.data,
                userType: type
            });
        } catch(error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    const register = async(formData, type) => {
        try {
            await axios.post(`/api/auth/${type}/register`, formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: "Registration success! Please open the link sent to your email to activate your account!",
            });
        } catch(error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    const login = async(formData, type) => {
        try {
            const res = await axios.post(`/api/auth/${type}/login`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
                userType: type
            });
            loadUser(type);
        } catch(error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    const logout = async() => {
        dispatch({ type: LOGOUT });
    };

    const clearErrors = async() => {
        dispatch({ type: CLEAR_ERRORS });
    };

    const sendEmail = async(formData) => {
        try {
            await axios.post(`/api/auth/email`, formData, config);
        } catch(error) {
            console.log(error);
        }
    };

    const sendSms = async(formData) => {
        try {
            await axios.post(`/api/auth/sms`, formData, config);
        } catch(error) {
            console.log(error);
        }
    };

    const updateProfile = async(formData) => {
        try {
            const res = await axios.put(`/api/user/`, formData, config);
            console.log(res.data);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
        } catch(error) {
            dispatch({
                type: UPDATE_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    return(
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                type: state.type,
                register,
                login,
                loadUser,
                clearErrors,
                logout,
                sendSms,
                sendEmail,
                updateProfile
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
