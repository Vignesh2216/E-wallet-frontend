import axios from 'axios';


const API_URL = 'https://e-wallet-backend-mov2.onrender.com/api/wallet';

const walletService = {
  createWallet: async (userId) => {
    try {
      const response = await axios.post(`${API_URL}/create?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to create wallet';
    }
  },

  getBalance: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/balance?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to get balance';
    }
  },

  topUpWallet: async (userId, amount) => {
    try {
      const response = await axios.post(`${API_URL}/topup?userId=${userId}`, { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to top up wallet';
    }
  },

  transferMoney: async (senderUserId, receiverEmail, amount) => {
    try {
      const response = await axios.post(`${API_URL}/transfer?senderUserId=${senderUserId}`, {
        receiverEmail,
        amount
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to transfer money';
    }
  },

  getTransactions: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/transactions?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to get transactions';
    }
  },

  getWalletInfo: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/wallet-info?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to get wallet info';
    }
  },

  withdrawMoney: async (userId, amount) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/withdraw`, { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Failed to withdraw money';
    }
  }
};

export default walletService;
