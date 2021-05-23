import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to="/user/login">Login as a user</Link>
            <br />
            <Link to="/user/register">Register as a user</Link>
            <br />
            <Link to="/college/login">Login as a college</Link>
            <br />
            <Link to="/college/register">Register as a college</Link>
        </div>
    );
};

export default Home;
