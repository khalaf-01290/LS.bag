/**
 * LS.bag Backend v5.0
 * Main Server - All Modules Integrated
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aiService = require('./services/aiService');
const sallaService = require('./services/sallaService');
const telegramService = require('./services/telegramService');
const { AI_MODULES } = require('./modules/constants');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============ ROOT & HEALTH ============
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    name: 'LS.bag API v5.0',
    modules: ['ai', 'data', 'reports', 'marketing', 'trends', 'alerts'],
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    modules: aiService.getAvailableModels()
  });
});

// ============ AI MODULE ============

// Get available AI models
app.get('/api/ai/models', (req, res) => {
  res.json({ 
    success: true, 
    models: aiService.getAvailableModels() 
  });
});

// Chat with AI (auto-select model)
app.post('/api/ai/chat', async (req, res) => {
  const { message, model = 'gemini' } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const result = await aiService.chat(message, model);
  res.json(result);
});

// Chat with specific AI
app.post('/api/ai/gemini', async (req, res) => {
  const { message } = req.body;
  const result = await aiService.chat(message, 'gemini');
  res.json(result);
});

app.post('/api/ai/groq', async (req, res) => {
  const { message } = req.body;
  const result = await aiService.chat(message, 'groq');
  res.json(result);
});

app.post('/api/ai/deepseek', async (req, res) => {
  const { message } = req.body;
  const result = await aiService.chat(message, 'deepseek');
  res.json(result);
});

app.post('/api/ai/claude', async (req, res) => {
  const { message } = req.body;
  const result = await aiService.chat(message, 'claude');
  res.json(result);
});

// ============ DATA MODULE (Salla) ============

// Set Salla API Token
app.post('/api/data/salla/token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, error: 'Token required' });
  }
  sallaService.setToken(token);
  res.json({ success: true, message: 'Salla token updated' });
});

// Get Orders
app.get('/api/data/orders', async (req, res) => {
  const result = await sallaService.getOrders(req.query);
  res.json(result);
});

// Get Products
app.get('/api/data/products', async (req, res) => {
  const result = await sallaService.getProducts(req.query);
  res.json(result);
});

// Get Customers
app.get('/api/data/customers', async (req, res) => {
  const result = await sallaService.getCustomers(req.query);
  res.json(result);
});

// Get Inventory
app.get('/api/data/inventory', async (req, res) => {
  const result = await sallaService.getInventory();
  res.json(result);
});

// Test Salla Connection
app.get('/api/data/test', async (req, res) => {
  const result = await sallaService.test();
  res.json(result);
});

// ============ REPORTS MODULE ============

app.get('/api/reports', (req, res) => {
  res.json({
    success: true,
    reports: [
      { id: 1, type: 'morning', time: '08:00', status: 'pending', title: 'تقرير الصباح' },
      { id: 2, type: 'evening', time: '20:00', status: 'pending', title: 'تقرير المساء' },
      { id: 3, type: 'weekly', day: 'Sunday', status: 'pending', title: 'التقرير الأسبوعي' },
      { id: 4, type: 'monthly', day: 1, status: 'pending', title: 'التقرير الشهري' }
    ]
  });
});

app.get('/api/reports/:type', async (req, res) => {
  const { type } = req.params;
  // Generate report based on type
  res.json({
    success: true,
    type,
    title: type === 'morning' ? 'تقرير الصباح' : 'تقرير المساء',
    generatedAt: new Date().toISOString(),
    data: {
      sales: 'جاري جلب البيانات...',
      orders: 'جاري جلب البيانات...',
      inventory: 'جاري جلب البيانات...'
    }
  });
});

// ============ ALERTS MODULE ============

app.get('/api/alerts', (req, res) => {
  res.json({
    success: true,
    alerts: []
  });
});

app.post('/api/alerts/send', async (req, res) => {
  const { chatId, message, type = 'info' } = req.body;
  
  if (!chatId || !message) {
    return res.status(400).json({ success: false, error: 'chatId and message required' });
  }

  const result = await telegramService.sendAlert(chatId, type, message);
  res.json(result);
});

// ============ MODULE STATUS ============

app.get('/api/modules/status', (req, res) => {
  res.json({
    success: true,
    modules: {
      ai: { status: 'ready', models: aiService.getAvailableModels() },
      data: { status: sallaService.token ? 'ready' : 'waiting_token' },
      reports: { status: 'ready' },
      marketing: { status: 'ready' },
      trends: { status: 'ready' },
      alerts: { status: 'ready' }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`LS.bag API v5.0 running on port ${PORT}`);
  console.log('Modules: AI, Data, Reports, Marketing, Trends, Alerts');
});
