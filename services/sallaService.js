/**
 * Salla API Service - Data Module
 * Handles connection to Salla e-commerce platform
 */

const axios = require('axios');

class SallaService {
  constructor() {
    this.baseUrl = 'https://api.salla.com/v2';
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async get(endpoint) {
    if (!this.token) {
      throw new Error('Salla API token not set');
    }

    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Salla API Error:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get Orders
  async getOrders(params = {}) {
    return this.get(`/orders?${new URLSearchParams(params)}`);
  }

  // Get Products
  async getProducts(params = {}) {
    return this.get(`/products?${new URLSearchParams(params)}`);
  }

  // Get Customers
  async getCustomers(params = {}) {
    return this.get(`/customers?${new URLSearchParams(params)}`);
  }

  // Get Inventory
  async getInventory() {
    return this.get('/products?inventory=true');
  }

  // Get Store Info
  async getStoreInfo() {
    return this.get('/info');
  }

  // Test connection
  async test() {
    const result = await this.getStoreInfo();
    return result;
  }
}

module.exports = new SallaService();