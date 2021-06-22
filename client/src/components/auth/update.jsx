import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
import Alert from '../layout/alert/alert';
import edit from "../../assets/edit.svg";
import jwt from "jsonwebtoken";
import "./update.css";
import Fallback from '../../fallback';

const Update = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { isAuthenticated, user, loadUser, updateProfile, error, clearErrors } = authContext;

    const [form, setForm] = useState({
        email: user ? user.email : "",
        company: user ? user.company : "",
        info: user ? user.info : "",
        password: ""
    });
    
    useEffect(() => {
        if (!isAuthenticated) {
            if (localStorage.getItem("token")) {
                let decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWT_SECRET);
                loadUser(decoded.user.type);
            }
            else {
                props.history.push("/");
            }
        }
        if (error) {
            setAlert(error.msg, error.type, 5000);
            clearErrors();
        }
        if (user) {
            setForm({
                email: user.email,
                company: user.company,
                info: user.info,
                password: ""
            });
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error, user]);

    const { email, company, info, password } = form;

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile(form);
    };

    return !user ? (
        <Fallback />
    ) : (
        <div className="form-container">
            <div className="form-image-container">
                <img className="update-img" src={edit} alt="update" />
            </div>
            <div>
                <Alert />
                <div className="heading">Update Profile</div>
                <div className="update-form">
                    <form onSubmit={onSubmit}>
                        <div className="label"><i className="fas fa-pen-square"></i> Email</div>
                        <input className="form-input" type="text" name="email" value={email} onChange={onChange} required />
                        <div className="label"><i className="fas fa-calendar-check"></i> Company</div>
                        <input className="form-input" type="text" name="company" value={company} onChange={onChange} required />
                        <div className="label"><i className="fas fa-calendar-check"></i> Info</div>
                        <textarea name="info" cols="38" rows="6" value={info} onChange={onChange} required></textarea>
                        <div className="label"><i className="fas fa-calendar-check"></i> Password</div>
                        <input className="form-input" type="text" name="password" value={password} onChange={onChange} required />
                        <br /><br />
                        <button className="submit-button" type="submit"><i className="fas fa-pen-alt"></i> Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
