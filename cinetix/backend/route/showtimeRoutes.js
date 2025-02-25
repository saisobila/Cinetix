const {deleteShowtime, getShowtimes, createShowtime, getShowtimeById} = require("../controller/showtimeController");
const express = require("express");
const { adminMiddleware, authMiddleware } = require("../middleware/authMiddleware");

const showtimeRoutes = express.Router();

showtimeRoutes.post("/", adminMiddleware, createShowtime);
showtimeRoutes.get("/", getShowtimes);
showtimeRoutes.get("/:id", getShowtimeById);
showtimeRoutes.delete("/:id", adminMiddleware, deleteShowtime);

module.exports = showtimeRoutes;