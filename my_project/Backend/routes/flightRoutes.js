// backend/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET: Retrieve all flights or filter flights based on "from", "to", and "date"
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let query = {};

    // Add filters if provided in the query
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) query.date = date;

    const flights = await Flight.find(query);
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving flights', error });
  }
});

// POST: Add a new flight
router.post('/', async (req, res) => {
  try {
    const { airline, flightNumber, date, from, to, price } = req.body;

    // Create a new flight instance
    const newFlight = new Flight({
      airline,
      flightNumber,
      date,
      from,
      to,
      price,
    });

    // Save the new flight to the database
    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully', newFlight });
  } catch (error) {
    res.status(500).json({ message: 'Error adding flight', error });
  }
});

// GET: Retrieve a specific flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving flight', error });
  }
});

// PUT: Update a flight by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json({ message: 'Flight updated successfully', updatedFlight });
  } catch (error) {
    res.status(500).json({ message: 'Error updating flight', error });
  }
});

// DELETE: Delete a flight by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight', error });
  }
});

module.exports = router;
