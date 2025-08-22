import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await axios.post('https://e-wallet-backend-mov2.onrender.com/api/auth/login', formData);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="form-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your e-wallet account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
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
            {loading ? 'Signing In...' : 'Sign In'}
          </span>
          {loading && <div className="spinner"></div>}
        </button>
      </form>

      <div className="form-footer">
        <p>Don't have an account? <a href="/register">Create one here</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
