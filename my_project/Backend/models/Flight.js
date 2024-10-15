// backend/models/Flight.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  airline: String,
  flightNumber: String,
  date: String,
  from: String,
  to: String,
  price: Number,
});

module.exports = mongoose.model('Flight', flightSchema);
