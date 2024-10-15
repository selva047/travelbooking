// backend/models/Cab.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cabSchema = new Schema({
  cabType: String,      // Type of cab (e.g., sedan, SUV, hatchback)
  cabNumber: String,    // Unique cab number
  driverName: String,   // Driver's name
  date: String,         // Date of booking
  from: String,         // Pickup location
  to: String,           // Drop-off location
  price: Number,        // Price of the cab ride
});

module.exports = mongoose.model('Cab', cabSchema);
