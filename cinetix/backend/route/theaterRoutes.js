const { deleteTheater, getTheaters, createTheater } = require("../controller/theaterController");
const express = require("express");
const { adminMiddleware } = require("../middleware/authMiddleware");

const theaterRoute = express.Router();

theaterRoute.post("/", adminMiddleware, createTheater);
theaterRoute.get("/", getTheaters);
theaterRoute.delete("/:id", adminMiddleware, deleteTheater);

module.exports = theaterRoute;