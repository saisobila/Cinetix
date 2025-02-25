import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Film, Ticket, CreditCard, User, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const BookingHistoryList = () => {
  // State to track which booking cards are expanded
  const [expandedBookings, setExpandedBookings] = useState({});
  const [bookingsHistory, setBookingsHistory] = useState([]);

  // Toggle expanded state for a booking
  const toggleExpand = (bookingId) => {
    setExpandedBookings(prev => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }));
  };

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND}/booking/user`,
            {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
        );
        setBookingsHistory([...res.data.data]);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
  }

  // Sample booking history data array
//   const bookingsHistory = [
//     {
//       "_id": "67bd416f49cd7b57441692d5",
//       "user": "678e1bb07ab6fa0d16792a33",
//       "showtime": {
//         "_id": "67bd413e49cd7b57441692ba",
//         "movie": "67bd40e249cd7b57441692b6",
//         "theater": "67bd40be49cd7b57441692b2",
//         "screen": "Screen 1",
//         "date": "2025-02-25T00:00:00.000Z",
//         "time": "18:00",
//         "price": 12.5,
//         "availableSeats": 150,
//         "seatMap": [
//           ["A", "B", "C", "D", "E"],
//           ["L", "H", "I", "J", "K"]
//         ],
//         "createdAt": "2025-02-25T04:04:14.397Z",
//         "__v": 0
//       },
//       "movie": {
//         "_id": "67bd40e249cd7b57441692b6",
//         "title": "Inception",
//         "image": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//         "rating": 8.8,
//         "genre": ["Action", "Sci-Fi"],
//         "duration": "2h 28m",
//         "releaseDate": "2010-07-16",
//         "director": "Christopher Nolan",
//         "price": 12.5,
//         "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
//         "cast": [
//           {
//             "name": "Leonardo DiCaprio",
//             "character": "Cobb",
//             "avatar": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//             "_id": "67bd40e249cd7b57441692b7"
//           },
//           {
//             "name": "Elliot Page",
//             "character": "Ariadne",
//             "avatar": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//             "_id": "67bd40e249cd7b57441692b8"
//           }
//         ],
//         "status": "nowShowing",
//         "createdAt": "2025-02-25T04:02:42.894Z",
//         "__v": 0
//       },
//       "theater": {
//         "_id": "67bd40be49cd7b57441692b2",
//         "name": "Cineplex Downtown",
//         "location": "123 Main St, Cityville",
//         "screens": [
//           {
//             "seatsLayout": {
//               "rows": 10,
//               "columns": 15,
//               "totalSeats": 150
//             },
//             "name": "Screen 1",
//             "_id": "67bd40be49cd7b57441692b3"
//           },
//           {
//             "seatsLayout": {
//               "rows": 8,
//               "columns": 12,
//               "totalSeats": 96
//             },
//             "name": "Screen 2",
//             "_id": "67bd40be49cd7b57441692b4"
//           }
//         ],
//         "facilities": ["Parking", "Food Court", "IMAX"],
//         "createdAt": "2025-02-25T04:02:06.722Z",
//         "__v": 0
//       },
//       "seats": ["E4", "L4", "H4", "H5", "H6"],
//       "totalPrice": 29.98,
//       "bookingNumber": "BK25022504055373",
//       "paymentStatus": "completed",
//       "bookingStatus": "confirmed",
//       "createdAt": "2025-02-25T04:05:03.973Z",
//       "__v": 0
//     },
//     {
//       "_id": "67bd416f49cd7b57441692d6",
//       "user": "678e1bb07ab6fa0d16792a33",
//       "showtime": {
//         "_id": "67bd413e49cd7b57441692bb",
//         "movie": "67bd40e249cd7b57441692b7",
//         "theater": "67bd40be49cd7b57441692b2",
//         "screen": "Screen 2",
//         "date": "2025-02-20T00:00:00.000Z",
//         "time": "20:30",
//         "price": 14.5,
//         "availableSeats": 96,
//         "seatMap": [
//           ["A", "B", "C", "D", "E"],
//           ["L", "H", "I", "J", "K"]
//         ],
//         "createdAt": "2025-02-20T04:04:14.397Z",
//         "__v": 0
//       },
//       "movie": {
//         "_id": "67bd40e249cd7b57441692b7",
//         "title": "The Dark Knight",
//         "image": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//         "rating": 9.0,
//         "genre": ["Action", "Crime", "Drama"],
//         "duration": "2h 32m",
//         "releaseDate": "2008-07-18",
//         "director": "Christopher Nolan",
//         "price": 14.5,
//         "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//         "cast": [
//           {
//             "name": "Christian Bale",
//             "character": "Bruce Wayne",
//             "avatar": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//             "_id": "67bd40e249cd7b57441692c1"
//           },
//           {
//             "name": "Heath Ledger",
//             "character": "Joker",
//             "avatar": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
//             "_id": "67bd40e249cd7b57441692c2"
//           }
//         ],
//         "status": "nowShowing",
//         "createdAt": "2025-02-20T04:02:42.894Z",
//         "__v": 0
//       },
//       "theater": {
//         "_id": "67bd40be49cd7b57441692b2",
//         "name": "Cineplex Downtown",
//         "location": "123 Main St, Cityville",
//         "screens": [
//           {
//             "seatsLayout": {
//               "rows": 10,
//               "columns": 15,
//               "totalSeats": 150
//             },
//             "name": "Screen 1",
//             "_id": "67bd40be49cd7b57441692b3"
//           },
//           {
//             "seatsLayout": {
//               "rows": 8,
//               "columns": 12,
//               "totalSeats": 96
//             },
//             "name": "Screen 2",
//             "_id": "67bd40be49cd7b57441692b4"
//           }
//         ],
//         "facilities": ["Parking", "Food Court", "IMAX"],
//         "createdAt": "2025-02-20T04:02:06.722Z",
//         "__v": 0
//       },
//       "seats": ["A4", "A5", "A6"],
//       "totalPrice": 43.50,
//       "bookingNumber": "BK20022504053821",
//       "paymentStatus": "completed",
//       "bookingStatus": "completed",
//       "createdAt": "2025-02-20T04:05:03.973Z",
//       "__v": 0
//     }
//   ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Get status color based on booking status
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-600';
      case 'completed':
        return 'bg-blue-600';
      case 'cancelled':
        return 'bg-red-600';
      case 'pending':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-red-600 p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold">MovieTix</h1>
        <div className="flex items-center">
          <User size={18} className="mr-2" />
          <span>My Bookings</span>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Booking History</h2>
        
        {bookingsHistory.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <Film size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-400">You don't have any bookings yet</p>
            <button className="mt-4 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookingsHistory.map((booking) => (
              <div key={booking._id} className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                {/* Movie Banner */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={booking.movie.image} 
                    alt={booking.movie.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{booking.movie.title}</h2>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-red-600 rounded-md text-xs font-medium">
                        {booking.movie.rating}/10
                      </span>
                      <span className="text-xs text-gray-300">{booking.movie.duration}</span>
                      <span className="text-xs text-gray-300">
                        {booking.movie.genre.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Status */}
                <div className={`p-4 ${getStatusColor(booking.bookingStatus)} flex items-center justify-between`}>
                  <div className="flex items-center">
                    <Check size={18} className="mr-2" />
                    <span className="font-medium capitalize">{booking.bookingStatus}</span>
                  </div>
                  <span className="text-sm bg-black bg-opacity-30 px-2 py-1 rounded">
                    {booking.bookingNumber}
                  </span>
                </div>
                
                {/* Quick Info */}
                <div className="p-4 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-gray-400" />
                      <span className="text-sm">{formatDate(booking.showtime.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1 text-gray-400" />
                      <span className="text-sm">{formatTime(booking.showtime.time)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleExpand(booking._id)}
                    className="text-gray-400 hover:text-white"
                  >
                    {expandedBookings[booking._id] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
                
                {/* Expanded Details */}
                {expandedBookings[booking._id] && (
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin size={18} className="mt-1 mr-3 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Venue</p>
                          <p className="font-medium">{booking.theater.name}</p>
                          <p className="text-sm text-gray-400">{booking.theater.location}</p>
                          <p className="text-sm text-gray-400">{booking.showtime.screen}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Ticket size={18} className="mt-1 mr-3 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Seats</p>
                          <p className="font-medium">{booking.seats.join(", ")}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CreditCard size={18} className="mt-1 mr-3 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Payment</p>
                          <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
                          <p className="text-xs text-green-500 uppercase">{booking.paymentStatus}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Film size={18} className="mt-1 mr-3 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Booked On</p>
                          <p className="font-medium">{formatDate(booking.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Theater Facilities */}
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <h3 className="font-bold mb-3 text-sm">Theater Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {booking.theater.facilities.map((facility, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-xs">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Movie Cast */}
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <h3 className="font-bold mb-3 text-sm">Movie Cast</h3>
                      <div className="flex space-x-4 overflow-x-auto pb-2">
                        {booking.movie.cast.map((actor) => (
                          <div key={actor._id} className="flex-shrink-0 w-16">
                            <img 
                              src={actor.avatar} 
                              alt={actor.name} 
                              className="w-16 h-16 rounded-lg object-cover mb-2"
                            />
                            <p className="text-xs font-medium truncate">{actor.name}</p>
                            <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-gray-800 hover:bg-gray-700 transition-colors py-2 rounded-lg font-medium text-sm">
                        Download Ticket
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 transition-colors py-2 rounded-lg font-medium text-sm">
                        Get Directions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryList;