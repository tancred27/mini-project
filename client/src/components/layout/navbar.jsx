import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <i class="fas fa-user-graduate"></i> &nbsp;<Link to="/" className="nav-link">Alumni <span style={{ fontWeight: "500" }}>Portal</span></Link>
            </div>
            <div className="nav-links">
                {/* <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</Link>
                <Link to="/register" className="nav-link"><i className="fas fa-user-plus"></i> Register</Link> */}
            </div>
        </div>
    );
};

export default Navbar;