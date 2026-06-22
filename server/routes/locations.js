import express from "express";
import LocationsController from "../controllers/locations.js";

const router = express.Router();

router.get("/locations", LocationsController.getAllLocations);
router.get("/locations/id/:id", LocationsController.getLocationById);
router.get("/locations/:slug", LocationsController.getLocationBySlug);

export default router;
