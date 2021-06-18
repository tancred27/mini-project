import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import profile from "../../assets/profile1.jpeg";
import AuthContext from "../../context/auth/AuthContext";
import CollegeContext from "../../context/college/CollegeContext";
import check from "../../assets/check.png";
import jwt from "jsonwebtoken";

const Profile = (props) => {
    const { id } = props.match.params;
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, type, loadUser } = authContext;
    const { currentUser, getUser, verifyUser } = collegeContext; 
    
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
        if(!currentUser) {
            getUser(id);
        }
        else {
            if (currentUser._id !== id) getUser(id);
        }
        // eslint-disable-next-line
    }, [isAuthenticated, currentUser]);

    const onClick = () => {
        verifyUser(id);
    };

    return !currentUser ? (
        <div>LOADING</div>
    ) : (
        <div className="profile-container">
            <div className="profile-card">
                <div style={{ width: "60%" }}>
                    <div className="profile-heading">
                        {currentUser.name} &nbsp;
                        {currentUser.verified && <img className="check-img" src={check} alt="check" />}
                    </div>
                    <img className="work-img" src={profile} alt="work" />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {type === "college" && !currentUser.verified && 
                            <div className="btn verify" onClick={onClick}><i className="fas fa-check-circle"></i> Verify user</div>
                        } 
                        <Link to={`/contact/${currentUser._id}`} className="btn contact"><i className="fas fa-paper-plane"></i> Contact</Link>
                    </div>
                </div>
                <div className="profile-info">
                    <div>
                        <img className="profile-big-img" src={`https://robohash.org/${currentUser.name}`} alt="" />
                    </div>
                    <div className="profile-content">
                        <div className="profile-field bg-dark"><i className="fas fa-graduation-cap"></i>&nbsp;College: &nbsp;{currentUser.college.collegeName}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-code-branch"></i>&nbsp;Branch: &nbsp;{currentUser.branch}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-id-badge"></i>&nbsp;Roll Number: &nbsp;{currentUser.rollNumber}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-calendar-week"></i>&nbsp;Year of graduation: &nbsp;{currentUser.year}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-university"></i>&nbsp;Company: &nbsp;{currentUser.company}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-envelope"></i>&nbsp;Email: &nbsp;{currentUser.email}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-mobile-alt"></i>&nbsp;Mobile: &nbsp;{currentUser.mobile}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-pen-alt"></i>&nbsp;Info: &nbsp;{currentUser.info}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
