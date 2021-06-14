import { useReducer } from "react";
import axios from "axios";
import CollegeContext from "./CollegeContext";
import CollegeReducer from "./CollegeReducer";
import {
    GET_USERS,
    GET_ALUMNI,
    VERIFY_USER,
    SET_EVENTS,
    FILTER_ALUMNI,
    CLEAR_FILTER,
    ADD_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_USERS,
    GET_USER,
    CLEAR_CURRENT_USER
} from "../types";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const CollegeState = (props) => {
    const initialState = {
        loadingEvents: true,
        loadingUsers: true,
        loadingAlumni: true,
        loadingCurrentUser: true,
        events: null,
        users: null,
        alumni: null,
        filteredAlumni: null,
        filteredUsers: null,
        currentUser: null,
        currentEvent: null,
        alert: null
    };

    const [state, dispatch] = useReducer(CollegeReducer, initialState);

    const setEvents = (events) => {
        dispatch({
            type: SET_EVENTS,
            payload: events
        });
    };

    const getUsers = async() => {
        try {
            const res = await axios.get(`/api/college/users`);
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const getUser = async(id) => {
        try {
            const res = await axios.get(`/api/user/info/${id}`);
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const getAlumni = async() => {
        try {
            const res = await axios.get(`/api/college/alumni`);
            dispatch({
                type: GET_ALUMNI,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const filterAlumni = (text) => {
        dispatch({
            type: FILTER_ALUMNI,
            payload: text
        });
    };

    const filterUsers = (text) => {
        dispatch({
            type: FILTER_USERS,
            payload: text
        });
    };

    const verifyUser = async(id) => {
        try {
            const res = await axios.get(`/api/college/verify/${id}`);
            dispatch({
                type: VERIFY_USER,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    const addEvent = async(formData) => {
        try {
            const res = await axios.post(`/api/college/events`, formData, config);
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const editEvent = async(id, formData) => {
        try {
            const res = await axios.put(`/api/college/events/${id}`, formData, config);
            dispatch({
                type: EDIT_EVENT,
                payload: res.data
            })
        } catch(error) {
            console.log(error);
        }
    };

    const deleteEvent = async(id, formData) => {
        try {
            await axios.delete(`/api/college/events/${id}`, formData, config);
            dispatch({
                type: DELETE_EVENT,
                payload: id
            });
        } catch(error) {
            console.log(error);
        }
    };

    const setCurrent = (event) => {
        dispatch({
            type: SET_CURRENT,
            payload: event
        });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const clearCurrentUser = () => {
        dispatch({ type: CLEAR_CURRENT_USER });
    }

    return(
        <CollegeContext.Provider
            value={{
                loadingEvents: state.loadingEvents,
                loadingUsers: state.loadingUsers,
                loadingAlumni: state.loadingAlumni,
                loadingCurrentUser: state.loadingCurrentUser,
                events: state.events,
                users: state.users,
                alumni: state.alumni,
                filteredAlumni: state.filteredAlumni,
                filteredUsers: state.filteredUsers,
                currentEvent: state.currentEvent,
                currentUser: state.currentUser,
                alert: state.alert,
                getUsers,
                getAlumni,
                setEvents,
                filterAlumni,
                filterUsers,
                clearFilter,
                verifyUser,
                addEvent,
                editEvent,
                deleteEvent,
                setCurrent,
                getUser,
                clearCurrent,
                clearCurrentUser
            }}
        >
            {props.children}
        </CollegeContext.Provider>
    );
};

export default CollegeState;