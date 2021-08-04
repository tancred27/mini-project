import { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import axios from "axios";
import {
    SET_ALUMNI,
    GET_EVENTS,
    SET_CURRENT_PROFILE,
    CLEAR_CURRENT_PROFILE,
    FILTER_COLLEGE_ALUMNI,
    CLEAR_ALUMNI_FILTER
} from "../types";

const API = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "/api";

const UserState = (props) => {
    const initialState = {
        loadingCollegeAlumni: true,
        loadingCollegeEvents: true,
        loadingCurrentProfile: true,
        collegeAlumni: null,
        collegeEvents: null,
        currentProfile: null,
        filteredCollegeAlumni: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const setCollegeEvents = async() => {
        try { 
            const res = await axios.get(`${API}/user/events`);
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const setCollegeAlumni = async() => {
        try { 
            const res = await axios.get(`${API}/user/alumni`);
            dispatch({
                type: SET_ALUMNI,
                payload: res.data
            });
        } catch(error) {
            console.log(error);
        }
    };

    const setCurrentProfile = async(id, type) => {
        let url = type === "college" ? `${API}/user/info/${id}` : `${API}/user/collegeInfo/`;
        try {
            const res = await axios.get(url);
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            });
           
        } catch(error) {
            console.log(error);
        }
    };

    const filterCollegeAlumni = (text) => {
        dispatch({
            type: FILTER_COLLEGE_ALUMNI,
            payload: text
        });
    };

    const clearAlumniFilter = () => {
        dispatch({ type: CLEAR_ALUMNI_FILTER });
    };

    const clearCurrentProfile = () => {
        dispatch({ type: CLEAR_CURRENT_PROFILE });
    };

    return (
        <UserContext.Provider
            value={{
                loadingCollegeAlumni: state.loadingCollegeAlumni,
                loadingCollegeEvents: state.loadingCollegeEvents,
                loadingCurrentProfile: state.loadingCurrentProfile,
                collegeAlumni: state.collegeAlumni,
                collegeEvents: state.collegeEvents,
                currentProfile: state.currentProfile,
                filteredCollegeAlumni: state.filteredCollegeAlumni,
                setCollegeEvents,
                setCollegeAlumni,
                setCurrentProfile,
                filterCollegeAlumni,
                clearAlumniFilter,
                clearCurrentProfile,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;

