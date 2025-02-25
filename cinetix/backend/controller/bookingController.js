const Booking = require("../model/BookingSchema ");
const Showtime = require("../model/ShowTimeSchema");


const generateBookingNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().replace(/[-T:.Z]/g, "").slice(2, 12); // Extracts YYMMDDHHMM
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
  return `BK${datePart}${randomPart}`;
};
// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { showtime, movie, theater, seats, totalPrice, paymentStatus } = req.body;
    const user = req.user.userId;
    // Check if the showtime exists
    const showtimeDetails = await Showtime.findById(showtime);
    if (!showtimeDetails) {
      return res.status(404).json({ success: false, message: "Showtime not found" });
    }

    // Check if seats are available
    // const isSeatsAvailable = seats.every((seat) =>
    //   showtimeDetails.seatMap.flat().includes(seat)
    // );
    // if (!isSeatsAvailable) {
    //   return res.status(400).json({ success: false, message: "Selected seats are not available" });
    // }

    // Create booking
    const booking = await Booking.create({
      user,
      showtime,
      movie,
      theater,
      seats,
      totalPrice,
      bookingNumber: generateBookingNumber(),
      paymentStatus
    });

    // Update showtime seat map (mark seats as booked)
    // seats.forEach((seat) => {
    //   const row = seat.charAt(0);
    //   const col = parseInt(seat.slice(1));
    //   showtimeDetails.seatMap[row][col] = "booked";
    // });
    // await showtimeDetails.save();

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("UserDetails", "first_name last_name email")
      .populate("showtime")
      .populate("movie")
      .populate("theater");

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getBookingsByShowtime = async (req, res) => {
  try {

    const bookings = await Booking.find({showtime: req.params.id})
      .populate("showtime")
      .populate("movie")
      .populate("theater");

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const mongoose = require("mongoose");

exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log("user =======================", userId)
    // Validate & Convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    console.log("User ID:", userId);

    // Query using ObjectId
    const bookings = await Booking.find({ user: new mongoose.Types.ObjectId(userId) });

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Free up seats in the showtime
    const showtime = await Showtime.findById(booking.showtime);
    booking.seats.forEach((seat) => {
      const row = seat.charAt(0);
      const col = parseInt(seat.slice(1));
      showtime.seatMap[row][col] = "available";
    });
    await showtime.save();

    await booking.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};