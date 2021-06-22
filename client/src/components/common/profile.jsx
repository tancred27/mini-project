import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import profile from "../../assets/profile1.jpeg";
import AuthContext from "../../context/auth/AuthContext";
import CollegeContext from "../../context/college/CollegeContext";
import UserContext from "../../context/user/UserContext";
import check from "../../assets/check.png";
import Fallback from "../../fallback";
import jwt from "jsonwebtoken";

const Profile = (props) => {
    const { id } = props.match.params;
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const userContext = useContext(UserContext);
    const { isAuthenticated, type, loadUser, user } = authContext;
    const { currentUser, getUser, verifyUser } = collegeContext; 
    const { currentProfile, setCurrentProfile } = userContext;
    
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
        else if (type === "college") {
            if(!currentUser) {
                getUser(id);
            }
            else {
                if (currentUser._id !== id) getUser(id);
            }
        }
        else {
            if (!currentProfile) {
                setCurrentProfile(id, "college");
            }
            else {
                if(currentProfile._id !== id) {
                    setCurrentProfile(id, "college");
                }
            }
        }
        // eslint-disable-next-line
    }, [isAuthenticated, type, user, currentUser, currentProfile ]);

    const onClick = () => {
        verifyUser(id);
    };
    
    let userProfile = type === "user" ? currentProfile : currentUser;
    
    return !userProfile ? (
        <Fallback /> 
    ) : (
        <div className="profile-container">
            <div className="profile-card">
                <div style={{ width: "60%" }}>
                    <div className="profile-heading">
                        {userProfile.name} &nbsp;
                        {userProfile.verified && <img className="check-img" src={check} alt="check" />}
                    </div>
                    <img className="work-img" src={profile} alt="work" />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {type === "college" && !currentUser.verified && 
                            <div className="btn verify" onClick={onClick}><i className="fas fa-check-circle"></i> Verify user</div>
                        } 
                        {user && user._id !== userProfile._id && <Link to={`/contact/${userProfile._id}`} className="btn contact"><i className="fas fa-paper-plane"></i> Contact</Link>}
                    </div>
                </div>
                <div className="profile-info">
                    <div>
                        <img className="profile-big-img" src={`https://robohash.org/${userProfile.name}`} alt="" />
                    </div>
                    <div className="profile-content">
                        <div className="profile-field bg-dark"><i className="fas fa-graduation-cap"></i>&nbsp;College: &nbsp;{userProfile.college.collegeName}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-code-branch"></i>&nbsp;Branch: &nbsp;{userProfile.branch}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-id-badge"></i>&nbsp;Roll Number: &nbsp;{userProfile.rollNumber}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-calendar-week"></i>&nbsp;Year of graduation: &nbsp;{userProfile.year}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-university"></i>&nbsp;Company: &nbsp;{userProfile.company}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-envelope"></i>&nbsp;Email: &nbsp;{userProfile.email}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-mobile-alt"></i>&nbsp;Mobile: &nbsp;{userProfile.mobile}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-pen-alt"></i>&nbsp;Info: &nbsp;{userProfile.info}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
