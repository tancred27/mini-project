import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            Navbar
            <br />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/update">Update</Link>
        </div>
    );
};

export default Navbar;
