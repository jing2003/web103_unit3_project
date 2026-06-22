import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Event from "../components/Event";
import LocationsAPI from "../services/LocationsAPI";
import EventsAPI from "../services/EventsAPI";
import "../css/LocationEvents.css";

const LocationEvents = () => {
  const [location, setLocation] = useState({});
  const [events, setEvents] = useState([]);

  const currentLocation = useLocation();

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const slug = currentLocation.pathname.replace("/", "");

        const locationData = await LocationsAPI.getLocationBySlug(slug);
        const eventsData = await EventsAPI.getEventsByLocationSlug(slug);

        setLocation(locationData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching location events:", error);
      }
    };

    getLocationData();
  }, [currentLocation.pathname]);

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} alt={location.name} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              remaining={event.remaining}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i> No events
            scheduled at this location yet!
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
