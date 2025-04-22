import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Model.jsx";

const Home = () => {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    points: 0
  });

  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("nowShowing");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = !!user?.name; 
  const [movieData, setMovieData] = useState([]);
  const [isAdminPromptOpen, setIsAdminPromptOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("User logged out");
    localStorage.clear();
    setUser({...user, name: ""}); 
    setIsModalOpen(false); 
  };

  const handleSignIn = () => {
    
    setIsModalOpen(false); 
    navigate("/signin");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    
    if (user.name !== userName) {
      setUser({...user, name: userName || ""});
    }
  }, []); 

  useEffect(() => {
    const nowShowingMovies = movies.map(movie => ({
      ...movie,
      status: "nowShowing"
    }));
    
    const upcomingMoviesWithStatus = upcomingMovies.map(movie => ({
      ...movie,
      status: "upcoming"
    }));
    
    const recommendedMoviesWithStatus = recommendedMovies.map(movie => ({
      ...movie,
      status: "recommended"
    }));
    
    setMovieData([
      ...nowShowingMovies,
      ...upcomingMoviesWithStatus,
      ...recommendedMoviesWithStatus
    ]);
  }, []);

  useEffect(() => {
    // Show the admin prompt only once when the component mounts
    setIsAdminPromptOpen(true);
  }, []);

  const onClickBook = (id) => {
      navigate("/seatselection", { state: { id: id } }); // Prevent further execution
  };
  
  const movies = [
    { 
      id: 1,
      title: "Inception", 
      theatre: "Regal Cinemas", 
      image: "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg", 
      rating: 8.8,
      genre: ["Sci-Fi", "Action"],
      duration: "2h 28m",
      releaseDate: "2010",
      director: "Christopher Nolan",
      price: 12.99
    },
    { 
      id: 2,
      title: "Avengers: Endgame", 
      theatre: "AMC Theatres", 
      image: "https://www.slamedia.org/wp-content/uploads/2014/11/interstellar-feat.jpeg", 
      rating: 8.4,
      genre: ["Action", "Adventure"],
      duration: "3h 1m",
      releaseDate: "2019",
      director: "Anthony & Joe Russo",
      price: 14.99
    },
    { 
      id: 3,
      title: "Interstellar", 
      theatre: "Cineworld", 
      image: "https://cdn.marvel.com/content/1x/001avn_ons_inl_02_0.jpg", 
      rating: 8.6,
      genre: ["Sci-Fi", "Drama"],
      duration: "2h 49m",
      releaseDate: "2014",
      director: "Christopher Nolan",
      price: 11.99
    },
    { 
      id: 4,
      title: "The Dark Knight", 
      theatre: "PVR Cinemas", 
      image: "https://townsquare.media/site/442/files/2020/06/inception-4.jpg", 
      rating: 9.0,
      genre: ["Action", "Crime"],
      duration: "2h 32m",
      releaseDate: "2008",
      director: "Christopher Nolan",
      price: 12.99
    },
  ];

  const upcomingMovies = [
    { 
      id: 5,
      title: "Dune: Part Two", 
      theatre: "IMAX", 
      image: "https://snworksceo.imgix.net/upb/0136a481-f1da-4ae0-8fe1-74f2a6fa0f0a.sized-1000x1000.png?w=1000", 
      rating: 8.7,
      genre: ["Sci-Fi", "Adventure"],
      duration: "2h 46m",
      releaseDate: "2024",
      director: "Denis Villeneuve",
      releaseDate: "March 15, 2025"
    },
    { 
      id: 6,
      title: "Mission: Impossible 8", 
      theatre: "Cinemark", 
      image: "https://assets.gqindia.com/photos/64ac5583dda916fe08ba20bc/master/pass/The-Burj-Khalifa-scene-in-Mission--Impossible---Ghost-Protocol-.jpg", 
      rating: 8.2,
      genre: ["Action", "Thriller"],
      duration: "2h 30m",
      director: "Christopher McQuarrie",
      releaseDate: "May 23, 2025"
    },
  ];
  
  const recommendedMovies = [
    { 
      id: 7,
      title: "Oppenheimer", 
      theatre: "AMC Theatres", 
      image: "https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/07/ss_col_3c-1.jpg", 
      rating: 8.9,
      genre: ["Biography", "Drama"],
      duration: "3h 0m",
      releaseDate: "2023",
      director: "Christopher Nolan",
      price: 13.99
    },
    { 
      id: 8,
      title: "Tenet", 
      theatre: "Regal Cinemas", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9qBRVRe6AX5b0QHN89DQb6n72spshb336A&s", 
      rating: 7.8,
      genre: ["Action", "Sci-Fi"],
      duration: "2h 30m",
      releaseDate: "2020",
      director: "Christopher Nolan",
      price: 12.99
    },
  ];
  
  const displayMovies = activeTab === "nowShowing" ? movieData.filter((movie) => movie.status === "nowShowing") : 
                         activeTab === "upcoming" ? movieData.filter((movie) => movie.status === "upcoming") : 
                         movieData.filter((movie) => movie.status === "recommended");
  
  const filteredMovies = displayMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
    movie.director.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };
  
  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };
  
  // Loading screen component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl text-red-600 font-bold mb-6"
        >
          CineTix
        </motion.div>
        <span style={{color: "white", marginTop: -20}}>by Sudhakiran</span>
        <motion.div
          animate={{ 
            rotate: 360,
            borderRadius: ["50% 50%", "20% 80%", "50% 50%"]
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
          Preparing your movie experience...
        </motion.p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
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

          {/* Admin Button */}
          <motion.button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ml-2"
            onClick={() => navigate("/admin")}
            whileHover={{ scale: 1.05 }}
          >
           Go to Admin
          </motion.button>
          
          <div className="relative max-w-md w-full mx-4 hidden md:block">
            <input
              type="text"
              placeholder="Search movies, genres, directors..."
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.span 
              className="absolute right-3 top-2 text-gray-400"
              whileHover={{ scale: 1.1 }}
            >
              🔍
            </motion.span>
          </div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Avatar and User Info */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={handleAvatarClick}
            >
              <img
                src={user?.avatar || "https://via.placeholder.com/150"} // Default avatar if user.avatar is null
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full border-2 border-red-600"
              />
              <span className="hidden md:inline">{user?.name || "Guest"}</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Modal - Moved outside the header to position at center of screen */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Modal onClose={handleCloseModal}>
            {isLoggedIn ? (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Logout</h2>
                <p className="mb-6">Are you sure you want to logout?</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <p className="mb-6">Please sign in to continue.</p>
                <button
                  onClick={handleSignIn}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Sign In
                </button>
              </div>
            )}
          </Modal>
        </div>
      )}

      {/* Admin Prompt Modal */}
      {isAdminPromptOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <Modal onClose={() => setIsAdminPromptOpen(false)} className="rounded-lg shadow-lg bg-gray-800 p-6">
            <div className="text-center">
              <motion.h2 
                className="text-2xl font-bold mb-4 text-red-600"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
               Free Admin Panel Access
              </motion.h2>
              <p className="mb-6" style={{color: "black"}}>Would you like to go to the admin panel?</p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => {
                    navigate("/admin");
                    setIsAdminPromptOpen(false); // Close the modal after navigation
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Go to Admin
                </motion.button>
                <motion.button
                  onClick={() => setIsAdminPromptOpen(false)} // Close the modal without navigating
                  className="mt-2 text-gray-300 hover:text-white border border-gray-600 px-4 py-2 rounded-md transition duration-300"
                  whileHover={{ scale: 1.05 }}
                style={{color: "black"}} >
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {/* Hero Section */}
      <motion.section 
        className="relative h-96 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        
        <motion.img 
          src="https://musicart.xboxlive.com/7/806b5100-0000-0000-0000-000000000002/504/image.jpg" 
          alt="Featured movie" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 w-full md:w-2/3">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Inception</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-red-600 px-2 py-1 rounded text-sm">IMDB 8.8</span>
              <span>Sci-Fi, Action</span>
              <span>2h 28m</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-lg">A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.</p>
            <div className="flex space-x-4">
              <motion.button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">▶</span> Watch Trailer
              </motion.button>
              <motion.button
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-6 py-3 rounded-full font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Tickets
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-full inline-block">
          {["nowShowing", "upcoming", "recommended"].map((tab) => (
            <motion.button
              key={tab}
              className={`px-6 py-2 rounded-full ${activeTab === tab ? "bg-red-600 text-white" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: activeTab !== tab ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === "nowShowing" ? "Now Showing" : 
               tab === "upcoming" ? "Coming Soon" : "Recommended"}
            </motion.button>
          ))}
        </div>

        {/* Movies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div 
                      className="relative overflow-hidden"
                      onClick={() => onClickBook(movie.id)}
                    >
                      <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
                        <span className="text-yellow-400 mr-1">★</span>
                        {movie.rating}
                      </div>
                      {activeTab === "upcoming" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center text-sm py-1">
                          Coming {movie.releaseDate}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-red-500 transition-colors">{movie.title}</h3>
                      <div className="flex text-sm text-gray-400 mb-2">
                        <span>{movie.genre.join(", ")}</span>
                        <span className="mx-2">•</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{movie.theatre}</span>
                        {activeTab !== "upcoming" && (
                          <span className="text-white font-bold">${movie.price}</span>
                        )}
                      </div>
                      {activeTab !== "upcoming" && (
                        <motion.button 
                          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium text-sm"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            onClickBook(movie.id); // Pass the movie ID
                          }}
                        >
                          Book Now
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-xl text-gray-400">No movies found matching your search.</p>
                  <button 
                    className="mt-4 text-red-500 hover:text-red-400"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16 mt-12">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-red-600">CineTix</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎟️", title: "Exclusive Discounts", desc: "Members get special pricing and early access" },
              { icon: "🍿", title: "Combo Deals", desc: "Save on concessions with ticket purchases" },
              { icon: "📱", title: "Mobile Tickets", desc: "Paperless entry for all theatres" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-red-600">Cine</span>
                <span className="text-white">Tix</span>
              </h2>
              <p className="text-gray-400 max-w-md">Your ultimate destination for convenient movie ticket booking with exclusive deals and rewards.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold mb-3">Links</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="hover:text-red-500 cursor-pointer">Movies</li>
                  <li className="hover:text-red-500 cursor-pointer">Theatres</li>
                  <li className="hover:text-red-500 cursor-pointer">Offers</li>
                  <li className="hover:text-red-500 cursor-pointer">Gift Cards</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-3">Support</h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="hover:text-red-500 cursor-pointer">Help Center</li>
                  <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
                  <li className="hover:text-red-500 cursor-pointer">FAQs</li>
                  <li className="hover:text-red-500 cursor-pointer">Terms</li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-white font-bold mb-3">Download Our App</h3>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
                    🍎 App Store
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
                    🤖 Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm text-center">
            © 2025 CineTix. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetails}
          >
            <motion.div
              className="bg-gray-900 rounded-lg w-full max-w-4xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedMovie.image} 
                  alt={selectedMovie.title} 
                  className="w-full h-64 object-cover" 
                />
                <button 
                  className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
                  onClick={handleCloseDetails}
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <h2 className="text-3xl font-bold">{selectedMovie.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-red-600 px-3 py-1 rounded-full text-sm">IMDB {selectedMovie.rating}</span>
                  <span>{selectedMovie.genre.join(", ")}</span>
                  <span>{selectedMovie.duration}</span>
                  <span>{selectedMovie.releaseDate}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">About the Movie</h3>
                    <p className="text-gray-300 mb-4">
                      {selectedMovie.title} is directed by {selectedMovie.director} and features stunning visuals
                      and an engaging storyline that captivates audiences worldwide.
                    </p>
                    
                    <h3 className="text-xl font-bold mb-2 mt-6">Cast</h3>
                    <div className="flex space-x-4 mb-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-gray-700 rounded-full mb-1 mx-auto"></div>
                          <span className="text-sm text-gray-400">Actor {i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Showtimes at {selectedMovie.theatre}</h3>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {["10:30 AM", "1:45 PM", "4:15 PM", "7:30 PM", "10:00 PM"].map((time, i) => (
                        <motion.button
                          key={i}
                          className="border border-gray-600 hover:border-red-500 rounded p-2 text-sm"
                          whileHover={{ scale: 1.05, borderColor: "#ef4444" }}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                    
                    {activeTab !== "upcoming" && (
                      <>
                        <h3 className="text-xl font-bold mb-4">Select Seats</h3>
                        <div className="mb-6">
                          <div className="w-full h-24 bg-gray-800 rounded-lg mb-2 flex items-center justify-center text-sm text-gray-400">
                            Screen
                          </div>
                          <div className="grid grid-cols-8 gap-2">
                            {Array(24).fill().map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-full aspect-square bg-gray-700 rounded-md cursor-pointer"
                                whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
                              />
                            ))}
                          </div>
                        </div>
                      
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span>Ticket Price</span>
                            <span>${selectedMovie.price}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Booking Fee</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                            <span>Total</span>
                            <span>${(selectedMovie.price + 1.99).toFixed(2)}</span>
                          </div>
                          <motion.button
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-4 font-bold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Book Tickets
                          </motion.button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;