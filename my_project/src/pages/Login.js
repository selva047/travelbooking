// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios'; // For API calls
import './Login.css'; // Importing the CSS file for styling

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // For tracking error messages
  const [loading, setLoading] = useState(false); // For tracking loading state

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true during the API call

    try {
      // Simulate an API call for login
      const response = await axios.post('/api/login', credentials);

      // Handle successful login
      if (response.data.success) {
        // Redirect user or show a success message
        console.log('Login successful!');
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setError('Invalid email or password.'); // Set error message on failure
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
