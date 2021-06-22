import { useEffect, useState, useContext } from "react";
import "./contact.css";
import contact from "../../assets/contact.svg";
import AuthContext from "../../context/auth/AuthContext";
import UserContext from "../../context/user/UserContext";
import CollegeContext from "../../context/college/CollegeContext";
import jwt from "jsonwebtoken";
import Fallback from "../../fallback";

const Contact = (props) => {
    const { id } = props.match.params;
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const userContext = useContext(UserContext);
    const { isAuthenticated, loadUser, user, type, sendEmail, sendSms } = authContext;
    const { currentUser, getUser } = collegeContext; 
    const { currentProfile, setCurrentProfile, clearCurrentProfile } = userContext;
    
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
        else if (id !== "all") {
            if (type === "college") {
                if(!currentUser) {
                    getUser(id);
                }
                else {
                    if (currentUser._id !== id) getUser(id);
                }
            }
            else {
                if(!currentProfile) {
                    setCurrentProfile(id, id === "college" ? "user" : "college");
                }
                else if(id !== "college") {
                    if(currentProfile._id !== id) setCurrentProfile(id, id === "college" ? "user" : "college");
                }
            }
        }
        // eslint-disable-next-line
    }, [isAuthenticated, user, currentUser, currentProfile ]);

    let userProfile = type === "user" ? currentProfile : currentUser;

    const [emailState, setEmailState] = useState({
        subject: "",
        text: ""
    });

    const [smsState, setSmsState] = useState({
        text: ""
    });

    const onSubmitEmail = () => {
        sendEmail({
            to: userProfile.email,
            ...emailState
        });
        alert("Email Sent!");
        setEmailState({
            subject: "",
            text: ""
        });
        clearCurrentProfile();
    };

    const onSubmitSms = () => {
        sendSms({
            to: userProfile.mobile,
            ...smsState
        });
        alert("SMS Sent!");
        setSmsState({
            text: ""
        });
        clearCurrentProfile();
    };

    const onEmailChange = (e) => setEmailState({ ...emailState, [e.target.name]: e.target.value });

    const onSmsChange = (e) => setSmsState({ ...smsState, [e.target.name]: e.target.value });

    return (id !== "all" && !userProfile)
    ? ( <Fallback /> ) 
    : (
        <div className="form-container">
            <div>
                <div className="heading">Send Email</div>
                <div className="contact-form">
                    <form onSubmit={onSubmitEmail}>
                        <div className="label"><i className="fas fa-envelope"></i> Receiver</div>
                        <input className="form-input" type="text" readOnly value={id === "all" ? "All Alumni" : userProfile.email} required />
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
                        <input className="form-input" type="text" readOnly value={id === "all" ? "All Alumni" : userProfile.mobile} required />
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
    )
};

export default Contact;
