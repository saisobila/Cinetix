import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SeatSelection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatHovering, setSeatHovering] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState({
    adult: 2,
    child: 0,
    senior: 0
  });
  const [showTicketSelector, setShowTicketSelector] = useState(false);
  const [showSeatInfo, setShowSeatInfo] = useState(false);
  const [seatInfoPosition, setSeatInfoPosition] = useState({ x: 0, y: 0 });
  const [showData, setShowData] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [seatingLayout, setSeatingLayout] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const token = localStorage.getItem("token");
  
  // Static data for showData
  const staticShowData = {
    movie: {
      _id: "movieId",
      title: "Sample Movie",
      image: "sample-image-url.jpg",
      rating: "PG-13",
      duration: "2h 30m",
      releaseDate: "2023-10-01",
    },
    theater: {
      _id: "theaterId",
      name: "Sample Theater",
    },
    screen: "Screen 1",
    seatMap: [["A", "B", "C"], ["D", "E", "F"]], // Example seat map
  };

  // Static data for bookingData
  const staticBookingData = [
    { seats: ["A1", "A2"] },
    { seats: ["B1"] },
  ];

  useEffect(() => {
    // Replace API calls with static data
    setShowData(staticShowData);
    setBookingData(staticBookingData);
    setIsLoading(false);
  }, []);
  
  // Generate dates starting from release date
  const generateDates = () => {
    if (!showData || !showData.movie || !showData.movie.releaseDate) return [];
    
    const releaseDate = new Date(showData.movie.releaseDate);
    const dates = [];
    
    for (let i = 0; i < 8; i++) {
      const date = new Date(releaseDate);
      date.setDate(date.getDate() + i);
      
      let dateString;
      if (i === 0) {
        dateString = "Today";
      } else if (i === 1) {
        dateString = "Tomorrow";
      } else {
        dateString = date.toLocaleDateString('en-US', { weekday: 'short' });
      }
      
      dateString += ", " + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push(dateString);
    }
    
    return dates;
  };
  
  const dates = generateDates();
  
  useEffect(() => {
    // Set default date and time on initial load
    if (!selectedDate && dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);
  
  // Show times
  const showtimes = ["10:30 AM", "1:45 PM", "4:15 PM", "7:30 PM", "10:00 PM"];
  
  useEffect(() => {
    // Set default showtime on initial load
    if (!selectedTime && showtimes.length > 0) {
      setSelectedTime(showtimes[3]); // Default to 7:30 PM
    }
  }, [showtimes, selectedTime]);
  
  // Generate the seating layout based on the seatMap data
  useEffect(() => {
    if (!showData || !showData.seatMap) return;
    
    // Get all booked seats from booking data
    const bookedSeats = Array.isArray(bookingData) 
      ? bookingData.reduce((acc, booking) => {
          return booking.seats ? [...acc, ...booking.seats] : acc;
        }, [])
      : [];
    
    // Transform seatMap data to create the full 15 seats per row layout
    const layout = [];
    
    // First, get all unique rows from seatMap (flatten the 2D array)
    const allRows = showData.seatMap.flat();
    
    // For each row, create 15 seats
    allRows.forEach(rowLetter => {
      const rowSeats = [];
      
      for (let i = 1; i <= 15; i++) {
        const seatId = `${rowLetter}${i}`;
        
        // Determine if this is a premium seat (middle section of rows and seats)
        const isPremium = 
          (allRows.indexOf(rowLetter) >= Math.floor(allRows.length * 0.3) && 
           allRows.indexOf(rowLetter) < Math.floor(allRows.length * 0.7)) && 
          (i >= 5 && i <= 11);
        
        rowSeats.push({
          id: seatId,
          number: i,
          status: bookedSeats.includes(seatId) ? "occupied" : 
                 isPremium ? "premium" : "available"
        });
      }
      
      layout.push({
        row: rowLetter,
        seats: rowSeats
      });
    });
    
    setSeatingLayout(layout);
  }, [showData, bookingData]);
  
  // Movie details structured for the UI with null checks
  const movieDetails = showData && showData.movie && showData.theater ? {
    id: showData.movie._id,
    title: showData.movie.title,
    image: showData.movie.image, 
    theatre: `${showData.theater.name} - ${showData.screen}`,
    rating: showData.movie.rating,
    duration: showData.movie.duration
  } : null;
  
  // Price configuration
  const prices = {
    adult: 14.99,
    child: 9.99,
    senior: 11.99
  };
  
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Updated to allow max 6 seats
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };
  
  const handleSeatHover = (seatId, event) => {
    setSeatHovering(seatId);
    
    // For premium seats, show tooltip
    const seatElement = event.currentTarget;
    const rect = seatElement.getBoundingClientRect();
    
    setSeatInfoPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };
  
  const isSeatSelectable = (status) => {
    return status === "available" || status === "premium";
  };
  
  const getSeatColor = (seatId, status) => {
    if (selectedSeats.includes(seatId)) {
      return "bg-red-600 border-red-400";
    }
    
    if (status === "occupied") {
      return "bg-gray-700 border-gray-600 opacity-40 cursor-not-allowed";
    }
    
    if (status === "premium") {
      return "bg-amber-600 border-amber-500";
    }
    
    return "bg-gray-700 border-gray-600 hover:bg-gray-600";
  };
  
  const changeTicketQuantity = (type, delta) => {
    const newValue = Math.max(0, ticketQuantity[type] + delta);
    
    // Calculate total tickets
    let totalTickets = Object.entries(ticketQuantity)
      .reduce((sum, [key, value]) => {
        return sum + (key === type ? newValue : value);
      }, 0);
    
    // Ensure we have at least 1 ticket
    if (totalTickets > 0) {
      setTicketQuantity({
        ...ticketQuantity,
        [type]: newValue
      });
    }
  };
  
  const calculateTotal = () => {
    return Object.entries(ticketQuantity).reduce((total, [type, quantity]) => {
      return total + (prices[type] * quantity);
    }, 0);
  };
  
  // Handle checkout - navigate to payment with booking data
  const handleCheckout = () => {
    if (!showData || !selectedSeats.length) {
      toast.error("Please select at least one seat to continue.");
      return;
    }
    
    const totalPrice = calculateTotal();
    
    // Create booking payload
    const bookingPayload = {
      showtime: showData._id,
      movie: showData.movie._id,
      theater: showData.theater._id,
      seats: selectedSeats,
      totalPrice: totalPrice,
      ticketDetails: ticketQuantity
    };
    
    // Navigate to payment page with booking data
    navigate('/payment', { 
      state: {
        bookingData: bookingPayload,
        movieDetails: {
          title: showData.movie.title,
          theater: showData.theater.name,
          screen: showData.screen,
          date: selectedDate,
          time: selectedTime
        }
      }
    });
  };
  
  // Check if checkout is allowed (at least 1 seat selected)
  const canCheckout = selectedSeats.length >= 1;
  
  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="w-16 h-16 border-t-4 border-red-600 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white"
        >
          Loading seating plan...
        </motion.p>
      </div>
    );
  }
  
  // If showData or movieDetails is missing, show error state
  if (!showData || !movieDetails) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="bg-red-600 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Unable to Load Show Data</h2>
          <p className="mb-6">We couldn't load the show information. This could be due to an invalid show ID or a network issue.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-white text-red-600 py-2 px-6 rounded-md font-bold hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar - Simplified version */}
      <motion.header 
        className="bg-black bg-opacity-80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800"
        initial={{ y: -100 }} 
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-red-600 text-3xl font-bold mr-1">Cine</span>
            <span className="text-white text-3xl font-bold">Tix</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span className="mr-2">1</span>
              <span className="text-white">Seats</span>
              <span className="mx-2">→</span>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - Movie Details */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            {/* Movie Card */}
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="relative">
                <img 
                  src={movieDetails.image}
                  alt={movieDetails.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
                  <span className="text-yellow-400 mr-1">★</span>
                  {movieDetails.rating}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{movieDetails.title}</h2>
                <p className="text-gray-400 mb-1">{movieDetails.theatre}</p>
                <p className="text-gray-400 mb-4">{movieDetails.duration}</p>
                
                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Date</label>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((date) => (
                      <motion.button
                        key={date}
                        className={`px-3 py-2 rounded-md text-sm ${
                          selectedDate === date 
                            ? "bg-red-600 text-white" 
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedDate(date)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {date}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Time Selection */}
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-bold mb-2">Showtime</label>
                  <div className="flex flex-wrap gap-2">
                    {showtimes.map((time) => (
                      <motion.button
                        key={time}
                        className={`px-3 py-2 rounded-md text-sm ${
                          selectedTime === time 
                            ? "bg-red-600 text-white" 
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedTime(time)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ticket Selection */}
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Tickets</h3>
                  <button 
                    className="text-red-500 text-sm"
                    onClick={() => setShowTicketSelector(!showTicketSelector)}
                  >
                    {showTicketSelector ? "Done" : "Change"}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showTicketSelector ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {Object.entries(ticketQuantity).map(([type, quantity]) => (
                        <div key={type} className="flex justify-between items-center py-3 border-b border-gray-700">
                          <div>
                            <p className="font-medium capitalize">{type}</p>
                            <p className="text-gray-400 text-sm">${prices[type].toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <motion.button
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white"
                              onClick={() => changeTicketQuantity(type, -1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={quantity === 0}
                            >
                              -
                            </motion.button>
                            <span className="w-6 text-center">{quantity}</span>
                            <motion.button
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white"
                              onClick={() => changeTicketQuantity(type, 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-2">
                        {Object.entries(ticketQuantity).map(([type, quantity]) => (
                          quantity > 0 && (
                            <div key={type} className="flex justify-between text-sm">
                              <span className="capitalize">{type}</span>
                              <span>{quantity} × ${prices[type].toFixed(2)}</span>
                            </div>
                          )
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-700 flex justify-between font-bold">
                          <span>Total</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Selected Seats Summary */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Selected Seats</h3>
                
                {selectedSeats.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <div 
                          key={seat} 
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                    
                    {selectedSeats.length < 6 && (
                      <p className="text-gray-300 text-sm">
                        You can select up to 6 seats total.
                      </p>
                    )}
                    
                    {selectedSeats.length === 6 && (
                      <p className="text-amber-400 text-sm">
                        Maximum seats selected (6).
                      </p>
                    )}
                    
                    {canCheckout && (
                      <motion.button 
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-4 font-bold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                      >
                        Continue to Checkout
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    No seats selected yet. Please select at least 1 seat (up to 6 maximum).
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Seat Selection */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Select Your Seats</h2>
              
              {/* Seat Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-700 border border-gray-600 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-300">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-600 border border-red-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-300">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-600 border border-amber-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-300">Premium</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-700 border border-gray-600 rounded-sm mr-2 opacity-40"></div>
                  <span className="text-sm text-gray-300">Occupied</span>
                </div>
              </div>
              
              {/* Screen */}
              <div className="mb-10 relative">
                <div className="h-8 bg-gradient-to-b from-gray-400 to-transparent rounded-t-full w-4/5 mx-auto opacity-20"></div>
                <div className="absolute top-0 left-0 right-0 text-center text-gray-400 text-sm">SCREEN</div>
              </div>
              
              {/* Seating Layout - Centered better */}
              <div className="max-w-6xl mx-auto mb-8 overflow-x-auto">
                <div className="min-w-max pl-8"> {/* Added padding to center better */}
                  {seatingLayout.map((row) => (
                    <div key={row.row} className="flex mb-2 items-center justify-center"> {/* Added justify-center */}
                      <div className="w-6 text-center text-gray-400 font-medium mr-2">{row.row}</div>
                      <div className="flex gap-1">
                        {row.seats.map((seat) => (
                          <motion.button
                            key={seat.id}
                            className={`w-7 h-7 rounded-md text-xs border flex items-center justify-center ${getSeatColor(seat.id, seat.status)}`}
                            onClick={() => isSeatSelectable(seat.status) && handleSeatClick(seat.id)}
                            whileHover={isSeatSelectable(seat.status) ? { scale: 1.1, y: -2 } : {}}
                            whileTap={isSeatSelectable(seat.status) ? { scale: 0.95 } : {}}
                            onMouseEnter={(e) => {
                              handleSeatHover(seat.id, e);
                              if (seat.status === "premium") setShowSeatInfo(true);
                            }}
                            onMouseLeave={() => setShowSeatInfo(false)}
                            disabled={seat.status === "occupied"}
                          >
                            {seat.number}
                          </motion.button>
                        ))}
                      </div>
                      <div className="w-6 text-center text-gray-400 font-medium ml-2">{row.row}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Information message */}
              <div className="text-center text-gray-400 text-sm max-w-xl mx-auto">
                <p>For the best viewing experience, please select seats that are together. 
                Premium seats (amber) offer extra legroom and central positioning.</p>
                <p className="mt-2 text-amber-400">Select 1-6 seats to proceed to checkout.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating info for premium seats */}
      <AnimatePresence>
        {showSeatInfo && seatHovering && (
          <motion.div
            className="fixed bg-black bg-opacity-80 text-white p-2 rounded text-xs z-50 pointer-events-none w-40 text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ 
              top: `${seatInfoPosition.y - 40}px`, 
              left: `${seatInfoPosition.x - 80}px` 
            }}
          >
            Premium seat with extra legroom
            <div className="text-amber-400 font-bold mt-1">+$2.00</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile bottom bar for summary/proceed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300">
              {selectedSeats.length} of 6 maximum seats selected
            </p>
            <p className="font-bold">${calculateTotal().toFixed(2)}</p>
          </div>
          <motion.button
            className={`px-6 py-3 rounded-lg font-bold ${
              canCheckout ? "bg-red-600" : "bg-gray-700"
            }`}
            whileHover={{ scale: canCheckout ? 1.05 : 1 }}
            whileTap={{ scale: canCheckout ? 0.95 : 1 }}
            disabled={!canCheckout}
            onClick={canCheckout ? handleCheckout : undefined}
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
