/**
 * LS.bag Backend - Module Structure
 * 
 * 1. Data Module - Salla API
 * 2. AI Module - Multi-AI (Gemini, Groq, DeepSeek)
 * 3. Reports Module - Automated reports
 * 4. Marketing Module - Content generation
 * 5. Trends Module - Trend analysis
 * 6. Alerts Module - Notifications
 */

module.exports = {
  // Module names
  MODULES: {
    DATA: 'data',           // Salla API
    AI: 'ai',               // Multi-AI
    REPORTS: 'reports',     // Automated reports
    MARKETING: 'marketing', // Content generation
    TRENDS: 'trends',       // Trend analysis
    ALERTS: 'alerts',       // Notifications
  },

  // AI Models
  AI_MODELS: {
    GEMINI: 'gemini',
    GROQ: 'groq',
    DEEPSEEK: 'deepseek',
    CLAUDE: 'claude'
  },

  // Alert priorities
  PRIORITIES: {
    HIGH: 'high',     // 🔴 عاجل جداً
    MEDIUM: 'medium', // 🟠 عاجل
    LOW: 'low'        // 🟡 مهم
  },

  // Report types
  REPORT_TYPES: {
    MORNING: 'morning',   // 8AM
    EVENING: 'evening',   // 8PM
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
  }
};
