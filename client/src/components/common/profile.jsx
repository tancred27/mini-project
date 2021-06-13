import "./profile.css";
import profile from "../../assets/profile1.jpeg";
import check from "../../assets/check.png";

const Profile = (props) => {
    const { user, college } = props.location.state;
    console.log(props.location.state);
   
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div style={{ width: "60%" }}>
                    <span className="profile-heading">{user.name}</span> {user.verified && <img className="check-img" src={check} alt="check" />}
                    <img className="work-img" src={profile} alt="work" />
                </div>
                <div className="profile-info">
                    <div>
                        <img className="profile-big-img" src={`https://robohash.org/${user.name}`} alt="" />
                    </div>
                    <div className="profile-content">
                        <div className="profile-field bg-dark"><i className="fas fa-graduation-cap"></i>&nbsp;College: &nbsp;{college}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-code-branch"></i>&nbsp;Branch: &nbsp;{user.branch}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-id-badge"></i>&nbsp;Roll Number: &nbsp;{user.rollNumber}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-calendar-week"></i>&nbsp;Year of graduation: &nbsp;{user.year}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-university"></i>&nbsp;Company: &nbsp;{user.company}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-envelope"></i>&nbsp;Email: &nbsp;{user.email}</div>
                        <div className="profile-field bg-dark"><i className="fas fa-mobile-alt"></i>&nbsp;Mobile: &nbsp;{user.mobile}</div>
                        <div className="profile-field bg-lite"><i className="fas fa-pen-alt"></i>&nbsp;Info: &nbsp;{user.info}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
