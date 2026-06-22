import { pool } from "../config/database.js";

const getAllLocations = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM locations
      ORDER BY id ASC
    `;

    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const selectQuery = `
      SELECT *
      FROM locations
      WHERE id = $1
    `;

    const results = await pool.query(selectQuery, [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getLocationBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    const selectQuery = `
      SELECT *
      FROM locations
      WHERE slug = $1
    `;

    const results = await pool.query(selectQuery, [slug]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getAllLocations,
  getLocationById,
  getLocationBySlug,
};
