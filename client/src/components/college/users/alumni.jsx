import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext";
import AlumniFilter from "../../../context/college/AlumniFilter";
import UserContext from "../../../context/user/UserContext";
import CollegeContext from "../../../context/college/CollegeContext";
import User from "./user";
import jwt from "jsonwebtoken";
import Fallback from "../../../fallback";
import profile from "../../../assets/alumni.svg";
import "./users.css";

const Alumni = (props) => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, type, loadUser } = authContext;
    const { alumni, getAlumni, filteredAlumni } = collegeContext;
    const { collegeAlumni, setCollegeAlumni, filteredCollegeAlumni } = userContext;

    useEffect(() => {
        if (!isAuthenticated) {
            if (localStorage.getItem("token")) {
                let decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWT_SECRET);
                loadUser(decoded.user.type);
            }
            else {
                props.history.push("/");
            }
        }
        else {
            if (type === "college" && !alumni) {
                getAlumni();
            }
            else if(type === "user" && !collegeAlumni) {
                setCollegeAlumni();
            }
        }
        // eslint-disable-next-line
    }, [isAuthenticated, user, type, alumni, collegeAlumni]);

    let userAlumni = type === "user" ? collegeAlumni : alumni;
    let filteredUserAlumni = type === "user" ? filteredCollegeAlumni : filteredAlumni;

    return (
        <div className="users-container">
            <div className="users-img-container">
                <img className="alumni-img" src={profile} alt="users" />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <AlumniFilter type="alumni" auth={type} />
                <div className="grid">
                    {!userAlumni ? <Fallback /> : (filteredUserAlumni || userAlumni).map((alumnus) => (
                        <User key={alumnus._id} user={alumnus} college={user.collegeName}/>
                    ))}
                </div> 
            </div>
        </div>
    );
};

export default Alumni;
