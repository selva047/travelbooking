// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import a CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Selva Booking</h1>
      <p className="homepage-description">Your one-stop solution for booking cabs, flights, and hotels.</p>

      <div className="homepage-service-links">
        <Link to="/cabs" className="homepage-service-link">
          <div className="homepage-service-card">
            <h2 className="homepage-service-title">Cabs</h2>
            <p className="homepage-service-description">Book cabs for your travel needs.</p>
          </div>
        </Link>

        <Link to="/flights" className="homepage-service-link">
          <div className="homepage-service-card">
            <h2 className="homepage-service-title">Flights</h2>
            <p className="homepage-service-description">Find and book flights easily.</p>
          </div>
        </Link>

        <Link to="/hotels" className="homepage-service-link">
          <div className="homepage-service-card">
            <h2 className="homepage-service-title">Hotels</h2>
            <p className="homepage-service-description">Discover and reserve your perfect stay.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
