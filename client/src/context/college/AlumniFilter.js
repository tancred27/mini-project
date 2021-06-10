import React, { useContext, useRef, useEffect } from 'react';
import CollegeContext from "./CollegeContext";

const AlumniFilter = () => {
    const collegeContext = useContext(CollegeContext);

    const { filteredAlumni, clearFilter, filterAlumni } = contactContext;

    const text = useRef('');

    useEffect(() => {
        if (filteredAlumni === null){
            text.current.value = '';
        }
    })

    const onChange = e => {
        // text.current.value gives the value typed in the text box
        if(text.current.value !== ''){
            filterAlumni(e.target.value);
        }
        else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Search alumni..." onChange={onChange} />
        </form>
    );
};

export default AlumniFilter;
