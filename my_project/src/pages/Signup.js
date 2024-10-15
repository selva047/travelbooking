// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios'; // For API calls
import './Signup.css'; // Importing the CSS file for styling

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // For tracking error messages
  const [loading, setLoading] = useState(false); // For tracking loading state

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true during the API call

    try {
      // Simulate an API call for signup
      const response = await axios.post('/api/signup', userDetails);

      // Handle successful signup
      if (response.data.success) {
        // Redirect user or show a success message
        console.log('Signup successful!');
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError('Error signing up. Please try again.'); // Set error message on failure
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {error && <p className="signup-error">{error}</p>}
    </div>
  );
};

export default Signup;
