// backend/models/Hotel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelName: String,        // Name of the hotel
  location: String,         // Location of the hotel
  checkInDate: String,      // Check-in date
  checkOutDate: String,     // Check-out date
  numberOfGuests: Number,   // Number of guests staying
  roomType: String,         // Type of room (e.g., single, double, suite)
  pricePerNight: Number,    // Price per night
});

module.exports = mongoose.model('Hotel', hotelSchema);
