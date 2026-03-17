# LS.bag v5.0 - Documentation

## Overview
AI-powered e-commerce system for LS.bag (Shops & Shoes - Saudi Arabia)

## Project Structure

```
LS.bag/
├── backend/                 # Node.js API
│   ├── services/
│   │   ├── aiService.js    # AI Module (Gemini, Groq, DeepSeek, Claude)
│   │   ├── sallaService.js # Salla API integration
│   │   └── telegramService.js # Telegram notifications
│   ├── modules/
│   │   └── constants.js    # Project constants
│   ├── server.js           # Main API server
│   └── .env               # Environment variables
│
├── frontend/               # Web Dashboard
│   └── public/
│       └── index.html     # Single-page dashboard
│
└── docs/                   # Documentation
    └── TASKS.md           # Task tracking
```

## Modules

### 1. AI Module
- **Gemini Flash** - Daily tasks (60%)
- **Claude Sonnet** - Content creation (25%)
- **Groq** - Fast responses (10%)
- **DeepSeek** - Data analysis
- **Claude Opus** - Final review (5%)

### 2. Data Module
- Salla API integration
- Read-only mode (first month)

### 3. Reports Module
- Morning report (8AM)
- Evening report (8PM)
- Weekly & Monthly reports

### 4. Alerts Module
- Real-time Telegram notifications
- 4 priority levels:
  - 🔴 Emergency (2 min)
  - 🟠 Urgent (15 min)
  - 🟡 Important (1 hour)
  - 🟢 Info (routine)

## API Endpoints

```
GET  /                   # Health check
GET  /health            # System status
GET  /api/ai/models     # List AI models
POST /api/ai/chat       # Chat with AI
POST /api/ai/gemini     # Gemini only
POST /api/ai/groq       # Groq only
POST /api/ai/deepseek   # DeepSeek only
POST /api/ai/claude     # Claude only

GET  /api/data/orders   # Get orders (needs token)
GET  /api/data/products # Get products
GET  /api/data/customers# Get customers

GET  /api/reports       # List reports
GET  /api/reports/:type # Get specific report

GET  /api/modules/status# Module status
```

## Setup

```bash
# Install dependencies
npm install

# Run development
node server.js

# Run with PM2
pm2 start server.js
```

## Git Workflow

1. Make changes
2. Commit: `git commit -m "Description"`
3. Push: `git push origin master`

## Security

- SSH Key + Port 2222
- UFW Firewall
- Fail2Ban
- .env protected (chmod 600)

## Cost

- Claude Sonnet: ~$5/month
- Claude Opus: ~$1.5/month
- DeepSeek: ~$1/month
- Midjourney: $10/month
- ElevenLabs: $5/month
- **Total: ~$23/month**

---

**Version:** 5.0
**Last Updated:** March 2026
**Author:** Sultan (CEO)
