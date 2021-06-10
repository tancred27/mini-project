import { useContext } from "react";
import CollegeContext from "../../../context/college/CollegeContext";
import "./events.css";

const Event = ({ type, event }) => {
    const collegeContext = useContext(CollegeContext);
    const { setCurrent, clearCurrent, deleteEvent } = collegeContext;

    const onDelete = () => {
        deleteEvent(event._id);
        clearCurrent();
    };

    return (
        <div className="event">
            <div className="event-header">{event.name}</div>
            <div className="event-content">
                <div className="event-info">
                    <div className="date"><i className="fas fa-calendar-check"></i> {event.date.slice(0, 10)}</div>
                    <div className="venue"><i className="fas fa-map-marker-alt"></i> {event.venue}</div>
                </div>
                <div className="event-desc">{event.description}</div>
            </div>
            <div className="event-buttons" style={{ display: type === "college" ? "flex" : "none" }}>
                <div className="event-button edit" onClick={() => setCurrent(event)}>
                    <i className="fas fa-edit"></i> Edit
                </div>
                <div className="event-button delete" onClick={onDelete}>
                    <i className="fas fa-trash"></i> Delete
                </div>
            </div>
        </div>           
    );
};

export default Event;
