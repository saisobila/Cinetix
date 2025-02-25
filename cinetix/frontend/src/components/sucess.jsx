  import React, { useState, useEffect } from "react";
  import { AlertCircle, CheckCircle, CreditCard, DollarSign, Gift, Smartphone, Clock } from "lucide-react";
  import { useNavigate, useLocation } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";

  const MovieCheckout = () => {
    const [selectedPayment, setSelectedPayment] = useState("card");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCvv] = useState("");
    const [upiId, setUpiId] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, movieDetails } = location.state || {};

    // Handle countdown timer
    useEffect(() => {
      if (timeLeft > 0 && !isPaymentComplete) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && !isPaymentComplete) {
        // Handle timeout
        toast.error("Your session has expired. Please restart your booking.");
        navigate('/');
      }
    }, [timeLeft, isPaymentComplete, navigate]);

    // Sample booking details (would normally come from location state)
    const bookingDetails = {...bookingData}

    // Format time as MM:SS
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
    };

    // Handle payment submission and booking
    const handlePayment = async () => {
      // Validate payment info based on selected method
      let isValid = false;
      
      if (selectedPayment === "card") {
        isValid = cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvv.length >= 3;
      } else if (selectedPayment === "upi") {
        isValid = upiId.includes("@");
      } else if (selectedPayment === "wallet" || selectedPayment === "giftcard") {
        isValid = true; // Simplified for demo
      }
      
      if (isValid) {
        setIsProcessing(true);
        
        try {
          // Get token from localStorage
          const token = localStorage.getItem('token');
          
          if (!token) {
            toast.error("Authentication failed. Please login again.");
            navigate('/login');
            return;
          }

          // Prepare booking payload
          const bookingPayload = {
            ...bookingData,
            paymentStatus: 'completed'
          };

          // Make API call to create booking
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND}/booking`, 
            bookingPayload, 
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          console.log("eroor", response.data);

          if (response.data&&response.status === 201) {
            // Set payment as complete in the UI
            setIsProcessing(false);
            setIsPaymentComplete(true);
            
            // Show success message
            toast.success("Booking completed successfully!");
            
            // After 3 seconds, redirect to home
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } else {
            throw new Error("Booking failed");
          }
        } catch (error) {
          console.error("Booking error:", error);
          setIsProcessing(false);
          toast.error(error.response?.data?.message || "Payment failed. Please try again.");
        }
      } else {
        toast.error("Please complete all required fields");
      }
    };

    // Payment success view
    if (isPaymentComplete) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-gray-300 text-center mb-6">Your tickets have been booked successfully</p>
              
              <div className="w-full p-4 bg-gray-800 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-red-500 mb-4">{bookingDetails.movie}</h3>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div className="text-sm">Seats:</div>
                  <div className="text-sm font-medium">{bookingDetails.seats.join(", ")}</div>
                </div>
              </div>
              
              <button 
                className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-red-600 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MovieTix</h1>
          <div className="flex items-center">
            <Clock size={18} className="mr-2" />
            <span className={`font-mono ${timeLeft < 60 ? "text-yellow-300" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </header>

        <div className="max-w-lg mx-auto p-4">
          {/* Movie and seat details */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-bold text-red-500 mb-2">{bookingDetails.movie}</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              
              <div className="text-gray-400">Theater:</div>
              <div>{bookingDetails.theater}</div>
              <div className="text-gray-400">Seats:</div>
              <div>{bookingDetails.seats.join(", ")}</div>
              <div className="text-gray-400">Amount:</div>
              <div className="font-bold">${bookingDetails.totalPrice}</div>
            </div>
          </div>

          {/* Payment options */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-4">Select Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div 
                className={`flex items-center p-3 rounded-lg cursor-pointer border ${selectedPayment === "card" ? "border-red-500 bg-gray-800" : "border-gray-700"}`}
                onClick={() => setSelectedPayment("card")}
              >
                <CreditCard size={18} className="mr-2 text-gray-300" />
                <span>Credit Card</span>
              </div>
              
              <div 
                className={`flex items-center p-3 rounded-lg cursor-pointer border ${selectedPayment === "upi" ? "border-red-500 bg-gray-800" : "border-gray-700"}`}
                onClick={() => setSelectedPayment("upi")}
              >
                <Smartphone size={18} className="mr-2 text-gray-300" />
                <span>UPI</span>
              </div>
              
              <div 
                className={`flex items-center p-3 rounded-lg cursor-pointer border ${selectedPayment === "wallet" ? "border-red-500 bg-gray-800" : "border-gray-700"}`}
                onClick={() => setSelectedPayment("wallet")}
              >
                <DollarSign size={18} className="mr-2 text-gray-300" />
                <span>Mobile Wallet</span>
              </div>
              
              <div 
                className={`flex items-center p-3 rounded-lg cursor-pointer border ${selectedPayment === "giftcard" ? "border-red-500 bg-gray-800" : "border-gray-700"}`}
                onClick={() => setSelectedPayment("giftcard")}
              >
                <Gift size={18} className="mr-2 text-gray-300" />
                <span>Gift Card</span>
              </div>
            </div>

            {/* Payment form */}
            <div className="mt-4">
              {selectedPayment === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">CVV</label>
                      <input 
                        type="password" 
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === "upi" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">UPI ID</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="yourname@bank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {selectedPayment === "wallet" && (
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-center text-gray-300 mb-3">Connect your mobile wallet</p>
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                    <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                    <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              )}

              {selectedPayment === "giftcard" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Gift Card Number</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Enter gift card number"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment details */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-4">Payment Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Ticket Price</span>
              <span>${(bookingDetails.totalPrice - 2.99).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Convenience Fee</span>
              <span>$2.99</span>
            </div>
            <div className="h-px bg-gray-800 my-3"></div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-red-500">${bookingDetails.totalPrice}</span>
            </div>
          </div>

          {/* Warning about timeout */}
          <div className="flex items-start mb-6 text-sm">
            <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-gray-400">
              Your seats are reserved for {formatTime(timeLeft)}. Complete payment before the timer expires to confirm your booking.
            </p>
          </div>

          {/* Payment button */}
          <button 
            className={`w-full py-4 rounded-lg font-bold text-lg ${isProcessing ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"} transition-colors`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${bookingDetails.totalPrice}`}
          </button>
        </div>
      </div>
    );
  };

  export default MovieCheckout;