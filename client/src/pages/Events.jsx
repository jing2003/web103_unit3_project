import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";
import "../css/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    const getEventsPageData = async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents();
        const locationsData = await LocationsAPI.getAllLocations();

        setEvents(eventsData);
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching events page data:", error);
      }
    };

    getEventsPageData();
  }, []);

  const filteredEvents =
    selectedLocation === "all"
      ? events
      : events.filter(
          (event) => event.location_id === parseInt(selectedLocation),
        );

  return (
    <div className="events-page">
      <h2>All Events</h2>

      <section className="events-filter">
        <label htmlFor="location-filter">Filter by location: </label>

        <select
          id="location-filter"
          value={selectedLocation}
          onChange={(event) => setSelectedLocation(event.target.value)}
        >
          <option value="all">All Locations</option>

          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </section>

      <section className="events-list">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
          <h2>No events found for this location.</h2>
        )}
      </section>
    </div>
  );
};

export default Events;
