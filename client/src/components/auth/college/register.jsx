import "../auth.css";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/auth/AuthContext";
import AlertContext from "../../../context/alert/AlertContext";
import Alert from "../../layout/alert/alert";
import { withRouter } from "react-router-dom";

const Register = ({ display, history }) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { error, register, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) { 
            history.push("/events");
        }
        // eslint-disable-next-line
    }, [history, isAuthenticated]);

    const [college, setCollege] = useState({
        name: "",
        collegeName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPass: ""
    });

    const [visible, setVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);

    const { name, email, collegeName, mobile, password, confirmPass } = college;

    const onChange = (e) => setCollege({ ...college, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password && !error) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).+/g;
            if (password.length < 8 || password.length > 30) {
                setAlert("Password length must be between 8 and 30 characters!", "error");
            }
            else if (password.search(regex) === -1 && !error) {
                setAlert("Password must have small letters, at least 1 capital letter, 1 digit and 1 special character!", "error");
            }
            else if (password !== confirmPass) {
                setAlert("Password and Confirm Password must be the same!", "error");
            }
            else {
                const formData = { name, collegeName, email, mobile, password };
                register(formData, "college");
            }
        }
    };

    return display ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Alert />
            <div className="heading">Register as a college representative</div><br />
            <div className="auth-form">
                <form onSubmit={onSubmit}>
                    <div className="register-label"><i className="fas fa-user"></i> Name</div>
                    <input className="form-input" type="text" name="name" value={name} onChange={onChange} required />
                    <div className="register-label"><i className="fas fa-university"></i> College Name</div>
                    <input className="form-input" type="text" name="collegeName" value={collegeName} onChange={onChange} required />
                    <div className="register-label"><i className="fas fa-envelope"></i> Email</div>
                    <input className="form-input" type="email" name="email" value={email} onChange={onChange} required />
                    <div className="register-label"><i className="fas fa-mobile-alt"></i> Mobile</div>
                    <input className="form-input" type="number" name="mobile" value={mobile} onChange={onChange} required />
                    <div className="register-label"><i className="fas fa-key"></i> Password</div>
                    <div className="password">
                        <div style={{ width: "90%" }}>
                            <input style={{ width: "100%", fontSize: "16px" }} type={visible && password ? "text" : "password"} name="password" value={password} onChange={onChange} required /> 
                        </div>
                        <div onClick={() => setVisible(!visible)} style={{ width: "10%", cursor: "pointer", display: password ? "block" : "none" }}>
                            <i class={`fas fa-eye${visible ? "" : "-slash"}`}></i>
                        </div>
                    </div>
                    <div className="register-label"><i className="fas fa-key"></i> Confirm Password</div>
                    <div className="password">
                        <div style={{ width: "90%" }}>
                            <input style={{ width: "100%", fontSize: "16px" }} type={confirmPassVisible && confirmPass ? "text" : "password"} name="confirmPass" value={confirmPass} onChange={onChange} required /> 
                        </div>
                        <div onClick={() => setConfirmPassVisible(!confirmPassVisible)} style={{ width: "10%", cursor: "pointer", display: confirmPass ? "block" : "none" }}>
                            <i class={`fas fa-eye${confirmPassVisible ? "" : "-slash"}`}></i>
                        </div>
                    </div>
                    <br /><br />
                    <button className="submit-button"><i className="fas fa-user-plus"></i> register</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default withRouter(Register);
