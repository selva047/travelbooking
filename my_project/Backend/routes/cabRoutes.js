// backend/routes/cabRoutes.js
const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');

// GET: Retrieve all cabs or filter based on "from", "to", and "date"
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let query = {};

    // Add filters if provided in the query
    if (from) query.from = from;
    if (to) query.to = to;
    if (date) query.date = date;

    const cabs = await Cab.find(query);
    res.status(200).json(cabs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cabs', error });
  }
});

// POST: Add a new cab
router.post('/', async (req, res) => {
  try {
    const { cabType, cabNumber, driverName, date, from, to, price } = req.body;

    // Create a new cab instance
    const newCab = new Cab({
      cabType,
      cabNumber,
      driverName,
      date,
      from,
      to,
      price,
    });

    // Save the new cab to the database
    await newCab.save();
    res.status(201).json({ message: 'Cab added successfully', newCab });
  } catch (error) {
    res.status(500).json({ message: 'Error adding cab', error });
  }
});

// GET: Retrieve a specific cab by ID
router.get('/:id', async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    res.status(200).json(cab);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cab', error });
  }
});

// PUT: Update a cab by ID
router.put('/:id', async (req, res) => {
  try {
    const { cabType, cabNumber, driverName, date, from, to, price } = req.body;

    const updatedCab = await Cab.findByIdAndUpdate(
      req.params.id,
      { cabType, cabNumber, driverName, date, from, to, price },
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    if (!updatedCab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    res.status(200).json({ message: 'Cab updated successfully', updatedCab });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cab', error });
  }
});

// DELETE: Delete a cab by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCab = await Cab.findByIdAndDelete(req.params.id);
    if (!deletedCab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    res.status(200).json({ message: 'Cab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cab', error });
  }
});

module.exports = router;
