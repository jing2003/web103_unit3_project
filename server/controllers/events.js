import { pool } from "../config/database.js";

const getAllEvents = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM events
      ORDER BY id ASC
    `;

    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const selectQuery = `
      SELECT *
      FROM events
      WHERE id = $1
    `;

    const results = await pool.query(selectQuery, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getEventsByLocationId = async (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId);

    const selectQuery = `
      SELECT *
      FROM events
      WHERE location_id = $1
      ORDER BY id ASC
    `;

    const results = await pool.query(selectQuery, [locationId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getEventsByLocationSlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    const selectQuery = `
      SELECT events.*
      FROM events
      JOIN locations
      ON events.location_id = locations.id
      WHERE locations.slug = $1
      ORDER BY events.id ASC
    `;

    const results = await pool.query(selectQuery, [slug]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getAllEvents,
  getEventById,
  getEventsByLocationId,
  getEventsByLocationSlug,
};
