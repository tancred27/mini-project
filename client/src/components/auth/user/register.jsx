import "../auth.css";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/auth/AuthContext";
import AlertContext from "../../../context/alert/AlertContext";
import Alert from "../../layout/alert/alert";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Register = ({ display }) => {
    const API = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : "/api";
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { error, register, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    const [colleges, setColleges] = useState(null);

    useEffect(() => {
        const getColleges = async() => {
            const res = await axios.get(`${API}/college/list`);
            setColleges(res.data);
        }
        if (error) {
            setAlert(error.msg, error.type, 5000);
            clearErrors();
        }
        if (!colleges) {
            getColleges();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, colleges]);

    const [user, setUser] = useState({
        name: "",
        rollNumber: "",
        email: "",
        mobile: "",
        college: "",
        branch: "",
        company: "",
        year: "",
        info: "",
        password: "",
        confirmPass: ""
    });

    const [visible, setVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);

    const { name, email, rollNumber, mobile, college, branch, company, year, info, password, confirmPass } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password && !error) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).+/g;
            if (password.length < 8 || password.length > 30) {
                setAlert("Password length must be between 8 and 30 characters!", "error", 5000);
            }
            else if (password.search(regex) === -1 && !error) {
                setAlert("Password must have small letters, at least 1 capital letter, 1 digit and 1 special character!", "error", 7000);
            }
            else if (password !== confirmPass) {
                setAlert("Password and Confirm Password must be the same!", "error", 4000);
            }
            else {
                const formData = { name, rollNumber, email, mobile, college, branch, company, year, info, password };
                register(formData, "user");
            }
        }
    };

    return display ? ( 
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Alert />
            <div className="heading">Register as an alumnus</div><br />
            <div className="auth-form wide">
                <form onSubmit={onSubmit} style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div>
                            <div className="register-label"><i className="fas fa-user"></i> Name</div>
                            <input className="form-input" type="text" name="name" value={name} onChange={onChange} required />
                            <div className="register-label"><i className="fas fa-id-badge"></i> Roll Number</div>
                            <input className="form-input" type="text" name="rollNumber" value={rollNumber} onChange={onChange} required />
                            <div className="register-label"><i className="fas fa-envelope"></i> Email</div>
                            <input className="form-input" type="email" name="email" value={email} onChange={onChange} required />
                            <div className="register-label"><i className="fas fa-mobile-alt"></i> Mobile</div>
                            <input className="form-input" type="number" name="mobile" value={mobile} onChange={onChange} required />
                        </div>
                        <div>
                            <div className="register-label"><i className="fas fa-university"></i> College</div>
                            <select name="college" value={college} onChange={onChange} required>
                                <option>--Select--</option>
                                {colleges && colleges.map((college) => (
                                    <option key={college._id} name={college._id} value={college._id}>{college.collegeName}</option>
                                ))}
                            </select>
                            <div className="register-label"><i className="fas fa-code-branch"></i> Branch</div>
                            <select name="branch" value={branch} onChange={onChange} required>
                                <option>--Select--</option>
                                <option name="CSE">CSE</option>
                                <option name="ECE">ECE</option>
                                <option name="IT">IT</option>
                                <option name="MECH">MECH</option>
                                <option name="CIVIL">CIVIL</option>
                            </select>
                            <div className="register-label"><i className="fas fa-calendar-week"></i> Year of passing out</div>
                            <input className="form-input" type="month" name="year" value={year} onChange={onChange} required />
                            <div className="register-label"><i className="fas fa-building"></i> Company</div>
                            <input className="form-input" type="text" name="company" value={company} onChange={onChange} autoComplete="company" required />
                        </div>
                        <div>
                            <div className="register-label"><i className="fas fa-calendar-week"></i> Employment info/experience</div>
                            <textarea name="info" cols="42" rows="6" value={info}  onChange={onChange} required></textarea>
                            <div className="register-label"><i className="fas fa-key"></i> Password</div>
                            <div className="password">
                                <div style={{ width: "90%" }}>
                                    <input style={{ width: "100%", fontSize: "16px" }} type={visible && password ? "text" : "password"} name="password" value={password} onChange={onChange} autoComplete="new-password" required /> 
                                </div>
                                <div onClick={() => setVisible(!visible)} style={{ width: "10%", cursor: "pointer", display: password ? "block" : "none" }}>
                                    <i className={`fas fa-eye${visible ? "" : "-slash"}`}></i>
                                </div>
                            </div>
                            <div className="register-label"><i className="fas fa-key"></i> Confirm Password</div>
                            <div className="password">
                                <div style={{ width: "90%" }}>
                                    <input style={{ width: "100%", fontSize: "16px" }} type={confirmPassVisible && confirmPass ? "text" : "password"} name="confirmPass" value={confirmPass} onChange={onChange} autoComplete="none" required /> 
                                </div>
                                <div onClick={() => setConfirmPassVisible(!confirmPassVisible)} style={{ width: "10%", cursor: "pointer", display: confirmPass ? "block" : "none" }}>
                                    <i className={`fas fa-eye${confirmPassVisible ? "" : "-slash"}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <button className="submit-button" type="submit"><i className="fas fa-user-plus"></i> register</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default withRouter(Register);
