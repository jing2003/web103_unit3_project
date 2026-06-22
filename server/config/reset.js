import "./dotenv.js";
import { pool } from "./database.js";
import locations from "../data/locations.js";
import events from "../data/events.js";

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(50) NOT NULL,
      zip VARCHAR(20) NOT NULL,
      image TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("locations table created successfully");
  } catch (error) {
    console.error("error creating locations table", error);
  }
};

const createEventsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      date VARCHAR(100) NOT NULL,
      time VARCHAR(100) NOT NULL,
      remaining VARCHAR(255),
      image TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("events table created successfully");
  } catch (error) {
    console.error("error creating events table", error);
  }
};

const seedLocationsTable = async () => {
  try {
    for (const location of locations) {
      const insertQuery = `
        INSERT INTO locations (name, slug, address, city, state, zip, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      await pool.query(insertQuery, [
        location.name,
        location.slug,
        location.address,
        location.city,
        location.state,
        location.zip,
        location.image,
      ]);
    }

    console.log("locations seeded successfully");
  } catch (error) {
    console.error("error seeding locations table", error);
  }
};

const seedEventsTable = async () => {
  try {
    for (const event of events) {
      const insertQuery = `
        INSERT INTO events (location_id, title, date, time, remaining, image)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      await pool.query(insertQuery, [
        event.location_id,
        event.title,
        event.date,
        event.time,
        event.remaining,
        event.image,
      ]);
    }

    console.log("events seeded successfully");
  } catch (error) {
    console.error("error seeding events table", error);
  }
};

const resetDatabase = async () => {
  await createLocationsTable();
  await createEventsTable();
  await seedLocationsTable();
  await seedEventsTable();
  pool.end();
};

resetDatabase();
