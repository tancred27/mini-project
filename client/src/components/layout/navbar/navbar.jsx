import { useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";
import UserContext from "../../../context/user/UserContext";
import "./navbar.css";
import jwt from "jsonwebtoken";

const Navbar = (props) => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const { isAuthenticated, user, type, logout, loadUser, loading } = authContext;
    const { clearCurrentProfile } = userContext;

    const [navLinks, setNavLinks] = useState(false);

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
        if (!loading) {
            setNavLinks(true);
        }
        return () => {
            setNavLinks({});
        }
        // eslint-disable-next-line
    }, [isAuthenticated, user, loading])

    const onClick = () => {
        clearCurrentProfile();
    }

    const collegeLinks = (
        <div className="nav-links">
            <Link to="/events" className="nav-link"><i className="fas fa-calendar-alt"></i> Events</Link>
            <Link to="/users" className="nav-link"><i className="fas fa-user"></i> Users</Link>
            <Link to="/alumni" className="nav-link"><i className="fas fa-users"></i> Alumni</Link>
            <Link to="/contact/all" className="nav-link"><i className="fas fa-paper-plane"></i> Contact</Link>
            <div className="nav-link" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Logout</div>
        </div>
    );

    const userLinks = (
        <div className="nav-links">
            {user && <Link to={`/profile/${user._id}`} onClick={onClick} className="nav-link"><i className="fas fa-user-plus"></i> Profile</Link>}
            {user && user.verified && <Link to="/events" className="nav-link"><i className="fas fa-calendar-alt"></i> Events</Link>}
            {user && user.verified && <Link to="/alumni" className="nav-link"><i className="fas fa-users"></i> Alumni</Link>}
            {user && user.verified && <Link to="/contact/college" onClick={onClick} className="nav-link"><i className="fas fa-paper-plane"></i> Contact</Link>}
            <Link to="/update" className="nav-link"><i className="fas fa-pen-alt"></i> Update</Link>
            <div className="nav-link" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Logout</div>
        </div>
    );

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <i className="fas fa-user-graduate"></i> Alumni Portal
            </div>
            {navLinks && (
                isAuthenticated && (type === "user" ? userLinks : collegeLinks)
            )}
        </div>
    );
};

export default withRouter(Navbar);