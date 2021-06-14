import { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/AuthContext"
import CollegeContext from "../../../context/college/CollegeContext";
import EventForm from "./eventForm";
import Event from "./event";
import jwt from "jsonwebtoken";
import Fallback from "../../../fallback";
import "./events.css";

const Events = (props) => {
    const authContext = useContext(AuthContext);
    const collegeContext = useContext(CollegeContext);
    const { isAuthenticated, user, loadUser } = authContext;
    const { events, loadingEvents, setEvents } = collegeContext;

    useEffect(() => {
        if (!isAuthenticated) {
            if (localStorage.getItem("token")) {
                let decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWT_SECRET);
                if (decoded.user.type === "college") {
                    loadUser("college");
                }
                else {
                    props.history.push("/profile");
                }
            }
            else {
                props.history.push("/");
            }
        }
        else if(user && !events) {
            setEvents(user.events);
        }
        // eslint-disable-next-line
    }, [isAuthenticated, events, user, loadingEvents]);

    return (
        <div className="events-container">
            <EventForm />
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={grid}>
                    {loadingEvents ? <Fallback /> : (events.map(event => (
                        <Event key={event._id} type="college" event={event} />
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
