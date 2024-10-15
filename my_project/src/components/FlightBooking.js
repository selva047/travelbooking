// src/pages/FlightBooking.js
import React, { useState } from 'react';
import './FlightBooking.css'; // Optional: Import a CSS file for styling

const FlightBooking = ({ selectedFlight }) => {
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null); // For tracking booking status
  const [error, setError] = useState(''); // For tracking error messages

  const handleChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simulating an API call for booking
    try {
      // Here you would normally send a POST request to your server
      // await axios.post('/api/bookFlight', { ...passengerDetails, flight: selectedFlight });

      // Simulating successful booking
      setBookingStatus('Booking successful!'); 
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Error booking flight. Please try again.'); // Set error message on failure
      setBookingStatus(null); // Clear booking status on error
    }
  };

  return (
    <div className="flight-booking-container">
      <h3 className="flight-booking-title">Booking Details</h3>
      
      <div className="flight-details">
        <h4>{selectedFlight.airline} - {selectedFlight.flightNumber}</h4>
        <p>From: {selectedFlight.from} - To: {selectedFlight.to}</p>
        <p>Date: {selectedFlight.date}</p>
        <p className="flight-price">Price: ${selectedFlight.price}</p>
      </div>

      <form className="flight-booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={passengerDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={passengerDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={passengerDetails.phone}
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

export default FlightBooking;
