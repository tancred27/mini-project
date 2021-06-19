import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext"
import UserContext from "../../../context/user/UserContext";
import CollegeContext from "../../../context/college/CollegeContext";
import EventForm from "./eventForm";
import Event from "./event";
import jwt from "jsonwebtoken";
import Fallback from "../../../fallback";
import eventImg from "../../../assets/events.svg";
import "./events.css";

const Events = (props) => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, type, loadUser } = authContext;
    const { events, setEvents } = collegeContext;
    const { collegeEvents, setCollegeEvents } = userContext;

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
        else {
            if (type === "college" && !events) {
                setEvents(user.events);
            }
            else if(type === "user" && !collegeEvents) {
                setCollegeEvents();
            }
        }
        // eslint-disable-next-line
    }, [isAuthenticated, user, type, collegeEvents, events]);

    let userEvents = type === "user" ? collegeEvents : events;

    return (
        <div className="events-container">
            {type === "college" && <EventForm />}
            {type === "user" && <img className="form-image smol" src={eventImg} alt="events" />}
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={grid}>
                    {!userEvents ? <Fallback /> : (userEvents.map(event => (
                        <Event key={event._id} type={type} event={event} />
                    )))} 
                </div>
            </div>
        </div>
    )
};

const grid = {
    padding: "60px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "7rem",
};

export default Events;
