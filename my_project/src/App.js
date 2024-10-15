// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CabPage from './pages/CabPage';
import FlightPage from './pages/FlightPage';
import HotelPage from './pages/HotelPage';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cabs" element={<CabPage />} />
        <Route path="/flights" element={<FlightPage />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
