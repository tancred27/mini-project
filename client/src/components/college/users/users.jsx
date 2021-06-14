import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext"
import AlumniFilter from "../../../context/college/AlumniFilter";
import CollegeContext from "../../../context/college/CollegeContext";
import User from "./user";
import jwt from "jsonwebtoken";
import profile from "../../../assets/profile2.svg";
import "./users.css";

const Users = (props) => {
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, loadUser } = authContext;
    const { users, loadingUsers, getUsers, filteredUsers } = collegeContext;

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
        else if(!users) {
            getUsers();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, collegeContext]);

    return  (
        <div className="users-container">
            <div className="users-img-container">
                <img className="alumni-img" src={profile} alt="users" />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <AlumniFilter type="users" />
                {loadingUsers ? (
                    <div>LOADING</div>
                ) : (
                    <div className="grid">
                        {(filteredUsers || users).map((alumnus) => (
                            <User key={alumnus._id} user={alumnus} college={user.collegeName}/>
                        ))}
                    </div> 
                )}
            </div>
        </div>
    );
};

export default Users;
