import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post('http://localhost:8080/api/auth/register', registerData);
      
      if (response.data.success) {
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Join our e-wallet platform today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className={`form-group ${focusedField === 'username' ? 'focused' : ''}`}>
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus('username')}
                onBlur={handleBlur}
                required
                minLength="3"
                maxLength="50"
                placeholder="Choose a username"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                placeholder="Enter your email"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${focusedField === 'fullName' ? 'focused' : ''}`}>
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => handleFocus('fullName')}
                onBlur={handleBlur}
                placeholder="Enter your full name"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${focusedField === 'phoneNumber' ? 'focused' : ''}`}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onFocus={() => handleFocus('phoneNumber')}
                onBlur={handleBlur}
                placeholder="Enter your phone number"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                minLength="6"
                placeholder="Create a password"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className={`form-group ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={handleBlur}
                required
                placeholder="Confirm your password"
              />
              <div className="input-border"></div>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-icon">⚠</div>
            <span>{error}</span>
          </div>
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          <span className="btn-text">
            {loading ? 'Creating Account...' : 'Create Account'}
          </span>
          {loading && <div className="spinner"></div>}
        </button>
      </form>

      <div className="form-footer">
        <p>Already have an account? <a href="/login">Sign in here</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;