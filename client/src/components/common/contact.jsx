import { useEffect, useState, useContext } from "react";
import "./contact.css";
import contact from "../../assets/contact.svg";
import AuthContext from "../../context/auth/AuthContext";
import CollegeContext from "../../context/college/CollegeContext";
import jwt from "jsonwebtoken";

const Contact = (props) => {
    const { id } = props.match.params;
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, loadUser } = authContext;
    const { currentUser, getUser, sendEmail, sendSms } = collegeContext; 
    
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
        if (id !== "all") {
            if(!currentUser) {
                getUser(id);
            }
            else {
                if (currentUser._id !== id) getUser(id);
            }
        }
        // eslint-disable-next-line
    }, [isAuthenticated, currentUser]);

    const [emailState, setEmailState] = useState({
        to: id === "all" ? "All Alumni" : currentUser.email,
        subject: "",
        text: ""
    });

    const [smsState, setSmsState] = useState({
        to: id === "all" ? "All Alumni" : currentUser.mobile,
        text: ""
    });

    const onSubmitEmail = () => {
        sendEmail(emailState);
        alert("Email Sent!");
        setEmailState({
            to: id === "all" ? "All Alumni" : currentUser.email,
            subject: "",
            text: ""
        });
    };

    const onSubmitSms = () => {
        sendSms(smsState);
        alert("SMS Sent!");
        setSmsState({
            to: id === "all" ? "All Alumni" : currentUser.mobile,
            text: ""
        });
    };

    const onEmailChange = (e) => setEmailState({ ...emailState, [e.target.name]: e.target.value });

    const onSmsChange = (e) => setSmsState({ ...smsState, [e.target.name]: e.target.value });
    
    return id !== "all" && !currentUser ? (
        <div>LOADING</div>
    ) : (
         <div className="form-container">
            <div>
                <div className="heading">Send Email</div>
                <div className="contact-form">
                    <form onSubmit={onSubmitEmail}>
                        <div className="label"><i className="fas fa-envelope"></i> Receiver</div>
                        <input className="form-input" type="text" name="to" value={emailState.to} required />
                        <div className="label"><i className="fas fa-calendar-check"></i> Subject</div>
                        <input className="form-input" type="text" name="subject" value={emailState.subject} onChange={onEmailChange} required />
                        <div className="label"><i className="fas fa-pen-alt"></i> Body</div>
                        <textarea name="text" cols="38" rows="6" value={emailState.text} onChange={onEmailChange} required></textarea>
                        <br /><br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className="submit-button add-bg" type="submit">
                                <i className="fas fa-paper-plane"></i> Send Email
                            </button>                
                        </div>
                    </form>
                </div>
            </div>
            <div className="form-image-container">
                <img className="form-image" src={contact} alt="events" />
            </div>
            <div>
                <div className="heading">Send SMS</div>
                <div className="contact-form">
                    <form onSubmit={onSubmitSms}>
                        <div className="label"><i className="fas fa-mobile-alt"></i> Receiver</div>
                        <input className="form-input" type="text" name="to" value={smsState.to} required />
                        <div className="label"><i className="fas fa-pen-alt"></i> Text</div>
                        <textarea name="text" cols="38" rows="6" value={smsState.text} onChange={onSmsChange} required></textarea>
                        <br /><br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className="submit-button add-bg" type="submit">
                                <i className="fas fa-paper-plane"></i> Send SMS
                            </button>                
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
