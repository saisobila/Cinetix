const Theater = require("../model/TheatreSchema");


exports.createTheater = async (req, res) => {
  try {
    const theater = await Theater.create(req.body);
    res.status(201).json({ success: true, data: theater });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({ success: true, data: theaters });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete a theater
// @route   DELETE /api/theaters/:id
// @access  Private/Admin
exports.deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ success: false, message: "Theater not found" });
    }

    await theater.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};