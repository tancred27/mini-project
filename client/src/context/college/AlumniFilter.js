import React, { useContext, useRef, useEffect } from 'react';
import CollegeContext from "./CollegeContext";

const AlumniFilter = () => {
    const collegeContext = useContext(CollegeContext);

    const { filteredAlumni, clearFilter, filterAlumni, setLoading } = collegeContext;

    const text = useRef('');

    useEffect(() => {
        if (filteredAlumni === null) {
            text.current.value = '';
        }
        // eslint-disable-next-line
    }, []);

    const onChange = e => {
        if(text.current.value !== '') {
            filterAlumni(e.target.value);
        }
        else{
            clearFilter();
        }
    }

    return (
        <form style={style}>
            <input style={{ width : "100%" }} ref={text} type="text" placeholder="Search alumni..." onChange={onChange} />
        </form>
    );
};

const style = {
    border: "1px solid black",
    width: "80%",
    padding: "5px"
};

export default AlumniFilter;
