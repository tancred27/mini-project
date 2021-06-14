import {
    GET_USERS,
    GET_ALUMNI,
    SET_EVENTS,
    VERIFY_USER,
    FILTER_ALUMNI,
    FILTER_USERS,
    CLEAR_FILTER,
    ADD_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CURRENT_USER,
    GET_USER
} from "../types";

const CollegeReducer = (state, action) => {
    switch(action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loadingEvents: false
            };

        case GET_USER:
            return {
                ...state, 
                currentUser: action.payload,
                loadingCurrentUser: false
            };
        
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loadingUsers: false
            };
        
        case GET_ALUMNI:
            return {
                ...state,
                alumni: action.payload,
                loadingAlumni: false
            };

        case VERIFY_USER:
            return {
                ...state,
                users: state.users && state.users.filter(user => user._id !== action.payload._id),
                alumni: state.alumni ? [action.payload, ...state.alumni] : [action.payload],
                currentUser: action.payload
            };
        
        case FILTER_ALUMNI:
            return {
                ...state,
                filteredAlumni: state.alumni.filter(alumnus => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return alumnus.name.match(regex) || alumnus.rollNumber.match(regex) || alumnus.branch.match(regex) || alumnus.company.match(regex) || alumnus.year.match(regex);
                }),
            };

        case FILTER_USERS:
            return {
                ...state,
                filteredUsers: state.users.filter(user => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return user.name.match(regex) || user.rollNumber.match(regex) || user.branch.match(regex) || user.company.match(regex) || user.year.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filteredAlumni: null,
                filteredUsers: null
            };
        
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events],
                loadingEvents: false
            };

        case EDIT_EVENT:
            return {
                ...state, 
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event),
                loadingEvents: false
            };

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload),
                loadingEvents: false
            };

        case SET_CURRENT:
            return {
                ...state,
                currentEvent: action.payload
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                currentEvent: null
            };
        
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            };

        default: return state;
    };
};

export default CollegeReducer;