import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <i className="fas fa-graduation-cap"></i><Link to="/" className="nav-link">ATS</Link>
            </div>
            <div className="nav-links">
                <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</Link>
                <Link to="/register" className="nav-link"><i className="fas fa-user-plus"></i> Register</Link>
            </div>
        </div>
    );
};

export default Navbar;