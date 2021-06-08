import "../auth/auth.css";
import { useEffect, useContext, useState } from "react";
import Alert from "../layout/alert/alert";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import { withRouter } from "react-router-dom";

const Login = ({ display, type, history }) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const { email, password } = user;

    useEffect(() => {
        if (isAuthenticated) { 
            history.push(type === "user" ? "/profile" : "/events");
        }
        if (error) {
            setAlert(error, "error");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [history, error, isAuthenticated]);

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(user, type);
    };

    return display ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Alert />
            <div className="heading">Login as {type === "user" ? "an alumnus" : "a college representative"}</div><br />
            <div className="auth-form">
                <form onSubmit={onSubmit}>
                    <div className="label"><i className="fas fa-envelope"></i> {type === "user" ? "Email" : "College Email"}</div>
                    <input className="form-input" type="email" name="email" value={email} onChange={onChange} required />
                    <div className="label"><i className="fas fa-key"></i> Password</div>
                    <input className="form-input" type="password" name="password" value={password} onChange={onChange} required />
                    <br /><br />
                    <button className="submit-button" type="submit"><i className="fas fa-sign-in-alt"></i> login</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default withRouter(Login);
