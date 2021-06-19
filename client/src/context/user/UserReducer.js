import {
    SET_ALUMNI,
    GET_EVENTS,
    SET_CURRENT_PROFILE,
    CLEAR_CURRENT_PROFILE,
    FILTER_COLLEGE_ALUMNI,
    CLEAR_ALUMNI_FILTER,
} from "../types";

const UserReducer = (state, action) => {
    switch(action.type) {
        case SET_ALUMNI:
            return {
                ...state,
                collegeAlumni: action.payload,
                loadingCollegeAlumni: false
            };
        
        case GET_EVENTS:
            return {
                ...state,
                collegeEvents: action.payload,
                loadingCollegeEvents: false
            };

        case SET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.payload,
                loadingCurrentProfile: false
            };

        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: null
            };
        
        case FILTER_COLLEGE_ALUMNI:
            return {
                ...state, 
                filteredCollegeAlumni: state.collegeAlumni.filter(alumnus => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return alumnus.name.match(regex) || alumnus.rollNumber.match(regex) || alumnus.branch.match(regex) || alumnus.company.match(regex) || alumnus.year.match(regex);
                })
            };
        
        case CLEAR_ALUMNI_FILTER:
            return {
                ...state,
                filteredCollegeAlumni: null
            }
        
        default: return state;
    };
};

export default UserReducer;