const OpenAI = require('openai');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize OpenAI API
const openai = new OpenAI({
    basURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.API_KEY
});

// This is older configuration openai version 3.3.0
/* const openai = new OpenAIApi(new Configuration( {
    apiKey: process.env.API_KEY
})); */

module.exports = {
    openai,
    model
};