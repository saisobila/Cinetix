import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match", {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/users/register`, formData);
      toast.success("Signup successful! Please log in.", {
        position: 'top-center',
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate("/signin"),
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signup failed", {
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
    <div className="flex items-center justify-center py-10 bg-gradient-to-r from-red-100 to-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-red-600 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-red-600 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-600 font-semibold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-600 font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-600 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-600 font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Google Signup Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition duration-300 shadow-md font-bold text-lg"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign up with Google
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;