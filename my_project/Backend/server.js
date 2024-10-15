const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { check, validationResult } = require('express-validator');

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/travel_booking')
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Routes
const flightRoutes = require('./routes/flightRoutes');
const cabRoutes = require('./routes/cabRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const userRoutes = require('./routes/userRoutes'); // Updated user routes with login/signup

app.use('/api/flights', flightRoutes); // Flights routes
app.use('/api/cabs', cabRoutes);       // Cabs routes
app.use('/api/hotels', hotelRoutes);   // Hotels routes
app.use('/api/users', userRoutes);     // Users routes for login/signup

// Start Server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
.on('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    app.listen(PORT + 1, () => {
      console.log(`Server is running on port ${PORT + 1}`);
    });
  } else {
    console.error(`Server error: ${err.message}`);
  }
});
