import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import './AuthPages.css';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon">💳</div>
            <h2 style={{ color: 'white' }}>E-Wallet</h2>
          </div>
          <p>Secure, fast, and reliable digital payments</p>
        </div>
        
        <div className="form-container">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;