const Showtime = require("../model/ShowTimeSchema");

// @desc    Create a new showtime
// @route   POST /api/showtimes
// @access  Private/Admin
exports.createShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.create(req.body);
    res.status(201).json({ success: true, data: showtime });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all showtimes
// @route   GET /api/showtimes
// @access  Public
exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate("movie").populate("theater");
    res.status(200).json({ success: true, data: showtimes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getShowtimeById = async (req, res) => {
  try {
    const showtimes = await Showtime.findById(req.params.id).populate("movie").populate("theater");
    res.status(200).json({ success: true, data: showtimes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete a showtime
// @route   DELETE /api/showtimes/:id
// @access  Private/Admin
exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) {
      return res.status(404).json({ success: false, message: "Showtime not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log("Error in the deleteShowtime : ", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};