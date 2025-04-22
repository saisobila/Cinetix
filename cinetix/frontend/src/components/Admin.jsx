import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart,
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft, ChevronRight, Download, Eye,
  Film,
  Filter,
  LogOut,
  MenuIcon,
  Search,
  Settings,
  Ticket,
  Users,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, CartesianGrid, Legend, Line, LineChart, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Sample data
const theatersData = [
  { id: 1, name: "Cineplex Grand", totalSeats: 240, screens: 4 },
  { id: 2, name: "Movietime Plaza", totalSeats: 180, screens: 3 },
  { id: 3, name: "Starplex Cinema", totalSeats: 320, screens: 5 },
];

const moviesData = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", runtime: "2h 49m", rating: 4.8, showings: 24, bookings: 1842 },
  { id: 2, title: "The Dark Knight", genre: "Action", runtime: "2h 32m", rating: 4.9, showings: 18, bookings: 1367 },
  { id: 3, title: "Inception", genre: "Sci-Fi", runtime: "2h 28m", rating: 4.7, showings: 12, bookings: 986 },
  { id: 4, title: "Pulp Fiction", genre: "Crime", runtime: "2h 34m", rating: 4.5, showings: 8, bookings: 574 },
  { id: 5, title: "The Godfather", genre: "Crime", runtime: "2h 55m", rating: 4.7, showings: 6, bookings: 412 },
];

const bookingsData = [
  { id: 1, movie: "Interstellar", theater: "Cineplex Grand", screen: 1, seats: ["A1", "A2", "A3"], date: "Feb 24, 2025", time: "7:30 PM", amount: 38.97, customer: "John Smith", status: "Completed" },
  { id: 2, movie: "The Dark Knight", theater: "Movietime Plaza", screen: 2, seats: ["F7", "F8"], date: "Feb 24, 2025", time: "8:15 PM", amount: 25.98, customer: "Emma Johnson", status: "Completed" },
  { id: 3, movie: "Inception", theater: "Starplex Cinema", screen: 3, seats: ["D5", "D6", "D7", "D8"], date: "Feb 24, 2025", time: "6:45 PM", amount: 51.96, customer: "Michael Brown", status: "Processing" },
  { id: 4, movie: "Pulp Fiction", theater: "Cineplex Grand", screen: 2, seats: ["H10", "H11"], date: "Feb 25, 2025", time: "9:00 PM", amount: 25.98, customer: "Sarah Wilson", status: "Reserved" },
  { id: 5, movie: "The Godfather", theater: "Movietime Plaza", screen: 1, seats: ["C4"], date: "Feb 25, 2025", time: "7:00 PM", amount: 12.99, customer: "David Lee", status: "Cancelled" },
  { id: 6, movie: "Interstellar", theater: "Starplex Cinema", screen: 4, seats: ["B7", "B8", "B9"], date: "Feb 25, 2025", time: "8:30 PM", amount: 38.97, customer: "Jennifer Garcia", status: "Completed" },
  { id: 7, movie: "The Dark Knight", theater: "Cineplex Grand", screen: 3, seats: ["E12", "E13"], date: "Feb 26, 2025", time: "7:15 PM", amount: 25.98, customer: "Robert Martinez", status: "Processing" },
];

const revenueData = [
  { date: 'Feb 20', revenue: 3850, bookings: 296 },
  { date: 'Feb 21', revenue: 4120, bookings: 318 },
  { date: 'Feb 22', revenue: 6740, bookings: 519 },
  { date: 'Feb 23', revenue: 5890, bookings: 453 },
  { date: 'Feb 24', revenue: 4560, bookings: 351 },
];

const seatOccupancyData = [
  { theater: 'Cineplex Grand', occupied: 187, total: 240 },
  { theater: 'Movietime Plaza', occupied: 123, total: 180 },
  { theater: 'Starplex Cinema', occupied: 256, total: 320 },
];

const MovieAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('today');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Calculate some statistics for display
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const totalMovies = moviesData.length;
  const totalTheaters = theatersData.length;
  const totalScreens = theatersData.reduce((sum, theater) => sum + theater.screens, 0);
  const avgOccupancy = seatOccupancyData.reduce((sum, item) => sum + (item.occupied / item.total), 0) / seatOccupancyData.length * 100;

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Update sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set correct state
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle tab change and close sidebar on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (windowWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'fixed inset-y-0 left-0 z-30 w-64 lg:relative lg:translate-x-0' : 'fixed -translate-x-full'
        } bg-black text-white h-full flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <div className="p-5 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-500">MovieTix Admin</h1>
          {windowWidth < 1024 && (
            <button onClick={toggleSidebar} className="text-white">
              <X size={24} />
            </button>
          )}
        </div>
        <nav className="flex-1 mt-2 overflow-y-auto">
          <div 
            className={`flex items-center p-4 cursor-pointer ${activeTab === 'dashboard' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
            onClick={() => handleTabChange('dashboard')}
          >
            <BarChart size={18} className="mr-3" />
            <span>Dashboard</span>
          </div>
          <div 
            className={`flex items-center p-4 cursor-pointer ${activeTab === 'bookings' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
            onClick={() => handleTabChange('bookings')}
          >
            <Ticket size={18} className="mr-3" />
            <span>Bookings</span>
          </div>
          <div 
            className={`flex items-center p-4 cursor-pointer ${activeTab === 'movies' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
            onClick={() => handleTabChange('movies')}
          >
            <Film size={18} className="mr-3" />
            <span>Movies</span>
          </div>
          <div 
            className={`flex items-center p-4 cursor-pointer ${activeTab === 'theaters' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
            onClick={() => handleTabChange('theaters')}
          >
            <Users size={18} className="mr-3" />
            <span>Theaters</span>
          </div>
          <div 
            className={`flex items-center p-4 cursor-pointer ${activeTab === 'schedule' ? 'bg-red-600' : 'hover:bg-gray-800'}`}
            onClick={() => handleTabChange('schedule')}
          >
            <Calendar size={18} className="mr-3" />
            <span>Schedule</span>
          </div>
        </nav>
        <div className="p-4 mt-auto border-t border-gray-800">
          <div className="flex items-center p-2 cursor-pointer hover:bg-gray-800 rounded-lg">
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </div>
          <div className="flex items-center p-2 cursor-pointer hover:bg-gray-800 rounded-lg mt-2">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b flex items-center justify-between p-4 shadow-sm">
          <div className="flex items-center">
            <MenuIcon 
              size={20} 
              className="mr-4 text-gray-500 cursor-pointer" 
              onClick={toggleSidebar} 
            />
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
            </div>
            <h2 className="text-lg font-semibold lg:hidden">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Date selector */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Dashboard Overview</h1>
                <div className="flex bg-white rounded-lg border overflow-x-auto">
                  <button 
                    className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap ${dateRange === 'today' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => setDateRange('today')}
                  >
                    Today
                  </button>
                  <button 
                    className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap ${dateRange === 'week' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => setDateRange('week')}
                  >
                    This Week
                  </button>
                  <button 
                    className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap ${dateRange === 'month' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => setDateRange('month')}
                  >
                    This Month
                  </button>
                  <button 
                    className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap ${dateRange === 'custom' ? 'bg-red-500 text-white' : ''}`}
                    onClick={() => setDateRange('custom')}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Revenue</p>
                      <h3 className="text-xl md:text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <ArrowUpRight size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight size={14} className="text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">8.2%</span>
                    <span className="text-gray-500 ml-2">from last period</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <h3 className="text-xl md:text-2xl font-bold mt-1">{totalBookings.toLocaleString()}</h3>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Ticket size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight size={14} className="text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">5.3%</span>
                    <span className="text-gray-500 ml-2">from last period</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Average Occupancy</p>
                      <h3 className="text-xl md:text-2xl font-bold mt-1">{avgOccupancy.toFixed(1)}%</h3>
                    </div>
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Users size={20} className="text-amber-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowDownRight size={14} className="text-red-600 mr-1" />
                    <span className="text-red-600 font-medium">2.1%</span>
                    <span className="text-gray-500 ml-2">from last period</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Active Movies</p>
                      <h3 className="text-xl md:text-2xl font-bold mt-1">{totalMovies}</h3>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Film size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-gray-500">Across {totalScreens} screens</span>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Revenue & Bookings Trend</h3>
                    <button className="text-sm text-gray-500 flex items-center whitespace-nowrap">
                      Last 5 Days <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#ff0000" activeDot={{ r: 8 }} strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#0088FE" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Seat Occupancy by Theater</h3>
                    <button className="text-sm text-gray-500 flex items-center whitespace-nowrap">
                      Current Day <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={seatOccupancyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="theater" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="occupied" name="Occupied Seats" fill="#ff0000" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" name="Total Seats" fill="#e0e0e0" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent activity and top movies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Recent Bookings</h3>
                    <button className="text-sm text-red-500">View All</button>
                  </div>
                  <div className="space-y-4">
                    {bookingsData.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center border-b pb-3">
                        <div className="w-10 h-10 bg-red-100 flex-shrink-0 flex items-center justify-center rounded-lg mr-3">
                          <Ticket size={18} className="text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{booking.movie}</p>
                            <span className="text-sm ml-2">${booking.amount}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
                            <p className="truncate">{booking.seats.join(", ")} - {booking.theater}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 sm:mt-0 inline-block ${
                              booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Top Performing Movies</h3>
                    <button className="text-sm text-red-500">View All</button>
                  </div>
                  <div className="space-y-4">
                    {moviesData.slice(0, 5).map((movie, index) => (
                      <div key={movie.id} className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 flex-shrink-0 rounded-lg flex items-center justify-center font-bold mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{movie.title}</p>
                            <div className="flex items-center ml-2">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span>{movie.rating}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
                            <p className="truncate">{movie.genre} • {movie.runtime}</p>
                            <span className="mt-1 sm:mt-0">{movie.bookings} bookings</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Bookings Management</h1>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search bookings" 
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center text-gray-700 border rounded-lg px-4 py-2">
                      <Filter size={16} className="mr-2" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2">
                      <Download size={16} className="mr-2" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="font-medium">All Bookings</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500">Show:</span>
                    <select className="ml-2 border p-1 rounded">
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Processing</option>
                      <option>Reserved</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs sm:text-sm text-gray-500 bg-gray-50">
                        <th className="p-3 sm:p-4">Booking ID</th>
                        <th className="p-3 sm:p-4">Movie</th>
                        <th className="p-3 sm:p-4 hidden md:table-cell">Theater</th>
                        <th className="p-3 sm:p-4 hidden lg:table-cell">Seats</th>
                        <th className="p-3 sm:p-4 hidden md:table-cell">Date & Time</th>
                        <th className="p-3 sm:p-4 hidden lg:table-cell">Customer</th>
                        <th className="p-3 sm:p-4">Amount</th>
                        <th className="p-3 sm:p-4">Status</th>
                        <th className="p-3 sm:p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookingsData.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="p-3 sm:p-4 whitespace-nowrap font-medium">#{booking.id.toString().padStart(5, '0')}</td>
                          <td className="p-3 sm:p-4 whitespace-nowrap">{booking.movie}</td>
                          <td className="p-3 sm:p-4 whitespace-nowrap hidden md:table-cell">{booking.theater}<br/><span className="text-xs text-gray-500">Screen {booking.screen}</span></td>
                          <td className="p-3 sm:p-4 hidden lg:table-cell">{booking.seats.join(", ")}</td>
                          <td className="p-3 sm:p-4 whitespace-nowrap hidden md:table-cell">{booking.date}<br/><span className="text-xs text-gray-500">{booking.time}</span></td>
                          <td className="p-3 sm:p-4 whitespace-nowrap hidden lg:table-cell">{booking.customer}</td>
                          <td className="p-3 sm:p-4 whitespace-nowrap font-medium">${booking.amount}</td>
                          <td className="p-3 sm:p-4 whitespace-nowrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4 whitespace-nowrap">
                            <button className="p-1 text-gray-500 hover:text-red-500">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Showing 1 to 7 of 142 bookings
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="p-1 sm:p-2 border rounded-lg">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="p-1 sm:p-2 border rounded-lg bg-red-500 text-white">1</button>
                    <button className="p-1 sm:p-2 border rounded-lg">2</button>
                    <button className="p-1 sm:p-2 border rounded-lg">3</button>
                    <button className="p-1 sm:p-2 border rounded-lg">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'theaters' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Theater Management</h1>
                <button className="bg-red-500 text-white rounded-lg px-4 py-2 whitespace-nowrap">
                  Add New Theater
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {theatersData.map((theater) => (
                  <div key={theater.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-24 sm:h-32 bg-gray-900 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-white text-lg sm:text-xl font-bold">{theater.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-2 gap-4 text-center mb-4">
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">Total Seats</p>
                          <p className="text-lg sm:text-xl font-bold">{theater.totalSeats}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">Screens</p>
                          <p className="text-lg sm:text-xl font-bold">{theater.screens}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-500 text-xs sm:text-sm mb-1">Current Occupancy</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ 
                            width: `${seatOccupancyData.find(item => item.theater === theater.name).occupied / theater.totalSeats * 100}%` 
                          }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>{seatOccupancyData.find(item => item.theater === theater.name).occupied} seats occupied</span>
                          <span>{(seatOccupancyData.find(item => item.theater === theater.name).occupied / theater.totalSeats * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 p-4 sm:p-6 pt-0">
                        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm">Manage</button>
                        <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">Schedule</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="font-bold mb-4">Theater Seat Map</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                  <select className="border p-2 rounded-lg">
                    <option>Cineplex Grand</option>
                    <option>Movietime Plaza</option>
                    <option>Starplex Cinema</option>
                  </select>
                  <select className="border p-2 rounded-lg">
                    <option>Screen 1</option>
                    <option>Screen 2</option>
                    <option>Screen 3</option>
                    <option>Screen 4</option>
                  </select>
                </div>
                
                <div className="bg-gray-900 p-4 sm:p-8 rounded-lg text-center">
                  <div className="w-3/4 h-8 mx-auto bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
                    <span className="text-white text-sm">SCREEN</span>
                  </div>
                  
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2 mb-6">
                    {[...Array(80)].map((_, i) => {
                      const row = String.fromCharCode(65 + Math.floor(i / 10));
                      const seat = (i % 10) + 1;
                      const isOccupied = Math.random() > 0.6;
                      const isSelected = Math.random() > 0.9;
                      
                      return (
                        <div 
                          key={i} 
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs cursor-pointer ${
                            isSelected ? 'bg-red-500 text-white' : 
                            isOccupied ? 'bg-gray-500 text-white' : 
                            'bg-white text-gray-800 hover:bg-red-100'
                          }`}
                        >
                          {row}{seat}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8 space-y-2 sm:space-y-0 mt-4">
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm mr-2"></div>
                      <span className="text-white text-sm">Available</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-500 rounded-sm mr-2"></div>
                      <span className="text-white text-sm">Occupied</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                      <span className="text-white text-sm">Selected</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'movies' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Movie Management</h1>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex items-center justify-center border rounded-lg px-4 py-2">
                    <Filter size={16} className="mr-2" />
                    <span>Filter</span>
                  </button>
                  <button className="bg-red-500 text-white rounded-lg px-4 py-2">
                    Add New Movie
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {moviesData.map((movie) => (
                  <div key={movie.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 h-32 sm:h-auto bg-gray-200 flex items-center justify-center">
                      <Film size={48} className="text-gray-400" />
                    </div>
                    <div className="w-full sm:w-2/3 p-4 sm:p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{movie.title}</h3>
                          <p className="text-sm text-gray-500">{movie.genre} • {movie.runtime}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-bold">{movie.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div>
                          <p className="text-gray-500 text-sm">Showings</p>
                          <p className="font-bold">{movie.showings}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Bookings</p>
                          <p className="font-bold">{movie.bookings.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm">Edit Details</button>
                        <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">Schedule</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'schedule' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Schedule Management</h1>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex items-center justify-center border rounded-lg px-4 py-2">
                    <Calendar size={16} className="mr-2" />
                    <span>Feb 24, 2025</span>
                    <ChevronDown size={14} className="ml-2" />
                  </button>
                  <button className="bg-red-500 text-white rounded-lg px-4 py-2">
                    Add New Showing
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                  <select className="border p-2 rounded-lg">
                    <option>All Theaters</option>
                    <option>Cineplex Grand</option>
                    <option>Movietime Plaza</option>
                    <option>Starplex Cinema</option>
                  </select>
                  <select className="border p-2 rounded-lg">
                    <option>All Movies</option>
                    {moviesData.map(movie => (
                      <option key={movie.id}>{movie.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs sm:text-sm text-gray-500 bg-gray-50">
                        <th className="p-3 sm:p-4">Time</th>
                        {theatersData.map(theater => (
                          <th key={theater.id} className="p-3 sm:p-4">{theater.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '7:00 PM', '9:30 PM'].map((time, timeIndex) => (
                        <tr key={time} className="hover:bg-gray-50">
                          <td className="p-3 sm:p-4 font-medium whitespace-nowrap">{time}</td>
                          {theatersData.map(theater => (
                            <td key={`${theater.id}-${time}`} className="p-3 sm:p-4">
                              {Math.random() > 0.3 && (
                                <div className="bg-gray-100 p-2 rounded-lg border-l-4 border-red-500">
                                  <p className="font-medium truncate">{moviesData[Math.floor(Math.random() * moviesData.length)].title}</p>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Screen {Math.floor(Math.random() * theater.screens) + 1}</span>
                                    <span>{Math.floor(Math.random() * 80) + 20}/100 seats</span>
                                  </div>
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MovieAdminDashboard;