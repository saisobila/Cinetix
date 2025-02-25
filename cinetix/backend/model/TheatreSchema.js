// models/Theater.js
const mongoose = require('mongoose');

const TheaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a theater name'],
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  screens: [{
    name: {
      type: String,
      required: true
    },
    seatsLayout: {
      rows: Number,
      columns: Number,
      totalSeats: Number
    }
  }],
  facilities: {
    type: [String],
    enum: ['Parking', 'Food Court', 'IMAX', '3D', 'Dolby Atmos', 'Recliner Seats', 'VIP Lounge']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theater', TheaterSchema);