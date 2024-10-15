// src/pages/CabBooking.js
import React, { useState } from 'react';
import './CabBooking.css'; // Optional: Import a CSS file for styling

const CabBooking = ({ selectedCab }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null); // For tracking booking status
  const [error, setError] = useState(''); // For tracking error messages

  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simulating an API call for booking
    try {
      // Here you would normally send a POST request to your server
      await axios.post('/api/bookCab', { ...customerDetails, cab: selectedCab });

      // Simulating successful booking
      setBookingStatus('Booking successful!'); 
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Error booking cab. Please try again.'); // Set error message on failure
      setBookingStatus(null); // Clear booking status on error
    }
  };

  return (
    <div className="cab-booking-container">
      <h3 className="cab-booking-title">Booking Details</h3>
      
      <div className="cab-details">
        <h4>{selectedCab.cabType}</h4>
        <p>Driver: {selectedCab.driverName}</p>
        <p>From: {selectedCab.from} - To: {selectedCab.to}</p>
        <p>Date: {selectedCab.date}</p>
        <p className="cab-price">Price: ${selectedCab.price}</p>
      </div>

      <form className="cab-booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={customerDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={customerDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={customerDetails.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>

      {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
      {error && <p className="booking-error">{error}</p>}
    </div>
  );
};

export default CabBooking;
