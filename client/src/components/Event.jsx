import React from "react";
import "../css/Event.css";

const Event = ({ title, date, time, image, remaining }) => {
  const eventDate = new Date(remaining);
  const today = new Date();
  const difference = eventDate - today;
  const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));
  const eventPassed = difference < 0;

  const getRemainingText = () => {
    if (!remaining) {
      return "";
    }

    if (daysRemaining < 0) {
      return "This event has already passed";
    }

    if (daysRemaining === 0) {
      return "This event is today!";
    }

    if (daysRemaining === 1) {
      return "1 day remaining";
    }

    return `${daysRemaining} days remaining`;
  };

  return (
    <article
      className={
        eventPassed ? "event-information passed-event" : "event-information"
      }
    >
      <img src={image} alt={title} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {date}
            <br />
            {time}
          </p>

          <p className={eventPassed ? "negative-time-remaining" : ""}>
            {getRemainingText()}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Event;
