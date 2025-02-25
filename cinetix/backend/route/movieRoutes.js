const {deleteMovie, getMovies, createMovie} = require("../controller/movieController");
const express = require("express");
const { adminMiddleware, authMiddleware } = require("../middleware/authMiddleware");

const movieRoute = express.Router();
movieRoute.post("/", adminMiddleware, createMovie);
movieRoute.get("/", getMovies);
movieRoute.delete("/:id", adminMiddleware, deleteMovie);

module.exports = movieRoute;