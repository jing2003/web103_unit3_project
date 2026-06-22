import express from "express";
import EventsController from "../controllers/events.js";

const router = express.Router();

router.get("/events", EventsController.getAllEvents);
router.get("/events/:id", EventsController.getEventById);
router.get(
  "/locations/id/:locationId/events",
  EventsController.getEventsByLocationId,
);
router.get("/locations/:slug/events", EventsController.getEventsByLocationSlug);

export default router;
