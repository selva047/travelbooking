// backend/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// GET: Retrieve all hotels or filter based on "location", "checkInDate", and "checkOutDate"
router.get('/', async (req, res) => {
  try {
    const { location, checkInDate, checkOutDate } = req.query;
    let query = {};

    // Add filters if provided in the query
    if (location) query.location = location;
    if (checkInDate) query.checkInDate = checkInDate;
    if (checkOutDate) query.checkOutDate = checkOutDate;

    const hotels = await Hotel.find(query);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hotels', error });
  }
});

// POST: Add a new hotel
router.post('/', async (req, res) => {
  try {
    const { hotelName, location, checkInDate, checkOutDate, numberOfGuests, roomType, pricePerNight } = req.body;

    // Create a new hotel instance
    const newHotel = new Hotel({
      hotelName,
      location,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      roomType,
      pricePerNight,
    });

    // Save the new hotel to the database
    await newHotel.save();
    res.status(201).json({ message: 'Hotel added successfully', newHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error adding hotel', error });
  }
});

// GET: Retrieve a specific hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hotel', error });
  }
});

// PUT: Update a hotel by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel updated successfully', updatedHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error });
  }
});

// DELETE: Delete a hotel by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
});

module.exports = router;
