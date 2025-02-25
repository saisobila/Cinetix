// models/Showtime.js
const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: true
  },
  theater: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theater',
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  seatMap: {
    type: [[String]], // 2D array representing seats with their status
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Showtime', ShowtimeSchema);