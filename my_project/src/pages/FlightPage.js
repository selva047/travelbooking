// src/pages/FlightPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FlightPage.css'; // Import the CSS file for styling

const FlightPage = () => {
  const [flights, setFlights] = useState([]); // Holds the flight data
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const [error, setError] = useState(''); // Tracks error messages
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: ''
  }); // Holds the search filters (from, to, date)

  // List of airports in India (updated with Coimbatore, Trichy, and Madurai airports)
  const airports = [
    'Delhi - Indira Gandhi International Airport (DEL)',
    'Mumbai - Chhatrapati Shivaji Maharaj International Airport (BOM)',
    'Bangalore - Kempegowda International Airport (BLR)',
    'Chennai - Chennai International Airport (MAA)',
    'Kolkata - Netaji Subhas Chandra Bose International Airport (CCU)',
    'Hyderabad - Rajiv Gandhi International Airport (HYD)',
    'Pune - Pune International Airport (PNQ)',
    'Ahmedabad - Sardar Vallabhbhai Patel International Airport (AMD)',
    'Goa - Goa International Airport (GOI)',
    'Jaipur - Jaipur International Airport (JAI)',
    'Coimbatore - Coimbatore International Airport (CJB)',
    'Trichy - Tiruchirappalli International Airport (TRZ)',
    'Madurai - Madurai International Airport (IXM)',
    // Add more airports as needed
  ];

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true); // Set loading state to true when fetching
      setError(''); // Clear any previous errors

      try {
        const response = await axios.get('/api/flights', {
          params: filters
        });
        setFlights(response.data); // Update the flights state with fetched data
      } catch (err) {
        setError('Error fetching flights'); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    if (filters.from && filters.to && filters.date) {
      fetchFlights();
    }
  }, [filters]);

  // Handle form input changes
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state when searching
  };

  return (
    <div className="flight-container">
      <h2 className="flight-title">Available Flights</h2>

      {/* Search form */}
      <form className="flight-search-form" onSubmit={handleSearch}>
        <select
          className="flight-search-input"
          name="from"
          value={filters.from}
          onChange={handleChange}
          required
        >
          <option value="">Select Departure Airport</option>
          {airports.map((airport, index) => (
            <option key={index} value={airport}>
              {airport}
            </option>
          ))}
        </select>

        <select
          className="flight-search-input"
          name="to"
          value={filters.to}
          onChange={handleChange}
          required
        >
          <option value="">Select Arrival Airport</option>
          {airports.map((airport, index) => (
            <option key={index} value={airport}>
              {airport}
            </option>
          ))}
        </select>

        <input
          className="flight-search-input"
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          required
        />

        <button className="flight-search-button" type="submit">
          Search
        </button>
      </form>

      {/* Display loading state */}
      {loading && <p className="flight-loading">Loading...</p>}

      {/* Display error message */}
      {error && <p className="flight-error">{error}</p>}

      {/* Display list of flights */}
      <ul className="flight-results">
        {flights.map((flight) => (
          <li key={flight._id} className="flight-item">
            <div>
              <h4>{flight.airline} - {flight.flightNumber}</h4>
              <p>From: {flight.from} - To: {flight.to}</p>
              <p>Date: {flight.date}</p>
              <p className="flight-item-price">Price: ${flight.price}</p>
            </div>
            <button className="flight-book-button">Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightPage;
