// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-title">Travel Booking</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/cabs" className="navbar-link">Cabs</Link>
        </li>
        <li>
          <Link to="/flights" className="navbar-link">Flights</Link>
        </li>
        <li>
          <Link to="/hotels" className="navbar-link">Hotels</Link>
        </li>
        <li>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="navbar-link">Log In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
