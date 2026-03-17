/**
 * AI Service - Multi-AI Handler
 * Handles Gemini, Groq, DeepSeek, Claude
 */

const axios = require('axios');

class AIService {
  constructor() {
    this.models = {
      gemini: {
        name: 'Gemini Flash',
        apiKey: process.env.GEMINI_API_KEY,
        endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent'
      },
      groq: {
        name: 'Groq (Llama)',
        apiKey: process.env.GROQ_API_KEY,
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'llama-3.3-70b-versatile'
      },
      deepseek: {
        name: 'DeepSeek V3',
        apiKey: process.env.DEEPSEEK_API_KEY,
        endpoint: 'https://api.deepseek.com/v1/chat/completions',
        model: 'deepseek-chat'
      },
      claude: {
        name: 'Claude',
        apiKey: process.env.ANTHROPIC_API_KEY,
        endpoint: 'https://api.anthropic.com/v1/messages',
        model: 'claude-sonnet-4-20250514'
      }
    };
  }

  async chat(message, model = 'gemini') {
    const config = this.models[model];
    if (!config) {
      throw new Error(`Unknown model: ${model}`);
    }

    try {
      let response;

      if (model === 'gemini') {
        const result = await axios.post(
          `${config.endpoint}?key=${config.apiKey}`,
          { contents: [{ parts: [{ text: message }] }] },
          { headers: { 'Content-Type': 'application/json' } }
        );
        response = result.data.candidates[0].content.parts[0].text;
      } 
      else if (model === 'groq') {
        const result = await axios.post(
          config.endpoint,
          { model: config.model, messages: [{ role: 'user', content: message }], max_tokens: 1000 },
          { headers: { 'Authorization': `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' } }
        );
        response = result.data.choices[0].message.content;
      }
      else if (model === 'deepseek') {
        const result = await axios.post(
          config.endpoint,
          { model: config.model, messages: [{ role: 'user', content: message }], max_tokens: 1000 },
          { headers: { 'Authorization': `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' } }
        );
        response = result.data.choices[0].message.content;
      }
      else if (model === 'claude') {
        const result = await axios.post(
          config.endpoint,
          { model: config.model, max_tokens: 1000, messages: [{ role: 'user', content: message }] },
          { headers: { 'x-api-key': config.apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' } }
        );
        response = result.data.content[0].text;
      }

      return { success: true, response, model: config.name };
    } catch (error) {
      console.error(`AI Error (${model}):`, error.message);
      return { success: false, error: error.message, model };
    }
  }

  // Get available models
  getAvailableModels() {
    return Object.keys(this.models).map(key => ({
      id: key,
      name: this.models[key].name
    }));
  }
}

module.exports = new AIService();
