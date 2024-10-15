// src/pages/CabBooking.js
import React, { useState } from 'react';
import axios from 'axios';

const CabBooking = ({ selectedCab }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    pickupLocation: '',
    dropLocation: selectedCab.to,
    pickupDate: selectedCab.date,
  });

  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cabs/book', {
        ...bookingDetails,
        cabId: selectedCab._id, // Send the selected cab's ID with the booking
      });
      setIsBooked(true);
    } catch (err) {
      setError('Error booking the cab. Please try again.');
    }
  };

  if (isBooked) {
    return <p>Your cab has been successfully booked!</p>;
  }

  return (
    <div>
      <h2>Book Your Cab</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={bookingDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input
            type="text"
            name="pickupLocation"
            value={bookingDetails.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dropLocation">Drop Location:</label>
          <input
            type="text"
            name="dropLocation"
            value={bookingDetails.dropLocation}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="pickupDate">Pickup Date:</label>
          <input
            type="date"
            name="pickupDate"
            value={bookingDetails.pickupDate}
            readOnly
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default CabBooking;
