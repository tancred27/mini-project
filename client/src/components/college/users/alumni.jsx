import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext";
import AlumniFilter from "../../../context/college/AlumniFilter";
import CollegeContext from "../../../context/college/CollegeContext";
import User from "./user";
import jwt from "jsonwebtoken";
import profile from "../../../assets/alumni.svg";
import "./users.css";

const Alumni = (props) => {
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, loadUser } = authContext;
    const { alumni, loadingAlumni, getAlumni, filteredAlumni } = collegeContext;

    useEffect(() => {
        if (!isAuthenticated) {
            if (localStorage.getItem("token")) {
                let decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWT_SECRET);
                if (decoded.user.type === "college") {
                    loadUser("college");
                }
                else {
                    props.history.push("/profile");
                }
            }
            else {
                props.history.push("/");
            }
        }
        else if(!alumni) {
            getAlumni();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, collegeContext]);

    return (
        <div className="users-container">
            <div className="users-img-container">
                <img className="alumni-img" src={profile} alt="users" />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <AlumniFilter />
                {loadingAlumni ? (
                    <div>LOADING</div>
                ) : (
                    <div className="grid">
                        {(filteredAlumni || alumni).map((alumnus) => (
                            <User key={alumnus._id} user={alumnus} college={user.collegeName}/>
                        ))}
                    </div> 
                )}
            </div>
        </div>
    );
};

export default Alumni;
