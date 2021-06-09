import { useEffect, useState, useContext } from "react";
import Login from "../../common/login";
import UserRegister from "../../auth/user/register";
import CollegeRegister from "../../auth/college/register";
import "../../auth/auth.css";
import "./home.css";
import grad from "../../../assets/grad.svg";
import connect from "../../../assets/connect.svg";
import book from "../../../assets/book.svg";
import AuthContext from "../../../context/auth/AuthContext";
import jwt from "jsonwebtoken";

const Home = (props) => {
    const authContext = useContext(AuthContext);
    const { type, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push(type === "user" ? "/profile" : "/events");
        }
        if (localStorage.getItem("token")) {
            let decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWT_SECRET);
            props.history.push(decoded.type === "user" ? "/profile" : "/events");
        }
    }, [props.history, type, isAuthenticated])

    const [state, setState] = useState({
        userLogin: false,
        userRegister: false,
        clgLogin: false,
        clgRegister: false
    });

    const { userLogin, userRegister, clgLogin, clgRegister } = state;

    const displayForm = (form) => {
        setState({
            userLogin: form === "uL" ? true : false,
            userRegister: form === "uR" ? true : false,
            clgLogin: form === "cL" ? true : false,
            clgRegister: form === "cR" ? true : false
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="form-selector">
                    <div className="main-header">
                        Welcome to <span style={{ color: "#a6c" }}>Alumni Portal</span><br /><br />
                        <img className="main-img" src={grad} alt="grad" />
                    </div>
                    <div className="data-container">
                        <div className="para-content-grad">
                            <div className="para-header">Are you an alumnus ?</div>
                            <div className="para-info">Register on our website as an alumnus and get verified by your college to gain access to the event portal of the college and view other alumni! Maintain a profile for your fellow alumni to check out! Keep in touch with your college without hassle through our website!</div>
                            <div className="para-buttons">
                                <a href="#auth" className="para-button" onClick={() => displayForm("uR")}>
                                    <i className="fas fa-user-plus"></i> Register
                                </a>
                                <a href="#auth" className="para-button login" onClick={() => displayForm("uL")}>
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </a>
                            </div>
                        </div>
                        <div className="main-img-container">
                            <img className="main-img-grad" src={book} alt="grad" />
                        </div>
                    </div>
                    <div className="data-container">
                        <div className="main-img-container">
                            <img className="main-img-connect" src={connect} alt="connect" />
                        </div>
                        <div className="para-content">
                            <div className="para-header">Are you a college representative ?</div>
                            <div className="para-info">Register on our website as a college representative and get access to your very own alumni portal! You can post all your events on your event portal! Contact your alumni effortlessly!</div>
                            <div className="para-buttons">
                                <a href="#auth" className="para-button login" onClick={() => displayForm("cL")}>
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </a>
                                <a href="#auth" className="para-button" onClick={() => displayForm("cR")}>
                                    <i className="fas fa-user-plus"></i> Register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-right" id="auth">
                <Login display={userLogin || clgLogin ? "block" : null} type={userLogin ? "user" : "college"} />
                <UserRegister display={userRegister ? "block" : null} />
                <CollegeRegister display={clgRegister ? "block" : null} />
            </div>
            <br /><br />
        </div>
    );
};

export default Home;
