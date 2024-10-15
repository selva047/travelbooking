// src/pages/AdminPage.js
import React, { useState } from 'react';

const AdminPage = () => {
  const [productType, setProductType] = useState('flight');
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    date: '',
    from: '',
    to: '',
    price: '',
    cabType: '',
    cabNumber: '',
    driverName: '',
    hotelName: '',
    location: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '',
    roomType: '',
    pricePerNight: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Post data to the corresponding API endpoint based on productType
    if (productType === 'flight') {
      // Add flight using API
    } else if (productType === 'cab') {
      // Add cab using API
    } else if (productType === 'hotel') {
      // Add hotel using API
    }
  };

  return (
    <div>
      <h2>Admin Panel: Add Products</h2>
      
      {/* Select Product Type */}
      <select value={productType} onChange={(e) => setProductType(e.target.value)}>
        <option value="flight">Flight</option>
        <option value="cab">Cab</option>
        <option value="hotel">Hotel</option>
      </select>

      {/* Form to Add Product */}
      <form onSubmit={handleSubmit}>
        {productType === 'flight' && (
          <>
            <input type="text" name="airline" placeholder="Airline" onChange={handleChange} />
            <input type="text" name="flightNumber" placeholder="Flight Number" onChange={handleChange} />
            <input type="text" name="from" placeholder="From" onChange={handleChange} />
            <input type="text" name="to" placeholder="To" onChange={handleChange} />
            <input type="date" name="date" placeholder="Date" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
          </>
        )}

        {productType === 'cab' && (
          <>
            <input type="text" name="cabType" placeholder="Cab Type" onChange={handleChange} />
            <input type="text" name="cabNumber" placeholder="Cab Number" onChange={handleChange} />
            <input type="text" name="driverName" placeholder="Driver Name" onChange={handleChange} />
            <input type="text" name="from" placeholder="From" onChange={handleChange} />
            <input type="text" name="to" placeholder="To" onChange={handleChange} />
            <input type="date" name="date" placeholder="Date" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
          </>
        )}

        {productType === 'hotel' && (
          <>
            <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            <input type="date" name="checkInDate" placeholder="Check-In Date" onChange={handleChange} />
            <input type="date" name="checkOutDate" placeholder="Check-Out Date" onChange={handleChange} />
            <input type="number" name="numberOfGuests" placeholder="Number of Guests" onChange={handleChange} />
            <input type="text" name="roomType" placeholder="Room Type" onChange={handleChange} />
            <input type="number" name="pricePerNight" placeholder="Price Per Night" onChange={handleChange} />
          </>
        )}

        <button type="submit">Add {productType}</button>
      </form>
    </div>
  );
};

export default AdminPage;
