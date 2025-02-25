
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre']
  },
  duration: {
    type: String,
    required: [true, 'Please add a duration']
  },
  releaseDate: {
    type: String,
    required: [true, 'Please add a release date']
  },
  director: {
    type: String,
    required: [true, 'Please add a director']
  },
  price: {
    type: Number,
    required: function() {
      return this.status !== 'upcoming'; // Price required if not upcoming
    }
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  cast: [{
    name: String,
    character: String,
    avatar: String
  }],
  status: {
    type: String,
    enum: ['nowShowing', 'upcoming', 'recommended'],
    default: 'nowShowing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema);