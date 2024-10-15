// src/pages/CabPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CabBooking from './CabBooking'; // Import the CabBooking component
import './CabPage.css'; // Import CSS styles for styling the component

// Array of popular cities in India for the dropdown
const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
  'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',"Trichy","Coimbatore","Madurai"
];

const CabPage = () => {
  const [cabs, setCabs] = useState([]); // Holds the list of cabs
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(''); // Tracks error messages
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: '',
  }); // Holds the search filters (from, to, date)
  const [selectedCab, setSelectedCab] = useState(null); // Holds the selected cab for booking

  // Fetch the list of cabs based on the filters
  useEffect(() => {
    const fetchCabs = async () => {
      setLoading(true); // Set loading state to true when fetching
      setError(''); // Clear any previous errors

      try {
        const response = await axios.get('/api/cabs', {
          params: filters, // Pass filters as query parameters
        });
        setCabs(response.data); // Update the cabs state with the fetched data
      } catch (err) {
        setError('Error fetching cabs'); // Set an error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    // Fetch cabs only if all filter fields are filled
    if (filters.from && filters.to && filters.date) {
      fetchCabs();
    }
  }, [filters]);

  // Handle form input changes
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when searching
    setSelectedCab(null); // Clear the selected cab when a new search is made
  };

  return (
    <div className="cab-container">
      <h2 className="cab-title">Available Cabs</h2>

      {/* Search form */}
      <form className="cab-search-form" onSubmit={handleSearch}>
        {/* Dropdown for "From" city */}
        <select
          className="cab-search-input"
          name="from"
          value={filters.from}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            From
          </option>
          {indianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Dropdown for "To" city */}
        <select
          className="cab-search-input"
          name="to"
          value={filters.to}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            To
          </option>
          {indianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Date input */}
        <input
          className="cab-search-input"
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          required
        />
        
        {/* Search button */}
        <button className="cab-search-button" type="submit">
          Search
        </button>
      </form>

      {/* Display loading state */}
      {loading && <p className="cab-loading">Loading...</p>}

      {/* Display error message */}
      {error && <p className="cab-error">{error}</p>}

      {/* Display list of cabs */}
      <ul className="cab-results">
        {cabs.map((cab) => (
          <li key={cab._id} className="cab-item">
            <div>
              <h4>{cab.cabType}</h4>
              <p>Driver: {cab.driverName}</p>
              <p>From: {cab.from} - To: {cab.to}</p>
              <p>Date: {cab.date}</p>
              <p className="cab-item-price">Price: ${cab.price}</p>
            </div>
            <button onClick={() => setSelectedCab(cab)}>Book Now</button>
          </li>
        ))}
      </ul>

      {/* Show CabBooking component if a cab is selected */}
      {selectedCab && (
        <div className="cab-booking-container">
          <h3>Booking Cab</h3>
          <CabBooking selectedCab={selectedCab} />
        </div>
      )}
    </div>
  );
};

export default CabPage;
