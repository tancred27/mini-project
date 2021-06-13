import { useState } from "react";
import { Redirect } from "react-router-dom";

const User = ({ user, college }) => {
    const [state, setState] = useState(false);

    const onClick = () => setState(true);
    return state ? (
        <Redirect to={{ pathname: "/profile", state: { user, college } }} />
    ) : (
        <div className="card" onClick={onClick}>
            <div className="profile-img">
                <img className="profile" src={`https://robohash.org/${user._id}`} alt="me" />
            </div>
            <div className="content">
                <div className="name">{user.name}</div>
                <hr style={{ height: "2px", color: "#7b1fa2", backgroundColor: "#7b1fa2" }}/>
                <div className="info">
                    <div className="info-content">
                        <i className="fas fa-mobile-alt"></i>&nbsp;
                        <span style={{ color: "#333" }}> {user.mobile}</span>
                    </div>
                    <div className="info-content">
                        <i className="fas fa-envelope"></i>&nbsp;
                        <span style= {{ color: "#333" }}> {user.email}</span>
                    </div>
                </div> <br />
                <div className="info">
                    <div className="info-content">
                        <i className="fas fa-id-badge"></i>&nbsp;
                        <span style= {{ color: "#333" }}> {user.rollNumber}</span>
                    </div>
                    <div className="info-content">
                        <i className="fas fa-building"></i>&nbsp;
                        <span style= {{ color: "#333" }}> {user.company}</span>
                    </div>
                </div>
            </div>
        </div>   
    );
};

export default User;
