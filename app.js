// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI API
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

// Initialize Express
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import Routes
const indexRoutes = require('./routes/index');
const trackRoutes = require('./routes/track');
const recipeRoutes = require('./routes/recipes');

// Use Routes
app.use('/', indexRoutes);
app.use('/track', trackRoutes);
app.use('/recipes', recipeRoutes);

// Server Listener
app.listen(3000, function() {
    console.log("The server is up and running on port 3000");
});
