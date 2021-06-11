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
    const { isAuthenticated, loadUser } = authContext;
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
            <div style={grid}>
                {users && users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

const grid = {
    padding: "60px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "7rem",
};


export default Users;
