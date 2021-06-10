import { useEffect, useContext, useState } from 'react';
import CollegeContext from "../../../context/college/CollegeContext";
import events from "../../../assets/events.svg";
import "./events.css";

const EventForm = () => {
    const collegeContext = useContext(CollegeContext);
    const { addEvent, editEvent, currentEvent, clearCurrent } = collegeContext;
    
    const [event, setEvent] = useState({
        name: "",
        date: "",
        description: "",
        venue: "",
        link: ""
    });

    useEffect(() => {
        if(!currentEvent) {
            setEvent({
                name: "",
                date: "",
                description: "",
                venue: "",
                link: ""
            });
        }
        else {
            setEvent(currentEvent);
        }
        // eslint-disable-next-line
    }, [currentEvent, collegeContext]);

    const { name, date, description, venue, link } = event;

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!currentEvent) {
            addEvent(event);
        }
        else {
            editEvent(currentEvent._id, event);
        }
        clearCurrent();
    };

    return (
        <div className="form-container">
            <div className="form-image-container">
                <img className="form-image" src={events} alt="events" />
            </div>
            <div>
                <div className="heading">Add an event</div>
                <div className="event-form">
                    <form onSubmit={onSubmit}>
                        <div className="label"><i className="fas fa-pen-square"></i> Event Name</div>
                        <input className="form-input" type="text" name="name" value={name} onChange={onChange} required />
                        <div className="label"><i className="fas fa-calendar-check"></i> Event Date</div>
                        <input className="form-input" type="date" name="date" value={date} onChange={onChange} required />
                        <div className="label"><i className="fas fa-map-marker-alt"></i> Venue</div>
                        <input className="form-input" type="text" name="venue" value={venue} onChange={onChange} required />
                        <div className="label"><i className="fas fa-link"></i> Link</div>
                        <input className="form-input" type="text" name="link" value={link} onChange={onChange} required />
                        <div className="label"><i className="fas fa-calendar-week"></i> Description</div>
                        <textarea name="description" cols="38" rows="6" value={description} onChange={onChange} required></textarea>
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className={`submit-button ${currentEvent ? "edit-bg" : "add-bg"}`} type="submit">
                                <i className={`fas fa-${currentEvent ? "edit" : "plus-circle"}`}></i> {currentEvent ? "Edit Event" : "Add Event"}
                            </button>                
                            {currentEvent &&
                                <button className="submit-button" onClick={clearCurrent}><i className="fas fa-backspace"></i> Clear</button>
                            }   
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
