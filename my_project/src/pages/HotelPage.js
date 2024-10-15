// src/pages/HotelPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HotelPage.css'; // Import CSS for styling

const HotelPage = () => {
  const [hotels, setHotels] = useState([]); // State to hold hotels data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [filters, setFilters] = useState({
    location: '',
    checkInDate: '',
    checkOutDate: '',
  }); // Search filters

  useEffect(() => {
    if (filters.location && filters.checkInDate && filters.checkOutDate) {
      fetchHotels(); // Fetch hotels if filters are complete
    }
  }, [filters]);

  const fetchHotels = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get('/api/hotels', {
        params: filters,
      });
      setHotels(response.data); // Set fetched hotels data
    } catch (error) {
      setError('Error fetching hotels'); // Set error message on failure
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchHotels(); // Fetch hotels based on filters
  };

  return (
    <div className="hotel-container">
      <h2 className="hotel-title">Find Hotels</h2>

      <form className="hotel-search-form" onSubmit={handleSearch}>
        <input
          className="hotel-search-input"
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          required
        />
        <input
          className="hotel-search-input"
          type="date"
          name="checkInDate"
          value={filters.checkInDate}
          onChange={handleChange}
          required
        />
        <input
          className="hotel-search-input"
          type="date"
          name="checkOutDate"
          value={filters.checkOutDate}
          onChange={handleChange}
          required
        />
        <button className="hotel-search-button" type="submit">Search</button>
      </form>

      {loading && <p className="hotel-loading">Loading...</p>}
      {error && <p className="hotel-error">{error}</p>}

      <ul className="hotel-list">
        {hotels.map((hotel) => (
          <li key={hotel._id} className="hotel-item">
            <h4 className="hotel-name">{hotel.name}</h4>
            <p className="hotel-location">Location: {hotel.location}</p>
            <p className="hotel-availability">Available from: {hotel.checkInDate} to {hotel.checkOutDate}</p>
            <p className="hotel-price">Price per night: ${hotel.price}</p>
            <button className="hotel-book-button">Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelPage;
