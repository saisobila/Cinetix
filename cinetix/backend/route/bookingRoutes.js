const { deleteBooking, getBookings, createBooking, getBookingsByShowtime, getBookingsByUser } = require("../controller/bookingController");
const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const bookingRoute = express.Router();

bookingRoute.post("/", authMiddleware, createBooking);
bookingRoute.get("/", adminMiddleware, getBookings);
bookingRoute.get("/:id", authMiddleware, getBookingsByShowtime);
bookingRoute.get("/s", authMiddleware, getBookingsByUser);
bookingRoute.delete("/:id", authMiddleware, deleteBooking);

module.exports = bookingRoute;