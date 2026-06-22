const API_URL = "/api";

const getAllLocations = async () => {
  const response = await fetch(`${API_URL}/locations`);

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data = await response.json();
  return data;
};

const getLocationById = async (id) => {
  const response = await fetch(`${API_URL}/locations/id/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await response.json();
  return data;
};

const getLocationBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/locations/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await response.json();
  return data;
};

export default {
  getAllLocations,
  getLocationById,
  getLocationBySlug,
};
