import React, { useEffect } from "react";
import Signup from "./signup";
import Signin from "./signin";
import Home from "./home";
import SeatSelection from "./selection";
import MovieCheckout from "./sucess"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MovieAdminDashboard from "./Admin";






function App() {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userName = urlParams.get('userName');
    
    if (token && userName) {
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      window.location.href = '/';
    }
  }, []);
  return (
    <BrowserRouter>
     <ToastContainer />
    <Routes>
    <Route element={<Home/>} path='/' />
    <Route element={<Signin/>} path='/signin' />
    <Route element={<Signup/>} path='/signup' />
    <Route element={<SeatSelection/>} path='/seatselection' />
    <Route element={<MovieCheckout/>} path='/payment' />
    <Route element={<MovieAdminDashboard/>} path='/admindashboard' />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
