const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI API
const openai = new OpenAIApi(new Configuration( {
    apiKey: process.env.API_KEY
}));

module.exports = openai;