import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("role", res.data.role);
      toast.success("Login successful...", {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Invalid credentials", {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Redirect to backend Google OAuth URL
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND}/users/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 to-red-700">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-red-400 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-red-400 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 shadow-md font-bold text-lg"
          >
            Sign In
          </button>
        </form>
        OR
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition duration-300 shadow-md font-bold text-lg"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;