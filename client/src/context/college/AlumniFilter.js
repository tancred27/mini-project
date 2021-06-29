import React, { useContext, useRef, useEffect } from 'react';
import CollegeContext from "./CollegeContext";
import UserContext from '../user/UserContext';
import "./filter.css";

const AlumniFilter = ({ type, auth }) => {
    const collegeContext = useContext(CollegeContext);
    const userContext = useContext(UserContext);
    const { filteredAlumni, clearFilter, filterAlumni, filteredUsers, filterUsers } = collegeContext;
    const { filteredCollegeAlumni, clearAlumniFilter, filterCollegeAlumni } = userContext;

    const text = useRef('');

    useEffect(() => {
        if (auth === "user") {
            (filteredCollegeAlumni === null && (text.current.value = ""));
        }
        else {
            type === "users" ?
                ((filteredUsers === null) && (text.current.value = "")) 
            : 
                ((filteredAlumni === null) && ( text.current.value = "")); 
        }
        
        // eslint-disable-next-line
    }, []);

    const onChange = e => {
        if(text.current.value !== '') {
            if (auth === "user") {
                filterCollegeAlumni(e.target.value);
            }
            else {
                type === "users" ? filterUsers(e.target.value) : filterAlumni(e.target.value);
            }
        }
        else {
            auth === "user" ? clearAlumniFilter() : clearFilter();
        }
    }

    return (
        <form>
            <div className="search-bar">
                <i className="fas fa-search"></i> &nbsp;
                <input ref={text} type="text" placeholder="Search for a user..." onChange={onChange} />
            </div>
        </form>
    );
};

export default AlumniFilter;
