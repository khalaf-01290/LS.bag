/**
 * Telegram Service - Alerts Module
 * Handles sending notifications
 */

const axios = require('axios');

class TelegramService {
  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendMessage(chatId, text, parseMode = 'Markdown') {
    try {
      const response = await axios.post(`${this.baseUrl}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
      });
      return { success: true, messageId: response.data.result.message_id };
    } catch (error) {
      console.error('Telegram Error:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Alert types
  async sendAlert(chatId, type, message) {
    const icons = {
      high: '🔴',
      medium: '🟠',
      low: '🟡',
      sales: '💰',
      inventory: '📦',
      trends: '🔥',
      error: '❌',
      success: '✅'
    };

    const icon = icons[type] || '📢';
    return this.sendMessage(chatId, `${icon} *${message}*`);
  }

  // Send report
  async sendReport(chatId, report) {
    const message = `
📊 *تقرير ${report.type}*

${report.content}

---
⏰ ${new Date().toLocaleString('ar-SA')}
`;
    return this.sendMessage(chatId, message);
  }
}

module.exports = new TelegramService();