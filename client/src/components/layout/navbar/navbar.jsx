import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";
import "./navbar.css";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, type, logout, loading } = authContext;

    const [navLinks, setNavLinks] = useState(false);

    useEffect(() => {
        console.log(type);
        if (!loading) {
            setNavLinks(true);
        }
        return () => {
            setNavLinks({});
        }
        // eslint-disable-next-line
    }, [isAuthenticated, user, loading])

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
            {user && user.verified && <Link to="/events" className="nav-link"><i className="fas fa-sign-in-alt"></i> Events</Link>}
            <Link to="/profile" className="nav-link"><i className="fas fa-user-plus"></i> Users</Link>
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

export default Navbar;