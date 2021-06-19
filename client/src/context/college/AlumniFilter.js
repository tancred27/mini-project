import React, { useContext, useRef, useEffect } from 'react';
import CollegeContext from "./CollegeContext";
import UserContext from '../user/UserContext';

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
        <form style={style}>
            <input style={inputStyle} ref={text} type="text" placeholder="Search for a user..." onChange={onChange} />
        </form>
    );
};

const style = {
    border: "1px solid black",
    width: "80%",
    padding: "5px"
};

const inputStyle = {
    width: "100%",
    backgroundColor: "#e5e5e5",
    border: "none",
    outline: "none",
    lineHeight: "1",
    font: "400 16px poppins, sans-serif"
};
export default AlumniFilter;
