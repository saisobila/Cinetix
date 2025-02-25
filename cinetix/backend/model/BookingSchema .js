// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserDetails',
    required: true
  },
  showtime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Showtime',
    required: true
  },
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
  seats: {
    type: [String],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingNumber: {
    type: String,
    required: true,
    unique: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique booking number before saving
BookingSchema.pre('save', async function(next) {
  if (!this.bookingNumber) {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.bookingNumber = `BK-${Date.now().toString().slice(-6)}-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);