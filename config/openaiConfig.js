const OpenAI = require('openai');

// Initialize OpenAI API

const openai = new OpenAI({
    basURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.API_KEY
});

// This is older configuration openai version 3.3.0
/* const openai = new OpenAIApi(new Configuration( {
    apiKey: process.env.API_KEY
})); */

module.exports = openai;