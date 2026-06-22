const API_URL = "/api";

const getAllEvents = async () => {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();
  return data;
};

const getEventById = async (id) => {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const data = await response.json();
  return data;
};

const getEventsByLocationId = async (locationId) => {
  const response = await fetch(`${API_URL}/locations/id/${locationId}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events for location");
  }

  const data = await response.json();
  return data;
};

const getEventsByLocationSlug = async (slug) => {
  const response = await fetch(`${API_URL}/locations/${slug}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events for location");
  }

  const data = await response.json();
  return data;
};

// This alias matches the function name currently used in Event.jsx
const getEventsById = getEventById;

export default {
  getAllEvents,
  getEventById,
  getEventsById,
  getEventsByLocationId,
  getEventsByLocationSlug,
};
