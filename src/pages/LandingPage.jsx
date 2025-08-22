import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <h1 className="logo">E-Wallet</h1>
          <nav>
            <button className="btn-login" onClick={() => navigate('/login')}>
              Login
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome to Your Digital Wallet
              </h1>
              <p className="hero-subtitle">
                Manage your finances with ease. Send, receive, and track your money 
                securely in one place.
              </p>
              <button className="btn-get-started" onClick={handleGetStarted}>
                Get Started ➔
              </button>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose Our E-Wallet?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Easy Transfers</h3>
                <p>Send and receive money instantly with just a few clicks.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Safe</h3>
                <p>Your money is protected with bank-level security.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Track Spending</h3>
                <p>Monitor your transactions and manage your budget effectively.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 E-Wallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
