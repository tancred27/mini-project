import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    CLEAR_ERRORS,
    UPDATE_PROFILE
} from "../types";

const AuthReducer = (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                type: action.userType
            };
        
        case LOGIN_SUCCESS: 
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                type: action.userType
            };
        
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: {
                    msg: action.payload,
                    type: "success"
                }
            }
        
        case UPDATE_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
            return {
                ...state,
                error: {
                    msg: action.payload,
                    type: "error"
                }
            };
        
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: null
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        
        case UPDATE_PROFILE:
            return {
                ...state,
                error: {
                    msg: action.payload.msg,
                    type: "success"
                },
                user: action.payload.user
            };

        default:
            return state;
    }
};

export default AuthReducer;