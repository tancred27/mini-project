import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext"
import CollegeContext from "../../../context/college/CollegeContext";
import User from "./user";
import jwt from "jsonwebtoken";
import profile from "../../../assets/alumni.svg";
import "./users.css";

const Alumni = (props) => {
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, loadUser } = authContext;
    const { alumni, loadingAlumni, getAlumni } = collegeContext;

    useEffect(() => {
        console.log(alumni);
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
    }, [isAuthenticated, alumni, loadingAlumni]);

    return loadingAlumni ? (
        <div>LOADING</div>
    ) : (
        <div className="users-container">
            <div className="users-img-container">
                <img className="alumni-img" src={profile} alt="users" />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div className="grid">
                    {alumni && alumni.map((alumnus) => (
                        <User key={alumnus._id} user={alumnus} college={user.collegeName}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Alumni;
