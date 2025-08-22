import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import walletService from '../services/walletService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Form states
  const [topUpAmount, setTopUpAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [receiverWallet, setReceiverWallet] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  // useEffect(() => {
  //   loadWalletData();
  // }, []);

  // const loadWalletData = async () => {
  //   try {
  //     setLoading(true);
  //     // Check if wallet exists
  //     let walletInfo = await walletService.getWalletInfo(user.id);
  //     if (!walletInfo) {
  //       // Create wallet if not exists
  //       walletInfo = await walletService.createWallet(user.id);
  //     }
  //     setWallet(walletInfo);
      
  //     const balanceData = await walletService.getBalance(user.id);
  //     setBalance(balanceData.balance);
      
  //     const transactionData = await walletService.getTransactions(user.id);
  //     setTransactions(transactionData);
      
  //   } catch (error) {
  //     console.error('Error loading wallet data:', error);
  //     if (error && error.message) {
  //       setError(`Failed to load wallet data: ${error.message}`);
  //     } else if (typeof error === 'string') {
  //       setError(error);
  //     } else if (error && error.response && error.response.data) {
  //       setError(error.response.data.message || error.response.data);
  //     } else {
  //       setError('Failed to load wallet data. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   const loadWalletData = useCallback(async () => {
    try {
      setLoading(true);
      // Check if wallet exists
      let walletInfo = await walletService.getWalletInfo(user.id);
      if (!walletInfo) {
        // Create wallet if not exists
        walletInfo = await walletService.createWallet(user.id);
      }
      setWallet(walletInfo);
      
      const balanceData = await walletService.getBalance(user.id);
      setBalance(balanceData.balance);
      
      const transactionData = await walletService.getTransactions(user.id);
      setTransactions(transactionData);
      
    } catch (error) {
      console.error('Error loading wallet data:', error);
      if (error && error.message) {
        setError(`Failed to load wallet data: ${error.message}`);
      } else if (typeof error === 'string') {
        setError(error);
      } else if (error && error.response && error.response.data) {
        setError(error.response.data.message || error.response.data);
      } else {
        setError('Failed to load wallet data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [user.id]); // Add dependencies that the function uses

  useEffect(() => {
    loadWalletData();
  }, [loadWalletData]);

  const handleTopUp = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await walletService.topUpWallet(user.id, parseFloat(topUpAmount));
      await loadWalletData();
      setTopUpAmount('');
      setShowTopUp(false);
      setSuccess('Wallet topped up successfully!');
    } catch (error) {
      await loadWalletData();
      setShowTopUp(false);
      setError(error.message || error.response?.data?.message || 'An error occurred during top-up');
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await walletService.transferMoney(user.id, receiverWallet, parseFloat(transferAmount));
      await loadWalletData();
      setTransferAmount('');
      setReceiverWallet('');
      setShowTransfer(false);
      setSuccess('Money transferred successfully!');
    } catch (error) {
      await loadWalletData();
      setShowTransfer(false);
      setError(error.message || error.response?.data?.message || 'An error occurred during transfer');
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await walletService.withdrawMoney(user.id, parseFloat(withdrawAmount));
      await loadWalletData();
      setWithdrawAmount('');
      setShowWithdraw(false);
      setSuccess('Money withdrawn successfully!');
    } catch (error) {
      await loadWalletData();
      setShowWithdraw(false);
      setError(error.message || error.response?.data?.message || 'Insufficient Balance');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard-header">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">💳</span>
              <div>
                <h1>E-Wallet Dashboard</h1>
                <p>Welcome back, {user.fullName || user.username}!</p>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError('')} className="alert-close">×</button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="success-icon">✅</span>
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="alert-close">×</button>
          </div>
        )}

        <div className="dashboard-content">
          <div className="main-grid">
            <div className="user-card">
              <div className="card-header">
                <span className="card-icon">👤</span>
                <h2>Profile Information</h2>
              </div>
              <div className="user-details">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user.fullName || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Username</span>
                  <span className="detail-value">{user.username}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="wallet-cards">
              <div className="wallet-card balance-card">
                <div className="card-header">
                  <span className="card-icon">💰</span>
                  <div>
                    <h3>Current Balance</h3>
                    <p>Available funds</p>
                  </div>
                </div>
                <div className="balance-display">
                  {formatCurrency(balance)}
                </div>
              </div>

              <div className="wallet-card wallet-info-card">
                <div className="card-header">
                  <span className="card-icon">🔢</span>
                  <div>
                    <h3>Wallet Number</h3>
                    <p>Your unique identifier</p>
                  </div>
                </div>
                <div className="wallet-number">
                  {wallet?.walletNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="action-section">
            <h2>Quick Actions</h2>
<div className="action-buttons">
              <button 
                onClick={() => setShowTopUp(true)} 
                className="action-btn add-money-btn"
              >
                <span className="btn-icon">💸</span>
                <div className="btn-content">
                  <span className="btn-title">Add Money</span>
                  <span className="btn-subtitle">Top up your wallet</span>
                </div>
              </button>
              <button 
                onClick={() => setShowWithdraw(true)} 
                className="action-btn withdraw-money-btn"
              >
                <span className="btn-icon">💵</span>
                <div className="btn-content">
                  <span className="btn-title">Withdraw Money</span>
                  <span className="btn-subtitle">Withdraw from your wallet</span>
                </div>
              </button>
              <button 
                onClick={() => setShowTransfer(true)} 
                className="action-btn send-money-btn"
              >
                <span className="btn-icon">📤</span>
                <div className="btn-content">
                  <span className="btn-title">Send Money</span>
                  <span className="btn-subtitle">Transfer to others</span>
                </div>
              </button>
              <button 
                onClick={() => loadWalletData()} 
                className="action-btn refresh-btn"
              >
                <span className="btn-icon">🔄</span>
                <div className="btn-content">
                  <span className="btn-title">Refresh</span>
                  <span className="btn-subtitle">Update data</span>
                </div>
              </button>
            </div>
          </div>

          <div className="transaction-section">
            <div className="section-header">
              <h2>Recent Transactions</h2>
              <span className="transaction-count">{transactions.length} total</span>
            </div>
            
            {transactions.length === 0 ? (
              <div className="no-transactions">
                <span className="empty-icon">📋</span>
                <h3>No transactions yet</h3>
                <p>Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="transaction-table-container">
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="transaction-row">
                        <td className="date-cell">{formatDate(txn.transactionDate)}</td>
                        <td>
                          <span className={`transaction-type ₹{txn.transactionType.toLowerCase()}`}>
                            {txn.transactionType}
                          </span>
                        </td>
                        <td className="amount-cell">
                          <span className={`amount ₹{parseFloat(txn.amount) > 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(txn.amount)}
                          </span>
                        </td>
                        <td className="wallet-cell">{txn.senderWallet?.walletNumber || 'N/A'}</td>
                        <td className="wallet-cell">{txn.receiverWallet?.walletNumber || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Top Up Modal */}
        {showTopUp && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">
                  <span className="modal-icon">💸</span>
                  <h3>Add Money to Wallet</h3>
                </div>
                <button onClick={() => setShowTopUp(false)} className="modal-close">
                  ×
                </button>
              </div>
              <form onSubmit={handleTopUp} className="modal-form">
                <div className="form-group">
                  <label htmlFor="topup-amount">Amount to Add</label>
                  <div className="input-wrapper">
                    <span className="input-prefix">₹</span>
                    <input
                      id="topup-amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      required
                      placeholder="0.00"
                      className="amount-input"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowTopUp(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

{/* Withdraw Modal */}
        {showWithdraw && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">
                  <span className="modal-icon">💵</span>
                  <h3>Withdraw Money</h3>
                </div>
                <button onClick={() => setShowWithdraw(false)} className="modal-close">
                  ×
                </button>
              </div>
              <form onSubmit={handleWithdraw} className="modal-form">
                <div className="form-group">
                  <label htmlFor="withdraw-amount">Amount to Withdraw</label>
                  <div className="input-wrapper">
                    <span className="input-prefix">₹</span>
                    <input
                      id="withdraw-amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                      placeholder="0.00"
                      className="amount-input"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowWithdraw(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Withdraw Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showTransfer && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">
                  <span className="modal-icon">📤</span>
                  <h3>Send Money</h3>
                </div>
                <button onClick={() => setShowTransfer(false)} className="modal-close">
                  ×
                </button>
              </div>
              <form onSubmit={handleTransfer} className="modal-form">
                <div className="form-group">
                  <label htmlFor="receiver-email">Receiver's Email</label>
                  <input
                    id="receiver-email"
                    type="email"
                    value={receiverWallet}
                    onChange={(e) => setReceiverWallet(e.target.value)}
                    required
                    placeholder="recipient@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="transfer-amount">Amount to Send</label>
                  <div className="input-wrapper">
                    <span className="input-prefix">₹</span>
                    <input
                      id="transfer-amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      required
                      placeholder="0.00"
                      className="amount-input"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowTransfer(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Send Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;