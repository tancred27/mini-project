import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext"
import CollegeContext from "../../../context/college/CollegeContext";
import User from "./user";
import jwt from "jsonwebtoken";
import profile from "../../../assets/profile2.svg";
import "./users.css";

const Users = (props) => {
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, loadUser } = authContext;
    const { users, loadingUsers, getUsers } = collegeContext;

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
    }, [isAuthenticated, users, loadingUsers]);

    return loadingUsers ? (
        <div>LOADING</div>
    ) : (
        <div className="users-container">
            <div className="users-img-container">
                <img className="users-img" src={profile} alt="users" />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div className="grid">
                    {users && users.map((student) => (
                        <User key={student._id} user={student} college={user.collegeName}/>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Users;
