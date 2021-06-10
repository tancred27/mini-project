import {
    GET_USERS,
    GET_ALUMNI,
    SET_EVENTS,
    VERIFY_USER,
    FILTER_ALUMNI,
    CLEAR_FILTER,
    ADD_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
    SET_CURRENT,
    CLEAR_CURRENT
} from "../types";

const CollegeReducer = (state, action) => {
    switch(action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            };

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        
        case GET_ALUMNI:
            return {
                ...state,
                alumni: action.payload,
                loading: false
            };

        case VERIFY_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload._id),
                alumni: [action.payload, ...state.alumni]
            };
        
        case FILTER_ALUMNI:
            return {
                ...state,
                filteredAlumni: state.alumni.filter(alumnus => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return alumnus.name.match(regex) || alumnus.branch.match(regex) || alumnus.company.match(regex) || alumnus.year.match(regex);
                })
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filteredAlumni: null
            };
        
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events],
                loading: false
            };

        case EDIT_EVENT:
            return {
                ...state, 
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event),
                loading: false
            };

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload),
                loading: false
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
        
        default: return state;
    };
};

export default CollegeReducer;