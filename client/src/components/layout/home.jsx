import { useState } from "react";
import UserLogin from "../auth/user/login";
import UserRegister from "../auth/user/register";
import CollegeLogin from "../auth/college/login";
import CollegeRegister from "../auth/college/register";
import "../auth/auth.css";
import "./home.css";

const Home = () => {
    const [state, setState] = useState({
        userLogin: false,
        userRegister: true,
        clgLogin: false,
        clgRegister: false
    });

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
                    <div className="data-container">
                        <div className="main-header">Welcome to Alumni Portal</div>
                        <div className="para-content">
                            <div className="para-header">Are you an alumnus ?</div>
                            <div className="para-info">Register on our website as an alumnus and get verified by your college to gain access to the event portal of the college and view other alumni! Maintain a profile for your fellow alumni to check out! Keep in touch with your college without hassle through our website!</div>
                            <div className="para-buttons">
                                <div className="para-button" onClick={() => displayForm("uR")}>
                                    <i className="fas fa-user-plus"></i> Register
                                </div>
                                <div className="para-button login" onClick={() => displayForm("uL")}>
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </div>
                            </div>
                        </div>
                        <div className="para-content">
                            <div className="para-header">Are you a college representative ?</div>
                            <div className="para-info">Register on our website as a college representative and get access to your very own alumni portal! You can post all your events on your event portal! Contact your alumni effortlessly!</div>
                            <div className="para-buttons">
                                <div className="para-button login" onClick={() => displayForm("cL")}>
                                    <i className="fas fa-sign-in-alt"></i> Login
                                </div>
                                <div className="para-button" onClick={() => displayForm("cR")}>
                                    <i className="fas fa-user-plus"></i> Register
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-right">
                <UserLogin display={state.userLogin ? "block" : null} />
                <UserRegister display={state.userRegister ? "block" : null} />
                <CollegeLogin display={state.clgLogin ? "block" : null} />
                <CollegeRegister display={state.clgRegister ? "block" : null} />
            </div>
        </div>
    );
};

export default Home;
