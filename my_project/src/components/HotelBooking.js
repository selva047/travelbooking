// src/pages/HotelBooking.js
import React, { useState } from 'react';
import './HotelBooking.css'; // Optional: Import a CSS file for styling

const HotelBooking = ({ selectedHotel }) => {
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null); // For tracking booking status
  const [error, setError] = useState(''); // For tracking error messages

  const handleChange = (e) => {
    setGuestDetails({
      ...guestDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

   try {
      // Here you would normally send a POST request to your server
      await axios.post('/api/hotels', { ...guestDetails, hotel: selectedHotel });

      // Simulating successful booking
      setBookingStatus('Booking successful!'); 
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError('Error booking hotel. Please try again.'); // Set error message on failure
      setBookingStatus(null); // Clear booking status on error
    }
  };

  return (
    <div className="hotel-booking-container">
      <h3 className="hotel-booking-title">Booking Details</h3>
      
      <div className="hotel-details">
        <h4>{selectedHotel.name}</h4>
        <p>Location: {selectedHotel.location}</p>
        <p>Check-in: {selectedHotel.checkInDate}</p>
        <p>Check-out: {selectedHotel.checkOutDate}</p>
        <p className="hotel-price">Price per night: ${selectedHotel.price}</p>
      </div>

      <form className="hotel-booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={guestDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={guestDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={guestDetails.phone}
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

export default HotelBooking;
